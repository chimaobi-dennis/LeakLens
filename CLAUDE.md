# LeakLens — project context

Secret scanner CLI + library in TypeScript (Node 20+, ESM, no framework).

- `src/rules/index.ts` — detection rules. Secret in capture group 1, `g` flag.
- `src/engine.ts` — `scanContent()`; all suppression logic lives here.
- `src/scanners/` — filesystem, git history (`git log -p`, added lines only), staged diff.
- `src/reporters/` — pretty, json, sarif.
- `src/cli/index.ts` — commander CLI.
- `test/` — vitest; `scanners.test.ts` builds a real temp git repo.

Rules of the repo:
- Never commit real secrets, not even revoked ones. Fixtures are synthetic.
- `npm run scan:self` must stay clean (baseline in `.leaklens.yml` covers the known historic leaks).
- Tests: `npm test`. Typecheck: `npm run typecheck`.
