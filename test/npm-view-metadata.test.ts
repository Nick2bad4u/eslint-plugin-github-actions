import { describe, expect, it } from "vitest";

import { getNpmViewGitHead } from "../scripts/read-npm-view-git-head.mjs";

const releaseCommit = "00f4845ebf168769cab2966c04ef30b1a930e6ae";

describe(getNpmViewGitHead, () => {
    it("reads npm 11 string metadata", () => {
        expect.assertions(1);

        expect(getNpmViewGitHead(releaseCommit)).toBe(releaseCommit);
    });

    it("reads npm 12 array metadata", () => {
        expect.assertions(1);

        expect(getNpmViewGitHead([releaseCommit])).toBe(releaseCommit);
    });

    it("trims the published gitHead", () => {
        expect.assertions(1);

        expect(getNpmViewGitHead(`  ${releaseCommit}\n`)).toBe(releaseCommit);
    });

    it.each([
        [[], "exactly one gitHead"],
        [[releaseCommit, releaseCommit], "exactly one gitHead"],
        [[" ".repeat(3)], "non-empty gitHead"],
        [[null], "non-empty gitHead"],
        [{ gitHead: releaseCommit }, "non-empty gitHead"],
    ])("rejects invalid or ambiguous metadata", (metadata, message) => {
        expect.assertions(1);

        expect(() => getNpmViewGitHead(metadata)).toThrow(message);
    });
});
