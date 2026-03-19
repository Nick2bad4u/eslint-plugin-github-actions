import { describe, expect, it } from "vitest";

import { lintWorkflow } from "./_shared/lint-workflow.js";

describe("require-workflow-permissions", () => {
    it("reports when neither workflow nor jobs declare permissions", async () => {
        const result = await lintWorkflow(
            [
                "name: ci",
                "on:",
                "  push:",
                "jobs:",
                "  build:",
                "    runs-on: ubuntu-latest",
                "    steps:",
                "      - run: npm test",
            ].join("\n"),
            {
                rules: {
                    "github-actions/require-workflow-permissions": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
        expect(result.messages[0]?.ruleId).toBe(
            "github-actions/require-workflow-permissions"
        );
    });

    it("allows explicit workflow-level permissions", async () => {
        const result = await lintWorkflow(
            [
                "name: ci",
                "on:",
                "  push:",
                "permissions:",
                "  contents: read",
                "jobs:",
                "  build:",
                "    runs-on: ubuntu-latest",
            ].join("\n"),
            {
                rules: {
                    "github-actions/require-workflow-permissions": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(0);
    });
});
