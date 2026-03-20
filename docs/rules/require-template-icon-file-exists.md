# require-template-icon-file-exists

> **Rule catalog ID:** R065

## Targeted pattern scope

Workflow-template properties `iconName` values that refer to local SVG icons.

## What this rule reports

Reports local `iconName` values that do not resolve to an existing `*.svg` file.

## Why this rule exists

Broken icon references degrade workflow-template UX.

## ❌ Incorrect

```json
{ "iconName": "workflow" }
```

If `workflow.svg` does not exist next to the metadata file, this is reported.

## ✅ Correct

```json
{ "iconName": "workflow" }
```

With `workflow.svg` present in the same directory.

## Further reading

- [https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations#metadata-file-requirements](https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations#metadata-file-requirements)
