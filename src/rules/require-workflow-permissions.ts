/**
 * @packageDocumentation
 * Require explicit GitHub token permissions at workflow or job scope.
 */
import type { Rule } from "eslint";

import type { GithubActionsRuleDocs } from "../_internal/rule-docs.js";
import {
    getMappingPair,
    getWorkflowJobs,
    getWorkflowRoot,
} from "../_internal/workflow-yaml.js";

/** Rule options for `require-workflow-permissions`. */
type RequireWorkflowPermissionsOptions = [
    {
        readonly allowJobLevelPermissions?: boolean;
    }?,
];

const rule: Rule.RuleModule = {
    meta: {
        docs: {
            configs: [
                "github-actions.configs.all",
                "github-actions.configs.recommended",
                "github-actions.configs.security",
                "github-actions.configs.strict",
            ],
            description:
                "Require explicit `permissions` to avoid relying on GitHub Actions' default token scope.",
            recommended: true,
            requiresTypeChecking: false,
            ruleId: "R001",
            ruleNumber: 1,
            url: "https://nick2bad4u.github.io/eslint-plugin-github-actions/docs/rules/require-workflow-permissions",
        } as GithubActionsRuleDocs,
        messages: {
            missingJobPermissions:
                "Job '{{jobId}}' is missing explicit `permissions`. Define workflow-level `permissions` or add `jobs.{{jobId}}.permissions`.",
            missingWorkflowPermissions:
                "Define explicit top-level `permissions` for this workflow, or configure job-level `permissions` for every job.",
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    allowJobLevelPermissions: {
                        type: "boolean",
                    },
                },
                type: "object",
            },
        ],
        type: "suggestion",
    },
    create(context) {
        const [options] = context.options as RequireWorkflowPermissionsOptions;
        const allowJobLevelPermissions =
            options?.allowJobLevelPermissions ?? true;

        return {
            Program() {
                const root = getWorkflowRoot(context);

                if (root == null) {
                    return;
                }

                if (getMappingPair(root, "permissions") !== null) {
                    return;
                }

                const jobs = getWorkflowJobs(root);

                if (!allowJobLevelPermissions) {
                    context.report({
                        messageId: "missingWorkflowPermissions",
                        node: root,
                    });

                    return;
                }

                if (jobs.length === 0) {
                    context.report({
                        messageId: "missingWorkflowPermissions",
                        node: root,
                    });

                    return;
                }

                for (const job of jobs) {
                    if (getMappingPair(job.mapping, "permissions") !== null) {
                        continue;
                    }

                    context.report({
                        data: {
                            jobId: job.id,
                        },
                        messageId: "missingJobPermissions",
                        node: job.idNode,
                    });
                }
            },
        };
    },
};

export default rule;
