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
          <span className="text-[16px] font-medium font-ui text-foreground">Nordform Brand Overview</span>
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
        <div className="bg-[#2D4A3E] px-12 py-10 border-l-4 border-l-primary">
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#F5F0E8] font-ui">NORDFORM</p>
          <h2 className="font-display text-[28px] text-[#F5F0E8] mt-2">Brand Overview</h2>
          <div className="w-10 h-0.5 bg-[#F5F0E8] mt-3 mb-3" />
          <p className="text-[13px] text-[#F5F0E8]/60">Functional Wellness · Stockholm, Sweden · 2026</p>
        </div>

        {/* Document body */}
        <div className="bg-card px-12 py-10 space-y-8">
          <Section
            title="Who We Are"
            body="Nordform is Stockholm's first science-first functional wellness brand. Built for professionals who are skeptical of wellness culture but serious about performance and recovery. We are evidence-based, honestly communicated, and designed for people who would normally roll their eyes at this category."
          />
          <Section
            title="Our Product"
            body="The Nordform Daily Stack is a three-product morning ritual kit: Lion's Mane focus capsules, Ashwagandha stress capsules, and Reishi sleep capsules. Minimal white packaging with forest green typography. Every ingredient traceable, every claim evidence-backed."
          />
          <Section
            title="Our Audience"
            body="Stockholm professionals 28–42 who are health-conscious, design-aware, and internationally oriented. They read about longevity, are slightly embarrassed by the wellness industry, but genuinely interested in optimising how they feel. They want the science without the noise."
          />
          <Section
            title="The Opportunity"
            body="The Swedish functional wellness market is growing but trust-deficient. Most brands overclaim. Nordform owns the position of honest communication — the supplement brand for people who hate supplement brands. Ritual and consistency over miracle results."
          />
        </div>

        {/* Footer */}
        <div className="border-t border-border px-12 py-5 flex items-center justify-between">
          <span className="text-[12px] text-muted-foreground">nordform.se</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#2D4A3E]" />
          <span className="text-[12px] text-muted-foreground">hello@nordform.se</span>
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
