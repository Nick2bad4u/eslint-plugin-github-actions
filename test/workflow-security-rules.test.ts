import { describe, expect, it } from "vitest";

import { lintWorkflow } from "./_shared/lint-workflow.js";

const githubExpression = (expression: string): string =>
    `\${{ ${expression} }}`;

describe("workflow security rules", () => {
    it("reports direct secret references in step if conditionals", async () => {
        const result = await lintWorkflow(
            [
                "name: CI",
                "on:",
                "  push:",
                "jobs:",
                "  build:",
                "    runs-on: ubuntu-latest",
                "    steps:",
                "      - name: Deploy",
                `        if: ${githubExpression("secrets.DEPLOY_TOKEN != ''")}`,
                "        run: ./deploy.sh",
            ].join("\n"),
            {
                rules: {
                    "github-actions/no-secrets-in-if": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
        expect(result.messages[0]?.ruleId).toBe(
            "github-actions/no-secrets-in-if"
        );
    });

    it("reports direct secret references in job if conditionals without expression wrappers", async () => {
        const result = await lintWorkflow(
            [
                "name: CI",
                "on:",
                "  push:",
                "jobs:",
                "  deploy:",
                "    if: secrets.DEPLOY_TOKEN != ''",
                "    runs-on: ubuntu-latest",
                "    steps:",
                "      - run: ./deploy.sh",
            ].join("\n"),
            {
                rules: {
                    "github-actions/no-secrets-in-if": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
    });

    it("accepts env-based conditional checks derived from secrets", async () => {
        const result = await lintWorkflow(
            [
                "name: CI",
                "on:",
                "  push:",
                "jobs:",
                "  deploy:",
                "    runs-on: ubuntu-latest",
                "    env:",
                `      DEPLOY_TOKEN: ${githubExpression("secrets.DEPLOY_TOKEN")}`,
                "    steps:",
                "      - name: Deploy",
                `        if: ${githubExpression("env.DEPLOY_TOKEN != ''")}`,
                "        run: ./deploy.sh",
            ].join("\n"),
            {
                rules: {
                    "github-actions/no-secrets-in-if": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(0);
    });

    it("reports workflow_run triggers without branch filters", async () => {
        const result = await lintWorkflow(
            [
                "name: Follow up",
                "on:",
                "  workflow_run:",
                "    workflows: ['CI']",
                "    types: [completed]",
                "jobs:",
                "  notify:",
                "    runs-on: ubuntu-latest",
                "    steps:",
                "      - run: echo done",
            ].join("\n"),
            {
                rules: {
                    "github-actions/require-workflow-run-branches": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
        expect(result.messages[0]?.ruleId).toBe(
            "github-actions/require-workflow-run-branches"
        );
    });

    it("accepts workflow_run triggers scoped with branches", async () => {
        const result = await lintWorkflow(
            [
                "name: Follow up",
                "on:",
                "  workflow_run:",
                "    workflows: ['CI']",
                "    types: [completed]",
                "    branches:",
                "      - main",
                "jobs:",
                "  notify:",
                "    runs-on: ubuntu-latest",
                "    steps:",
                "      - run: echo done",
            ].join("\n"),
            {
                rules: {
                    "github-actions/require-workflow-run-branches": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(0);
    });

    it("accepts workflow_run triggers scoped with branches-ignore", async () => {
        const result = await lintWorkflow(
            [
                "name: Follow up",
                "on:",
                "  workflow_run:",
                "    workflows: ['CI']",
                "    types: [completed]",
                "    branches-ignore:",
                "      - canary",
                "jobs:",
                "  notify:",
                "    runs-on: ubuntu-latest",
                "    steps:",
                "      - run: echo done",
            ].join("\n"),
            {
                rules: {
                    "github-actions/require-workflow-run-branches": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(0);
    });
});
