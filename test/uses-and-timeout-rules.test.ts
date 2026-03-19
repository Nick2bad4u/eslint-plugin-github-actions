import { describe, expect, it } from "vitest";

import { lintWorkflow } from "./_shared/lint-workflow.js";

describe("uses and timeout rules", () => {
    it("reports step uses references that do not match the configured style", async () => {
        const result = await lintWorkflow(
            [
                "name: CI",
                "on:",
                "  push:",
                "jobs:",
                "  build:",
                "    name: Build",
                "    runs-on: ubuntu-latest",
                "    steps:",
                "      - name: Checkout",
                "        uses: actions/checkout@v4",
            ].join("\n"),
            {
                rules: {
                    "github-actions/prefer-step-uses-style": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
        expect(result.messages[0]?.ruleId).toBe(
            "github-actions/prefer-step-uses-style"
        );
    });

    it("accepts commit-style step uses references by default", async () => {
        const result = await lintWorkflow(
            [
                "name: CI",
                "on:",
                "  push:",
                "jobs:",
                "  build:",
                "    name: Build",
                "    runs-on: ubuntu-latest",
                "    steps:",
                "      - name: Checkout",
                "        uses: actions/checkout@692973e3d937129bcbf40652eb9f2f61becf3332",
            ].join("\n"),
            {
                rules: {
                    "github-actions/prefer-step-uses-style": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(0);
    });

    it("reports invalid timeout-minutes values", async () => {
        const result = await lintWorkflow(
            [
                "name: CI",
                "on:",
                "  push:",
                "jobs:",
                "  build:",
                "    name: Build",
                "    runs-on: ubuntu-latest",
                "    timeout-minutes: 0",
            ].join("\n"),
            {
                rules: {
                    "github-actions/valid-timeout-minutes": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
        expect(result.messages[0]?.ruleId).toBe(
            "github-actions/valid-timeout-minutes"
        );
    });

    it("accepts GitHub expressions for timeout-minutes", async () => {
        const result = await lintWorkflow(
            [
                "name: CI",
                "on:",
                "  push:",
                "jobs:",
                "  build:",
                "    name: Build",
                "    runs-on: ubuntu-latest",
                [
                    "    timeout-minutes: $",
                    "{{ fromJSON(vars.JOB_TIMEOUT_MINUTES) }}",
                ].join(""),
            ].join("\n"),
            {
                rules: {
                    "github-actions/valid-timeout-minutes": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(0);
    });
});
