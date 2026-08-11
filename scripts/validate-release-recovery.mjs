#!/usr/bin/env node

/**
 * Validate that a workflow rerun is resuming the exact release commit created
 * by its original workflow_dispatch event.
 */

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { parseArgs } from "node:util";
import { pathToFileURL } from "node:url";

/**
 * @typedef {"major" | "minor" | "patch"} ReleaseType
 */

/**
 * @typedef ReleaseRecoveryState
 *
 * @property {readonly string[]} changedFiles
 * @property {string} commitSubject
 * @property {string} [explicitVersion]
 * @property {readonly string[]} headTags
 * @property {string} parentVersion
 * @property {ReleaseType} releaseType
 * @property {string} releaseVersion
 */

const releaseVersionPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/v;
const requiredReleaseFiles = new Set(["package-lock.json", "package.json"]);

/**
 * Read one package version from JSON text.
 *
 * @param {string} packageText
 *
 * @returns {string}
 */
const readPackageVersion = (packageText) => {
    const packageData = JSON.parse(packageText);

    if (
        typeof packageData !== "object" ||
        packageData === null ||
        !("version" in packageData) ||
        typeof packageData.version !== "string"
    ) {
        throw new TypeError(
            "Expected package JSON to contain a version string."
        );
    }

    return packageData.version;
};

/**
 * Split non-empty command-output lines.
 *
 * @param {string} value
 *
 * @returns {readonly string[]}
 */
const splitOutputLines = (value) =>
    value.length === 0 ? [] : value.split(/\r?\n/v);

/**
 * Execute Git and return trimmed standard output.
 *
 * @param {readonly string[]} arguments_
 *
 * @returns {string}
 */
const executeGit = (arguments_) =>
    execFileSync("git", arguments_, {
        encoding: "utf8",
        stdio: [
            "ignore",
            "pipe",
            "inherit",
        ],
    }).trim();

/**
 * Calculate the stable version expected from release inputs.
 *
 * @param {string} parentVersion
 * @param {ReleaseType} releaseType
 * @param {string | undefined} explicitVersion
 *
 * @returns {string}
 */
export const getExpectedReleaseVersion = (
    parentVersion,
    releaseType,
    explicitVersion
) => {
    if (explicitVersion !== undefined && explicitVersion.length > 0) {
        if (!releaseVersionPattern.test(explicitVersion)) {
            throw new TypeError(
                `Explicit release version '${explicitVersion}' is not stable x.y.z.`
            );
        }

        return explicitVersion;
    }

    const match = releaseVersionPattern.exec(parentVersion);

    if (match === null) {
        throw new TypeError(
            `Parent version '${parentVersion}' is not stable x.y.z.`
        );
    }

    const major = BigInt(match[1]);
    const minor = BigInt(match[2]);
    const patch = BigInt(match[3]);

    switch (releaseType) {
        case "major":
            return `${major + 1n}.0.0`;
        case "minor":
            return `${major}.${minor + 1n}.0`;
        case "patch":
            return `${major}.${minor}.${patch + 1n}`;
        default:
            throw new TypeError(
                `Unsupported recovery release type '${releaseType}'.`
            );
    }
};

/**
 * Validate the immutable release-commit boundary required for safe recovery.
 *
 * @param {Readonly<ReleaseRecoveryState>} state
 *
 * @returns {void}
 */
export const validateReleaseRecovery = (state) => {
    const expectedVersion = getExpectedReleaseVersion(
        state.parentVersion,
        state.releaseType,
        state.explicitVersion
    );

    if (state.releaseVersion !== expectedVersion) {
        throw new TypeError(
            `Recovery version ${state.releaseVersion} does not match expected version ${expectedVersion}.`
        );
    }

    const expectedTag = `v${state.releaseVersion}`;
    const expectedSubject = `chore: release ${expectedTag}`;

    if (state.commitSubject !== expectedSubject) {
        throw new TypeError(
            `Recovery commit subject '${state.commitSubject}' does not match '${expectedSubject}'.`
        );
    }

    const changedFileSet = new Set(state.changedFiles);
    const hasExactReleaseFiles =
        changedFileSet.size === requiredReleaseFiles.size &&
        [...requiredReleaseFiles].every((file) => changedFileSet.has(file));

    if (!hasExactReleaseFiles) {
        throw new TypeError(
            "Recovery commit must change only package.json and package-lock.json."
        );
    }

    if (
        state.headTags.length > 1 ||
        (state.headTags.length === 1 && state.headTags[0] !== expectedTag)
    ) {
        throw new TypeError(
            `Recovery commit has unexpected tags: ${state.headTags.join(", ")}.`
        );
    }
};

const main = () => {
    const { values } = parseArgs({
        allowPositionals: false,
        options: {
            "candidate-sha": {
                type: "string",
            },
            "explicit-version": {
                default: "",
                type: "string",
            },
            "release-type": {
                default: "patch",
                type: "string",
            },
        },
        strict: true,
    });
    const candidateSha = values["candidate-sha"];
    const releaseType = values["release-type"];

    if (candidateSha === undefined || candidateSha.length === 0) {
        throw new TypeError("--candidate-sha is required.");
    }

    if (
        releaseType !== "major" &&
        releaseType !== "minor" &&
        releaseType !== "patch"
    ) {
        throw new TypeError(`Unsupported release type '${releaseType}'.`);
    }

    const parentVersion = readPackageVersion(
        executeGit(["show", `${candidateSha}:package.json`])
    );
    const releaseVersion = readPackageVersion(
        readFileSync("package.json", "utf8")
    );

    validateReleaseRecovery({
        changedFiles: splitOutputLines(
            executeGit([
                "diff",
                "--name-only",
                candidateSha,
                "HEAD",
            ])
        ),
        commitSubject: executeGit([
            "show",
            "-s",
            "--format=%s",
            "HEAD",
        ]),
        explicitVersion: values["explicit-version"] || undefined,
        headTags: splitOutputLines(
            executeGit([
                "tag",
                "--points-at",
                "HEAD",
                "--sort=refname",
            ])
        ),
        parentVersion,
        releaseType,
        releaseVersion,
    });

    process.stdout.write(
        `Validated recovery of release v${releaseVersion} from ${candidateSha}.\n`
    );
};

if (
    process.argv[1] !== undefined &&
    import.meta.url === pathToFileURL(process.argv[1]).href
) {
    try {
        main();
    } catch (error) {
        console.error("Unable to validate release recovery:", error);
        process.exitCode = 1;
    }
}
