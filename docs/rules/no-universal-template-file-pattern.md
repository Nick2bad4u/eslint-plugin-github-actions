# no-universal-template-file-pattern

> **Rule catalog ID:** R061

## Targeted pattern scope

`filePatterns` entries in workflow-template properties metadata.

## What this rule reports

Reports universal catch-all patterns such as `.*`, `^.*$`, `.+`, and `^.+$`.

## Why this rule exists

Catch-all patterns degrade template recommendation precision.

## ❌ Incorrect

```json
{ "filePatterns": [".*"] }
```

## ✅ Correct

```json
{ "filePatterns": ["package.json$", "^Cargo\\.toml$"] }
```

## Further reading

- [https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations#metadata-file-requirements](https://docs.github.com/actions/reference/workflows-and-actions/reusing-workflow-configurations#metadata-file-requirements)
