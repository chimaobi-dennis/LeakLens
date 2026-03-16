import { ArrowLeft, Pencil, Share2 } from "lucide-react";
import type { DocType } from "@/pages/DocStudio";

interface Props {
  docType: DocType;
  onBackToHome: () => void;
  onEditBrief: () => void;
}

export function DocPreview({ docType, onBackToHome, onEditBrief }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-6">
      {/* Back */}
      <button
        onClick={onEditBrief}
        className="flex items-center gap-1.5 text-[13px] font-ui text-primary hover:text-primary/80 mb-5 transition-colors"
      >
        <ArrowLeft size={14} /> Edit brief
      </button>

      {/* Action bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-[16px] font-medium font-ui text-foreground">Roast & Co Brand Overview</span>
          <Pencil size={14} className="text-muted-foreground cursor-pointer hover:text-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <button className="h-10 px-4 rounded-lg border border-primary text-primary text-[13px] font-ui font-medium hover:bg-primary/10 transition-colors">
            Export as PDF
          </button>
          <button className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-[13px] font-ui font-medium hover:bg-primary/90 transition-colors">
            Export as DOCX
          </button>
          <button className="h-10 w-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Document card */}
      <div className="rounded-xl border border-border overflow-hidden max-w-[720px] mx-auto">
        {/* Document header */}
        <div className="bg-[hsl(213,52%,11%)] dark:bg-[hsl(213,52%,11%)] px-12 py-10 border-l-4 border-l-primary">
          <p className="text-[11px] uppercase tracking-[0.15em] text-primary font-ui">ROAST & CO</p>
          <h2 className="font-display text-[28px] text-[hsl(36,33%,94%)] mt-2">Brand Overview</h2>
          <div className="w-10 h-0.5 bg-primary mt-3 mb-3" />
          <p className="text-[13px] text-[hsl(220,9%,60%)]">Specialty Coffee · Lagos, Nigeria · 2026</p>
        </div>

        {/* Document body */}
        <div className="bg-card px-12 py-10 space-y-8">
          <Section
            title="Who We Are"
            body="Roast & Co is Lagos's first serious specialty coffee brand. Built for people who lived elsewhere, experienced great coffee, moved back, and refused to compromise. We are serious about sourcing. Serious about quality. And unmistakably Lagos."
          />
          <Section
            title="Our Product"
            body="Single-origin beans sourced from across Africa and beyond. Roasted to highlight character not to mask it. Every bag traceable to its farm, its farmer, its story. Available direct-to-consumer and through select wholesale partners."
          />
          <Section
            title="Our Audience"
            body="Young Lagos professionals — 25 to 38 — who have lived elsewhere, hold international standards, and want a brand that respects their intelligence and their city. They are not buying coffee. They are buying the feeling that Lagos finally has something made for them."
          />
          <Section
            title="The Opportunity"
            body="The Lagos specialty coffee market is nascent and underclaimed. International chains feel imported. Street coffee lacks premium positioning. Roast & Co owns the third space — unmistakably local, internationally credible."
          />
        </div>

        {/* Footer */}
        <div className="border-t border-border px-12 py-5 flex items-center justify-between">
          <span className="text-[12px] text-muted-foreground">roastandco.com</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-[12px] text-muted-foreground">hello@roastandco.com</span>
        </div>
      </div>

      {/* Save link */}
      <p className="text-center mt-4">
        <button
          onClick={onBackToHome}
          className="text-[13px] text-primary font-ui hover:text-primary/80 transition-colors"
        >
          Save to library
        </button>
      </p>
    </div>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.15em] text-primary font-ui mb-2">{title}</p>
      <p className="text-[14px] leading-[1.8] text-foreground">{body}</p>
    </div>
  );
}
