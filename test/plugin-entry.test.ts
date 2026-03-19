import { describe, expect, it } from "vitest";

import githubActionsPlugin from "../src/plugin.js";

describe("plugin entry", () => {
    it("exports GitHub Actions plugin metadata", () => {
        expect(githubActionsPlugin.meta).toMatchObject({
            name: "eslint-plugin-github-actions",
            namespace: "github-actions",
        });
    });

    it("exports the expected rule names", () => {
        expect(
            Object.keys(githubActionsPlugin.rules).toSorted((left, right) =>
                left.localeCompare(right)
            )
        ).toEqual([
            "action-name-casing",
            "job-id-casing",
            "max-jobs-per-action",
            "no-external-job",
            "no-invalid-key",
            "no-top-level-env",
            "no-top-level-permissions",
            "pin-action-shas",
            "prefer-fail-fast",
            "prefer-file-extension",
            "prefer-step-uses-style",
            "require-action-name",
            "require-action-run-name",
            "require-job-name",
            "require-job-step-name",
            "require-job-timeout-minutes",
            "require-workflow-concurrency",
            "require-workflow-permissions",
            "valid-timeout-minutes",
            "valid-trigger-events",
        ]);
    });
});
