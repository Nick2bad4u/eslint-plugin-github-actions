# job-id-casing

> **Rule catalog ID:** R010

## Targeted pattern scope

GitHub Actions workflow YAML files that declare job identifiers under `jobs`.

## What this rule reports

This rule reports workflow job IDs whose casing does not match the configured naming convention.

## Why this rule exists

Job IDs are referenced by features like `needs`, reusable workflow outputs, and visual run graphs. A consistent convention makes those references easier to read and maintain.

## ❌ Incorrect

```yaml
jobs:
  BuildApp:
    name: Build App
    runs-on: ubuntu-latest
```

## ✅ Correct

```yaml
jobs:
  build-app:
    name: Build App
    runs-on: ubuntu-latest
```

```yaml
jobs:
  build_app:
    name: Build App
    runs-on: ubuntu-latest
```

_The second example is valid when the rule is configured for `snake_case`._

## Further reading

- <https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_id>
- <https://docs.github.com/actions/using-jobs/using-jobs-in-a-workflow>
