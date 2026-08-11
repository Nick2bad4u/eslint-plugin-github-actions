import { describe, expect, it } from "vitest";

import { getNpmPackFilename } from "../scripts/read-npm-pack-filename.mjs";

describe(getNpmPackFilename, () => {
    it("reads npm 11 array metadata", () => {
        expect.assertions(1);

        expect(
            getNpmPackFilename([
                { filename: "eslint-plugin-github-actions-2-1.2.2.tgz" },
            ])
        ).toBe("eslint-plugin-github-actions-2-1.2.2.tgz");
    });

    it("reads npm 12 object metadata", () => {
        expect.assertions(1);

        expect(
            getNpmPackFilename({
                "eslint-plugin-github-actions-2": {
                    filename: "eslint-plugin-github-actions-2-1.2.2.tgz",
                },
            })
        ).toBe("eslint-plugin-github-actions-2-1.2.2.tgz");
    });

    it.each([
        [[], "exactly one package"],
        [
            [{ filename: "one.tgz" }, { filename: "two.tgz" }],
            "exactly one package",
        ],
        [[{ filename: " ".repeat(3) }], "non-empty filename"],
        [[null], "contain an object"],
    ])("rejects invalid or ambiguous metadata", (metadata, message) => {
        expect.assertions(1);

        expect(() => getNpmPackFilename(metadata)).toThrow(message);
    });
});
