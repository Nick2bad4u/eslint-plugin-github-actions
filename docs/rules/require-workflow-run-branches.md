# require-workflow-run-branches

> **Rule catalog ID:** R028

## Targeted pattern scope

GitHub Actions workflow YAML files that use the `workflow_run` trigger.

## What this rule reports

This rule reports `on.workflow_run` triggers that do not declare a non-empty `branches` or `branches-ignore` filter.

## Why this rule exists

`workflow_run` is often used for follow-up workflows that have more privileges than the upstream workflow that triggered them. Requiring branch scoping keeps these follow-up workflows from reacting to every upstream branch indiscriminately and matches GitHub's documented trigger-filtering capabilities.

## ❌ Incorrect

```yaml
on:
  workflow_run:
    workflows: [CI]
    types: [completed]
```

## ✅ Correct

```yaml
on:
  workflow_run:
    workflows: [CI]
    types: [completed]
    branches:
      - main
```

## Further reading

- [https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#onworkflow_runbranchesbranches-ignore](https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#onworkflow_runbranchesbranches-ignore)
- [https://wellarchitected.github.com/library/application-security/recommendations/actions-security/](https://wellarchitected.github.com/library/application-security/recommendations/actions-security/)
