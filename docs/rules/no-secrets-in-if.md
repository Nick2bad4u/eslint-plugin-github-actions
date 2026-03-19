# no-secrets-in-if

> **Rule catalog ID:** R027

## Targeted pattern scope

GitHub Actions workflow YAML files with job-level or step-level `if` conditionals.

## What this rule reports

This rule reports `if` conditionals that directly reference the `secrets` context, such as `secrets.DEPLOY_TOKEN`.

## Why this rule exists

GitHub documents that secrets cannot be directly referenced in `if:` conditionals. The safe pattern is to assign the secret to an environment variable first, then check the environment variable inside the conditional.

## ❌ Incorrect

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - if: ${{ secrets.DEPLOY_TOKEN != '' }}
        run: ./deploy.sh
```

## ✅ Correct

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
    steps:
      - if: ${{ env.DEPLOY_TOKEN != '' }}
        run: ./deploy.sh
```

## Further reading

- <https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstepsif>
- <https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idif>
