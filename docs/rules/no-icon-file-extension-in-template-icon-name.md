# no-icon-file-extension-in-template-icon-name

> **Rule catalog ID:** R063

## Targeted pattern scope

`iconName` in workflow-template properties metadata.

## What this rule reports

Reports `iconName` values ending in `.svg`.

## Why this rule exists

Template icon names should be bare icon identifiers, not filenames with extensions.

## ❌ Incorrect

```json
{ "iconName": "workflow.svg" }
```

## ✅ Correct

```json
{ "iconName": "workflow" }
```

## Further reading

- <https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations#metadata-file-requirements>
