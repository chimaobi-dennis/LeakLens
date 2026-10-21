import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import type { LeakLensConfig } from "./types.js";

export const CONFIG_FILENAME = ".leaklens.yml";

export const DEFAULT_IGNORE_PATHS = [
  "node_modules/",
  ".git/",
  "dist/",
  "build/",
  "coverage/",
  ".next/",
  "vendor/",
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "bun.lock",
  "bun.lockb",
  "Cargo.lock",
  "poetry.lock",
  "composer.lock",
  "Gemfile.lock",
  ".min.js",
  ".min.css",
  ".map",
];

export const defaultConfig: LeakLensConfig = {
  ignorePaths: [...DEFAULT_IGNORE_PATHS],
  disabledRules: [],
  allowSecrets: [],
  baseline: [],
  maxFileSize: 1024 * 1024,
};

/** Load `.leaklens.yml` from the scan root if present, merged over the defaults. */
export function loadConfig(root: string, overridePath?: string): LeakLensConfig {
  const file = overridePath ?? join(root, CONFIG_FILENAME);
  if (!existsSync(file)) return { ...defaultConfig, ignorePaths: [...defaultConfig.ignorePaths] };
  const raw = (parse(readFileSync(file, "utf8")) ?? {}) as Partial<Record<keyof LeakLensConfig, unknown>>;
  const list = (v: unknown): string[] => (Array.isArray(v) ? v.map(String) : []);
  return {
    ignorePaths: [...defaultConfig.ignorePaths, ...list(raw.ignorePaths)],
    disabledRules: list(raw.disabledRules),
    allowSecrets: list(raw.allowSecrets),
    baseline: list(raw.baseline),
    maxFileSize: typeof raw.maxFileSize === "number" ? raw.maxFileSize : defaultConfig.maxFileSize,
  };
}

export function isIgnoredPath(relPath: string, config: LeakLensConfig): boolean {
  const normalised = relPath.replace(/\\/g, "/");
  return config.ignorePaths.some((frag) => normalised.includes(frag) || normalised.endsWith(frag.replace(/\/$/, "")));
}
