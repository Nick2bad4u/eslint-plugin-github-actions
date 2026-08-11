#!/usr/bin/env node

/**
 * Read one Git commit from npm 11 or npm 12 `npm view ... gitHead --json`
 * output.
 */

import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

/**
 * Extract one published gitHead from npm view metadata.
 *
 * Npm 11 returns the field as a JSON string. npm 12 returns a one-element array
 * even when the query targets one exact package version.
 *
 * @param {unknown} viewMetadata
 *
 * @returns {string}
 *
 * @throws {TypeError} When the metadata shape is invalid or ambiguous.
 */
export const getNpmViewGitHead = (viewMetadata) => {
    const gitHeads = Array.isArray(viewMetadata)
        ? viewMetadata
        : [viewMetadata];

    if (gitHeads.length !== 1) {
        throw new TypeError(
            `Expected npm view metadata for exactly one gitHead, received ${gitHeads.length}.`
        );
    }

    const [gitHead] = gitHeads;

    if (typeof gitHead !== "string" || gitHead.trim().length === 0) {
        throw new TypeError(
            "Expected npm view metadata to contain a non-empty gitHead."
        );
    }

    return gitHead.trim();
};

const main = async () => {
    const [metadataPath, ...unexpectedArguments] = process.argv.slice(2);

    if (metadataPath === undefined || unexpectedArguments.length > 0) {
        throw new TypeError(
            "Usage: node scripts/read-npm-view-git-head.mjs <npm-view-json-path>"
        );
    }

    const metadataText = await readFile(metadataPath, "utf8");
    const viewMetadata = JSON.parse(metadataText);
    process.stdout.write(getNpmViewGitHead(viewMetadata));
};

if (
    process.argv[1] !== undefined &&
    import.meta.url === pathToFileURL(process.argv[1]).href
) {
    try {
        await main();
    } catch (error) {
        console.error("Unable to read npm view gitHead:", error);
        process.exitCode = 1;
    }
}
