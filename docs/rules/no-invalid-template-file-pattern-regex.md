# no-invalid-template-file-pattern-regex

> **Rule catalog ID:** R059

## Targeted pattern scope

`filePatterns` entries in workflow-template properties metadata.

## What this rule reports

Reports regex strings that are syntactically invalid.

## Why this rule exists

Invalid regex values break template recommendation matching.

## ❌ Incorrect

```json
{ "filePatterns": ["(package.json$"] }
```

## ✅ Correct

```json
{ "filePatterns": ["package.json$", "^go\\.mod$"] }
```

## Further reading

- [https://www.schemastore.org/github-workflow-template-properties.json](https://www.schemastore.org/github-workflow-template-properties.json)
