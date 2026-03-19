# no-unknown-input-reference-in-composite

> **Rule catalog ID:** R050

## Targeted pattern scope

Composite action metadata strings that reference `inputs.<id>`.

## What this rule reports

Reports `inputs.<id>` references when `<id>` is not declared under `inputs`.

## Why this rule exists

Typos in input references make composite actions behave incorrectly at runtime.

## ❌ Incorrect

```yaml
inputs:
  token:
    description: Token
runs:
  using: composite
  steps:
    - run: echo "${{ inputs.tokne }}"
      shell: bash
```

## ✅ Correct

```yaml
inputs:
  token:
    description: Token
runs:
  using: composite
  steps:
    - run: echo "${{ inputs.token }}"
      shell: bash
```

## Further reading

- <https://docs.github.com/actions/reference/workflows-and-actions/metadata-syntax#inputs>
