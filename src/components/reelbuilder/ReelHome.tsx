import { Plus, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  brandName: string;
  onNewReel: () => void;
  onOpenRecent: () => void;
}

const recentReels = [
  {
    name: "Roast & Co Origin Story",
    platform: "Instagram Reels",
    duration: "60s · 5 scenes",
    date: "Created 4 days ago",
    colors: ["hsl(213 52% 14%)", "hsl(213 52% 17%)", "hsl(213 52% 12%)"],
  },
  {
    name: "Meet Your Morning Series — Ep.1",
    platform: "TikTok",
    duration: "45s · 4 scenes",
    date: "Created 1 week ago",
    colors: ["hsl(220 20% 13%)", "hsl(220 20% 16%)", "hsl(220 20% 11%)"],
  },
  {
    name: "Lagos Coffee Culture",
    platform: "YouTube Shorts",
    duration: "90s · 7 scenes",
    date: "Created 2 weeks ago",
    colors: ["hsl(30 20% 12%)", "hsl(30 20% 15%)", "hsl(30 20% 10%)"],
  },
];

const stats = [
  { label: "Total reels", value: "8" },
  { label: "Total scenes", value: "42" },
  { label: "This month", value: "2" },
];

export function ReelHome({ brandName, onNewReel, onOpenRecent }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-foreground">ReelBuilder</h1>
          <p className="text-[13px] text-muted-foreground mt-1">{brandName}</p>
        </div>
        <Button onClick={onNewReel} className="h-12 px-6 gap-2">
          <Plus size={18} /> New reel
        </Button>
      </div>

      {/* Recent reels */}
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-4">Recent reels</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {recentReels.map((reel, i) => (
          <div
            key={i}
            onClick={onOpenRecent}
            className="rounded-xl border border-border overflow-hidden cursor-pointer hover:-translate-y-px transition-transform bg-card"
          >
            {/* Preview strip */}
            <div className="h-[140px] relative flex">
              {reel.colors.map((c, ci) => (
                <div key={ci} className="flex-1" style={{ backgroundColor: c }} />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(212,160,23,0.9)" }}>
                  <Play size={18} className="text-primary-foreground ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>
            {/* Info */}
            <div className="p-3.5 px-4">
              <span className="inline-block text-[10px] px-2 py-0.5 rounded-[10px] bg-primary/15 text-primary mb-1.5">{reel.platform}</span>
              <p className="text-sm font-medium text-foreground">{reel.name}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{reel.duration}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-[11px] text-muted-foreground">{reel.date}</p>
                <span className="text-[12px] text-primary cursor-pointer">Open</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5 text-center">
            <p className="font-display text-2xl text-foreground">{s.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
