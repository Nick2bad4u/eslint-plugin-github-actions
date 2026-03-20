# prefer-template-yml-extension

> **Rule catalog ID:** R066

## Targeted pattern scope

Workflow template YAML filenames under `workflow-templates/`.

## What this rule reports

Reports template files that use `.yaml` instead of `.yml`.

## Why this rule exists

Consistent file extensions improve discoverability and repository conventions.

## ❌ Incorrect

```text
workflow-templates/ci.yaml
```

## ✅ Correct

```text
workflow-templates/ci.yml
```

## Further reading

- [https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations](https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations)
