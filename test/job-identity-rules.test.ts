import { describe, expect, it } from "vitest";

import { lintWorkflow } from "./_shared/lint-workflow.js";

describe("job identity rules", () => {
    it("reports job ids that do not match the configured casing", async () => {
        const result = await lintWorkflow(
            [
                "name: CI",
                "on:",
                "  push:",
                "jobs:",
                "  BuildApp:",
                "    runs-on: ubuntu-latest",
                "    name: Build App",
            ].join("\n"),
            {
                rules: {
                    "github-actions/job-id-casing": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
        expect(result.messages[0]?.ruleId).toBe("github-actions/job-id-casing");
    });

    it("requires every job to declare a name", async () => {
        const result = await lintWorkflow(
            [
                "name: CI",
                "on:",
                "  push:",
                "jobs:",
                "  build:",
                "    runs-on: ubuntu-latest",
            ].join("\n"),
            {
                rules: {
                    "github-actions/require-job-name": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
        expect(result.messages[0]?.ruleId).toBe(
            "github-actions/require-job-name"
        );
    });

    it("requires every job step to declare a name", async () => {
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
                "      - run: npm test",
            ].join("\n"),
            {
                rules: {
                    "github-actions/require-job-step-name": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
        expect(result.messages[0]?.ruleId).toBe(
            "github-actions/require-job-step-name"
        );
    });

    it("reports workflows that exceed the configured job limit", async () => {
        const result = await lintWorkflow(
            [
                "name: CI",
                "on:",
                "  push:",
                "jobs:",
                "  one:",
                "    name: One",
                "    runs-on: ubuntu-latest",
                "  two:",
                "    name: Two",
                "    runs-on: ubuntu-latest",
                "  three:",
                "    name: Three",
                "    runs-on: ubuntu-latest",
                "  four:",
                "    name: Four",
                "    runs-on: ubuntu-latest",
            ].join("\n"),
            {
                rules: {
                    "github-actions/max-jobs-per-action": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
        expect(result.messages[0]?.ruleId).toBe(
            "github-actions/max-jobs-per-action"
        );
    });
});
