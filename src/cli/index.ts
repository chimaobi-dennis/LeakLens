#!/usr/bin/env node
import { Command } from "commander";
import { writeFileSync, existsSync, mkdirSync, chmodSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { stringify } from "yaml";
import pc from "picocolors";
import { scan } from "../index.js";
import { loadConfig, CONFIG_FILENAME } from "../config.js";
import { scanStaged } from "../scanners/git.js";
import { formatPretty, formatFinding, SEVERITY_ORDER } from "../reporters/pretty.js";
import { formatJson } from "../reporters/json.js";
import { formatSarif } from "../reporters/sarif.js";
import { rules } from "../rules/index.js";
import type { Severity, ScanResult } from "../types.js";

const VERSION = "0.1.0";
const program = new Command();

program.name("leaklens").description("Scan repositories for leaked secrets, API keys and credentials.").version(VERSION);

function render(result: ScanResult, format: string): string {
  switch (format) {
    case "json":
      return formatJson(result);
    case "sarif":
      return formatSarif(result, VERSION);
    default:
      return formatPretty(result);
  }
}

function exceeds(result: ScanResult, failOn: Severity | "none"): boolean {
  if (failOn === "none") return false;
  const threshold = SEVERITY_ORDER.indexOf(failOn);
  return result.findings.some((f) => SEVERITY_ORDER.indexOf(f.severity) <= threshold);
}

program
  .command("scan")
  .argument("[path]", "directory to scan", ".")
  .option("--history", "also scan every commit reachable from HEAD", false)
  .option("--history-only", "scan git history but not the working tree", false)
  .option("--max-commits <n>", "limit history scan to the N most recent commits", (v) => Number(v))
  .option("--range <rev>", "git revision range for the history scan, e.g. main..HEAD")
  .option("-f, --format <format>", "pretty | json | sarif", "pretty")
  .option("-o, --output <file>", "write the report to a file instead of stdout")
  .option("--fail-on <severity>", "exit 1 when a finding of this severity or above exists (critical|high|medium|low|none)", "low")
  .option("-c, --config <file>", `path to a ${CONFIG_FILENAME} file`)
  .option("-q, --quiet", "print nothing on success", false)
  .action((path: string, o) => {
    const result = scan(path, {
      history: o.history || o.historyOnly ? { maxCommits: o.maxCommits, range: o.range } : false,
      historyOnly: o.historyOnly,
      configPath: o.config,
    });
    const out = render(result, o.format);
    if (o.output) {
      mkdirSync(resolve(o.output, ".."), { recursive: true });
      writeFileSync(o.output, out);
      if (!o.quiet) console.error(pc.dim(`Report written to ${o.output}`));
      if (o.format === "pretty" || !o.quiet) console.error(formatPretty(result).split("\n").slice(-2).join("\n"));
    } else if (!(o.quiet && result.findings.length === 0)) {
      console.log(out);
    }
    process.exitCode = exceeds(result, o.failOn) ? 1 : 0;
  });

program
  .command("protect")
  .description("scan only the staged changes; intended for a pre-commit hook")
  .option("-c, --config <file>", `path to a ${CONFIG_FILENAME} file`)
  .action((o) => {
    const root = process.cwd();
    const findings = scanStaged(root, loadConfig(root, o.config));
    if (findings.length === 0) {
      console.log(pc.green("✔ leaklens: staged changes are clean."));
      return;
    }
    console.log(pc.red(`✖ leaklens blocked the commit: ${findings.length} secret(s) in staged changes.\n`));
    for (const f of findings) console.log(formatFinding(f));
    console.log(pc.dim(`\nAdd "leaklens:ignore" to a line to suppress a false positive, or move the value to an environment variable.`));
    process.exitCode = 1;
  });

program
  .command("install-hook")
  .description("install a git pre-commit hook that runs `leaklens protect`")
  .action(() => {
    const hooksDir = join(process.cwd(), ".git", "hooks");
    if (!existsSync(hooksDir)) {
      console.error(pc.red("Not a git repository (no .git/hooks directory)."));
      process.exitCode = 1;
      return;
    }
    const hook = join(hooksDir, "pre-commit");
    const script = "#!/bin/sh\n# Installed by leaklens\nnpx --no-install leaklens protect || exec npx leaklens protect\n";
    writeFileSync(hook, script);
    chmodSync(hook, 0o755);
    console.log(pc.green(`✔ pre-commit hook installed at ${hook}`));
  });

program
  .command("baseline")
  .argument("[path]", "directory to scan", ".")
  .description(`write every current finding's fingerprint into ${CONFIG_FILENAME} so only new secrets are reported`)
  .option("--history", "include git history findings", false)
  .action((path: string, o) => {
    const root = resolve(path);
    const result = scan(root, { history: o.history });
    const file = join(root, CONFIG_FILENAME);
    const existing = existsSync(file) ? readFileSync(file, "utf8") : "";
    const current = loadConfig(root);
    const fps = Array.from(new Set([...current.baseline, ...result.findings.map((f) => f.fingerprint)]));
    const doc = { ignorePaths: current.ignorePaths.filter((p) => !existing || existing.includes(p)), disabledRules: current.disabledRules, allowSecrets: current.allowSecrets, baseline: fps };
    writeFileSync(file, `# LeakLens configuration. Baselined fingerprints are accepted findings; remove one to surface it again.\n` + stringify(doc));
    console.log(pc.green(`✔ ${result.findings.length} finding(s) baselined into ${file}`));
  });

program
  .command("rules")
  .description("list the detection rules")
  .option("-f, --format <format>", "table | json", "table")
  .action((o) => {
    if (o.format === "json") {
      console.log(JSON.stringify(rules.map(({ id, name, severity, description }) => ({ id, name, severity, description })), null, 2));
      return;
    }
    for (const r of rules) console.log(`${r.severity.padEnd(8)} ${r.id.padEnd(30)} ${r.name}`);
    console.log(pc.dim(`\n${rules.length} rules`));
  });

program.parseAsync(process.argv);
