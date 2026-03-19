# require-workflow-interface-description

> **Rule catalog ID:** R024

## Targeted pattern scope

GitHub Actions workflow YAML files that expose manual or reusable workflow interfaces.

## What this rule reports

This rule reports missing or empty `description` fields for:

- `on.workflow_dispatch.inputs.*`
- `on.workflow_call.inputs.*`
- `on.workflow_call.secrets.*`
- `on.workflow_call.outputs.*`

## Why this rule exists

Manual workflow forms and reusable workflows behave like public interfaces for your automation. Requiring descriptions keeps those interfaces self-documenting for operators, reviewers, and downstream workflow authors.

## ❌ Incorrect

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        required: true
        type: environment
```

## ✅ Correct

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: Deployment target environment
        required: true
        type: environment
```

## Additional examples

```yaml
on:
  workflow_call:
    inputs:
      config-path:
        description: Path to the deployment config
        required: true
        type: string
    secrets:
      token:
        description: Token used to publish deployment state
        required: true
    outputs:
      deployment-url:
        description: Final deployment URL
        value: ${{ jobs.deploy.outputs.url }}
```

## Further reading

- <https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#onworkflow_dispatchinputs>
- <https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#onworkflow_callinputs>
- <https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#onworkflow_callsecrets>
- <https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#onworkflow_calloutputs>
