import { useState } from "react";
import { ArrowLeft, Sparkles, Dna } from "lucide-react";
import type { DocType } from "@/pages/DocStudio";

interface Props {
  docType: DocType;
  onBack: () => void;
  onGenerate: () => void;
  loading: boolean;
}

const descriptions: Record<string, string> = {
  "One-Pager": "Create a single-page brand or product overview",
  "Pitch Deck": "Build a compelling investor presentation",
  "Client Proposal": "Draft a professional business proposal",
  "Rate Card": "Outline your services and pricing",
  "Case Study": "Document your results and impact",
  "Project Brief": "Define scope, goals and deliverables",
  "Invoice Cover Letter": "Accompany invoices with a professional letter",
  "Partnership Proposal": "Propose a strategic collaboration",
};

export function DocBrief({ docType, onBack, onGenerate, loading }: Props) {
  const [purpose, setPurpose] = useState("Brand overview");
  const [audience, setAudience] = useState("Potential wholesale partners and investors");
  const [keyMessage, setKeyMessage] = useState(
    "Nordform is Stockholm's science-first functional wellness brand — evidence-based supplements for people who are skeptical of wellness culture"
  );
  const [keyPoints, setKeyPoints] = useState(
    "1. Science-first positioning and honest communication\n2. Product quality and evidence-backed formulas\n3. Target audience and Swedish market opportunity"
  );
  const [tone, setTone] = useState("Minimal and refined");
  const [includeBrandColors, setIncludeBrandColors] = useState(true);

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-[13px] font-ui text-primary hover:text-primary/80 mb-5 transition-colors"
      >
        <ArrowLeft size={14} /> Back to DocStudio
      </button>

      <span className="inline-block text-[10px] font-ui bg-primary/15 text-primary rounded-[10px] px-2.5 py-0.5 mb-2">
        {docType}
      </span>
      <h2 className="font-display text-[22px] text-foreground">{docType}</h2>
      <p className="text-[13px] text-muted-foreground mt-1 mb-6">{descriptions[docType] || ""}</p>

      <div className="rounded-xl border border-border p-7 space-y-5">
        <div>
          <label className="block text-[12px] font-ui font-medium text-foreground mb-1.5">Purpose</label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full h-10 rounded-lg border border-border bg-background px-3 text-[13px] font-ui text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {["Brand overview", "Product launch", "Partnership intro", "Investor brief", "Event summary"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[12px] font-ui font-medium text-foreground mb-1.5">Who is this for</label>
          <input
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full h-10 rounded-lg border border-border bg-background px-3 text-[13px] font-ui text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="block text-[12px] font-ui font-medium text-foreground mb-1.5">Key message</label>
          <textarea
            rows={2}
            value={keyMessage}
            onChange={(e) => setKeyMessage(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-[13px] font-ui text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>

        <div>
          <label className="block text-[12px] font-ui font-medium text-foreground mb-1.5">Three key points to include</label>
          <textarea
            rows={3}
            value={keyPoints}
            onChange={(e) => setKeyPoints(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-[13px] font-ui text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>

        <div>
          <label className="block text-[12px] font-ui font-medium text-foreground mb-1.5">Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full h-10 rounded-lg border border-border bg-background px-3 text-[13px] font-ui text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {["Professional", "Warm and approachable", "Bold and direct", "Minimal and refined"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-[13px] font-ui text-foreground">Include brand colors</label>
          <button
            onClick={() => setIncludeBrandColors(!includeBrandColors)}
            className={`relative w-11 h-6 rounded-full transition-colors ${includeBrandColors ? "bg-primary" : "bg-input"}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-background shadow-lg transition-transform ${includeBrandColors ? "translate-x-5" : "translate-x-0"}`}
            />
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-card border border-border p-3 mt-4 flex items-start gap-2.5">
        <Dna size={14} className="text-primary mt-0.5 shrink-0" />
        <p className="text-[12px] text-muted-foreground leading-relaxed">
          Brand voice, colors and positioning will be pulled automatically from your Nordform Brand DNA.
        </p>
      </div>

      <button
        onClick={onGenerate}
        disabled={loading}
        className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-ui text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors mt-6 disabled:opacity-60"
      >
        {loading ? (
          <span className="animate-pulse">Generating...</span>
        ) : (
          <>
            <Sparkles size={16} /> Generate document
          </>
        )}
      </button>
      <p className="text-[11px] text-muted-foreground text-center mt-2 font-ui">Powered by your Brand DNA</p>
    </div>
  );
}
