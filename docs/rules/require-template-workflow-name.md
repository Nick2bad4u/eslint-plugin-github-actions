# require-template-workflow-name

> **Rule catalog ID:** R067

## Targeted pattern scope

Workflow template YAML files under `workflow-templates/`.

## What this rule reports

Reports missing or empty top-level `name` fields.

## Why this rule exists

Template names are primary labels shown in workflow selection UI.

## ❌ Incorrect

```yaml
on:
  push:
```

## ✅ Correct

```yaml
name: Node.js CI
on:
  push:
```

## Further reading

- <https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations>
