# Release flow

## Suggested release checklist

1. Start from a clean branch based on the current `main` commit.
2. Install the repository-pinned npm version and run `npm ci` without override
   flags.
3. Ensure the full verification command below leaves tracked files unchanged.
4. Merge the release-preparation pull request only after all applicable checks
   and review threads are green.
5. Re-run the full verification command on the exact merged `main` commit.
6. Confirm the chosen version is absent from npm and Git tags/releases, then
   dispatch `.github/workflows/release.yml` once for that exact branch and
   release type. Do not use `skip_verify` for a normal release.
7. Wait for the workflow-created version commit, tag, npm publication, and
   GitHub release before independently validating the registry package, both
   GitHub assets, provenance, generated documentation, and a fresh consumer.

The workflow packs once, publishes that exact `.tgz` to npm, and uploads the
same file to the GitHub release so the registry and GitHub tarballs are
byte-identical.

## Verification commands

```sh
npm run release:verify
```

This includes build, lint, typecheck, tests, docs build, and package dry run.
The release workflow reads both npm 11 array metadata and npm 12 keyed-object
metadata from `npm pack --json`; the keyed npm 12 shape is the current path.
