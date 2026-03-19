# no-path-separators-in-template-icon-name

> **Rule catalog ID:** R064

## Targeted pattern scope

`iconName` in workflow-template properties metadata.

## What this rule reports

Reports `iconName` values containing `/` or `\\`.

## Why this rule exists

`iconName` should be a token, not a filesystem path.

## ❌ Incorrect

```json
{ "iconName": "icons/workflow" }
```

## ✅ Correct

```json
{ "iconName": "workflow" }
```

## Further reading

- <https://www.schemastore.org/github-workflow-template-properties.json>
