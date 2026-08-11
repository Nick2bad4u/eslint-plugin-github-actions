import { describe, expect, it } from "vitest";

import {
    getExpectedReleaseVersion,
    validateReleaseRecovery,
} from "../scripts/validate-release-recovery.mjs";

const validRecoveryState = {
    changedFiles: ["package-lock.json", "package.json"],
    commitSubject: "chore: release v1.2.3",
    headTags: ["v1.2.3"],
    parentVersion: "1.2.2",
    releaseType: "patch",
    releaseVersion: "1.2.3",
} as const;

describe(getExpectedReleaseVersion, () => {
    it.each([
        ["major", "2.0.0"],
        ["minor", "1.3.0"],
        ["patch", "1.2.3"],
    ] as const)("calculates a %s release", (releaseType, expectedVersion) => {
        expect.assertions(1);

        expect(getExpectedReleaseVersion("1.2.2", releaseType, undefined)).toBe(
            expectedVersion
        );
    });

    it("uses an explicit stable version", () => {
        expect.assertions(1);

        expect(getExpectedReleaseVersion("1.2.2", "major", "4.5.6")).toBe(
            "4.5.6"
        );
    });

    it.each([
        "1.2",
        "1.2.3-beta.1",
        "01.2.3",
    ])("rejects invalid parent version %s", (parentVersion) => {
        expect.assertions(1);

        expect(() =>
            getExpectedReleaseVersion(parentVersion, "patch", undefined)
        ).toThrow("not stable x.y.z");
    });

    it("rejects an invalid explicit version", () => {
        expect.assertions(1);

        expect(() =>
            getExpectedReleaseVersion("1.2.2", "patch", "1.2.3-next.1")
        ).toThrow("not stable x.y.z");
    });
});

describe(validateReleaseRecovery, () => {
    it.each([
        {
            headTags: [] as const,
            label: "before tag creation",
        },
        {
            headTags: ["v1.2.3"] as const,
            label: "after tag creation",
        },
    ])("accepts a matching release commit $label", ({ headTags }) => {
        expect.assertions(1);

        expect(() => {
            validateReleaseRecovery({
                ...validRecoveryState,
                headTags,
            });
        }).not.toThrow();
    });

    it("accepts a matching explicit release", () => {
        expect.assertions(1);

        expect(() => {
            validateReleaseRecovery({
                ...validRecoveryState,
                explicitVersion: "1.2.3",
                releaseType: "major",
            });
        }).not.toThrow();
    });

    it.each([
        [
            {
                changedFiles: [
                    "package-lock.json",
                    "package.json",
                    "src/plugin.ts",
                ],
            },
            "must change only package.json and package-lock.json",
        ],
        [
            { changedFiles: ["package.json"] },
            "must change only package.json and package-lock.json",
        ],
        [
            { commitSubject: "chore: release v1.2.4" },
            "does not match 'chore: release v1.2.3'",
        ],
        [{ headTags: ["v1.2.3", "v1.2.3-copy"] }, "unexpected tags"],
        [{ headTags: ["v1.2.4"] }, "unexpected tags"],
        [{ releaseVersion: "1.2.4" }, "does not match expected version"],
    ] as const)("rejects invalid recovery state %#", (override, message) => {
        expect.assertions(1);

        expect(() => {
            validateReleaseRecovery({
                ...validRecoveryState,
                ...override,
            });
        }).toThrow(message);
    });
});
