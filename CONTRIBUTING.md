# Contributing

```bash
npm install
npm test
npm run typecheck && npm run lint
```

## Adding a rule

1. Add an entry to `src/rules/index.ts`. Put the secret in capture group 1,
   use the `g` flag, and prefer a `validate` function or `keywords` over a
   looser regex.
2. Add a synthetic positive sample to `test/rules.test.ts` and, if the rule is
   broad, a negative sample to the "does not flag placeholders" test.
3. Run `npm run scan:self`; a new rule must not add false positives on this
   repository's history.

## Commit style

`type: short description` where type is one of `feat`, `fix`, `docs`, `test`,
`chore`, `ci`. Never commit a real secret, even to demonstrate a bug. The
pre-commit hook (`npx tsx src/cli/index.ts install-hook`) will stop you.
