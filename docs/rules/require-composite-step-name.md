# require-composite-step-name

> **Rule catalog ID:** R052

## Targeted pattern scope

Composite action `runs.steps` entries.

## What this rule reports

Reports composite steps missing a non-empty `name`.

## Why this rule exists

Named steps make action logs readable and troubleshooting faster.

## ❌ Incorrect

```yaml
runs:
  using: composite
  steps:
    - run: echo hello
      shell: bash
```

## ✅ Correct

```yaml
runs:
  using: composite
  steps:
    - name: Print greeting
      run: echo hello
      shell: bash
```

## Further reading

- <https://docs.github.com/actions/reference/workflows-and-actions/metadata-syntax#runs-for-composite-actions>
