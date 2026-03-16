import { PlatformTab, PlatformContent } from "./types";

interface Props {
  tab: PlatformTab;
  content: PlatformContent;
  assetColor: string;
  brandName: string;
  headlines: string[];
}

export function PlatformCreative({ tab, content, assetColor, brandName, headlines }: Props) {
  if (tab === "Headlines") return <HeadlinesCreative headlines={headlines} />;
  if (tab === "Google Ad") return <GoogleAdCreative content={content} />;
  if (tab === "Email") return <EmailCreative content={content} assetColor={assetColor} />;
  if (tab === "WhatsApp") return <WhatsAppCreative content={content} brandName={brandName} />;
  if (tab === "SMS") return <SMSCreative content={content} />;

  // Instagram, Facebook Ad, Twitter/X — visual creative
  const aspect = tab === "Instagram" ? "1/1" : "1.91/1";
  const headlineSize = tab === "Instagram" ? "text-lg" : "text-base";

  return (
    <div
      className="rounded-xl border border-border overflow-hidden w-full"
      style={{ aspectRatio: aspect }}
    >
      <div className="relative w-full h-full" style={{ backgroundColor: assetColor }}>
        <div className="absolute bottom-0 left-0 right-0 bg-foreground/75 backdrop-blur-sm p-5" style={{ height: "30%" }}>
          <p className={`font-display ${headlineSize} text-background leading-tight`}>
            {tab === "Instagram"
              ? "The coffee Lagos deserved"
              : tab === "Facebook Ad"
              ? "Quality meets connection"
              : "Lagos coffee, elevated"}
          </p>
          <p className="text-primary text-[13px] font-ui mt-1.5">Order your first bag today →</p>
        </div>
      </div>
    </div>
  );
}

function HeadlinesCreative({ headlines }: { headlines: string[] }) {
  return (
    <div className="space-y-3">
      {headlines.map((h, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
          <p className="font-display text-base text-foreground flex-1">{h}</p>
          <button className="text-[12px] font-ui px-3 py-1.5 rounded-md border border-primary text-primary hover:bg-primary/10 transition-colors flex-shrink-0">
            Use this
          </button>
        </div>
      ))}
      <button className="text-[12px] font-ui text-primary hover:underline mt-2">Generate more</button>
    </div>
  );
}

function GoogleAdCreative({ content }: { content: PlatformContent }) {
  return (
    <div className="rounded-xl border border-border bg-card min-h-[160px] overflow-hidden">
      <div className="h-[3px] bg-[hsl(217,89%,61%)]" />
      <div className="p-5">
        <p className="text-lg font-ui font-medium" style={{ color: "hsl(217,89%,61%)" }}>
          {content.headline}
        </p>
        <p className="text-[12px] text-muted-foreground font-ui mt-1">roastandco.com</p>
        <p className="text-sm text-foreground font-ui mt-2 leading-relaxed">{content.copy}</p>
      </div>
    </div>
  );
}

function EmailCreative({ content, assetColor }: { content: PlatformContent; assetColor: string }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden max-w-[480px]">
      <div className="p-4 border-b border-border">
        <p className="text-sm font-ui font-medium text-foreground">Subject: {content.subject}</p>
      </div>
      <div className="h-40" style={{ backgroundColor: assetColor }} />
      <div className="p-4">
        <p className="text-[13px] font-ui text-foreground leading-[1.7] whitespace-pre-line">{content.copy}</p>
      </div>
    </div>
  );
}

function WhatsAppCreative({ content, brandName }: { content: PlatformContent; brandName: string }) {
  return (
    <div className="rounded-[20px] border border-border overflow-hidden max-w-[320px] bg-muted/30">
      <div className="h-10 flex items-center px-4" style={{ backgroundColor: "#128C7E" }}>
        <span className="text-[13px] font-ui font-medium text-white">{brandName}</span>
      </div>
      <div className="p-4">
        <div className="bg-card rounded-xl rounded-tl-none p-3 shadow-sm">
          <p className="text-[13px] font-ui text-foreground leading-relaxed">{content.copy}</p>
        </div>
      </div>
    </div>
  );
}

function SMSCreative({ content }: { content: PlatformContent }) {
  return (
    <div className="rounded-[20px] border border-border overflow-hidden max-w-[320px] bg-muted/30">
      <div className="p-4">
        <div className="bg-card rounded-xl p-3 shadow-sm">
          <p className="text-[13px] font-ui text-foreground leading-relaxed">{content.copy}</p>
        </div>
        <p className="text-[11px] text-muted-foreground font-ui mt-2 text-right">{content.charCount}</p>
      </div>
    </div>
  );
}
