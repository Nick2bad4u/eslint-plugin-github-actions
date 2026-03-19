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
            "no-inherit-secrets",
            "no-invalid-key",
            "no-secrets-in-if",
            "no-top-level-env",
            "no-top-level-permissions",
            "no-write-all-permissions",
            "pin-action-shas",
            "prefer-fail-fast",
            "prefer-file-extension",
            "prefer-step-uses-style",
            "require-action-name",
            "require-action-run-name",
            "require-checkout-before-local-action",
            "require-job-name",
            "require-job-step-name",
            "require-job-timeout-minutes",
            "require-run-step-shell",
            "require-workflow-concurrency",
            "require-workflow-dispatch-input-type",
            "require-workflow-interface-description",
            "require-workflow-permissions",
            "require-workflow-run-branches",
            "valid-timeout-minutes",
            "valid-trigger-events",
        ]);
    });
});
