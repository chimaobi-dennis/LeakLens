import { describe, it, expect } from "vitest";
import { scanContent, shannonEntropy, redact, fingerprint, looksBinary } from "../src/index.js";
import { config } from "./helpers.js";

const SAMPLE = "AKIAIOSFODNN7EXAMPLE";

describe("engine", () => {
  it("reports correct line and column", () => {
    const text = `line one\nline two\n  key = ${SAMPLE}\n`;
    const [f] = scanContent(text, { file: "a.txt", config: config() });
    expect(f).toMatchObject({ file: "a.txt", line: 3, column: 9, ruleId: "aws-access-key-id" });
  });

  it("never stores the raw secret", () => {
    const [f] = scanContent(SAMPLE, { file: "a", config: config() });
    expect(JSON.stringify(f)).not.toContain(SAMPLE);
    expect(f!.redacted).toBe("AKIA************MPLE");
  });

  it("honours inline leaklens:ignore", () => {
    expect(scanContent(`${SAMPLE} // leaklens:ignore`, { file: "a", config: config() })).toEqual([]);
  });

  it("honours disabledRules, allowSecrets and baseline", () => {
    const c = config();
    expect(scanContent(SAMPLE, { file: "a", config: { ...c, disabledRules: ["aws-access-key-id"] } })).toEqual([]);
    expect(scanContent(SAMPLE, { file: "a", config: { ...c, allowSecrets: ["EXAMPLE$"] } })).toEqual([]);
    const fp = fingerprint("aws-access-key-id", SAMPLE);
    expect(scanContent(SAMPLE, { file: "a", config: { ...c, baseline: [fp] } })).toEqual([]);
  });

  it("fingerprints are stable and independent of location", () => {
    const a = scanContent(`x\n${SAMPLE}`, { file: "a", config: config() })[0]!;
    const b = scanContent(SAMPLE, { file: "b", config: config() })[0]!;
    expect(a.fingerprint).toBe(b.fingerprint);
    expect(a.fingerprint).toHaveLength(16);
  });

  it("computes entropy", () => {
    expect(shannonEntropy("aaaa")).toBe(0);
    expect(shannonEntropy("abcd")).toBe(2);
    expect(shannonEntropy("wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY")).toBeGreaterThan(4);
  });

  it("redacts short and long values", () => {
    expect(redact("abc")).toBe("***");
    expect(redact("abcdefghijkl")).toBe("ab********kl");
  });

  it("detects binary buffers", () => {
    expect(looksBinary(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x00]))).toBe(true);
    expect(looksBinary(Buffer.from("plain text"))).toBe(false);
  });
});
