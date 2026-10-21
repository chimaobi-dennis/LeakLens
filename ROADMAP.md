# LeakLens Roadmap

Status key: ✅ done · 🔨 in progress · ⏳ planned

## Phase 1 — Core scanner (v0.1) ✅ 2026-10-21

- ✅ Rule engine with regex + keyword pre-filter + entropy + semantic `validate`
- ✅ 27 rules covering the major cloud, payment, AI, messaging and email providers
- ✅ Filesystem scanner with binary / lockfile / size skipping
- ✅ Git history scanner attributing each secret to its introducing commit
- ✅ Staged-diff scanner and `install-hook` for pre-commit protection
- ✅ Pretty, JSON and SARIF 2.1.0 reporters; secrets are always redacted
- ✅ `.leaklens.yml` with ignore paths, disabled rules, allow-list and baseline
- ✅ `leaklens baseline` to adopt the tool on a repo with legacy leaks
- ✅ 46 tests including a real temporary git repository fixture
- ✅ CI that tests, builds, scans its own 1,200+ commit history and uploads SARIF

## Phase 2 — Trust the results (v0.2) ⏳ target: 2 weeks

- ⏳ Live verification: call provider APIs (read-only) to mark a finding
  `active` / `revoked` / `unknown`. Start with GitHub, AWS STS, Stripe,
  OpenAI, Anthropic, Supabase.
- ⏳ `--verify` flag and `verified` field in every reporter
- ⏳ Rule test corpus: one positive and three negative samples per rule, with
  a precision report generated in CI
- ⏳ Benchmark against gitleaks and trufflehog on a public leak corpus and
  publish the numbers in the README
- ⏳ Publish `leaklens` to npm with provenance (`npm publish --provenance`)

## Phase 3 — Fit into real workflows (v0.3) ⏳ target: 4 weeks

- ⏳ Official GitHub Action (`chimaobi-dennis/leaklens-action`) with PR
  annotations on the exact line
- ⏳ `--diff` mode for PR-only scanning (`base...head`) so large monorepos
  scan in seconds
- ⏳ Docker image and a `pre-commit` framework hook definition
- ⏳ Custom rules in `.leaklens.yml` (`rules:` with id, pattern, severity)
- ⏳ Scan archives and container image layers (tar, zip, OCI)
- ⏳ `.gitignore`-aware filesystem walk

## Phase 4 — Beyond the repo (v0.4) ⏳ target: 8 weeks

- ⏳ Scan GitHub/GitLab organisations: enumerate repos, clone shallowly,
  scan history, aggregate one report
- ⏳ Secrets in CI logs and environment dumps (paste or pipe via stdin)
- ⏳ Dependency-manifest check for packages known to exfiltrate env vars
- ⏳ Suggested fixes: generate the `git filter-repo` command and the
  provider rotation checklist for every critical finding

## Phase 5 — Hosted dashboard (v1.0) ⏳

- ⏳ Web app: connect a GitHub org, see findings by repo, severity trend,
  mean-time-to-rotate; built on the TypeScript library, not a fork of it
- ⏳ Slack / email alerts on new findings
- ⏳ Team baselines and ownership assignment

## Non-goals

- Replacing a secrets manager. LeakLens finds leaks; it does not store secrets.
- Rewriting git history automatically. That is destructive and belongs to the
  human, with the tool only generating the commands.

## Housekeeping

- [ ] Rotate the credentials the history scan surfaced and scrub them with
      `git filter-repo --replace-text`
- [ ] Drop the baseline entries from `.leaklens.yml` once history is clean
- [ ] Rename the repository to `leaklens` and update `package.json`
- [ ] Record a short terminal demo of `npm run scan:self` for the README
