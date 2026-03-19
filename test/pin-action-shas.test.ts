import { describe, expect, it } from "vitest";

import { lintWorkflow } from "./_shared/lint-workflow.js";

describe("pin-action-shas", () => {
    it("reports tag-based action references", async () => {
        const result = await lintWorkflow(
            [
                "on:",
                "  push:",
                "permissions:",
                "  contents: read",
                "jobs:",
                "  build:",
                "    runs-on: ubuntu-latest",
                "    timeout-minutes: 10",
                "    steps:",
                "      - uses: actions/checkout@v4",
            ].join("\n"),
            {
                rules: {
                    "github-actions/pin-action-shas": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
        expect(result.messages[0]?.message).toContain(
            "40-character commit SHA"
        );
    });

    it("allows full SHA pins", async () => {
        const result = await lintWorkflow(
            [
                "on:",
                "  push:",
                "permissions:",
                "  contents: read",
                "jobs:",
                "  build:",
                "    runs-on: ubuntu-latest",
                "    timeout-minutes: 10",
                "    steps:",
                "      - uses: actions/checkout@692973e3d937129bcbf40652eb9f2f61becf3332",
            ].join("\n"),
            {
                rules: {
                    "github-actions/pin-action-shas": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(0);
    });
});
