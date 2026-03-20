# no-empty-template-file-pattern

> **Rule catalog ID:** R060

## Targeted pattern scope

`filePatterns` entries in `workflow-templates/*.properties.json` files.

## What this rule reports

Reports entries that are empty or whitespace-only strings.

## Why this rule exists

Template matching requires meaningful regex patterns.

## ❌ Incorrect

```json
{ "filePatterns": ["   "] }
```

## ✅ Correct

```json
{ "filePatterns": ["package.json$"] }
```

## Further reading

- [https://www.schemastore.org/github-workflow-template-properties.json](https://www.schemastore.org/github-workflow-template-properties.json)
