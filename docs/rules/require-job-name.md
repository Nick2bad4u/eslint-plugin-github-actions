# require-job-name

> **Rule catalog ID:** R007

## Targeted pattern scope

GitHub Actions workflow YAML files that declare jobs.

## What this rule reports

This rule reports jobs that omit `name` or set `name` to a non-string or empty value.

## Why this rule exists

Job names appear in workflow graphs and logs. Requiring them makes complex workflows easier to navigate, especially when job IDs are terse.

## ❌ Incorrect

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```

## ✅ Correct

```yaml
jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
```

## Further reading

- <https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idname>
- <https://docs.github.com/actions/using-jobs/using-jobs-in-a-workflow>
