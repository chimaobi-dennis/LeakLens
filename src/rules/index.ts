import type { Rule } from "../types.js";

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const json = Buffer.from(parts[1]!.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export const rules: Rule[] = [
  {
    id: "aws-access-key-id",
    name: "AWS Access Key ID",
    description: "Amazon Web Services access key identifier.",
    severity: "critical",
    pattern: /\b((?:AKIA|ASIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA)[A-Z0-9]{16})\b/g,
    remediation: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_RotateAccessKey",
  },
  {
    id: "aws-secret-access-key",
    name: "AWS Secret Access Key",
    description: "Amazon Web Services secret access key assigned near an aws keyword.",
    severity: "critical",
    keywords: ["aws", "secret"],
    pattern: /(?:aws)?_?secret_?(?:access)?_?key["']?\s*[:=]\s*["']?([A-Za-z0-9/+=]{40})\b/gi,
    minEntropy: 3.5,
  },
  {
    id: "github-token",
    name: "GitHub Token",
    description: "GitHub personal access, OAuth, app or refresh token.",
    severity: "critical",
    pattern: /\b((?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36,255}|github_pat_[A-Za-z0-9_]{22,255})\b/g,
    remediation: "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens",
  },
  {
    id: "gitlab-token",
    name: "GitLab Token",
    description: "GitLab personal access token.",
    severity: "critical",
    pattern: /\b(glpat-[A-Za-z0-9_-]{20,})\b/g,
  },
  {
    id: "slack-token",
    name: "Slack Token",
    description: "Slack bot, user, app or legacy token.",
    severity: "high",
    pattern: /\b(xox[baprs]-[A-Za-z0-9-]{10,})\b/g,
  },
  {
    id: "slack-webhook",
    name: "Slack Incoming Webhook",
    description: "Slack webhook URL that allows posting to a channel.",
    severity: "medium",
    pattern: /(https:\/\/hooks\.slack\.com\/services\/T[A-Z0-9]+\/B[A-Z0-9]+\/[A-Za-z0-9]{20,})/g,
  },
  {
    id: "stripe-secret-key",
    name: "Stripe Secret Key",
    description: "Stripe live or test secret / restricted key.",
    severity: "critical",
    pattern: /\b((?:sk|rk)_(?:live|test)_[A-Za-z0-9]{20,})\b/g,
    remediation: "https://docs.stripe.com/keys#rolling-keys",
  },
  {
    id: "openai-api-key",
    name: "OpenAI API Key",
    description: "OpenAI secret API key.",
    severity: "high",
    pattern: /\b(sk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{32,})\b/g,
    validate: (s) => !s.startsWith("sk-ant-"),
  },
  {
    id: "anthropic-api-key",
    name: "Anthropic API Key",
    description: "Anthropic (Claude) API key.",
    severity: "high",
    pattern: /\b(sk-ant-[A-Za-z0-9_-]{32,})\b/g,
  },
  {
    id: "google-api-key",
    name: "Google API Key",
    description: "Google Cloud / Maps / Firebase API key.",
    severity: "high",
    pattern: /\b(AIza[0-9A-Za-z_-]{35})\b/g,
    remediation: "https://cloud.google.com/docs/authentication/api-keys",
  },
  {
    id: "google-oauth-client-secret",
    name: "Google OAuth Client Secret",
    description: "Google OAuth 2.0 client secret.",
    severity: "high",
    pattern: /\b(GOCSPX-[A-Za-z0-9_-]{28})\b/g,
  },
  {
    id: "supabase-service-role-key",
    name: "Supabase Service Role Key",
    description: "Supabase JWT whose role claim is service_role. It bypasses row level security entirely.",
    severity: "critical",
    pattern: /\b(eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,})\b/g,
    validate: (s) => decodeJwtPayload(s)?.role === "service_role",
    remediation: "https://supabase.com/docs/guides/api/api-keys",
  },
  {
    id: "jwt",
    name: "JSON Web Token",
    description: "Signed JWT. May be a session token or a provider key.",
    severity: "medium",
    pattern: /\b(eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,})\b/g,
    validate: (s) => {
      const payload = decodeJwtPayload(s);
      return payload !== null && payload.role !== "service_role";
    },
  },
  {
    id: "private-key",
    name: "Private Key",
    description: "PEM encoded private key block (RSA, EC, DSA, OpenSSH, PGP).",
    severity: "critical",
    pattern: /(-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP |ENCRYPTED )?PRIVATE KEY(?: BLOCK)?-----)/g,
  },
  {
    id: "twilio-api-key",
    name: "Twilio API Key",
    description: "Twilio API key SID.",
    severity: "high",
    pattern: /\b(SK[0-9a-fA-F]{32})\b/g,
    keywords: ["twilio"],
  },
  {
    id: "sendgrid-api-key",
    name: "SendGrid API Key",
    description: "SendGrid API key.",
    severity: "high",
    pattern: /\b(SG\.[A-Za-z0-9_-]{22}\.[A-Za-z0-9_-]{43})\b/g,
  },
  {
    id: "mailgun-api-key",
    name: "Mailgun API Key",
    description: "Mailgun private API key.",
    severity: "high",
    pattern: /\b(key-[0-9a-f]{32})\b/g,
    keywords: ["mailgun"],
  },
  {
    id: "resend-api-key",
    name: "Resend API Key",
    description: "Resend email API key.",
    severity: "high",
    pattern: /\b(re_[A-Za-z0-9]{8}_[A-Za-z0-9]{20,})\b/g,
  },
  {
    id: "npm-token",
    name: "npm Access Token",
    description: "npm granular or classic access token.",
    severity: "high",
    pattern: /\b(npm_[A-Za-z0-9]{36})\b/g,
  },
  {
    id: "pypi-token",
    name: "PyPI API Token",
    description: "PyPI upload token.",
    severity: "high",
    pattern: /\b(pypi-AgEIcHlwaS5vcmc[A-Za-z0-9_-]{50,})\b/g,
  },
  {
    id: "discord-bot-token",
    name: "Discord Bot Token",
    description: "Discord bot token.",
    severity: "high",
    pattern: /\b([MN][A-Za-z0-9]{23,}\.[A-Za-z0-9_-]{6}\.[A-Za-z0-9_-]{27,})\b/g,
    keywords: ["discord"],
  },
  {
    id: "telegram-bot-token",
    name: "Telegram Bot Token",
    description: "Telegram bot API token.",
    severity: "high",
    pattern: /\b([0-9]{8,10}:AA[A-Za-z0-9_-]{33})\b/g,
  },
  {
    id: "heroku-api-key",
    name: "Heroku API Key",
    description: "Heroku platform API key (UUID near a heroku keyword).",
    severity: "high",
    keywords: ["heroku"],
    pattern: /heroku[A-Za-z0-9_ -]*["']?\s*[:=]\s*["']?([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\b/gi,
  },
  {
    id: "database-url",
    name: "Database Connection String with Password",
    description: "Connection URL embedding a username and password.",
    severity: "critical",
    pattern: /\b((?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?|redis|rediss|amqp|mssql):\/\/[^\s:/@"']+:[^\s@"']{3,}@[^\s"']+)/gi,
    validate: (s) => !/:\/\/[^:]+:(?:password|pass|secret|xxx+|\$\{|<)/i.test(s),
  },
  {
    id: "basic-auth-url",
    name: "URL with Basic Auth Credentials",
    description: "HTTP(S) URL embedding a username and password.",
    severity: "high",
    pattern: /\b(https?:\/\/[^\s:/@"']+:[^\s@"']{3,}@[^\s"']+)/gi,
    validate: (s) => !/:\/\/[^:]+:(?:password|pass|secret|xxx+|\$\{|<)/i.test(s),
  },
  {
    id: "azure-storage-key",
    name: "Azure Storage Account Key",
    description: "Azure storage account key inside a connection string.",
    severity: "critical",
    pattern: /AccountKey=([A-Za-z0-9+/]{86}==)/g,
  },
  {
    id: "generic-api-key",
    name: "Generic API Key / Secret",
    description: "High entropy value assigned to a variable that looks like a key, secret, token or password.",
    severity: "medium",
    pattern: /(?:api[_-]?key|api[_-]?secret|secret[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret|private[_-]?key|password|passwd|pwd|token|secret)["']?\s*[:=]\s*["']([A-Za-z0-9_\-/+=.!@#$%^&*]{16,})["']/gi,
    minEntropy: 3.6,
    validate: (s) =>
      !/^(?:\$\{|\{\{|<|%|process\.env|os\.environ|your[_-]|xxx|example|changeme|placeholder|replace[_-]?me|test|dummy|sample|todo)/i.test(s) &&
      !/^[a-z]+(?:[_-][a-z]+)*$/i.test(s),
  },
];

export const ruleById = new Map(rules.map((r) => [r.id, r]));
