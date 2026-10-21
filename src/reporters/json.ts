import type { ScanResult } from "../types.js";

export function formatJson(result: ScanResult): string {
  return JSON.stringify({ tool: "leaklens", version: 1, ...result }, null, 2);
}
