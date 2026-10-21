import pc from "picocolors";
import type { Finding, ScanResult, Severity } from "../types.js";

const SEVERITY_COLOR: Record<Severity, (s: string) => string> = {
  critical: (s) => pc.bold(pc.red(s)),
  high: pc.red,
  medium: pc.yellow,
  low: pc.cyan,
};

export const SEVERITY_ORDER: Severity[] = ["critical", "high", "medium", "low"];

export function formatPretty(result: ScanResult): string {
  const lines: string[] = [];
  const sorted = [...result.findings].sort(
    (a, b) => SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity) || a.file.localeCompare(b.file) || a.line - b.line,
  );
  for (const f of sorted) lines.push(formatFinding(f));
  const counts = countBySeverity(result.findings);
  const summary = SEVERITY_ORDER.filter((s) => counts[s]).map((s) => SEVERITY_COLOR[s](`${counts[s]} ${s}`)).join(", ");
  lines.push("");
  lines.push(
    pc.dim(`Scanned ${result.filesScanned} files` + (result.commitsScanned ? ` and ${result.commitsScanned} commits` : "") + ` in ${result.durationMs} ms.`),
  );
  lines.push(result.findings.length === 0 ? pc.green("✔ No secrets found.") : `${pc.red("✖")} ${result.findings.length} finding(s): ${summary}`);
  return lines.join("\n");
}

export function formatFinding(f: Finding): string {
  const where = f.commit ? `${f.file}:${f.line} ${pc.dim(`@ ${f.commit.hash.slice(0, 8)} (${f.commit.author}, ${f.commit.date.slice(0, 10)})`)}` : `${f.file}:${f.line}:${f.column}`;
  const head = `${SEVERITY_COLOR[f.severity](f.severity.toUpperCase().padEnd(8))} ${pc.bold(f.ruleName)}  ${where}`;
  const detail = `         ${pc.dim(f.ruleId)}  ${f.redacted}  ${pc.dim(`entropy ${f.entropy}  fp ${f.fingerprint}`)}`;
  return `${head}\n${detail}`;
}

export function countBySeverity(findings: Finding[]): Record<Severity, number> {
  const counts: Record<Severity, number> = { critical: 0, high: 0, medium: 0, low: 0 };
  for (const f of findings) counts[f.severity]++;
  return counts;
}
