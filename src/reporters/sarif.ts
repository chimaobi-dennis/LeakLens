import { rules } from "../rules/index.js";
import type { ScanResult, Severity } from "../types.js";

const LEVEL: Record<Severity, "error" | "warning" | "note"> = {
  critical: "error",
  high: "error",
  medium: "warning",
  low: "note",
};

/** SARIF 2.1.0 so findings show up in the GitHub "Security → Code scanning" tab. */
export function formatSarif(result: ScanResult, version = "0.1.0"): string {
  const ruleIndex = new Map(rules.map((r, i) => [r.id, i]));
  const sarif = {
    $schema: "https://raw.githubusercontent.com/oasis-tcs/sarif-spec/main/sarif-2.1/schema/sarif-schema-2.1.0.json",
    version: "2.1.0",
    runs: [
      {
        tool: {
          driver: {
            name: "LeakLens",
            version,
            informationUri: "https://github.com/chimaobi-dennis/LeakLens",
            rules: rules.map((r) => ({
              id: r.id,
              name: r.name,
              shortDescription: { text: r.name },
              fullDescription: { text: r.description },
              helpUri: r.remediation,
              defaultConfiguration: { level: LEVEL[r.severity] },
              properties: { severity: r.severity },
            })),
          },
        },
        results: result.findings.map((f) => ({
          ruleId: f.ruleId,
          ruleIndex: ruleIndex.get(f.ruleId),
          level: LEVEL[f.severity],
          message: {
            text: `${f.ruleName} detected (${f.redacted})` + (f.commit ? ` introduced in commit ${f.commit.hash.slice(0, 8)}` : ""),
          },
          locations: [
            {
              physicalLocation: {
                artifactLocation: { uri: f.file, uriBaseId: "%SRCROOT%" },
                region: { startLine: f.line, startColumn: f.column },
              },
            },
          ],
          partialFingerprints: { leaklens: f.fingerprint },
          properties: { entropy: f.entropy, commit: f.commit?.hash },
        })),
      },
    ],
  };
  return JSON.stringify(sarif, null, 2);
}
