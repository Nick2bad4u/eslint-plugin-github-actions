# prefer-fail-fast

> **Rule catalog ID:** R015

## Targeted pattern scope

GitHub Actions workflow YAML files that use matrix strategies.

## What this rule reports

This rule reports jobs that explicitly set `strategy.fail-fast` to `false`.

## Why this rule exists

Leaving fail-fast enabled can save runner time and reduce queue pressure when one matrix job already proves the matrix is failing.

## ❌ Incorrect

```yaml
jobs:
  test:
    name: Test
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        node: [20, 22]
```

## ✅ Correct

```yaml
jobs:
  test:
    name: Test
    runs-on: ubuntu-latest
    strategy:
      fail-fast: true
      matrix:
        node: [20, 22]
```

## Further reading

- [https://docs.github.com/actions/using-jobs/using-a-matrix-for-your-jobs](https://docs.github.com/actions/using-jobs/using-a-matrix-for-your-jobs)
- [https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstrategy](https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstrategy)
