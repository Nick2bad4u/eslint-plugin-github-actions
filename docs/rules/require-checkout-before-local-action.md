# require-checkout-before-local-action

> **Rule catalog ID:** R025

## Targeted pattern scope

GitHub Actions workflow YAML files that use repository-local step actions with `uses: ./...`.

## What this rule reports

This rule reports step-level local action references that appear before any `actions/checkout` step in the same job.

## Why this rule exists

GitHub's workflow syntax requires checking out the repository before using a local action path. Without that checkout step, the action directory does not exist in the workspace and the workflow will fail at runtime.

## ❌ Incorrect

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: ./.github/actions/setup-project
```

## ✅ Correct

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: ./.github/actions/setup-project
```

## Further reading

- [https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstepsuses](https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstepsuses)
