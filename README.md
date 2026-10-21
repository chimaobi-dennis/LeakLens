# LeakLens

**Find leaked secrets before attackers do.** LeakLens scans a working tree, a
staged commit, or every commit in a repository's history for API keys,
tokens, private keys and credentials, then tells you exactly which commit
introduced each one and how to rotate it.

```
$ leaklens scan . --history

CRITICAL Supabase Service Role Key  .env:3 @ 837d6e2a (gpt-engineer-app[bot], 2026-05-22)
         supabase-service-role-key  eyJh************************ZcvI  entropy 5.451  fp ee18659187eabb64
MEDIUM   Generic API Key / Secret    src/lib/ai.ts:33 @ cf64bf05 (Chimaobi Dennis, 2026-03-23)
         generic-api-key             497f************************b0ad  entropy 4.254  fp 6e0914fb0dd8c665

Scanned 24 files and 1216 commits in 282 ms.
✖ 2 finding(s): 1 critical, 1 medium
```

That output is real. This repository spent its first 1,216 commits as a
Lovable-generated AI brand platform, and along the way a Supabase
service-role key and two third-party API keys were committed. LeakLens found
all of them on its first run over its own history, which is why the project
exists.

## Why another secret scanner?

| | LeakLens | gitleaks | trufflehog |
|---|---|---|---|
| Install | `npm i -g leaklens`, no binary | Go binary | Go binary |
| Git history, attributed to introducing commit | ✔ | ✔ | ✔ |
| Semantic validation (e.g. decodes JWTs to spot `service_role`) | ✔ | ✘ | partial |
| SARIF for GitHub code scanning | ✔ | ✔ | ✘ |
| Baseline so legacy leaks don't block CI | ✔ | ✔ | ✘ |
| Embeddable TypeScript library | ✔ | ✘ | ✘ |
| Pre-commit hook in one command | ✔ | via pre-commit | via pre-commit |

LeakLens is built for JavaScript/TypeScript teams who want a scanner that
lives in `package.json`, runs in under a second, and can be imported into
their own tooling.

## Install

```bash
npm install -g leaklens
# or run without installing
npx leaklens scan .
```

Requires Node 20+. `git` must be on the PATH for history scanning.

## Usage

```bash
leaklens scan                      # working tree of the current directory
leaklens scan . --history          # plus every commit reachable from HEAD
leaklens scan . --history --max-commits 500
leaklens scan . --range main..HEAD # only the commits on this branch
leaklens scan . --format json -o report.json
leaklens scan . --format sarif -o leaklens.sarif
leaklens scan . --fail-on high     # exit 1 only for high/critical findings
leaklens protect                   # scan staged changes (pre-commit)
leaklens install-hook              # write .git/hooks/pre-commit
leaklens baseline --history        # accept current findings into .leaklens.yml
leaklens rules                     # list the detection rules
```

Exit code is `1` when a finding at or above `--fail-on` (default `low`)
exists, so it drops straight into CI.

### Configuration: `.leaklens.yml`

```yaml
ignorePaths:
  - test/fixtures/
  - docs/examples.md
disabledRules:
  - jwt
allowSecrets:
  - "^AKIAIOSFODNN7EXAMPLE$"   # regex against the secret value   # leaklens:ignore
baseline:
  - ee18659187eabb64             # fingerprints produced by `leaklens baseline`
```

Suppress a single line with an inline comment:

```ts
const demoKey = "AKIAIOSFODNN7EXAMPLE"; // leaklens:ignore
```

### GitHub Actions

```yaml
- uses: actions/checkout@v4
  with: { fetch-depth: 0 }
- run: npx leaklens scan . --history --format sarif -o leaklens.sarif --fail-on none
- uses: github/codeql-action/upload-sarif@v3
  with: { sarif_file: leaklens.sarif }
```

Findings then appear under **Security → Code scanning** on the repository.
See [.github/workflows/ci.yml](.github/workflows/ci.yml) for the full
workflow this repo runs on itself.

### As a library

```ts
import { scan, scanContent, loadConfig } from "leaklens";

const result = scan("./my-repo", { history: true });
for (const f of result.findings) {
  console.log(f.severity, f.ruleId, f.file, f.line, f.redacted, f.commit?.hash);
}

// or scan a string you already have in memory
scanContent(pullRequestDiff, { file: "diff", config: loadConfig(".") });
```

Findings never contain the raw secret. Each carries a redacted preview and a
stable 16-character fingerprint derived from `sha256(ruleId:secret)`.

## How it works

1. **Rules** ([src/rules](src/rules/index.ts)) pair a regex with optional
   keyword pre-filters, a minimum Shannon entropy, and a `validate` function.
   The Supabase rule, for example, base64-decodes the JWT payload and only
   fires when `role === "service_role"`, so anon keys are reported at a lower
   severity by the generic JWT rule instead.
2. **The engine** ([src/engine.ts](src/engine.ts)) runs every enabled rule over
   a text blob, maps match offsets to line and column, applies inline ignores,
   allow-lists and baselines, and suppresses the generic rules when a
   specific rule already hit the same line.
3. **Scanners** walk the filesystem (skipping binaries, lockfiles, `node_modules`
   and anything over 1 MB) or parse `git log --patch` so that only *added*
   lines are scanned. A secret is reported once, at the commit that introduced
   it, with author and date.
4. **Reporters** produce a colour terminal report, JSON, or SARIF 2.1.0.

## Detection rules

Run `leaklens rules` for the current list. Highlights:

AWS access/secret keys · GitHub, GitLab, npm, PyPI tokens · Slack tokens and
webhooks · Stripe · OpenAI · Anthropic · Google API keys and OAuth secrets ·
Supabase service-role keys · generic JWTs · PEM private keys · Twilio ·
SendGrid · Mailgun · Resend · Discord and Telegram bots · Heroku · Azure
storage keys · database and basic-auth URLs with embedded passwords · generic
high-entropy `api_key = "..."` assignments.

## Development

```bash
npm install
npm test            # vitest, includes a real git repo fixture
npm run typecheck
npm run scan:self   # scan this repository's full history
```

## Roadmap

See [ROADMAP.md](ROADMAP.md).

## Project history

Commits before the `kinika-archive` tag belong to the previous project that
lived in this repository (an AI brand platform generated with Lovable). They
are kept deliberately: they are the test corpus that proves LeakLens works.

## License

MIT © Chimaobi Dennis
