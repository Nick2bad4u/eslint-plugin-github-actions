# require-action-run-name

> **Rule catalog ID:** R006

## Targeted pattern scope

GitHub Actions workflow YAML files.

## What this rule reports

This rule reports workflows that omit the top-level `run-name` field or set it to a non-string or empty value.

## Why this rule exists

A descriptive `run-name` helps distinguish workflow runs triggered from different branches, releases, or manual dispatches.

## ❌ Incorrect

```yaml
name: Release
on:
  workflow_dispatch:
```

## ✅ Correct

```yaml
name: Release
run-name: Release ${{ github.ref_name }}
on:
  workflow_dispatch:
```

## Further reading

- [https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#run-name](https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#run-name)
- [https://docs.github.com/actions/using-workflows/manually-running-a-workflow](https://docs.github.com/actions/using-workflows/manually-running-a-workflow)
