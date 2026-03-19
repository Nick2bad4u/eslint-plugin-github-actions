import { describe, expect, it } from "vitest";

import githubActionsPlugin from "../src/plugin.js";

describe("exported presets", () => {
    it("exports the expected preset names", () => {
        expect(
            Object.keys(githubActionsPlugin.configs).toSorted((left, right) =>
                left.localeCompare(right)
            )
        ).toEqual([
            "all",
            "recommended",
            "security",
            "strict",
        ]);
    });

    it("scopes presets to workflow YAML files", () => {
        expect(githubActionsPlugin.configs.recommended.files).toEqual([
            ".github/workflows/*.{yml,yaml}",
        ]);
    });

    it("wires rule membership by preset", () => {
        expect(
            Object.keys(githubActionsPlugin.configs.recommended.rules).toSorted(
                (left, right) => left.localeCompare(right)
            )
        ).toEqual([
            "github-actions/no-invalid-key",
            "github-actions/no-secrets-in-if",
            "github-actions/no-write-all-permissions",
            "github-actions/prefer-file-extension",
            "github-actions/require-action-name",
            "github-actions/require-checkout-before-local-action",
            "github-actions/require-job-timeout-minutes",
            "github-actions/require-workflow-dispatch-input-type",
            "github-actions/require-workflow-permissions",
            "github-actions/valid-timeout-minutes",
            "github-actions/valid-trigger-events",
        ]);
        expect(
            Object.keys(githubActionsPlugin.configs.security.rules).toSorted(
                (left, right) => left.localeCompare(right)
            )
        ).toEqual([
            "github-actions/no-inherit-secrets",
            "github-actions/no-secrets-in-if",
            "github-actions/no-write-all-permissions",
            "github-actions/pin-action-shas",
            "github-actions/require-workflow-permissions",
            "github-actions/require-workflow-run-branches",
        ]);
        expect(
            Object.keys(githubActionsPlugin.configs.strict.rules).toSorted(
                (left, right) => left.localeCompare(right)
            )
        ).toEqual([
            "github-actions/action-name-casing",
            "github-actions/job-id-casing",
            "github-actions/max-jobs-per-action",
            "github-actions/no-external-job",
            "github-actions/no-inherit-secrets",
            "github-actions/no-invalid-key",
            "github-actions/no-secrets-in-if",
            "github-actions/no-top-level-env",
            "github-actions/no-write-all-permissions",
            "github-actions/pin-action-shas",
            "github-actions/prefer-fail-fast",
            "github-actions/prefer-file-extension",
            "github-actions/require-action-name",
            "github-actions/require-action-run-name",
            "github-actions/require-checkout-before-local-action",
            "github-actions/require-job-name",
            "github-actions/require-job-step-name",
            "github-actions/require-job-timeout-minutes",
            "github-actions/require-run-step-shell",
            "github-actions/require-workflow-concurrency",
            "github-actions/require-workflow-dispatch-input-type",
            "github-actions/require-workflow-interface-description",
            "github-actions/require-workflow-permissions",
            "github-actions/require-workflow-run-branches",
            "github-actions/valid-timeout-minutes",
            "github-actions/valid-trigger-events",
        ]);
    });
});
