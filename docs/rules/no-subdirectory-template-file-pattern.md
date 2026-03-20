# no-subdirectory-template-file-pattern

> **Rule catalog ID:** R062

## Targeted pattern scope

`filePatterns` entries in workflow-template properties metadata.

## What this rule reports

Reports patterns containing path separators that target subdirectories.

## Why this rule exists

Workflow-template `filePatterns` are intended to match repository-root indicators.

## ❌ Incorrect

```json
{ "filePatterns": ["^src/package.json$"] }
```

## ✅ Correct

```json
{ "filePatterns": ["^package.json$", "^go\\.mod$"] }
```

## Further reading

- [https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations#metadata-file-requirements](https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations#metadata-file-requirements)
