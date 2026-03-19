# require-workflow-concurrency

> **Rule catalog ID:** R004

## Targeted pattern scope

Workflows that listen for `push`, `pull_request`, `pull_request_target`, `workflow_dispatch`, or `merge_group` by default.

## What this rule reports

This rule reports workflows that should define top-level `concurrency` but do not, as well as concurrency blocks that omit `group` or `cancel-in-progress`.

## Why this rule exists

Concurrency helps cancel superseded runs so repeated pushes and pull request updates do not create long backlogs of redundant workflow executions.

## ❌ Incorrect

```yaml
on:
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
```

```yaml
concurrency:
  group: ci
```

## ✅ Correct

```yaml
on:
  pull_request:

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true
```

## Further reading

- <https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#concurrency>
- <https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idconcurrency>
