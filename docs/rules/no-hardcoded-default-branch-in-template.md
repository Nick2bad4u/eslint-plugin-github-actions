# no-hardcoded-default-branch-in-template

> **Rule catalog ID:** R068

## Targeted pattern scope

Workflow template YAML files under `workflow-templates/`.

## What this rule reports

Reports hardcoded `main` and `master` branch literals.

## Why this rule exists

Template workflows should use `$default-branch` so generated workflows match the target repository.

## ❌ Incorrect

```yaml
on:
  push:
    branches:
      - main
```

## ✅ Correct

```yaml
on:
  push:
    branches:
      - $default-branch
```

## Further reading

- [https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations](https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations)
