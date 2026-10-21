import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { scan, scanFilesystem, scanGitHistory, scanStaged, loadConfig, formatSarif, formatJson, formatPretty } from "../src/index.js";
import { config } from "./helpers.js";

const KEY = "AKIAIOSFODNN7EXAMPLE";
let root: string;
const git = (...args: string[]) => execFileSync("git", args, { cwd: root, encoding: "utf8", env: { ...process.env, GIT_AUTHOR_NAME: "t", GIT_AUTHOR_EMAIL: "t@t", GIT_COMMITTER_NAME: "t", GIT_COMMITTER_EMAIL: "t@t" } });

beforeAll(() => {
  root = mkdtempSync(join(tmpdir(), "leaklens-"));
  git("init", "-q", "-b", "main");
  mkdirSync(join(root, "node_modules/pkg"), { recursive: true });
  writeFileSync(join(root, "node_modules/pkg/index.js"), `const k = "${KEY}";`);
  writeFileSync(join(root, "clean.ts"), "export const a = 1;\n");
  writeFileSync(join(root, "image.png"), Buffer.from([0x89, 0x50, 0x00, 0x41]));
  git("add", "-A");
  git("commit", "-q", "-m", "init");
  // Commit a secret, then remove it: the working tree is clean but history is not.
  writeFileSync(join(root, ".env"), `AWS_ACCESS_KEY_ID=${KEY}\n`);
  git("add", "-A");
  git("commit", "-q", "-m", "add env");
  git("rm", "-q", ".env");
  git("commit", "-q", "-m", "remove env");
});
afterAll(() => rmSync(root, { recursive: true, force: true }));

describe("filesystem scanner", () => {
  it("skips node_modules and binaries and finds nothing in a clean tree", () => {
    const r = scanFilesystem(root, config());
    expect(r.findings).toEqual([]);
    expect(r.filesScanned).toBe(1);
  });

  it("finds a secret in the working tree", () => {
    writeFileSync(join(root, "config.yml"), `aws: ${KEY}\n`);
    const r = scanFilesystem(root, config());
    expect(r.findings).toHaveLength(1);
    expect(r.findings[0]).toMatchObject({ file: "config.yml", line: 1, ruleId: "aws-access-key-id" });
    rmSync(join(root, "config.yml"));
  });

  it("respects ignorePaths from .leaklens.yml", () => {
    writeFileSync(join(root, "config.yml"), `aws: ${KEY}\n`);
    writeFileSync(join(root, ".leaklens.yml"), "ignorePaths:\n  - config.yml\n");
    expect(scanFilesystem(root, loadConfig(root)).findings).toEqual([]);
    rmSync(join(root, "config.yml"));
    rmSync(join(root, ".leaklens.yml"));
  });
});

describe("git history scanner", () => {
  it("finds a secret that was committed and later deleted, attributed to the introducing commit", () => {
    const r = scanGitHistory(root, config());
    expect(r.commitsScanned).toBe(3);
    expect(r.findings).toHaveLength(1);
    const f = r.findings[0]!;
    expect(f).toMatchObject({ file: ".env", line: 1, ruleId: "aws-access-key-id" });
    expect(f.commit?.message).toBe("add env");
    expect(f.commit?.author).toBe("t");
  });

  it("supports maxCommits", () => {
    expect(scanGitHistory(root, config(), { maxCommits: 1 }).findings).toEqual([]);
  });

  it("scans staged changes only", () => {
    writeFileSync(join(root, "staged.txt"), `x=${KEY}\n`);
    git("add", "staged.txt");
    const f = scanStaged(root, config());
    expect(f).toHaveLength(1);
    expect(f[0]).toMatchObject({ file: "staged.txt", line: 1 });
    git("reset", "-q", "staged.txt");
    rmSync(join(root, "staged.txt"));
  });
});

describe("scan() and reporters", () => {
  it("combines tree and history and de-duplicates by fingerprint", () => {
    writeFileSync(join(root, "live.txt"), `${KEY}\n`);
    const r = scan(root, { history: true });
    expect(r.findings).toHaveLength(1); // history hit for the same key is suppressed
    expect(r.findings[0]!.file).toBe("live.txt");
    rmSync(join(root, "live.txt"));
  });

  it("renders json, sarif and pretty without leaking the secret", () => {
    const r = scan(root, { history: true });
    for (const out of [formatJson(r), formatSarif(r), formatPretty(r)]) {
      expect(out).not.toContain(KEY);
      expect(out).toContain("aws-access-key-id");
    }
    const sarif = JSON.parse(formatSarif(r));
    expect(sarif.version).toBe("2.1.0");
    expect(sarif.runs[0].results[0].locations[0].physicalLocation.artifactLocation.uri).toBe(".env");
  });
});
