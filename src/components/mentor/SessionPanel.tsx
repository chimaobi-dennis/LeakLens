import { Plus, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export type SessionType =
  | "Brand Discovery"
  | "Campaign Strategy"
  | "Customer Insight"
  | "Product Positioning"
  | "Growth Brainstorm"
  | "Pitch Preparation"
  | "Free-form";

const sessionTypeColors: Record<SessionType, string> = {
  "Brand Discovery": "bg-primary/20 text-primary",
  "Campaign Strategy": "bg-blue-500/20 text-blue-400",
  "Customer Insight": "bg-teal-500/20 text-teal-400",
  "Product Positioning": "bg-purple-500/20 text-purple-400",
  "Growth Brainstorm": "bg-emerald-500/20 text-emerald-400",
  "Pitch Preparation": "bg-orange-400/20 text-orange-400",
  "Free-form": "bg-muted text-muted-foreground",
};

interface Session {
  id: string;
  type: SessionType;
  title: string;
  timeAgo: string;
}

const sessions: Session[] = [
  { id: "1", type: "Brand Discovery", title: "Roast & Co identity", timeAgo: "2 days ago" },
  { id: "2", type: "Campaign Strategy", title: "Lagos launch campaign", timeAgo: "5 days ago" },
  { id: "3", type: "Customer Insight", title: "Target audience deep dive", timeAgo: "1 week ago" },
  { id: "4", type: "Product Positioning", title: "Third space positioning", timeAgo: "2 weeks ago" },
  { id: "5", type: "Free-form", title: "Packaging ideas", timeAgo: "3 weeks ago" },
];

const sessionTypes: SessionType[] = [
  "Brand Discovery",
  "Campaign Strategy",
  "Customer Insight",
  "Product Positioning",
  "Growth Brainstorm",
  "Pitch Preparation",
  "Free-form",
];

interface SessionPanelProps {
  activeSessionId: string;
  onSelectSession: (id: string) => void;
}

export function SessionPanel({ activeSessionId, onSelectSession }: SessionPanelProps) {
  const [selectedType, setSelectedType] = useState<SessionType>("Brand Discovery");
  const [typeOpen, setTypeOpen] = useState(false);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 space-y-3 flex-shrink-0">
        {/* New session button */}
        <button className="w-full h-10 rounded-lg bg-primary text-primary-foreground font-ui text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
          <Plus size={16} />
          New session
        </button>

        {/* Session type selector */}
        <div className="relative">
          <button
            onClick={() => setTypeOpen(!typeOpen)}
            className="w-full h-9 rounded-lg border border-border bg-card px-3 flex items-center justify-between text-[12px] font-ui text-foreground hover:border-card-border-hover transition-colors"
          >
            <span>{selectedType}</span>
            <ChevronDown size={14} className="text-muted-foreground" />
          </button>
          {typeOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 rounded-lg bg-card border border-card-border shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              {sessionTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => { setSelectedType(type); setTypeOpen(false); }}
                  className={cn(
                    "w-full px-3 py-2 text-left text-[12px] font-ui hover:bg-muted/50 transition-colors",
                    type === selectedType ? "text-primary" : "text-foreground"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-4 flex-shrink-0">
        <div className="border-t border-border" />
        <p className="text-[11px] font-ui uppercase tracking-[0.1em] text-muted-foreground mt-3 mb-2">
          Recent sessions
        </p>
      </div>

      {/* Session list */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="px-2 pb-4 space-y-0.5">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-lg transition-colors duration-200 group",
                session.id === activeSessionId
                  ? "bg-primary/10 border-l-2 border-primary"
                  : "hover:bg-muted/50 border-l-2 border-transparent"
              )}
            >
              <span
                className={cn(
                  "inline-block text-[10px] font-ui font-medium px-1.5 py-0.5 rounded-full mb-1",
                  sessionTypeColors[session.type]
                )}
              >
                {session.type}
              </span>
              <p className="text-[13px] font-ui text-foreground leading-tight">{session.title}</p>
              <p className="text-[11px] font-ui text-muted-foreground mt-0.5">{session.timeAgo}</p>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
