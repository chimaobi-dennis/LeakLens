# Changelog

## 0.1.0 — 2026-10-21

First release of LeakLens.

- Rule engine with 27 provider rules, entropy filtering and semantic validation
- Filesystem, git-history and staged-diff scanners
- Pretty / JSON / SARIF reporters
- `.leaklens.yml` configuration with baseline support
- CLI: `scan`, `protect`, `install-hook`, `baseline`, `rules`
- CI workflow that scans the repository's own history and uploads SARIF
