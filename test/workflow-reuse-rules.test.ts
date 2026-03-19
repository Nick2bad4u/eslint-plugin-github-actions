import { describe, expect, it } from "vitest";

import { lintWorkflow } from "./_shared/lint-workflow.js";

const githubExpression = (expression: string): string =>
    `\${{ ${expression} }}`;

describe("workflow reuse rules", () => {
    it("reports local actions used before checkout", async () => {
        const result = await lintWorkflow(
            [
                "name: CI",
                "on:",
                "  push:",
                "jobs:",
                "  build:",
                "    runs-on: ubuntu-latest",
                "    steps:",
                "      - name: Use local action",
                "        uses: ./.github/actions/setup-project",
            ].join("\n"),
            {
                rules: {
                    "github-actions/require-checkout-before-local-action":
                        "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
        expect(result.messages[0]?.ruleId).toBe(
            "github-actions/require-checkout-before-local-action"
        );
    });

    it("accepts local actions after checkout", async () => {
        const result = await lintWorkflow(
            [
                "name: CI",
                "on:",
                "  push:",
                "jobs:",
                "  build:",
                "    runs-on: ubuntu-latest",
                "    steps:",
                "      - name: Checkout",
                "        uses: actions/checkout@v5",
                "      - name: Use local action",
                "        uses: ./.github/actions/setup-project",
            ].join("\n"),
            {
                rules: {
                    "github-actions/require-checkout-before-local-action":
                        "error",
                },
            }
        );

        expect(result.messages).toHaveLength(0);
    });

    it("still reports when checkout appears after the local action", async () => {
        const result = await lintWorkflow(
            [
                "name: CI",
                "on:",
                "  push:",
                "jobs:",
                "  build:",
                "    runs-on: ubuntu-latest",
                "    steps:",
                "      - name: Use local action",
                "        uses: ./.github/actions/setup-project",
                "      - name: Checkout",
                "        uses: actions/checkout@v5",
            ].join("\n"),
            {
                rules: {
                    "github-actions/require-checkout-before-local-action":
                        "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
    });

    it("reports reusable workflow jobs that inherit all secrets", async () => {
        const result = await lintWorkflow(
            [
                "name: Reuse",
                "on:",
                "  workflow_dispatch:",
                "jobs:",
                "  deploy:",
                "    uses: ./.github/workflows/deploy.yml",
                "    secrets: inherit",
            ].join("\n"),
            {
                rules: {
                    "github-actions/no-inherit-secrets": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
        expect(result.messages[0]?.ruleId).toBe(
            "github-actions/no-inherit-secrets"
        );
    });

    it("accepts reusable workflow jobs with explicit secrets", async () => {
        const result = await lintWorkflow(
            [
                "name: Reuse",
                "on:",
                "  workflow_dispatch:",
                "jobs:",
                "  deploy:",
                "    uses: ./.github/workflows/deploy.yml",
                "    secrets:",
                `      token: ${githubExpression("secrets.DEPLOY_TOKEN")}`,
            ].join("\n"),
            {
                rules: {
                    "github-actions/no-inherit-secrets": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(0);
    });
});
