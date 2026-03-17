import { Plus } from "lucide-react";
import { useBrand } from "@/hooks/use-brand";

interface CampaignSummary {
  id: string;
  name: string;
  goalTone: string;
  assetColor: string;
  platforms: { color: string }[];
  status: string;
  statusBg: string;
  statusColor: string;
  creatives: string;
  date: string;
}

const campaigns: CampaignSummary[] = [
  {
    id: "c1",
    name: "Stockholm Launch — First Purchase Drive",
    goalTone: "Drive first purchase · Confident and warm",
    assetColor: "#2D4A3E",
    platforms: [
      { color: "#E1306C" },
      { color: "#4267B2" },
      { color: "#128C7E" },
      { color: "#1DA1F2" },
    ],
    status: "Active",
    statusBg: "rgba(26, 58, 26, 0.8)",
    statusColor: "#4ADE80",
    creatives: "8 creatives",
    date: "Created 5 days ago",
  },
  {
    id: "c2",
    name: "Social Proof — Brand Awareness",
    goalTone: "Build awareness · Minimal and considered",
    assetColor: "#1A2A3A",
    platforms: [
      { color: "#E1306C" },
      { color: "#4267B2" },
      { color: "#1DA1F2" },
    ],
    status: "Scheduled",
    statusBg: "rgba(45, 74, 62, 0.3)",
    statusColor: "#2D4A3E",
    creatives: "6 creatives",
    date: "Created 2 weeks ago",
  },
  {
    id: "c3",
    name: "Product Feature — Daily Stack",
    goalTone: "Launch product · Bold and direct",
    assetColor: "#1A3A38",
    platforms: [
      { color: "#E1306C" },
      { color: "#4285F4" },
      { color: "#EA4335" },
    ],
    status: "Completed",
    statusBg: "rgba(42, 42, 42, 0.8)",
    statusColor: "#8A96A3",
    creatives: "6 creatives",
    date: "Created 1 month ago",
  },
];

const stats = [
  { value: "12", label: "Campaigns created" },
  { value: "96", label: "Creatives generated" },
  { value: "3", label: "Campaigns this month" },
];

interface Props {
  onNewCampaign: () => void;
  onViewCampaign: (id: string) => void;
}

export function CampaignHome({ onNewCampaign, onViewCampaign }: Props) {
  const { activeBrand } = useBrand();

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-foreground">Campaigns</h1>
          <p className="text-[13px] font-ui text-muted-foreground mt-1">
            {activeBrand?.name || "Brand"}
          </p>
        </div>
        <button
          onClick={onNewCampaign}
          className="h-12 px-6 rounded-lg bg-primary text-primary-foreground font-ui text-[14px] font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Plus size={18} />
          New campaign
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-4">
          Recent campaigns
        </h2>
        <div className="flex flex-col gap-3">
          {campaigns.map((c) => (
            <div
              key={c.id}
              onClick={() => onViewCampaign(c.id)}
              className="rounded-xl border border-border bg-card p-5 cursor-pointer hover:-translate-y-px hover:border-primary/40 transition-all flex items-center gap-4"
            >
              <div
                className="w-14 h-14 rounded-lg flex-shrink-0"
                style={{ backgroundColor: c.assetColor }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-ui text-[15px] font-medium text-foreground truncate">
                  {c.name}
                </p>
                <p className="text-[12px] font-ui text-muted-foreground mt-0.5">
                  {c.goalTone}
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  {c.platforms.map((p, i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                  ))}
                </div>
                <p className="text-[11px] font-ui text-muted-foreground mt-1">
                  {c.date}
                </p>
              </div>
              <div className="flex-shrink-0 text-right w-[120px]">
                <span
                  className="inline-block rounded-[10px] px-2.5 py-0.5 text-[11px] font-ui font-medium"
                  style={{
                    backgroundColor: c.statusBg,
                    color: c.statusColor,
                  }}
                >
                  {c.status}
                </span>
                <p className="text-[11px] font-ui text-muted-foreground mt-1">
                  {c.creatives}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewCampaign(c.id);
                  }}
                  className="text-[12px] font-ui text-primary hover:underline mt-1"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button className="text-[12px] font-ui text-primary hover:underline">
            View all campaigns
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg bg-muted/50 p-4"
          >
            <p className="text-2xl font-ui font-medium text-foreground">
              {s.value}
            </p>
            <p className="text-[11px] font-ui text-muted-foreground mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
