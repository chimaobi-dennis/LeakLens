import { Sparkles, Pencil } from "lucide-react";
import { BriefData, campaignGoals, toneOptions } from "./types";
import { Input } from "@/components/ui/input";

interface Props {
  brief: BriefData;
  onChange: (b: BriefData) => void;
  onGenerate: () => void;
}

export function BriefForm({ brief, onChange, onGenerate }: Props) {
  const set = (key: keyof BriefData, val: string) => onChange({ ...brief, [key]: val });

  return (
    <div className="rounded-xl border border-border bg-card p-6 mt-5">
      <div className="flex items-center gap-2 mb-5">
        <h2 className="font-display text-lg text-foreground">Campaign brief</h2>
        <Pencil size={14} className="text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1.5 block">Product name</label>
          <Input value={brief.productName} onChange={(e) => set("productName", e.target.value)} />
        </div>
        <div>
          <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1.5 block">Target audience</label>
          <Input value={brief.targetAudience} onChange={(e) => set("targetAudience", e.target.value)} />
        </div>
        <div>
          <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1.5 block">Campaign goal</label>
          <select
            value={brief.campaignGoal}
            onChange={(e) => set("campaignGoal", e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-ui text-foreground outline-none focus:ring-2 focus:ring-ring"
          >
            {campaignGoals.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1.5 block">Tone</label>
          <select
            value={brief.tone}
            onChange={(e) => set("tone", e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-ui text-foreground outline-none focus:ring-2 focus:ring-ring"
          >
            {toneOptions.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1.5 block">Key benefit</label>
          <Input value={brief.keyBenefit} onChange={(e) => set("keyBenefit", e.target.value)} />
        </div>
        <div>
          <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1.5 block">Call to action</label>
          <Input value={brief.callToAction} onChange={(e) => set("callToAction", e.target.value)} />
        </div>
      </div>

      <button
        onClick={onGenerate}
        className="w-full h-12 mt-6 rounded-lg bg-primary text-primary-foreground font-ui text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
      >
        <Sparkles size={16} />
        Generate Campaign
      </button>
      <p className="text-[11px] text-muted-foreground text-center mt-2 font-ui">Generates 8 platform creatives</p>
    </div>
  );
}
