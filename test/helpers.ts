import { defaultConfig, type LeakLensConfig } from "../src/index.js";

export const config = (): LeakLensConfig => ({ ...defaultConfig, ignorePaths: [...defaultConfig.ignorePaths] });

/** Build a fake JWT with the given payload; signature is junk. All fixtures are synthetic. */
export function fakeJwt(payload: Record<string, unknown>): string {
  const b64 = (s: string) => Buffer.from(s).toString("base64url");
  return `${b64(JSON.stringify({ alg: "HS256", typ: "JWT" }))}.${b64(JSON.stringify(payload))}.${"x".repeat(43)}`;
}
