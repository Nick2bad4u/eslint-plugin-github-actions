# require-action-name

> **Rule catalog ID:** R005

## Targeted pattern scope

GitHub Actions workflow YAML files.

## What this rule reports

This rule reports workflows that omit the top-level `name` field or set it to a non-string or empty value.

## Why this rule exists

A workflow name is what most people see first in the Actions UI, run history, and status checks. Requiring it improves discoverability and reviewability.

## ❌ Incorrect

```yaml
on:
  push:
```

## ✅ Correct

```yaml
name: CI
on:
  push:
```

## Further reading

- <https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#name>
- <https://docs.github.com/actions/monitoring-and-troubleshooting-workflows/using-workflow-run-logs>
