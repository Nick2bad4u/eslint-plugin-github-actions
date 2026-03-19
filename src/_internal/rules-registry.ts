/**
 * @packageDocumentation
 * Central rule registry for eslint-plugin-github-actions.
 */
import type { Rule } from "eslint";

import actionNameCasing from "../rules/action-name-casing.js";
import jobIdCasing from "../rules/job-id-casing.js";
import maxJobsPerAction from "../rules/max-jobs-per-action.js";
import noExternalJob from "../rules/no-external-job.js";
import noInvalidKey from "../rules/no-invalid-key.js";
import noTopLevelEnv from "../rules/no-top-level-env.js";
import noTopLevelPermissions from "../rules/no-top-level-permissions.js";
import pinActionShas from "../rules/pin-action-shas.js";
import preferFailFast from "../rules/prefer-fail-fast.js";
import preferFileExtension from "../rules/prefer-file-extension.js";
import preferStepUsesStyle from "../rules/prefer-step-uses-style.js";
import requireActionName from "../rules/require-action-name.js";
import requireActionRunName from "../rules/require-action-run-name.js";
import requireJobName from "../rules/require-job-name.js";
import requireJobStepName from "../rules/require-job-step-name.js";
import requireJobTimeoutMinutes from "../rules/require-job-timeout-minutes.js";
import requireWorkflowConcurrency from "../rules/require-workflow-concurrency.js";
import requireWorkflowPermissions from "../rules/require-workflow-permissions.js";
import validTimeoutMinutes from "../rules/valid-timeout-minutes.js";
import validTriggerEvents from "../rules/valid-trigger-events.js";

/** Strongly typed plugin rule registry keyed by unqualified rule name. */
const githubActionsRulesDefinition: {
    readonly "action-name-casing": typeof actionNameCasing;
    readonly "job-id-casing": typeof jobIdCasing;
    readonly "max-jobs-per-action": typeof maxJobsPerAction;
    readonly "no-external-job": typeof noExternalJob;
    readonly "no-invalid-key": typeof noInvalidKey;
    readonly "no-top-level-env": typeof noTopLevelEnv;
    readonly "no-top-level-permissions": typeof noTopLevelPermissions;
    readonly "pin-action-shas": typeof pinActionShas;
    readonly "prefer-fail-fast": typeof preferFailFast;
    readonly "prefer-file-extension": typeof preferFileExtension;
    readonly "prefer-step-uses-style": typeof preferStepUsesStyle;
    readonly "require-action-name": typeof requireActionName;
    readonly "require-action-run-name": typeof requireActionRunName;
    readonly "require-job-name": typeof requireJobName;
    readonly "require-job-step-name": typeof requireJobStepName;
    readonly "require-job-timeout-minutes": typeof requireJobTimeoutMinutes;
    readonly "require-workflow-concurrency": typeof requireWorkflowConcurrency;
    readonly "require-workflow-permissions": typeof requireWorkflowPermissions;
    readonly "valid-timeout-minutes": typeof validTimeoutMinutes;
    readonly "valid-trigger-events": typeof validTriggerEvents;
} = {
    "action-name-casing": actionNameCasing,
    "job-id-casing": jobIdCasing,
    "max-jobs-per-action": maxJobsPerAction,
    "no-external-job": noExternalJob,
    "no-invalid-key": noInvalidKey,
    "no-top-level-env": noTopLevelEnv,
    "no-top-level-permissions": noTopLevelPermissions,
    "pin-action-shas": pinActionShas,
    "prefer-fail-fast": preferFailFast,
    "prefer-file-extension": preferFileExtension,
    "prefer-step-uses-style": preferStepUsesStyle,
    "require-action-name": requireActionName,
    "require-action-run-name": requireActionRunName,
    "require-job-name": requireJobName,
    "require-job-step-name": requireJobStepName,
    "require-job-timeout-minutes": requireJobTimeoutMinutes,
    "require-workflow-concurrency": requireWorkflowConcurrency,
    "require-workflow-permissions": requireWorkflowPermissions,
    "valid-timeout-minutes": validTimeoutMinutes,
    "valid-trigger-events": validTriggerEvents,
} satisfies Record<string, Rule.RuleModule>;

/** Strongly typed plugin rule registry keyed by unqualified rule name. */
export const githubActionsRules: typeof githubActionsRulesDefinition =
    githubActionsRulesDefinition;
