# require-template-categories

> **Rule catalog ID:** R057

## Targeted pattern scope

Workflow-template metadata `categories` property.

## What this rule reports

Reports missing or empty `categories` arrays.

## Why this rule exists

Categories improve filterability and ranking in the workflow template chooser.

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
  "categories": ["JavaScript"]
}
```

## Further reading

- <https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations#metadata-file-requirements>
