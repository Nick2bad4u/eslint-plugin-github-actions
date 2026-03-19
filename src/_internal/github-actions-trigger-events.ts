/**
 * @packageDocumentation
 * Current GitHub Actions workflow trigger events from the public docs.
 */

/**
 * Valid workflow trigger events documented by GitHub.
 *
 * @see https://docs.github.com/en/actions/reference/events-that-trigger-workflows
 */
export const githubActionsTriggerEvents = [
    "branch_protection_rule",
    "check_run",
    "check_suite",
    "create",
    "delete",
    "deployment",
    "deployment_status",
    "discussion",
    "discussion_comment",
    "fork",
    "gollum",
    "image_version",
    "issue_comment",
    "issues",
    "label",
    "merge_group",
    "milestone",
    "page_build",
    "public",
    "pull_request",
    "pull_request_review",
    "pull_request_review_comment",
    "pull_request_target",
    "push",
    "registry_package",
    "release",
    "repository_dispatch",
    "schedule",
    "status",
    "watch",
    "workflow_call",
    "workflow_dispatch",
    "workflow_run",
] as const;

/** Constant-time lookup set for validating trigger-event names. */
export const githubActionsTriggerEventSet: ReadonlySet<string> = new Set(
    githubActionsTriggerEvents
);
