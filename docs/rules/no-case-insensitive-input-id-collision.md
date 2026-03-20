# no-case-insensitive-input-id-collision

> **Rule catalog ID:** R048

## Targeted pattern scope

Action metadata input ID keys under `inputs`.

## What this rule reports

Reports input IDs that collide when normalized case-insensitively.

## Why this rule exists

Case-variant IDs are confusing for callers and easy to misread in workflow `with:` blocks.

## ❌ Incorrect

```yaml
inputs:
  Token:
    description: First input
  token:
    description: Second input
```

## ✅ Correct

```yaml
inputs:
  token:
    description: Access token
```

## Further reading

- [https://docs.github.com/actions/reference/workflows-and-actions/metadata-syntax#inputsinput_id](https://docs.github.com/actions/reference/workflows-and-actions/metadata-syntax#inputsinput_id)
