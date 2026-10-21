import { createHash } from "node:crypto";

/** Keep a short prefix and suffix so a human can recognise the secret without exposing it. */
export function redact(secret: string): string {
  if (secret.length <= 8) return "*".repeat(secret.length);
  const keep = secret.length >= 20 ? 4 : 2;
  return `${secret.slice(0, keep)}${"*".repeat(Math.min(secret.length - keep * 2, 24))}${secret.slice(-keep)}`;
}

export function fingerprint(ruleId: string, secret: string): string {
  return createHash("sha256").update(`${ruleId}:${secret}`).digest("hex").slice(0, 16);
}
