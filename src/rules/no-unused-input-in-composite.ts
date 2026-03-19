/**
 * @packageDocumentation
 * Disallow declared inputs that are never used in a composite action.
 */
import type { Rule } from "eslint";

import { isActionMetadataFile } from "../_internal/lint-targets.js";
import {
    getMappingPair,
    getMappingValueAsMapping,
    getScalarStringValue,
    getWorkflowRoot,
} from "../_internal/workflow-yaml.js";
import { collectYamlStringScalars } from "../_internal/yaml-traversal.js";

/** Escape a string for safe interpolation into a regular expression. */
const escapeForRegexp = (value: string): string =>
    value.replaceAll(/[$()*+.?[\\\]^{|}]/g, String.raw`\$&`);

/** Rule implementation for unused composite input checks. */
const rule: Rule.RuleModule = {
    create(context) {
        return {
            Program() {
                if (!isActionMetadataFile(context.filename)) {
                    return;
                }

                const root = getWorkflowRoot(context);

                if (root === null) {
                    return;
                }

                const runsMapping = getMappingValueAsMapping(root, "runs");
                const inputsMapping = getMappingValueAsMapping(root, "inputs");

                if (runsMapping === null || inputsMapping === null) {
                    return;
                }

                const usingRuntime = getScalarStringValue(
                    getMappingPair(runsMapping, "using")?.value
                );

                if (usingRuntime !== "composite") {
                    return;
                }

                const allScalarValues = collectYamlStringScalars(runsMapping);
                const concatenatedValues = allScalarValues.join("\n");

                for (const inputPair of inputsMapping.pairs) {
                    const inputId = getScalarStringValue(inputPair.key);

                    if (inputId === null) {
                        continue;
                    }

                    const inputReferencePattern = new RegExp(
                        String.raw`inputs\.${escapeForRegexp(inputId)}(?:\b|[.[])`,
                        "u"
                    );

                    if (inputReferencePattern.test(concatenatedValues)) {
                        continue;
                    }

                    context.report({
                        data: {
                            inputId,
                        },
                        messageId: "unusedCompositeInput",
                        node: inputPair.key as unknown as Rule.Node,
                    });
                }
            },
        };
    },
    meta: {
        docs: {
            configs: [
                "github-actions.configs.actionMetadata",
                "github-actions.configs.all",
            ],
            description:
                "disallow declared composite-action inputs that are never referenced.",
            recommended: false,
            requiresTypeChecking: false,
            ruleId: "R053",
            ruleNumber: 53,
            url: "https://nick2bad4u.github.io/eslint-plugin-github-actions/docs/rules/no-unused-input-in-composite",
        },
        messages: {
            unusedCompositeInput:
                "Composite action input '{{inputId}}' is declared but never referenced via `inputs.{{inputId}}`.",
        },
        schema: [],
        type: "suggestion",
    } as Rule.RuleMetaData,
};

export default rule;
