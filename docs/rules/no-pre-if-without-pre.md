# no-pre-if-without-pre

> **Rule catalog ID:** R045

## Targeted pattern scope

Action metadata `runs.pre-if` declarations.

## What this rule reports

Reports `runs.pre-if` when `runs.pre` is missing.

## Why this rule exists

`pre-if` has no effect unless a `pre` hook exists.

## ❌ Incorrect

```yaml
runs:
  using: node20
  main: dist/index.js
  pre-if: runner.os == 'Linux'
```

## ✅ Correct

```yaml
runs:
  using: node20
  pre: dist/setup.js
  pre-if: runner.os == 'Linux'
  main: dist/index.js
```

## Further reading

- <https://docs.github.com/actions/reference/workflows-and-actions/metadata-syntax#runs-for-javascript-actions>
