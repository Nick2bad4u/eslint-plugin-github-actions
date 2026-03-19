# no-write-all-permissions

> **Rule catalog ID:** R023

## Targeted pattern scope

GitHub Actions workflow YAML files that declare `permissions`.

## What this rule reports

This rule reports workflow-level or job-level `permissions: write-all` declarations.

## Why this rule exists

GitHub recommends granting the `GITHUB_TOKEN` the least access needed. The `write-all` shortcut grants every writable scope at once, which makes reviews harder and increases the blast radius of a compromised workflow or third-party action.

## ❌ Incorrect

```yaml
permissions: write-all
```

## ✅ Correct

```yaml
permissions:
  contents: read
  pull-requests: write
```

## Further reading

- <https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#permissions>
- <https://docs.github.com/actions/security-guides/automatic-token-authentication#modifying-the-permissions-for-the-github_token>
