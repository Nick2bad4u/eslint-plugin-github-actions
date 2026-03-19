import { describe, expect, it } from "vitest";

import { lintWorkflow } from "./_shared/lint-workflow.js";

describe("action metadata rules", () => {
    it("prefers action.yml over action.yaml", async () => {
        const result = await lintWorkflow(
            [
                "name: Example",
                "description: Example action",
                "runs:",
                "  using: composite",
                "  steps:",
                "    - run: echo hi",
                "      shell: bash",
            ].join("\n"),
            {
                configName: "actionMetadata",
                filePath: ".github/actions/example/action.yaml",
                rules: {
                    "github-actions/prefer-action-yml": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
    });

    it("reports deprecated node runtimes", async () => {
        const result = await lintWorkflow(
            [
                "name: Example",
                "description: Example action",
                "runs:",
                "  using: node16",
                "  main: dist/index.js",
            ].join("\n"),
            {
                configName: "actionMetadata",
                filePath: ".github/actions/example/action.yml",
                rules: {
                    "github-actions/no-deprecated-node-runtime": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
    });

    it("reports pre-if without pre", async () => {
        const result = await lintWorkflow(
            [
                "name: Example",
                "description: Example action",
                "runs:",
                "  using: node20",
                "  main: dist/index.js",
                "  pre-if: runner.os == 'Linux'",
            ].join("\n"),
            {
                configName: "actionMetadata",
                filePath: ".github/actions/example/action.yml",
                rules: {
                    "github-actions/no-pre-if-without-pre": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
    });

    it("reports post-if without post", async () => {
        const result = await lintWorkflow(
            [
                "name: Example",
                "description: Example action",
                "runs:",
                "  using: node20",
                "  main: dist/index.js",
                "  post-if: runner.os == 'Linux'",
            ].join("\n"),
            {
                configName: "actionMetadata",
                filePath: ".github/actions/example/action.yml",
                rules: {
                    "github-actions/no-post-if-without-post": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
    });

    it("reports required inputs with defaults", async () => {
        const result = await lintWorkflow(
            [
                "name: Example",
                "description: Example action",
                "inputs:",
                "  token:",
                "    description: API token",
                "    required: true",
                "    default: abc",
                "runs:",
                "  using: composite",
                "  steps:",
                "    - run: echo hi",
                "      shell: bash",
            ].join("\n"),
            {
                configName: "actionMetadata",
                filePath: ".github/actions/example/action.yml",
                rules: {
                    "github-actions/no-required-input-with-default": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
    });

    it("reports case-insensitive input collisions", async () => {
        const result = await lintWorkflow(
            [
                "name: Example",
                "description: Example action",
                "inputs:",
                "  Token:",
                "    description: token",
                "  token:",
                "    description: token override",
                "runs:",
                "  using: composite",
                "  steps:",
                "    - run: echo hi",
                "      shell: bash",
            ].join("\n"),
            {
                configName: "actionMetadata",
                filePath: ".github/actions/example/action.yml",
                rules: {
                    "github-actions/no-case-insensitive-input-id-collision":
                        "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
    });

    it("reports INPUT_* env access in composite runs", async () => {
        const result = await lintWorkflow(
            [
                "name: Example",
                "description: Example action",
                "inputs:",
                "  token:",
                "    description: token",
                "runs:",
                "  using: composite",
                "  steps:",
                "    - run: echo $INPUT_TOKEN",
                "      shell: bash",
            ].join("\n"),
            {
                configName: "actionMetadata",
                filePath: ".github/actions/example/action.yml",
                rules: {
                    "github-actions/no-composite-input-env-access": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
    });

    it("reports unknown composite input references", async () => {
        const unknownInputExpression = `${String.fromCodePoint(36, 123, 123)} inputs.missing }}`;

        const result = await lintWorkflow(
            [
                "name: Example",
                "description: Example action",
                "inputs:",
                "  token:",
                "    description: token",
                "runs:",
                "  using: composite",
                "  steps:",
                `    - run: echo ${unknownInputExpression}`,
                "      shell: bash",
            ].join("\n"),
            {
                configName: "actionMetadata",
                filePath: ".github/actions/example/action.yml",
                rules: {
                    "github-actions/no-unknown-input-reference-in-composite":
                        "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
    });

    it("reports unused composite inputs", async () => {
        const result = await lintWorkflow(
            [
                "name: Example",
                "description: Example action",
                "inputs:",
                "  token:",
                "    description: token",
                "runs:",
                "  using: composite",
                "  steps:",
                "    - run: echo hi",
                "      shell: bash",
            ].join("\n"),
            {
                configName: "actionMetadata",
                filePath: ".github/actions/example/action.yml",
                rules: {
                    "github-actions/no-unused-input-in-composite": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
    });

    it("reports duplicate composite step ids", async () => {
        const result = await lintWorkflow(
            [
                "name: Example",
                "description: Example action",
                "runs:",
                "  using: composite",
                "  steps:",
                "    - id: setup",
                "      run: echo setup",
                "      shell: bash",
                "    - id: setup",
                "      run: echo setup 2",
                "      shell: bash",
            ].join("\n"),
            {
                configName: "actionMetadata",
                filePath: ".github/actions/example/action.yml",
                rules: {
                    "github-actions/no-duplicate-composite-step-id": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
    });

    it("requires names on composite steps", async () => {
        const result = await lintWorkflow(
            [
                "name: Example",
                "description: Example action",
                "runs:",
                "  using: composite",
                "  steps:",
                "    - run: echo hi",
                "      shell: bash",
            ].join("\n"),
            {
                configName: "actionMetadata",
                filePath: ".github/actions/example/action.yml",
                rules: {
                    "github-actions/require-composite-step-name": "error",
                },
            }
        );

        expect(result.messages).toHaveLength(1);
    });
});
