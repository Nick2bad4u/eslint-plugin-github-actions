# no-inherit-secrets

> **Rule catalog ID:** R026

## Targeted pattern scope

GitHub Actions workflow YAML files that call reusable workflows with `jobs.<job_id>.uses`.

## What this rule reports

This rule reports reusable-workflow jobs that use `secrets: inherit`.

## Why this rule exists

GitHub allows `secrets: inherit` to pass every secret available to the calling workflow into a directly called reusable workflow. Requiring explicitly named secrets keeps reusable-workflow integrations least-privileged and easier to review.

## ❌ Incorrect

```yaml
jobs:
  deploy:
    uses: ./.github/workflows/deploy.yml
    secrets: inherit
```

## ✅ Correct

```yaml
jobs:
  deploy:
    uses: ./.github/workflows/deploy.yml
    secrets:
      token: ${{ secrets.DEPLOY_TOKEN }}
```

## Further reading

- [https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idsecretsinherit](https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idsecretsinherit)
- [https://docs.github.com/actions/using-workflows/reusing-workflows#passing-inputs-and-secrets-to-a-reusable-workflow](https://docs.github.com/actions/using-workflows/reusing-workflows#passing-inputs-and-secrets-to-a-reusable-workflow)
