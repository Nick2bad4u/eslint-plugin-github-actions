import { describe, expect, it } from "vitest";

import { lintWorkflow } from "./_shared/lint-workflow.js";

const githubExpression = (expression: string): string =>
    `\${{ ${expression} }}`;

describe("workflow interface rules", () => {
    it("reports missing descriptions for workflow_dispatch inputs", async () => {
        const result = await lintWorkflow(
            [
                "name: Deploy",
                "on:",
                "  workflow_dispatch:",
                "    inputs:",
                "      environment:",
                "        required: true",
                "        type: environment",
            ].join("\n"),
            {
                rules: {
                    "github-actions/require-workflow-interface-description":
                        "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
        expect(result.messages[0]?.ruleId).toBe(
            "github-actions/require-workflow-interface-description"
        );
    });

    it("reports missing descriptions for reusable workflow secrets", async () => {
        const result = await lintWorkflow(
            [
                "name: Reusable deploy",
                "on:",
                "  workflow_call:",
                "    inputs:",
                "      config-path:",
                "        description: Path to the deployment config",
                "        required: true",
                "        type: string",
                "    secrets:",
                "      token:",
                "        required: true",
            ].join("\n"),
            {
                rules: {
                    "github-actions/require-workflow-interface-description":
                        "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
        expect(result.messages[0]?.ruleId).toBe(
            "github-actions/require-workflow-interface-description"
        );
    });

    it("reports missing descriptions for reusable workflow outputs", async () => {
        const result = await lintWorkflow(
            [
                "name: Reusable deploy",
                "on:",
                "  workflow_call:",
                "    outputs:",
                "      deployment-url:",
                `        value: ${githubExpression("jobs.deploy.outputs.url")}`,
                "jobs:",
                "  deploy:",
                "    runs-on: ubuntu-latest",
                "    outputs:",
                `      url: ${githubExpression("steps.publish.outputs.url")}`,
                "    steps:",
                "      - id: publish",
                '        run: echo "url=https://example.com" >> $GITHUB_OUTPUT',
            ].join("\n"),
            {
                rules: {
                    "github-actions/require-workflow-interface-description":
                        "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
        expect(result.messages[0]?.ruleId).toBe(
            "github-actions/require-workflow-interface-description"
        );
    });

    it("accepts described workflow_dispatch and workflow_call interfaces", async () => {
        const result = await lintWorkflow(
            [
                "name: Deploy",
                "on:",
                "  workflow_dispatch:",
                "    inputs:",
                "      environment:",
                "        description: Deployment target environment",
                "        required: true",
                "        type: environment",
                "  workflow_call:",
                "    inputs:",
                "      config-path:",
                "        description: Path to the deployment config",
                "        required: true",
                "        type: string",
                "    secrets:",
                "      token:",
                "        description: Token used to publish deployment state",
                "        required: true",
                "    outputs:",
                "      deployment-url:",
                "        description: Final deployment URL",
                `        value: ${githubExpression("jobs.deploy.outputs.url")}`,
                "jobs:",
                "  deploy:",
                "    runs-on: ubuntu-latest",
                "    outputs:",
                `      url: ${githubExpression("steps.publish.outputs.url")}`,
                "    steps:",
                "      - id: publish",
                '        run: echo "url=https://example.com" >> $GITHUB_OUTPUT',
            ].join("\n"),
            {
                rules: {
                    "github-actions/require-workflow-interface-description":
                        "error",
                },
            }
        );

        expect(result.messages).toHaveLength(0);
    });
});
