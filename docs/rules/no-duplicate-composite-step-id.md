# no-duplicate-composite-step-id

> **Rule catalog ID:** R051

## Targeted pattern scope

Composite action `runs.steps[*].id` declarations.

## What this rule reports

Reports duplicate step IDs in composite actions.

## Why this rule exists

Duplicate step IDs create ambiguous references and break output wiring.

## ❌ Incorrect

```yaml
runs:
  using: composite
  steps:
    - id: setup
      run: echo one
      shell: bash
    - id: setup
      run: echo two
      shell: bash
```

## ✅ Correct

```yaml
runs:
  using: composite
  steps:
    - id: setup
      run: echo one
      shell: bash
    - id: finish
      run: echo two
      shell: bash
```

## Further reading

- [https://docs.github.com/actions/reference/workflows-and-actions/metadata-syntax#runs-for-composite-actions](https://docs.github.com/actions/reference/workflows-and-actions/metadata-syntax#runs-for-composite-actions)
