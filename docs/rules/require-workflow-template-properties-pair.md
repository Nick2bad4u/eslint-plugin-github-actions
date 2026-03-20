# require-workflow-template-properties-pair

> **Rule catalog ID:** R055

## Targeted pattern scope

Workflow-template metadata files ending with `.properties.json`.

## What this rule reports

Reports metadata files that do not have matching `.yml`/`.yaml` template workflow files.

## Why this rule exists

Orphan metadata files are dead configuration and mislead maintainers.

## ❌ Incorrect

```text
workflow-templates/ci.properties.json
```

## ✅ Correct

```text
workflow-templates/ci.properties.json
workflow-templates/ci.yml
```

## Further reading

- [https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations#metadata-file-requirements](https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations#metadata-file-requirements)
