# no-required-input-with-default

> **Rule catalog ID:** R047

## Targeted pattern scope

Action metadata `inputs.<id>` definitions.

## What this rule reports

Reports input definitions that set both `required: true` and `default`.

## Why this rule exists

A default value means callers can omit the input, which conflicts with `required: true`.

## ❌ Incorrect

```yaml
inputs:
  token:
    description: Token
    required: true
    default: abc123
```

## ✅ Correct

```yaml
inputs:
  token:
    description: Token
    required: true
```

## Further reading

- <https://docs.github.com/actions/reference/workflows-and-actions/metadata-syntax#inputs>
