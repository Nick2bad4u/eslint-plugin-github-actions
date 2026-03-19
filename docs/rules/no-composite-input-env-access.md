# no-composite-input-env-access

> **Rule catalog ID:** R049

## Targeted pattern scope

Composite action metadata under `runs.using: composite`.

## What this rule reports

Reports `INPUT_*` environment variable usage in composite steps.

## Why this rule exists

Composite actions should read inputs via `inputs.*` context references.

## ❌ Incorrect

```yaml
runs:
  using: composite
  steps:
    - run: echo "$INPUT_TOKEN"
      shell: bash
```

## ✅ Correct

```yaml
runs:
  using: composite
  steps:
    - run: echo "${{ inputs.token }}"
      shell: bash
```

## Further reading

- <https://docs.github.com/actions/reference/workflows-and-actions/metadata-syntax#inputs>
- <https://docs.github.com/actions/reference/workflows-and-actions/metadata-syntax#runs-for-composite-actions>
