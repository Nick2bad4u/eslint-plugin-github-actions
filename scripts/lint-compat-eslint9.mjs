#!/usr/bin/env node
// @ts-nocheck

/**
 * @packageDocumentation
 * ESLint 9 compatibility smoke checks for eslint-plugin-github-actions presets.
 */

import { ESLint } from "eslint";
import builtPlugin from "../dist/plugin.js";

/** Parse `--expect-eslint-major=&lt;n>` (or split form) from CLI args. */
const parseExpectedEslintMajor = () => {
    const cliArgs = process.argv.slice(2);

    for (let index = 0; index < cliArgs.length; index += 1) {
        const argument = cliArgs[index];

        if (argument === "--expect-eslint-major") {
            const nextValue = cliArgs[index + 1];

            if (nextValue === undefined) {
                throw new TypeError(
                    "Expected a numeric value after --expect-eslint-major"
                );
            }

            const parsedValue = Number.parseInt(nextValue, 10);

            if (!Number.isFinite(parsedValue)) {
                throw new TypeError(
                    `Invalid --expect-eslint-major value '${nextValue}'`
                );
            }

            return parsedValue;
        }

        if (!argument.startsWith("--expect-eslint-major=")) {
            continue;
        }

        const parsedValue = Number.parseInt(
            argument.slice("--expect-eslint-major=".length),
            10
        );

        if (!Number.isFinite(parsedValue)) {
            throw new TypeError(
                `Invalid --expect-eslint-major value '${argument}'`
            );
        }

        return parsedValue;
    }

    return undefined;
};

/** Read major version number from current ESLint runtime. */
const getEslintMajorVersion = () => {
    const [majorToken] = ESLint.version.split(".");
    const parsedMajor = Number.parseInt(majorToken ?? "", 10);

    if (!Number.isFinite(parsedMajor)) {
        throw new TypeError(
            `Unable to parse ESLint major version from '${ESLint.version}'`
        );
    }

    return parsedMajor;
};

/** Verify one preset/rule/file combination lint-runs and reports expected rule. */
const runSmokeCase = async (plugin, smokeCase) => {
    const baseConfig = plugin.configs[smokeCase.configName];

    if (baseConfig === undefined) {
        throw new TypeError(
            `Missing plugin config '${smokeCase.configName}' required by smoke case '${smokeCase.name}'`
        );
    }

    const eslint = new ESLint({
        overrideConfig: [
            {
                ...baseConfig,
                rules: {
                    [smokeCase.ruleId]: "error",
                },
            },
        ],
        overrideConfigFile: true,
    });

    const [result] = await eslint.lintText(smokeCase.code, {
        filePath: smokeCase.filePath,
    });

    if (result === undefined) {
        throw new TypeError(
            `ESLint did not return a result for smoke case '${smokeCase.name}'`
        );
    }

    const matchedExpectedRule = result.messages.some(
        (message) => message.ruleId === smokeCase.ruleId
    );

    if (!matchedExpectedRule) {
        const observedRuleIds = result.messages
            .map((message) => message.ruleId ?? "<unknown>")
            .join(", ");

        throw new TypeError(
            `Smoke case '${smokeCase.name}' did not report '${smokeCase.ruleId}'. Observed: [${observedRuleIds}]`
        );
    }

    console.log(`✓ ${smokeCase.name}`);
};

const main = async () => {
    const expectedEslintMajor = parseExpectedEslintMajor();
    const detectedEslintMajor = getEslintMajorVersion();

    if (
        expectedEslintMajor !== undefined &&
        expectedEslintMajor !== detectedEslintMajor
    ) {
        throw new TypeError(
            `Expected ESLint major ${expectedEslintMajor}, but detected ${detectedEslintMajor} (${ESLint.version}).`
        );
    }

    const plugin = builtPlugin;

    if (plugin === undefined || plugin === null) {
        throw new TypeError(
            "Failed to load built plugin export from dist/plugin.js"
        );
    }

    const smokeCases = [
        {
            code: [
                "name: CI",
                "on:",
                "  push:",
                "    branches: [$default-branch]",
            ].join("\n"),
            configName: "recommended",
            filePath: ".github/workflows/compat.yml",
            name: "recommended preset / workflow placeholder guard",
            ruleId: "github-actions/no-template-placeholder-in-non-template-workflow",
        },
        {
            code: [
                "name: Composite Action",
                "inputs:",
                "  token:",
                "    description: test token",
                "runs:",
                "  using: composite",
                "  steps:",
                "    - run: echo $INPUT_TOKEN",
                "      shell: bash",
            ].join("\n"),
            configName: "actionMetadata",
            filePath: ".github/actions/compat/action.yml",
            name: "actionMetadata preset / composite input env guard",
            ruleId: "github-actions/no-composite-input-env-access",
        },
        {
            code: [
                "{",
                '  "name": "Template",',
                '  "description": "Compatibility smoke check",',
                '  "iconName": "workflow",',
                '  "categories": ["JavaScript"],',
                '  "filePatterns": ["  "]',
                "}",
            ].join("\n"),
            configName: "workflowTemplateProperties",
            filePath: ".github/workflow-templates/compat.properties.json",
            name: "workflowTemplateProperties preset / empty pattern guard",
            ruleId: "github-actions/no-empty-template-file-pattern",
        },
        {
            code: [
                "name: Workflow Template",
                "on:",
                "  push:",
                "    branches: [$default-branch]",
            ].join("\n"),
            configName: "workflowTemplates",
            filePath: ".github/workflow-templates/compat-smoke.yml",
            name: "workflowTemplates preset / pair requirement",
            ruleId: "github-actions/require-workflow-template-pair",
        },
    ];

    console.log(`Detected ESLint runtime: ${ESLint.version}`);

    for (const smokeCase of smokeCases) {
        await runSmokeCase(plugin, smokeCase);
    }

    console.log("ESLint 9 compatibility smoke checks passed.");
};

try {
    await main();
} catch (error) {
    console.error("ESLint 9 compatibility smoke checks failed:", error);
    process.exitCode = 1;
}
