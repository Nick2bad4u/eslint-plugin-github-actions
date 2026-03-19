# prefer-action-yml

> **Rule catalog ID:** R043

## Targeted pattern scope

GitHub Action metadata files named `action.yaml`.

## What this rule reports

Reports action metadata files that use `action.yaml` instead of `action.yml`.

## Why this rule exists

GitHub supports both extensions, but the metadata docs call out `action.yml` as the preferred filename.

## ❌ Incorrect

```text
action.yaml
```

## ✅ Correct

```text
action.yml
```

## Further reading

- <https://docs.github.com/actions/reference/workflows-and-actions/metadata-syntax>
