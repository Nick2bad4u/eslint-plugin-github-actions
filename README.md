# eslint-plugin-github-actions

[![npm license.](https://flat.badgen.net/npm/license/eslint-plugin-github-actions?color=purple)](https://github.com/Nick2bad4u/eslint-plugin-github-actions/blob/main/LICENSE) [![latest GitHub release.](https://flat.badgen.net/github/release/Nick2bad4u/eslint-plugin-github-actions?color=cyan)](https://github.com/Nick2bad4u/eslint-plugin-github-actions/releases) [![GitHub stars.](https://flat.badgen.net/github/stars/Nick2bad4u/eslint-plugin-github-actions?color=yellow)](https://github.com/Nick2bad4u/eslint-plugin-github-actions/stargazers)

ESLint plugin for GitHub Actions workflow quality, reliability, and security.

The current rules focus on `.github/workflows/*.{yml,yaml}` files and help teams:

- declare explicit token `permissions`
- bound job execution time with `timeout-minutes`
- pin third-party `uses:` references to immutable SHAs
- configure top-level `concurrency` for duplicate-run control

## Installation

```sh
npm install --save-dev eslint eslint-plugin-github-actions
```

## Quick start

```js
import githubActions from "eslint-plugin-github-actions";

export default [githubActions.configs.recommended];
```

Every exported preset already scopes itself to GitHub Actions workflow YAML files.

## Presets

| Preset | Purpose |
| --- | --- |
| `githubActions.configs.recommended` | Balanced defaults for most repositories. |
| `githubActions.configs.security` | Security-focused checks like immutable SHA pinning. |
| `githubActions.configs.strict` | Operational guardrails for mature workflow estates. |
| `githubActions.configs.all` | Every rule published by the plugin. |

## Rules

| Rule | Recommended | Security | Strict | All |
| --- | --- | --- | --- | --- |
| `github-actions/require-workflow-permissions` | ✅ | ✅ | ✅ | ✅ |
| `github-actions/require-job-timeout-minutes` | ✅ |  | ✅ | ✅ |
| `github-actions/pin-action-shas` |  | ✅ | ✅ | ✅ |
| `github-actions/require-workflow-concurrency` |  |  | ✅ | ✅ |

## Example

```yaml
name: ci

on:
  pull_request:
  push:
    branches:
      - main

permissions:
  contents: read

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@692973e3d937129bcbf40652eb9f2f61becf3332
      - run: npm test
```

## Documentation

- Rule docs: `docs/rules/`
- Site: <https://nick2bad4u.github.io/eslint-plugin-github-actions/docs/rules/overview>

## Status

This repository is being rebuilt from a high-quality ESLint plugin template into a dedicated GitHub Actions lint plugin. The initial release focuses on workflow YAML quality and security rules, with broader Actions coverage planned next.
