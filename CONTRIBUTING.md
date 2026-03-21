# Contributing to eslint-plugin-github-actions-2

Thanks for contributing. This project focuses on ESLint rules, presets, docs, and tooling for GitHub Actions workflow quality, security, and maintainability.

## Development

1. Install dependencies with `npm install`.
2. Run `npm run typecheck` to validate TypeScript.
3. Run `npm test` to execute the Vitest suite.
4. Run `npm run build` before opening a PR when you change published runtime files.

## Rule contributions

When proposing a new rule, include:

- a clear problem statement
- at least one incorrect and correct workflow example
- tests covering valid and invalid YAML
- documentation under `docs/rules/`

## Reporting issues

Please use the issue templates for bugs and rule ideas, and include a minimal workflow snippet whenever possible.
