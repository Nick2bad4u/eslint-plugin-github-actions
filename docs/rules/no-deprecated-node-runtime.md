# no-deprecated-node-runtime

> **Rule catalog ID:** R044

## Targeted pattern scope

GitHub Action metadata `runs.using` for JavaScript actions.

## What this rule reports

Reports deprecated Node.js runtimes such as `node12` and `node16`.

## Why this rule exists

Deprecated runtimes age out of security support and eventually break action execution.

## ❌ Incorrect

```yaml
runs:
  using: node16
  main: dist/index.js
```

## ✅ Correct

```yaml
runs:
  using: node20
  main: dist/index.js
```

## Further reading

- [https://docs.github.com/actions/reference/workflows-and-actions/metadata-syntax#runs-for-javascript-actions](https://docs.github.com/actions/reference/workflows-and-actions/metadata-syntax#runs-for-javascript-actions)
