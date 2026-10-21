import { execFileSync } from "node:child_process";
import { scanContent } from "../engine.js";
import { isIgnoredPath } from "../config.js";
import type { Finding, LeakLensConfig } from "../types.js";

export interface GitScanOptions {
  /** Limit to the N most recent commits (0 = all). */
  maxCommits?: number;
  /** Revision range, e.g. "main..feature". Defaults to all reachable history. */
  range?: string;
}

export interface GitScanResult {
  findings: Finding[];
  commitsScanned: number;
}

const RECORD = "\u001e";
const FIELD = "\u001f";

function git(root: string, args: string[]): string {
  return execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 1024 * 1024 * 1024 });
}

export function isGitRepo(root: string): boolean {
  try {
    return git(root, ["rev-parse", "--is-inside-work-tree"]).trim() === "true";
  } catch {
    return false;
  }
}

/**
 * Scan every added line in history. Only "+" lines are scanned so a secret is
 * reported at the commit that introduced it, not at every later diff that touched the file.
 */
export function scanGitHistory(root: string, config: LeakLensConfig, opts: GitScanOptions = {}): GitScanResult {
  const args = [
    "log",
    `--format=${RECORD}%H${FIELD}%an${FIELD}%aI${FIELD}%s`,
    "--patch",
    "--unified=0",
    "--no-color",
    "--no-renames",
  ];
  if (opts.maxCommits) args.push(`-n`, String(opts.maxCommits));
  if (opts.range) args.push(opts.range);
  const out = git(root, args);
  const findings: Finding[] = [];
  const seen = new Set<string>();
  let commitsScanned = 0;

  for (const block of out.split(RECORD)) {
    if (!block.trim()) continue;
    commitsScanned++;
    const nl = block.indexOf("\n");
    const header = nl === -1 ? block : block.slice(0, nl);
    const [hash = "", author = "", date = "", message = ""] = header.split(FIELD);
    const commit = { hash, author, date, message };
    const body = nl === -1 ? "" : block.slice(nl + 1);

    let file = "";
    let newLine = 0;
    let added: string[] = [];
    let addedLines: number[] = [];
    const flush = () => {
      if (!file || added.length === 0) return;
      if (isIgnoredPath(file, config)) {
        added = [];
        addedLines = [];
        return;
      }
      const content = added.join("\n");
      for (const f of scanContent(content, { file, config, commit })) {
        const realLine = addedLines[f.line - 1] ?? f.line;
        const key = `${f.fingerprint}:${file}`;
        if (seen.has(key)) continue; // report the first introduction only
        seen.add(key);
        findings.push({ ...f, line: realLine });
      }
      added = [];
      addedLines = [];
    };

    for (const line of body.split("\n")) {
      if (line.startsWith("diff --git ")) {
        flush();
        const m = /^diff --git a\/(.*?) b\/(.*)$/.exec(line);
        file = m?.[2] ?? "";
      } else if (line.startsWith("@@")) {
        const m = /\+(\d+)/.exec(line);
        newLine = m ? Number(m[1]) : 0;
      } else if (line.startsWith("+") && !line.startsWith("+++")) {
        added.push(line.slice(1));
        addedLines.push(newLine++);
      }
    }
    flush();
  }
  return { findings, commitsScanned };
}

/** Scan the staged diff only (pre-commit hook). */
export function scanStaged(root: string, config: LeakLensConfig): Finding[] {
  const out = git(root, ["diff", "--cached", "--unified=0", "--no-color"]);
  const findings: Finding[] = [];
  let file = "";
  let newLine = 0;
  let added: string[] = [];
  let addedLines: number[] = [];
  const flush = () => {
    if (file && added.length && !isIgnoredPath(file, config)) {
      for (const f of scanContent(added.join("\n"), { file, config })) {
        findings.push({ ...f, line: addedLines[f.line - 1] ?? f.line });
      }
    }
    added = [];
    addedLines = [];
  };
  for (const line of out.split("\n")) {
    if (line.startsWith("diff --git ")) {
      flush();
      file = /^diff --git a\/(.*?) b\/(.*)$/.exec(line)?.[2] ?? "";
    } else if (line.startsWith("@@")) {
      newLine = Number(/\+(\d+)/.exec(line)?.[1] ?? 0);
    } else if (line.startsWith("+") && !line.startsWith("+++")) {
      added.push(line.slice(1));
      addedLines.push(newLine++);
    }
  }
  flush();
  return findings;
}
