import { describe, expect, it } from "vitest";

import { lintWorkflow } from "./_shared/lint-workflow.js";

describe("workflow shape rules", () => {
    it("reports reusable-workflow jobs when external jobs are disallowed", async () => {
        const result = await lintWorkflow(
            [
                "name: Release",
                "on:",
                "  workflow_dispatch:",
                "jobs:",
                "  deploy:",
                "    uses: ./.github/workflows/deploy.yml",
            ].join("\n"),
            {
                rules: {
                    "github-actions/no-external-job": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
        expect(result.messages[0]?.ruleId).toBe(
            "github-actions/no-external-job"
        );
    });

    it("reports top-level workflow env", async () => {
        const result = await lintWorkflow(
            [
                "name: CI",
                "on:",
                "  push:",
                "env:",
                "  NODE_ENV: production",
            ].join("\n"),
            {
                rules: {
                    "github-actions/no-top-level-env": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
        expect(result.messages[0]?.ruleId).toBe(
            "github-actions/no-top-level-env"
        );
    });

    it("reports invalid workflow mapping keys", async () => {
        const result = await lintWorkflow(
            [
                "name: CI",
                "on:",
                "  push:",
                "jobs:",
                "  build:",
                "    name: Build",
                "    runs-on: ubuntu-latest",
                "    strategy:",
                "      retry: 2",
            ].join("\n"),
            {
                rules: {
                    "github-actions/no-invalid-key": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
        expect(result.messages[0]?.ruleId).toBe(
            "github-actions/no-invalid-key"
        );
    });

    it("accepts valid workflow mapping keys across jobs, steps, and services", async () => {
        const result = await lintWorkflow(
            [
                "name: CI",
                "on:",
                "  push:",
                "jobs:",
                "  build:",
                "    name: Build",
                "    runs-on: ubuntu-latest",
                "    strategy:",
                "      fail-fast: true",
                "      matrix:",
                "        node: [20]",
                "    container:",
                "      image: node:20",
                "      options: --user 1001",
                "    services:",
                "      redis:",
                "        image: redis:7",
                "        ports:",
                "          - 6379:6379",
                "    steps:",
                "      - name: Checkout",
                "        uses: actions/checkout@692973e3d937129bcbf40652eb9f2f61becf3332",
                "      - name: Test",
                "        run: npm test",
            ].join("\n"),
            {
                rules: {
                    "github-actions/no-invalid-key": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(0);
    });

    it("reports top-level workflow permissions", async () => {
        const result = await lintWorkflow(
            [
                "name: CI",
                "on:",
                "  push:",
                "permissions:",
                "  contents: read",
                "jobs:",
                "  build:",
                "    permissions:",
                "      contents: read",
                "    runs-on: ubuntu-latest",
            ].join("\n"),
            {
                rules: {
                    "github-actions/no-top-level-permissions": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
        expect(result.messages[0]?.ruleId).toBe(
            "github-actions/no-top-level-permissions"
        );
    });

    it("reports jobs that explicitly disable fail-fast", async () => {
        const result = await lintWorkflow(
            [
                "name: CI",
                "on:",
                "  push:",
                "jobs:",
                "  test:",
                "    name: Test",
                "    runs-on: ubuntu-latest",
                "    strategy:",
                "      fail-fast: false",
                "      matrix:",
                "        node: [20, 22]",
            ].join("\n"),
            {
                rules: {
                    "github-actions/prefer-fail-fast": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
        expect(result.messages[0]?.ruleId).toBe(
            "github-actions/prefer-fail-fast"
        );
    });
});
