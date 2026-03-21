# Presets

The plugin exports seven flat-config presets:

- [`githubActions.configs.actionMetadata`](./action-metadata.md)
- [`githubActions.configs.workflowTemplateProperties`](./workflow-template-properties.md)
- [`githubActions.configs.workflowTemplates`](./workflow-templates.md)
- [`githubActions.configs.recommended`](./recommended.md)
- [`githubActions.configs.security`](./security.md)
- [`githubActions.configs.strict`](./strict.md)
- [`githubActions.configs.all`](./all.md)

These presets cover workflow YAML, action metadata (`action.yml` / `action.yaml`),
and workflow template package files (`workflow-templates/*.yml`, `*.yaml`, and
`*.properties.json`).

## How to choose

- Start with **recommended** for broad baseline quality and safety.
- Layer **security** for stronger supply-chain and permissions-focused checks.
- Use **strict** when you want high signal on operational consistency.
- Use **all** for complete rule coverage (best for internal policy repos).

Then review [getting started](../getting-started.md) and the full
[rule reference](../overview.md).

## Rule Matrix

| Rule | 🧩 actionMetadata | 🗂️ workflowTemplateProperties | 🧱 workflowTemplates | 🟡 recommended | 🛡️ security | 🔴 strict | 🟣 all |
| --- | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| [`action-name-casing`](../action-name-casing.md) | — | — | — | — | — | ✅ | ✅ |
| [`job-id-casing`](../job-id-casing.md) | — | — | — | — | — | ✅ | ✅ |
| [`max-jobs-per-action`](../max-jobs-per-action.md) | — | — | — | — | — | ✅ | ✅ |
| [`no-case-insensitive-input-id-collision`](../no-case-insensitive-input-id-collision.md) | ✅ | — | — | — | — | — | ✅ |
| [`no-composite-input-env-access`](../no-composite-input-env-access.md) | ✅ | — | — | — | — | — | ✅ |
| [`no-deprecated-node-runtime`](../no-deprecated-node-runtime.md) | ✅ | — | — | — | — | — | ✅ |
| [`no-duplicate-composite-step-id`](../no-duplicate-composite-step-id.md) | ✅ | — | — | — | — | — | ✅ |
| [`no-empty-template-file-pattern`](../no-empty-template-file-pattern.md) | — | ✅ | ✅ | — | — | — | ✅ |
| [`no-external-job`](../no-external-job.md) | — | — | — | — | — | ✅ | ✅ |
| [`no-hardcoded-default-branch-in-template`](../no-hardcoded-default-branch-in-template.md) | — | — | ✅ | — | — | — | ✅ |
| [`no-icon-file-extension-in-template-icon-name`](../no-icon-file-extension-in-template-icon-name.md) | — | ✅ | ✅ | — | — | — | ✅ |
| [`no-inherit-secrets`](../no-inherit-secrets.md) | — | — | — | — | ✅ | ✅ | ✅ |
| [`no-invalid-concurrency-context`](../no-invalid-concurrency-context.md) | — | — | — | ✅ | — | ✅ | ✅ |
| [`no-invalid-key`](../no-invalid-key.md) | — | — | — | ✅ | — | ✅ | ✅ |
| [`no-invalid-reusable-workflow-job-key`](../no-invalid-reusable-workflow-job-key.md) | — | — | — | ✅ | — | ✅ | ✅ |
| [`no-invalid-template-file-pattern-regex`](../no-invalid-template-file-pattern-regex.md) | — | ✅ | ✅ | — | — | — | ✅ |
| [`no-invalid-workflow-call-output-value`](../no-invalid-workflow-call-output-value.md) | — | — | — | ✅ | — | ✅ | ✅ |
| [`no-path-separators-in-template-icon-name`](../no-path-separators-in-template-icon-name.md) | — | ✅ | ✅ | — | — | — | ✅ |
| [`no-post-if-without-post`](../no-post-if-without-post.md) | ✅ | — | — | — | — | — | ✅ |
| [`no-pr-head-checkout-in-pull-request-target`](../no-pr-head-checkout-in-pull-request-target.md) | — | — | — | — | ✅ | ✅ | ✅ |
| [`no-pre-if-without-pre`](../no-pre-if-without-pre.md) | ✅ | — | — | — | — | — | ✅ |
| [`no-required-input-with-default`](../no-required-input-with-default.md) | ✅ | — | — | — | — | — | ✅ |
| [`no-secrets-in-if`](../no-secrets-in-if.md) | — | — | — | ✅ | ✅ | ✅ | ✅ |
| [`no-self-hosted-runner-on-fork-pr-events`](../no-self-hosted-runner-on-fork-pr-events.md) | — | — | — | — | ✅ | ✅ | ✅ |
| [`no-subdirectory-template-file-pattern`](../no-subdirectory-template-file-pattern.md) | — | ✅ | ✅ | — | — | — | ✅ |
| [`no-template-placeholder-in-non-template-workflow`](../no-template-placeholder-in-non-template-workflow.md) | — | — | — | ✅ | — | ✅ | ✅ |
| [`no-top-level-env`](../no-top-level-env.md) | — | — | — | — | — | ✅ | ✅ |
| [`no-top-level-permissions`](../no-top-level-permissions.md) | — | — | — | — | — | — | ✅ |
| [`no-universal-template-file-pattern`](../no-universal-template-file-pattern.md) | — | ✅ | ✅ | — | — | — | ✅ |
| [`no-unknown-input-reference-in-composite`](../no-unknown-input-reference-in-composite.md) | ✅ | — | — | — | — | — | ✅ |
| [`no-unknown-job-output-reference`](../no-unknown-job-output-reference.md) | — | — | — | ✅ | — | ✅ | ✅ |
| [`no-unknown-step-reference`](../no-unknown-step-reference.md) | — | — | — | — | — | ✅ | ✅ |
| [`no-untrusted-input-in-run`](../no-untrusted-input-in-run.md) | — | — | — | — | ✅ | ✅ | ✅ |
| [`no-unused-input-in-composite`](../no-unused-input-in-composite.md) | ✅ | — | — | — | — | — | ✅ |
| [`no-write-all-permissions`](../no-write-all-permissions.md) | — | — | — | ✅ | ✅ | ✅ | ✅ |
| [`pin-action-shas`](../pin-action-shas.md) | — | — | — | — | ✅ | ✅ | ✅ |
| [`prefer-action-yml`](../prefer-action-yml.md) | ✅ | — | — | — | — | — | ✅ |
| [`prefer-fail-fast`](../prefer-fail-fast.md) | — | — | — | — | — | ✅ | ✅ |
| [`prefer-file-extension`](../prefer-file-extension.md) | — | — | — | ✅ | — | ✅ | ✅ |
| [`prefer-inputs-context`](../prefer-inputs-context.md) | — | — | — | ✅ | — | ✅ | ✅ |
| [`prefer-step-uses-style`](../prefer-step-uses-style.md) | — | — | — | — | — | — | ✅ |
| [`prefer-template-yml-extension`](../prefer-template-yml-extension.md) | — | — | ✅ | — | — | — | ✅ |
| [`require-action-name`](../require-action-name.md) | — | — | — | ✅ | — | ✅ | ✅ |
| [`require-action-run-name`](../require-action-run-name.md) | — | — | — | — | — | ✅ | ✅ |
| [`require-checkout-before-local-action`](../require-checkout-before-local-action.md) | — | — | — | ✅ | — | ✅ | ✅ |
| [`require-composite-step-name`](../require-composite-step-name.md) | ✅ | — | — | — | — | — | ✅ |
| [`require-job-name`](../require-job-name.md) | — | — | — | — | — | ✅ | ✅ |
| [`require-job-step-name`](../require-job-step-name.md) | — | — | — | — | — | ✅ | ✅ |
| [`require-job-timeout-minutes`](../require-job-timeout-minutes.md) | — | — | — | ✅ | — | ✅ | ✅ |
| [`require-merge-group-trigger`](../require-merge-group-trigger.md) | — | — | — | — | — | ✅ | ✅ |
| [`require-pull-request-target-branches`](../require-pull-request-target-branches.md) | — | — | — | — | ✅ | ✅ | ✅ |
| [`require-run-step-shell`](../require-run-step-shell.md) | — | — | — | — | — | ✅ | ✅ |
| [`require-template-categories`](../require-template-categories.md) | — | ✅ | ✅ | — | — | — | ✅ |
| [`require-template-file-patterns`](../require-template-file-patterns.md) | — | ✅ | ✅ | — | — | — | ✅ |
| [`require-template-icon-file-exists`](../require-template-icon-file-exists.md) | — | ✅ | ✅ | — | — | — | ✅ |
| [`require-template-icon-name`](../require-template-icon-name.md) | — | ✅ | ✅ | — | — | — | ✅ |
| [`require-template-workflow-name`](../require-template-workflow-name.md) | — | — | ✅ | — | — | — | ✅ |
| [`require-trigger-types`](../require-trigger-types.md) | — | — | — | — | — | ✅ | ✅ |
| [`require-workflow-call-input-type`](../require-workflow-call-input-type.md) | — | — | — | ✅ | — | ✅ | ✅ |
| [`require-workflow-call-output-value`](../require-workflow-call-output-value.md) | — | — | — | ✅ | — | ✅ | ✅ |
| [`require-workflow-concurrency`](../require-workflow-concurrency.md) | — | — | — | — | — | ✅ | ✅ |
| [`require-workflow-dispatch-input-type`](../require-workflow-dispatch-input-type.md) | — | — | — | ✅ | — | ✅ | ✅ |
| [`require-workflow-interface-description`](../require-workflow-interface-description.md) | — | — | — | — | — | ✅ | ✅ |
| [`require-workflow-permissions`](../require-workflow-permissions.md) | — | — | — | ✅ | ✅ | ✅ | ✅ |
| [`require-workflow-run-branches`](../require-workflow-run-branches.md) | — | — | — | — | ✅ | ✅ | ✅ |
| [`require-workflow-template-pair`](../require-workflow-template-pair.md) | — | — | ✅ | — | — | — | ✅ |
| [`require-workflow-template-properties-pair`](../require-workflow-template-properties-pair.md) | — | ✅ | ✅ | — | — | — | ✅ |
| [`valid-timeout-minutes`](../valid-timeout-minutes.md) | — | — | — | ✅ | — | ✅ | ✅ |
| [`valid-trigger-events`](../valid-trigger-events.md) | — | — | — | ✅ | — | ✅ | ✅ |

