import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { looksBinary, scanContent } from "../engine.js";
import { isIgnoredPath } from "../config.js";
import type { Finding, LeakLensConfig } from "../types.js";

export interface FilesystemScanResult {
  findings: Finding[];
  filesScanned: number;
}

export function scanFilesystem(root: string, config: LeakLensConfig): FilesystemScanResult {
  const findings: Finding[] = [];
  let filesScanned = 0;
  const stack = [root];
  while (stack.length) {
    const dir = stack.pop()!;
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      const abs = join(dir, entry.name);
      const rel = relative(root, abs) || entry.name;
      if (isIgnoredPath(entry.isDirectory() ? rel + "/" : rel, config)) continue;
      if (entry.isDirectory()) {
        stack.push(abs);
        continue;
      }
      if (!entry.isFile()) continue;
      let size: number;
      try {
        size = statSync(abs).size;
      } catch {
        continue;
      }
      if (size === 0 || size > config.maxFileSize) continue;
      const buf = readFileSync(abs);
      if (looksBinary(buf)) continue;
      filesScanned++;
      findings.push(...scanContent(buf.toString("utf8"), { file: rel.replace(/\\/g, "/"), config }));
    }
  }
  return { findings, filesScanned };
}

/** Scan a single file (used by the pre-commit hook path). */
export function scanFile(root: string, absPath: string, config: LeakLensConfig): Finding[] {
  const rel = relative(root, absPath).replace(/\\/g, "/");
  if (isIgnoredPath(rel, config)) return [];
  const buf = readFileSync(absPath);
  if (looksBinary(buf) || buf.length > config.maxFileSize) return [];
  return scanContent(buf.toString("utf8"), { file: rel, config });
}
