# no-post-if-without-post

> **Rule catalog ID:** R046

## Targeted pattern scope

Action metadata `runs.post-if` declarations.

## What this rule reports

Reports `runs.post-if` when `runs.post` is missing.

## Why this rule exists

`post-if` has no effect without a matching `post` hook.

## ❌ Incorrect

```yaml
runs:
  using: node20
  main: dist/index.js
  post-if: runner.os == 'Linux'
```

## ✅ Correct

```yaml
runs:
  using: node20
  main: dist/index.js
  post: dist/cleanup.js
  post-if: runner.os == 'Linux'
```

## Further reading

- [https://docs.github.com/actions/reference/workflows-and-actions/metadata-syntax#runs-for-javascript-actions](https://docs.github.com/actions/reference/workflows-and-actions/metadata-syntax#runs-for-javascript-actions)
