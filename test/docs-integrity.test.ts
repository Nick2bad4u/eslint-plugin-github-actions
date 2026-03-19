import { readFileSync } from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

const docsRoot = path.join(process.cwd(), "docs", "rules");

describe("docs integrity", () => {
    it("contains markdown pages for every published rule", () => {
        const requiredRuleDocNames = [
            "action-name-casing.md",
            "job-id-casing.md",
            "max-jobs-per-action.md",
            "no-external-job.md",
            "no-inherit-secrets.md",
            "no-invalid-key.md",
            "no-secrets-in-if.md",
            "no-top-level-env.md",
            "no-top-level-permissions.md",
            "no-write-all-permissions.md",
            "require-workflow-permissions.md",
            "require-job-timeout-minutes.md",
            "pin-action-shas.md",
            "prefer-fail-fast.md",
            "prefer-file-extension.md",
            "prefer-step-uses-style.md",
            "require-action-name.md",
            "require-action-run-name.md",
            "require-checkout-before-local-action.md",
            "require-job-name.md",
            "require-job-step-name.md",
            "require-run-step-shell.md",
            "require-workflow-dispatch-input-type.md",
            "require-workflow-interface-description.md",
            "require-workflow-concurrency.md",
            "require-workflow-run-branches.md",
            "valid-timeout-minutes.md",
            "valid-trigger-events.md",
        ];

        for (const fileName of requiredRuleDocNames) {
            const contents = readFileSync(
                path.join(docsRoot, fileName),
                "utf8"
            );

            expect(contents).toContain("## Further reading");
            expect(contents).toContain("> **Rule catalog ID:** R0");
        }
    });
});
