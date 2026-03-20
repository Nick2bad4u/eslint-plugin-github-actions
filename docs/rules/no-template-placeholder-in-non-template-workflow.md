# no-template-placeholder-in-non-template-workflow

> **Rule catalog ID:** R069

## Targeted pattern scope

Regular workflow YAML files outside `workflow-templates/`.

## What this rule reports

Reports usage of `$default-branch` placeholder tokens.

## Why this rule exists

`$default-branch` is a template-only token and should not appear in normal workflow files.

## ❌ Incorrect

```yaml
on:
  push:
    branches:
      - $default-branch
```

## ✅ Correct

```yaml
on:
  push:
    branches:
      - main
```

## Further reading

- [https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations](https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations)
