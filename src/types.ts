export type Severity = "critical" | "high" | "medium" | "low";

export interface Rule {
  /** Stable identifier, e.g. "aws-access-key-id". */
  id: string;
  /** Human readable name shown in reports. */
  name: string;
  description: string;
  severity: Severity;
  /** Regex with the secret in capture group 1 (or the whole match if no group). */
  pattern: RegExp;
  /** Optional minimum Shannon entropy of the captured secret, to cut false positives. */
  minEntropy?: number;
  /** Keywords that must appear near the match (case-insensitive). Cheap pre-filter. */
  keywords?: string[];
  /** Extra validation on the captured secret, e.g. decoding a JWT. */
  validate?: (secret: string, line: string) => boolean;
  /** Link to the provider's rotation docs. */
  remediation?: string;
}

export interface Finding {
  ruleId: string;
  ruleName: string;
  severity: Severity;
  description: string;
  remediation?: string;
  /** Path relative to the scan root. */
  file: string;
  line: number;
  column: number;
  /** The secret with most characters masked. The raw secret is never stored. */
  redacted: string;
  /** sha256(ruleId + secret) truncated, used by baselines and de-duplication. */
  fingerprint: string;
  entropy: number;
  /** Set when the finding comes from git history. */
  commit?: { hash: string; author: string; date: string; message: string };
}

export interface ScanResult {
  root: string;
  startedAt: string;
  durationMs: number;
  filesScanned: number;
  commitsScanned: number;
  findings: Finding[];
}

export interface LeakLensConfig {
  /** Glob-ish path fragments to skip (substring match on the relative path). */
  ignorePaths: string[];
  /** Rule ids to disable. */
  disabledRules: string[];
  /** Regexes; any matched secret is ignored. */
  allowSecrets: string[];
  /** Fingerprints that have been reviewed and accepted. */
  baseline: string[];
  /** Max file size in bytes to scan. */
  maxFileSize: number;
}
