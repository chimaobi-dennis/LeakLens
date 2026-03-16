import { Send, Paperclip, Mic, Flag, Save, Check, X } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MentorBrand, Message, InlineSavePrompt, MilestoneMarker, Milestone, categoryTextColors } from "./types";

interface ChatPanelProps {
  brand: MentorBrand;
  messages: Message[];
  milestones: Milestone[];
  milestoneMarkers: MilestoneMarker[];
  savePrompts: InlineSavePrompt[];
  onSaveDNA: (field: string, value: string) => void;
  scrollToMilestoneId: string | null;
  onMilestoneScrolled: () => void;
}

export function ChatPanel({
  brand,
  messages,
  milestones,
  milestoneMarkers,
  savePrompts,
  onSaveDNA,
  scrollToMilestoneId,
  onMilestoneScrolled,
}: ChatPanelProps) {
  const [inputValue, setInputValue] = useState("");
  const [dismissedPrompts, setDismissedPrompts] = useState<Set<string>>(new Set());
  const [savedPrompts, setSavedPrompts] = useState<Set<string>>(new Set());
  const [showingSaved, setShowingSaved] = useState<Set<string>>(new Set());
  const [highlightedMilestone, setHighlightedMilestone] = useState<string | null>(null);
  const milestoneRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to milestone
  useEffect(() => {
    if (!scrollToMilestoneId) return;
    const el = milestoneRefs.current[scrollToMilestoneId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedMilestone(scrollToMilestoneId);
      setTimeout(() => setHighlightedMilestone(null), 1500);
    }
    onMilestoneScrolled();
  }, [scrollToMilestoneId, onMilestoneScrolled]);

  const handleSave = useCallback((prompt: InlineSavePrompt) => {
    setSavedPrompts(prev => new Set(prev).add(prompt.afterMessageId));
    setShowingSaved(prev => new Set(prev).add(prompt.afterMessageId));
    onSaveDNA(prompt.dnaField, prompt.value);
    setTimeout(() => {
      setShowingSaved(prev => {
        const n = new Set(prev);
        n.delete(prompt.afterMessageId);
        return n;
      });
      setSavedPrompts(prev => {
        const n = new Set(prev);
        n.delete(prompt.afterMessageId);
        return n;
      });
    }, 1200);
  }, [onSaveDNA]);

  const handleDismiss = (afterMessageId: string) => {
    setDismissedPrompts(prev => new Set(prev).add(afterMessageId));
  };

  // Build marker lookup: milestoneId -> milestone
  const milestoneMap = Object.fromEntries(milestones.map(m => [m.id, m]));
  // Build marker lookup: beforeMessageId -> milestoneMarker
  const markersByMessage = Object.fromEntries(milestoneMarkers.map(mm => [mm.beforeMessageId, mm]));
  // Build save prompt lookup
  const promptsByMessage = Object.fromEntries(savePrompts.map(sp => [sp.afterMessageId, sp]));

  return (
    <div className="h-full flex flex-col">
      {/* Brand context bar */}
      <div className="h-10 flex items-center gap-3 px-4 bg-muted/20 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <div className={cn("w-2.5 h-2.5 rounded-full", brand.colorClass)} />
          <span className="text-[12px] font-ui font-medium text-foreground">{brand.name}</span>
        </div>
        <span className="text-[10px] font-ui font-semibold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary">
          Brand DNA Active
        </span>
      </div>

      {/* Chat messages */}
      <ScrollArea className="flex-1 min-h-0" ref={scrollAreaRef}>
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-1">
          <p className="text-[11px] font-ui text-muted-foreground text-center py-3">Today at 14:23</p>

          {messages.map((msg, i) => {
            const marker = markersByMessage[msg.id];
            const milestone = marker ? milestoneMap[marker.milestoneId] : null;
            const prompt = promptsByMessage[msg.id];
            const isDismissed = dismissedPrompts.has(msg.id);
            const isSaved = savedPrompts.has(msg.id);
            const isShowingSaved = showingSaved.has(msg.id);
            const showTimestamp = i === 8;

            return (
              <div key={msg.id}>
                {/* Milestone marker before message */}
                {milestone && (
                  <div
                    ref={(el) => { milestoneRefs.current[marker!.milestoneId] = el; }}
                    className={cn(
                      "flex items-center gap-3 my-5 transition-all duration-500",
                      highlightedMilestone === marker!.milestoneId && "bg-primary/10 -mx-4 px-4 py-2 rounded-lg"
                    )}
                  >
                    <div className="flex-1 h-px bg-border" />
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Flag size={11} className="text-primary" />
                      <span className={cn("text-[12px] font-ui font-medium", categoryTextColors[milestone.category] || "text-muted-foreground")}>
                        {milestone.category}
                      </span>
                      <span className="text-[12px] font-ui text-muted-foreground">·</span>
                      <span className="text-[12px] font-ui text-muted-foreground">{milestone.name}</span>
                      <span className="text-[12px] font-ui text-muted-foreground">·</span>
                      <span className="text-[12px] font-ui text-muted-foreground">{milestone.timeAgo}</span>
                    </div>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                )}

                {showTimestamp && (
                  <p className="text-[11px] font-ui text-muted-foreground text-center py-4">Today at 14:47</p>
                )}

                {/* Message bubble */}
                <div className={`flex ${msg.role === "founder" ? "justify-end" : "justify-start"} mb-3`}>
                  <div
                    className={cn(
                      "max-w-[75%] rounded-xl px-4 py-3",
                      msg.role === "founder"
                        ? "bg-primary/10"
                        : "bg-card border border-border"
                    )}
                  >
                    <p
                      className="text-[13.5px] font-ui text-foreground whitespace-pre-line"
                      style={{ lineHeight: msg.role === "ai" ? "1.7" : "1.6" }}
                    >
                      {msg.content}
                    </p>
                  </div>
                </div>

                {/* Inline save prompt */}
                {prompt && !isDismissed && !isSaved && (
                  <div className="flex justify-start mb-3">
                    <div className="flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-card/80 max-w-[75%]">
                      <Save size={13} className="text-primary flex-shrink-0" />
                      <span className="text-[12px] font-ui text-foreground truncate">{prompt.label}</span>
                      <button
                        onClick={() => handleSave(prompt)}
                        className="h-6 px-2.5 rounded-md bg-primary text-primary-foreground text-[11px] font-ui font-semibold hover:bg-primary/90 transition-colors flex-shrink-0"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleDismiss(msg.id)}
                        className="text-[11px] font-ui text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}

                {/* Saved confirmation */}
                {isShowingSaved && (
                  <div className="flex justify-start mb-3">
                    <div className="flex items-center gap-1.5 h-9 px-3 rounded-lg bg-primary/10">
                      <Check size={13} className="text-primary" />
                      <span className="text-[12px] font-ui text-primary font-medium">Saved to Brand DNA</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Input bar */}
      <div className="flex-shrink-0 border-t border-border bg-card/50">
        <div className="max-w-3xl mx-auto flex items-center gap-2 px-4 py-2">
          <button className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Paperclip size={18} />
          </button>
          <button className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Mic size={18} />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Continue this conversation..."
            className="flex-1 h-10 bg-transparent text-[13px] font-ui text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
