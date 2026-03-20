# require-workflow-template-pair

> **Rule catalog ID:** R054

## Targeted pattern scope

Workflow template YAML files under `workflow-templates/`.

## What this rule reports

Reports template YAML files without matching `.properties.json` metadata files.

## Why this rule exists

Template metadata is required for correct template presentation in the workflow chooser.

## ❌ Incorrect

```text
workflow-templates/ci.yml
```

## ✅ Correct

```text
workflow-templates/ci.yml
workflow-templates/ci.properties.json
```

## Further reading

- [https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations#metadata-file-requirements](https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations#metadata-file-requirements)
