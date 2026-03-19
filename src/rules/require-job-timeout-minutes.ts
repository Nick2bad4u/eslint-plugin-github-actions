/**
 * @packageDocumentation
 * Require bounded job timeouts for GitHub Actions jobs.
 */
import type { Rule } from "eslint";

import type { GithubActionsRuleDocs } from "../_internal/rule-docs.js";
import {
    getMappingPair,
    getScalarNumberValue,
    getWorkflowJobs,
    getWorkflowRoot,
    isGithubExpressionScalar,
} from "../_internal/workflow-yaml.js";

/** Rule options for `require-job-timeout-minutes`. */
type RequireJobTimeoutMinutesOptions = [
    {
        readonly maxMinutes?: number;
    }?,
];

/** Default upper bound used when validating workflow job timeouts. */
const DEFAULT_MAX_MINUTES = 60;

const rule: Rule.RuleModule = {
    meta: {
        docs: {
            configs: [
                "github-actions.configs.all",
                "github-actions.configs.recommended",
                "github-actions.configs.strict",
            ],
            description:
                "Require every non-reusable workflow job to define a bounded `timeout-minutes` value.",
            recommended: true,
            requiresTypeChecking: false,
            ruleId: "R002",
            ruleNumber: 2,
            url: "https://nick2bad4u.github.io/eslint-plugin-github-actions/docs/rules/require-job-timeout-minutes",
        } as GithubActionsRuleDocs,
        messages: {
            invalidTimeout:
                "Job '{{jobId}}' has an invalid `timeout-minutes` value. Use a positive integer or a GitHub expression.",
            missingTimeout:
                "Job '{{jobId}}' is missing `timeout-minutes`. Add an explicit timeout to prevent hung runners from waiting indefinitely.",
            timeoutTooLarge:
                "Job '{{jobId}}' sets `timeout-minutes` to {{actualMinutes}}, which exceeds the configured maximum of {{maxMinutes}}.",
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    maxMinutes: {
                        minimum: 1,
                        type: "integer",
                    },
                },
                type: "object",
            },
        ],
        type: "suggestion",
    },
    create(context) {
        const [options] = context.options as RequireJobTimeoutMinutesOptions;
        const maxMinutes = options?.maxMinutes ?? DEFAULT_MAX_MINUTES;

        return {
            Program() {
                const root = getWorkflowRoot(context);

                if (root == null) {
                    return;
                }

                for (const job of getWorkflowJobs(root)) {
                    if (getMappingPair(job.mapping, "uses") !== null) {
                        continue;
                    }

                    const timeoutPair = getMappingPair(
                        job.mapping,
                        "timeout-minutes"
                    );

                    if (timeoutPair == null) {
                        context.report({
                            data: {
                                jobId: job.id,
                            },
                            messageId: "missingTimeout",
                            node: job.idNode,
                        });

                        continue;
                    }

                    if (isGithubExpressionScalar(timeoutPair.value)) {
                        continue;
                    }

                    const timeoutMinutes = getScalarNumberValue(
                        timeoutPair.value
                    );

                    if (
                        timeoutMinutes === null ||
                        !Number.isInteger(timeoutMinutes) ||
                        timeoutMinutes <= 0
                    ) {
                        context.report({
                            data: {
                                jobId: job.id,
                            },
                            messageId: "invalidTimeout",
                            node: timeoutPair.value ?? timeoutPair,
                        });

                        continue;
                    }

                    if (timeoutMinutes > maxMinutes) {
                        context.report({
                            data: {
                                actualMinutes: String(timeoutMinutes),
                                jobId: job.id,
                                maxMinutes: String(maxMinutes),
                            },
                            messageId: "timeoutTooLarge",
                            node: timeoutPair.value ?? timeoutPair,
                        });
                    }
                }
            },
        };
    },
};

export default rule;
