# require-workflow-dispatch-input-type

> **Rule catalog ID:** R022

## Targeted pattern scope

GitHub Actions workflow YAML files that define `on.workflow_dispatch.inputs`.

## What this rule reports

This rule reports manual-dispatch inputs that omit `type` or set `type` to an empty or non-string value.

## Why this rule exists

Explicit input types make manual workflows easier to use in the GitHub UI, preserve boolean and number semantics more reliably, and keep workflow interfaces self-documenting as they evolve.

## ❌ Incorrect

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: Deployment target
        required: true
```

## ✅ Correct

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: Deployment target
        required: true
        type: environment
```

## Further reading

- [https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#onworkflow_dispatchinputs](https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#onworkflow_dispatchinputs)
- [https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#onworkflow_dispatchinputsinput_idtype](https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#onworkflow_dispatchinputsinput_idtype)
- [https://docs.github.com/actions/reference/workflows-and-actions/contexts#inputs-context](https://docs.github.com/actions/reference/workflows-and-actions/contexts#inputs-context)
