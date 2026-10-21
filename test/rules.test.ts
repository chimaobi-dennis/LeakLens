import { describe, it, expect } from "vitest";
import { scanContent, rules } from "../src/index.js";
import { config, fakeJwt } from "./helpers.js";

// Every value below is synthetic and matches only the documented shape of each provider's key.
const cases: Array<[ruleId: string, sample: string]> = [
  ["aws-access-key-id", "AWS_KEY=AKIAIOSFODNN7EXAMPLE"],
  ["aws-secret-access-key", 'aws_secret_access_key = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"'],
  ["github-token", "token: ghp_" + "a1B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8"],
  ["github-token", "github_pat_" + "11ABCDEFG0" + "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"],
  ["gitlab-token", "glpat-" + "AbCdEfGhIjKlMnOpQrSt"],
  ["slack-token", "xoxb-" + "123456789012-1234567890123-AbCdEfGhIjKlMnOpQrStUvWx"],
  ["slack-webhook", "https://hooks.slack.com/services/T00000000/B00000000/" + "XXXXXXXXXXXXXXXXXXXXXXXX"],
  ["stripe-secret-key", "STRIPE=sk_live_" + "4eC39HqLyjWDarjtT1zdp7dc"],
  ["openai-api-key", "OPENAI_API_KEY=sk-proj-" + "AbCdEfGhIjKlMnOpQrStUvWxYz0123456789abcd"],
  ["anthropic-api-key", "sk-ant-" + "api03-AbCdEfGhIjKlMnOpQrStUvWxYz0123456789abcd"],
  ["google-api-key", "key=AIza" + "SyA1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q"],
  ["google-oauth-client-secret", "GOCSPX-" + "AbCdEfGhIjKlMnOpQrStUvWxYz01"],
  ["supabase-service-role-key", `SERVICE_KEY=${fakeJwt({ iss: "supabase", role: "service_role" })}`],
  ["jwt", `session=${fakeJwt({ sub: "123", role: "anon" })}`],
  ["private-key", "-----BEGIN RSA PRIVATE KEY-----\nMIIE...\n-----END RSA PRIVATE KEY-----"],
  ["private-key", "-----BEGIN OPENSSH PRIVATE KEY-----"],
  ["twilio-api-key", "TWILIO_API_KEY=SK" + "0123456789abcdef0123456789abcdef"],
  ["sendgrid-api-key", "SG." + "AbCdEfGhIjKlMnOpQrStUv" + "." + "AbCdEfGhIjKlMnOpQrStUvWxYz0123456789abcdefg"],
  ["mailgun-api-key", "MAILGUN_KEY=key-" + "0123456789abcdef0123456789abcdef"],
  ["resend-api-key", "re_" + "AbCdEfGh" + "_" + "AbCdEfGhIjKlMnOpQrStUvWx"],
  ["npm-token", "//registry.npmjs.org/:_authToken=npm_" + "AbCdEfGhIjKlMnOpQrStUvWxYz0123456789"],
  ["telegram-bot-token", "BOT=123456789:AA" + "AbCdEfGhIjKlMnOpQrStUvWxYz0123456"],
  ["heroku-api-key", "HEROKU_API_KEY=12345678-1234-1234-1234-123456789abc"],
  ["database-url", "DATABASE_URL=postgres://admin:S3cretP%40ss@db.example.com:5432/app"],
  ["basic-auth-url", "https://deploy:hunter2hunter2@git.example.com/repo.git"],
  ["azure-storage-key", "DefaultEndpointsProtocol=https;AccountName=x;AccountKey=" + "A".repeat(86) + "==;"],
  ["generic-api-key", 'api_key = "9f8e7d6c5b4a39281706f5e4d3c2b1a0ZyXwVu"'],
];

describe("rules", () => {
  it.each(cases)("%s detects a sample", (ruleId, sample) => {
    const findings = scanContent(sample, { file: "x", config: config() });
    expect(findings.map((f) => f.ruleId)).toContain(ruleId);
  });

  it("every rule has a unique id and a global regex", () => {
    const ids = rules.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const r of rules) expect(r.pattern.flags).toContain("g");
  });

  it("does not flag placeholders, env references or plain words", () => {
    const clean = [
      'api_key = "${API_KEY}"',
      'password = "process.env.PASSWORD"',
      'secret = "your-secret-here-please-change"',
      'token = "this_is_a_plain_word_token"',
      "DATABASE_URL=postgres://user:password@localhost/db",
      "AWS_ACCESS_KEY_ID=",
      "const anon = eyJ.not.a.jwt",
    ].join("\n");
    expect(scanContent(clean, { file: "x", config: config() })).toEqual([]);
  });

  it("prefers the specific supabase rule over the generic jwt rule", () => {
    const f = scanContent(`k=${fakeJwt({ role: "service_role" })}`, { file: "x", config: config() });
    expect(f.map((x) => x.ruleId)).toEqual(["supabase-service-role-key"]);
  });
});
