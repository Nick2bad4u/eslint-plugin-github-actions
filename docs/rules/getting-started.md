# Getting started

## Install

```sh
npm install --save-dev eslint eslint-plugin-github-actions
```

## Flat config example

```js
import githubActions from "eslint-plugin-github-actions";

export default [githubActions.configs.recommended];
```

The exported presets already:

- scope themselves to `.github/workflows/*.{yml,yaml}`
- register `yaml-eslint-parser`
- register the `github-actions` plugin namespace

## Choosing a preset

- Start with `recommended` for most repositories.
- Add `security` when you want immutable pinning checks.
- Use `strict` when you want concurrency and stronger operational guardrails.
- Use `all` to enable every published rule.
