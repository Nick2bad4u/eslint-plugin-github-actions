# Rule overview

`eslint-plugin-github-actions` currently targets GitHub Actions workflow YAML files under `.github/workflows/`.

## Included rule categories

- **Security**: explicit permissions and immutable SHA pinning
- **Reliability**: bounded job timeouts
- **Operations**: workflow concurrency controls
- **Naming and readability**: workflow names, job IDs, job names, and step names

## Current rules

- [`require-workflow-permissions`](./require-workflow-permissions.md)
- [`require-job-timeout-minutes`](./require-job-timeout-minutes.md)
- [`pin-action-shas`](./pin-action-shas.md)
- [`require-workflow-concurrency`](./require-workflow-concurrency.md)
- [`action-name-casing`](./action-name-casing.md)
- [`job-id-casing`](./job-id-casing.md)
- [`max-jobs-per-action`](./max-jobs-per-action.md)
- [`no-external-job`](./no-external-job.md)
- [`no-invalid-key`](./no-invalid-key.md)
- [`no-top-level-env`](./no-top-level-env.md)
- [`no-top-level-permissions`](./no-top-level-permissions.md)
- [`prefer-fail-fast`](./prefer-fail-fast.md)
- [`prefer-file-extension`](./prefer-file-extension.md)
- [`prefer-step-uses-style`](./prefer-step-uses-style.md)
- [`require-action-name`](./require-action-name.md)
- [`require-action-run-name`](./require-action-run-name.md)
- [`require-job-name`](./require-job-name.md)
- [`require-job-step-name`](./require-job-step-name.md)
- [`valid-timeout-minutes`](./valid-timeout-minutes.md)
- [`valid-trigger-events`](./valid-trigger-events.md)
