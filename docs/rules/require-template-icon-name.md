# require-template-icon-name

> **Rule catalog ID:** R056

## Targeted pattern scope

Workflow-template metadata `iconName` property.

## What this rule reports

Reports metadata files missing `iconName` or setting it to an empty value.

## Why this rule exists

An icon improves template discoverability and chooser UX.

## ❌ Incorrect

```json
{ "name": "CI", "description": "Template" }
```

## ✅ Correct

```json
{ "name": "CI", "description": "Template", "iconName": "workflow" }
```

## Further reading

- <https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations#metadata-file-requirements>
