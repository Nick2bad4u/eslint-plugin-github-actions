# valid-trigger-events

> **Rule catalog ID:** R018

## Targeted pattern scope

GitHub Actions workflow YAML files that declare trigger events under `on`.

## What this rule reports

This rule reports trigger event names that are not documented GitHub Actions workflow events.

## Why this rule exists

Mistyped trigger names silently break workflow intent. Validating events early prevents workflows from never running, or from running at the wrong time.

## ❌ Incorrect

```yaml
on:
  foo_bar:
```

## ✅ Correct

```yaml
on:
  push:
    branches:
      - main
```

## Further reading

- <https://docs.github.com/actions/reference/workflows-and-actions/events-that-trigger-workflows>
- <https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#on>
