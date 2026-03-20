# require-template-file-patterns

> **Rule catalog ID:** R058

## Targeted pattern scope

Workflow-template metadata `filePatterns` property.

## What this rule reports

Reports missing or empty `filePatterns` arrays.

## Why this rule exists

File patterns help GitHub suggest relevant templates for repository contents.

## ❌ Incorrect

```json
{ "name": "CI", "description": "Template", "iconName": "workflow" }
```

## ✅ Correct

```json
{
  "name": "CI",
  "description": "Template",
  "iconName": "workflow",
  "categories": ["JavaScript"],
  "filePatterns": ["package.json$"]
}
```

## Further reading

- [https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations#metadata-file-requirements](https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations#metadata-file-requirements)
