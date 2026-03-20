# pin-action-shas

> **Rule catalog ID:** R003

## Targeted pattern scope

External step-level `uses:` actions and reusable workflow references.

## What this rule reports

This rule reports third-party `uses:` references that pin to mutable tags or branches instead of a full 40-character commit SHA.

## Why this rule exists

GitHub recommends pinning actions and reusable workflows to immutable SHAs because tags and branches can be retargeted after review.

## ❌ Incorrect

```yaml
steps:
  - uses: actions/checkout@v4
```

```yaml
uses: owner/repo/.github/workflows/reuse.yml@main
```

## ✅ Correct

```yaml
steps:
  - uses: actions/checkout@692973e3d937129bcbf40652eb9f2f61becf3332
```

## Further reading

- [https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstepsuses](https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstepsuses)
- [https://docs.github.com/actions/using-workflows/reusing-workflows](https://docs.github.com/actions/using-workflows/reusing-workflows)
- [https://docs.github.com/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions](https://docs.github.com/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)
