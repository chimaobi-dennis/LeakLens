import { Send, Paperclip, Mic, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "ai" | "founder";
  content: string;
}

const conversation: Message[] = [
  { id: "1", role: "ai", content: "Welcome to your Brand Discovery session. I have read everything you have shared so far about Roast & Co. Let us go deeper. What made you start this — not the business plan version, but the real version?" },
  { id: "2", role: "founder", content: "I moved back to Lagos after six years in London. I missed specialty coffee but nothing here felt like it was made for people like me — people who came back." },
  { id: "3", role: "ai", content: "That is a powerful origin because it is not about coffee. It is about identity. You are building for a specific person — someone who has lived elsewhere, experienced a certain standard, and now refuses to compromise but also refuses to abandon Lagos. The coffee is the vehicle. The brand is really about belonging. Does that resonate?" },
  { id: "4", role: "founder", content: "Yes — exactly. It is not about being premium for the sake of it. It is about quality that feels like it was made here, for here." },
  { id: "5", role: "ai", content: "That distinction is critical and most brands in Lagos miss it. They either import the entire aesthetic from abroad — which feels disconnected — or they lean so hard into local that it feels unsophisticated. You are describing a third space. A brand that is unmistakably Lagos but holds its own next to anything you would find in Shoreditch or Brooklyn. That is your positioning. Let us make it sharper. What does Roast & Co look like in the physical world? Describe a moment — a customer walks in. What do they see, smell, feel?" },
  { id: "6", role: "founder", content: "Warm wood, not too polished. The smell of freshly ground beans obviously. Music that is not too loud — maybe Afrobeat jazz fusions. A space where you can sit with your laptop for three hours and nobody rushes you. But it also feels curated, like someone thought about every detail." },
  { id: "7", role: "ai", content: "You have just described the brand experience more clearly than most founders do in a full brand workshop. The key tension I hear is between warmth and curation. Most spaces choose one — they are either warm and casual or curated and intimidating. Your brand promise is both. Warm but considered. Relaxed but intentional. That tension is your brand DNA. Every decision — from packaging to social media to how your baristas greet people — should hold that tension. If it feels too casual, pull it back. If it feels too stiff, warm it up. How does this show up in your current visual identity?" },
  { id: "8", role: "founder", content: "We have a logo and basic brand colours — amber and dark espresso brown — but honestly the visual identity is not fully developed yet. We know what it should feel like but we have not translated that into a complete system." },
  { id: "9", role: "ai", content: "That is actually fine at this stage. Having a clear feeling is more valuable than having a polished but hollow visual system. We can build the visual identity from the tension we just identified — warm but considered. The amber and espresso palette is a strong foundation. It suggests warmth without being generic. Before we go further — you mentioned the brand should feel warm and considered. Give me a reference point. Not another coffee brand. What brand in any category makes you feel the way you want Roast & Co to feel?" },
  { id: "10", role: "founder", content: "Aesop. Maybe a bit of Monocle." },
  { id: "11", role: "ai", content: "That is a very specific and coherent reference. Aesop and Monocle share something important — they both treat the customer as intelligent. They do not explain themselves. They do not shout. They assume you already understand why this is good.\n\nThat is a defensible position in Lagos right now because most premium local brands are still over-explaining. The risk is that restraint can read as cold if the warmth is not embedded in every touchpoint. Your copy especially needs to carry the emotional weight that the visual restraint deliberately withholds.\n\nWho is writing your copy?" },
  { id: "12", role: "founder", content: "That would be me for now." },
  { id: "13", role: "ai", content: "Good. That is actually an advantage early on — the founder's voice is usually the most authentic version of the brand before an agency smooths it into something generic.\n\nLet us capture your natural voice before you start second-guessing it. Tell me how you would describe your flagship product to a friend — not a pitch, just how you would actually say it." },
  { id: "14", role: "founder", content: "It is the coffee I wished existed when I moved back to Lagos. Single origin, serious about sourcing, but it does not feel like homework." },
  { id: "15", role: "ai", content: "Write that down exactly as you said it. That is your brand voice in one sentence. Serious without being earnest. That distinction is everything." },
];

const insights = [
  "Brand references: Aesop and Monocle — intelligent restraint, never over-explaining",
  "Voice in one sentence: \"Serious without being earnest\"",
  "Positioning: The unclaimed third space between international chains and local street coffee",
  "Core tension: Communicating spatial warmth through digital and packaging before physical locations exist",
  "Copy strategy: Founder voice is the authentic brand voice — preserve it before it gets polished away",
  "Audience insight: Young Lagos professionals who moved back and want quality that feels like it was made for them",
];

export function ChatPanel() {
  const [inputValue, setInputValue] = useState("");
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    setSaved(true);
    toast({ title: "Brand DNA updated with 6 new insights." });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Session context bar */}
      <div className="h-10 flex items-center gap-3 px-4 bg-muted/20 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
          <span className="text-[12px] font-ui font-medium text-foreground">Roast & Co</span>
        </div>
        <span className="text-[10px] font-ui font-semibold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary">
          Brand DNA Active
        </span>
        <span className="text-[11px] font-ui text-muted-foreground">Brand Discovery</span>
      </div>

      {/* Chat messages */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-1">
          {/* Timestamp */}
          <p className="text-[11px] font-ui text-muted-foreground text-center py-3">Today at 14:23</p>

          {conversation.map((msg, i) => {
            // Insert mid-conversation timestamp
            const showTimestamp = i === 8;
            return (
              <div key={msg.id}>
                {showTimestamp && (
                  <p className="text-[11px] font-ui text-muted-foreground text-center py-4">Today at 14:47</p>
                )}
                <div className={`flex ${msg.role === "founder" ? "justify-end" : "justify-start"} mb-3`}>
                  <div
                    className={`max-w-[75%] rounded-xl px-4 py-3 ${
                      msg.role === "founder"
                        ? "bg-primary/10"
                        : "bg-card border border-border"
                    }`}
                  >
                    <p
                      className="text-[13.5px] font-ui text-foreground whitespace-pre-line"
                      style={{ lineHeight: msg.role === "ai" ? "1.7" : "1.6" }}
                    >
                      {msg.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Brand DNA extraction card */}
          <div className="mt-6 rounded-xl border border-border bg-card overflow-hidden" style={{ borderTopWidth: 2, borderTopColor: "hsl(43, 78%, 46%)" }}>
            <div className="p-4">
              <h3 className="font-display text-[15px] text-foreground mb-3">
                What I learned about Roast & Co today
              </h3>
              <div className="space-y-2.5">
                {insights.map((insight, i) => (
                  <div key={i} className="flex gap-2">
                    <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-[13px] font-ui text-foreground leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleSave}
                  disabled={saved}
                  className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-[13px] font-ui font-semibold hover:bg-primary/90 transition-colors disabled:opacity-70"
                >
                  {saved ? "Saved ✓" : "Save to Brand DNA"}
                </button>
                <button className="h-9 px-4 rounded-lg border border-primary text-primary text-[13px] font-ui font-semibold hover:bg-primary/10 transition-colors">
                  Edit insights
                </button>
              </div>
            </div>
          </div>
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
