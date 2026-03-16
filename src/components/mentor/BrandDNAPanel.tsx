import { ArrowRight, Flag } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { BrandDNAField } from "./types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BrandDNAPanelProps {
  fields: BrandDNAField[];
  highlightField: string | null;
}

const nextSteps = [
  { label: "Generate a campaign brief from this session", to: "/campaign-kit" },
  { label: "Create brand visuals in ProStudio", to: "/pro-studio" },
  { label: "Build your launch campaign in CampaignKit", to: "/campaign-kit" },
];

export function BrandDNAPanel({ fields, highlightField }: BrandDNAPanelProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-base text-foreground">Brand DNA</h2>
          <span className="text-[10px] font-ui font-semibold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary">
            Active
          </span>
        </div>
        <p className="text-[12px] font-ui text-muted-foreground mt-0.5">Updated from this conversation</p>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="px-4 pb-4 space-y-2.5">
          <TooltipProvider delayDuration={300}>
            {fields.map((field) => (
              <div
                key={field.key}
                className={cn(
                  "rounded-lg bg-muted/30 border border-border p-3 transition-all duration-700",
                  highlightField === field.key && "ring-1 ring-primary/50 bg-primary/5"
                )}
              >
                <div className="flex items-center gap-1 mb-1">
                  <p className="text-[10px] font-ui uppercase tracking-[0.1em] text-muted-foreground">
                    {field.label}
                  </p>
                  {field.value && field.savedFrom && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Flag size={9} className="text-primary cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-[11px]">
                        Saved from {field.savedFrom} · {field.savedTimeAgo}
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                {field.value ? (
                  <p className="text-[13px] font-ui text-foreground leading-relaxed">{field.value}</p>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-ui text-muted-foreground/50">—</span>
                    <span className="text-[10px] font-ui text-muted-foreground">Not yet defined</span>
                  </div>
                )}
              </div>
            ))}
          </TooltipProvider>

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
