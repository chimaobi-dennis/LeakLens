# Security Policy

LeakLens never transmits scanned content anywhere and never stores raw
secrets: findings hold a redacted preview and a SHA-256 based fingerprint only.

## Reporting a vulnerability

Email igsoftwebstudio@gmail.com with the subject `LeakLens security`. Please
do not open a public issue for vulnerabilities in the scanner itself. You will
get an acknowledgement within 48 hours.

## Reporting a missed secret pattern

A rule gap is not a vulnerability; open an issue titled `rule: <provider>`
with a *synthetic* sample that matches the provider's documented key format.
Never paste a real credential, even a revoked one.
