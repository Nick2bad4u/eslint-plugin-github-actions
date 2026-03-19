# no-unused-input-in-composite

> **Rule catalog ID:** R053

## Targeted pattern scope

Composite action inputs declared under `inputs`.

## What this rule reports

Reports declared inputs that are never referenced as `inputs.<id>`.

## Why this rule exists

Unused inputs increase maintenance burden and create confusing action interfaces.

## ❌ Incorrect

```yaml
inputs:
  token:
    description: Token
runs:
  using: composite
  steps:
    - run: echo hello
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
