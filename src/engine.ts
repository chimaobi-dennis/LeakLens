import { shannonEntropy } from "./entropy.js";
import { fingerprint, redact } from "./redact.js";
import { rules as allRules } from "./rules/index.js";
import type { Finding, LeakLensConfig, Rule } from "./types.js";

const INLINE_IGNORE = /leaklens:\s*ignore/i;

export interface ScanContentOptions {
  file: string;
  config: LeakLensConfig;
  commit?: Finding["commit"];
  rules?: Rule[];
}

/** Run every enabled rule over a text blob and return de-duplicated findings. */
export function scanContent(content: string, opts: ScanContentOptions): Finding[] {
  const { file, config } = opts;
  const rules = (opts.rules ?? allRules).filter((r) => !config.disabledRules.includes(r.id));
  const allow = config.allowSecrets.map((s) => new RegExp(s));
  const lower = content.toLowerCase();
  const findings: Finding[] = [];
  const seen = new Set<string>();

  // Pre-compute line starts once so column/line lookup is O(log n) per match.
  const lineStarts = [0];
  for (let i = 0; i < content.length; i++) if (content.charCodeAt(i) === 10) lineStarts.push(i + 1);
  const locate = (index: number): { line: number; column: number } => {
    let lo = 0;
    let hi = lineStarts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (lineStarts[mid]! <= index) lo = mid;
      else hi = mid - 1;
    }
    return { line: lo + 1, column: index - lineStarts[lo]! + 1 };
  };
  const lineText = (line: number): string => {
    const start = lineStarts[line - 1]!;
    const end = line < lineStarts.length ? lineStarts[line]! - 1 : content.length;
    return content.slice(start, end);
  };

  for (const rule of rules) {
    if (rule.keywords && !rule.keywords.some((k) => lower.includes(k.toLowerCase()))) continue;
    const re = new RegExp(rule.pattern.source, rule.pattern.flags.includes("g") ? rule.pattern.flags : rule.pattern.flags + "g");
    let match: RegExpExecArray | null;
    while ((match = re.exec(content)) !== null) {
      if (match[0].length === 0) {
        re.lastIndex++;
        continue;
      }
      const secret = match[1] ?? match[0];
      const secretOffset = match[1] !== undefined ? match.index + match[0].indexOf(match[1]) : match.index;
      const { line, column } = locate(secretOffset);
      const text = lineText(line);
      if (INLINE_IGNORE.test(text)) continue;
      if (rule.validate && !rule.validate(secret, text)) continue;
      const entropy = shannonEntropy(secret);
      if (rule.minEntropy !== undefined && entropy < rule.minEntropy) continue;
      if (allow.some((a) => a.test(secret))) continue;
      const fp = fingerprint(rule.id, secret);
      if (config.baseline.includes(fp)) continue;
      const key = `${rule.id}:${fp}:${file}:${line}`;
      if (seen.has(key)) continue;
      seen.add(key);
      findings.push({
        ruleId: rule.id,
        ruleName: rule.name,
        severity: rule.severity,
        description: rule.description,
        remediation: rule.remediation,
        file,
        line,
        column,
        redacted: redact(secret),
        fingerprint: fp,
        entropy,
        commit: opts.commit,
      });
    }
  }
  // Prefer the specific rule over the generic one when both hit the same secret on the same line.
  return suppressShadowed(findings);
}

const GENERIC = new Set(["generic-api-key", "jwt"]);
function suppressShadowed(findings: Finding[]): Finding[] {
  const specificAt = new Set(findings.filter((f) => !GENERIC.has(f.ruleId)).map((f) => `${f.file}:${f.line}`));
  return findings.filter((f) => !(GENERIC.has(f.ruleId) && specificAt.has(`${f.file}:${f.line}`)));
}

/** True when the buffer looks binary (NUL byte in the first 8 KB). */
export function looksBinary(buf: Buffer): boolean {
  const n = Math.min(buf.length, 8192);
  for (let i = 0; i < n; i++) if (buf[i] === 0) return true;
  return false;
}
