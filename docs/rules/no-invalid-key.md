# no-invalid-key

> **Rule catalog ID:** R019

## Targeted pattern scope

GitHub Actions workflow YAML mappings at the top level and within common job substructures.

## What this rule reports

This rule reports unsupported keys in workflow mappings such as the top-level workflow object, jobs, steps, strategy blocks, containers, and services.

## Why this rule exists

Misspelled or misplaced workflow keys are easy to overlook in review and can silently break automation intent. Catching them early helps keep workflow files valid and easier to maintain.

## ❌ Incorrect

```yaml
name: CI
on:
  push:
jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    strategy:
      retry: 2
    steps:
      - name: Test
        runs: npm test
```

## ✅ Correct

```yaml
name: CI
on:
  push:
jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    strategy:
      fail-fast: true
    steps:
      - name: Test
        run: npm test
```

## Further reading

- <https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax>
- <https://docs.github.com/actions/using-jobs/using-jobs-in-a-workflow>
