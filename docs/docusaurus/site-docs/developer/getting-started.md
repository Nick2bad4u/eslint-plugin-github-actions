# Maintainer quickstart

Use the exact Node.js version in `.node-version` and the exact npm version in
the root `packageManager` field. The repository currently requires npm 12 and
rejects mismatched package-manager versions.

## 1) Install dependencies

```sh
npm ci
```

The tracked `.npmrc` blocks dependency install scripts by default. Required
native/toolchain scripts are reviewed and pinned in the root `allowScripts`
map; do not bypass that policy with `--force` or script-enabling flags.

## 2) Build the plugin once

```sh
npm run build
```

## 3) Run core quality checks

```sh
npm run typecheck
npm run test
npm run lint:all
```

## 4) Run docs locally

```sh
npm run docs:api
npm run --workspace docs/docusaurus start
```

## 5) Keep generated docs/tables in sync

```sh
npm run sync:readme-rules-table
```

## Useful targets

- `npm run docs:build` — full docs production build
- `npm run verify:readme-rules-table` — validates README rules section sync
- `npm run test:coverage` — coverage run

## Before opening a PR

- Ensure typecheck, lint, tests, and docs build are green locally.
- Include tests for behavioral changes.
- Update docs for user-facing changes.
