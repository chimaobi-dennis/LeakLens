import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const dnaCards = [
  { label: "Brand name", value: "Roast & Co" },
  { label: "Industry", value: "Specialty coffee & lifestyle" },
  { label: "Voice", value: "Serious without being earnest" },
  { label: "Target audience", value: "Young Lagos professionals who moved back and want quality made for them" },
  { label: "Positioning", value: "The unclaimed third space between international chains and local street coffee" },
  { label: "Brand references", value: "Aesop, Monocle — intelligent restraint" },
  { label: "Core promise", value: "Coffee that respects your intelligence and your city" },
];

const nextSteps = [
  { label: "Generate a campaign brief from this session", to: "/campaign-kit" },
  { label: "Create brand visuals in ProStudio", to: "/pro-studio" },
  { label: "Build your launch campaign in CampaignKit", to: "/campaign-kit" },
];

export function BrandDNAPanel() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-base text-foreground">Brand DNA</h2>
          <span className="text-[10px] font-ui font-semibold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary">
            Active
          </span>
        </div>
        <p className="text-[12px] font-ui text-muted-foreground mt-0.5">Updated from this session</p>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="px-4 pb-4 space-y-2.5">
          {dnaCards.map((card) => (
            <div key={card.label} className="rounded-lg bg-muted/30 border border-border p-3">
              <p className="text-[10px] font-ui uppercase tracking-[0.1em] text-muted-foreground mb-1">
                {card.label}
              </p>
              <p className="text-[13px] font-ui text-foreground leading-relaxed">{card.value}</p>
            </div>
          ))}

          {/* Suggested next steps */}
          <div className="pt-3">
            <p className="text-[11px] font-ui uppercase tracking-[0.1em] text-muted-foreground mb-2.5">
              Suggested next steps
            </p>
            <div className="space-y-1">
              {nextSteps.map((step) => (
                <Link
                  key={step.label}
                  to={step.to}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[12px] font-ui text-primary/80 hover:text-primary hover:bg-primary/5 transition-colors group"
                >
                  <span className="flex-1">{step.label}</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
