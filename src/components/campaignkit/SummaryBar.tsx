import { BriefData } from "./types";

interface Props {
  assetColor: string;
  brief: BriefData;
  onEdit: () => void;
  onRegenerate: () => void;
}

export function SummaryBar({ assetColor, brief, onEdit, onRegenerate }: Props) {
  return (
    <div className="h-14 rounded-xl border border-border bg-card flex items-center px-4 gap-3 mb-4">
      <div className="w-10 h-10 rounded-md flex-shrink-0" style={{ backgroundColor: assetColor }} />
      <span className="text-[12px] font-ui px-2.5 py-1 rounded-full border border-border bg-muted/50 text-foreground">
        {brief.campaignGoal}
      </span>
      <span className="text-[12px] font-ui px-2.5 py-1 rounded-full border border-border bg-muted/50 text-foreground">
        {brief.tone}
      </span>
      <div className="flex-1" />
      <button onClick={onEdit} className="text-[12px] font-ui text-primary hover:underline">
        Edit brief
      </button>
      <button
        onClick={onRegenerate}
        className="text-[12px] font-ui px-3 py-1.5 rounded-md border border-primary text-primary hover:bg-primary/10 transition-colors"
      >
        Regenerate all
      </button>
    </div>
  );
}
