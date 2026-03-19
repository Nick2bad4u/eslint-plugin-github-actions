# Rule overview

`eslint-plugin-github-actions` currently targets GitHub Actions workflow YAML files under `.github/workflows/`.

## Included rule categories

- **Security**: explicit permissions and immutable SHA pinning
- **Reliability**: bounded job timeouts
- **Operations**: workflow concurrency controls

## Current rules

- [`require-workflow-permissions`](./require-workflow-permissions.md)
- [`require-job-timeout-minutes`](./require-job-timeout-minutes.md)
- [`pin-action-shas`](./pin-action-shas.md)
- [`require-workflow-concurrency`](./require-workflow-concurrency.md)
