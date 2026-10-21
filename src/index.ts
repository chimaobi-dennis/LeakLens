import { resolve } from "node:path";
import { loadConfig } from "./config.js";
import { scanFilesystem } from "./scanners/filesystem.js";
import { isGitRepo, scanGitHistory, type GitScanOptions } from "./scanners/git.js";
import type { ScanResult, LeakLensConfig } from "./types.js";

export * from "./types.js";
export { rules, ruleById } from "./rules/index.js";
export { scanContent, looksBinary } from "./engine.js";
export { shannonEntropy } from "./entropy.js";
export { redact, fingerprint } from "./redact.js";
export { loadConfig, defaultConfig, isIgnoredPath, CONFIG_FILENAME } from "./config.js";
export { scanFilesystem, scanFile } from "./scanners/filesystem.js";
export { scanGitHistory, scanStaged, isGitRepo } from "./scanners/git.js";
export { formatPretty, countBySeverity, SEVERITY_ORDER } from "./reporters/pretty.js";
export { formatJson } from "./reporters/json.js";
export { formatSarif } from "./reporters/sarif.js";

export interface ScanOptions {
  /** Also walk git history. */
  history?: boolean | GitScanOptions;
  /** Skip the working tree and scan history only. */
  historyOnly?: boolean;
  config?: LeakLensConfig;
  configPath?: string;
}

/** Scan a directory (and optionally its git history) and return a combined result. */
export function scan(path: string, opts: ScanOptions = {}): ScanResult {
  const root = resolve(path);
  const config = opts.config ?? loadConfig(root, opts.configPath);
  const started = Date.now();
  const result: ScanResult = {
    root,
    startedAt: new Date(started).toISOString(),
    durationMs: 0,
    filesScanned: 0,
    commitsScanned: 0,
    findings: [],
  };
  if (!opts.historyOnly) {
    const fs = scanFilesystem(root, config);
    result.filesScanned = fs.filesScanned;
    result.findings.push(...fs.findings);
  }
  if (opts.history && isGitRepo(root)) {
    const git = scanGitHistory(root, config, typeof opts.history === "object" ? opts.history : {});
    result.commitsScanned = git.commitsScanned;
    // Skip history hits for secrets already reported in the working tree.
    const live = new Set(result.findings.map((f) => f.fingerprint));
    result.findings.push(...git.findings.filter((f) => !live.has(f.fingerprint)));
  }
  result.durationMs = Date.now() - started;
  return result;
}
