# no-external-job

> **Rule catalog ID:** R012

## Targeted pattern scope

GitHub Actions workflow YAML files that call reusable workflows from `jobs.<id>.uses`.

## What this rule reports

This rule reports jobs that invoke reusable workflows via `uses` instead of defining the job inline.

## Why this rule exists

Some repositories prefer every job definition to live in the same workflow file for easier review, debugging, and change impact analysis.

## ❌ Incorrect

```yaml
jobs:
  deploy:
    uses: ./.github/workflows/deploy.yml
```

## ✅ Correct

```yaml
jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        run: ./scripts/deploy.sh
```

## Further reading

- <https://docs.github.com/actions/using-workflows/reusing-workflows>
- <https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_iduses>
