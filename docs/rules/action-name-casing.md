# action-name-casing

> **Rule catalog ID:** R009

## Targeted pattern scope

GitHub Actions workflow YAML files that declare a top-level `name`.

## What this rule reports

This rule reports workflow `name` values whose casing does not match the configured naming convention.

## Why this rule exists

Consistent workflow names make Actions tabs, status checks, and release dashboards easier to scan. Teams that standardize naming conventions can search and review workflow runs more quickly.

## ❌ Incorrect

```yaml
name: releasePipeline
```

## ✅ Correct

```yaml
name: Release Pipeline
```

```yaml
name: release-pipeline
```

_The second example is valid when the rule is configured for `kebab-case`._

## Further reading

- [https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#name](https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#name)
- [https://docs.github.com/actions/monitoring-and-troubleshooting-workflows/using-workflow-run-logs](https://docs.github.com/actions/monitoring-and-troubleshooting-workflows/using-workflow-run-logs)
