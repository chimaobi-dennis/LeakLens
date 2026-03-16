import { ArrowLeft, Film, Dna, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  onBack: () => void;
  onBuild: () => void;
  loading: boolean;
  initialTopic?: string;
  initialTone?: string;
}

export function ReelBrief({ onBack, onBuild, loading, initialTopic, initialTone }: Props) {
  const [topic, setTopic] = useState(initialTopic || "Roast & Co origin story — why we built this");
  const [platform, setPlatform] = useState("Instagram Reels");
  const [length, setLength] = useState("60 seconds");
  const [goal, setGoal] = useState("Tell origin story");
  const [tone, setTone] = useState(initialTone || "Warm and personal");
  const [keyMessage, setKeyMessage] = useState("We built the coffee Lagos deserved — for people who moved back and refused to compromise");

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <button onClick={onBack} className="flex items-center gap-1 text-[13px] text-primary mb-5 hover:underline">
        <ArrowLeft size={14} /> Back to ReelBuilder
      </button>

      <h1 className="font-display text-[22px] text-foreground">New Reel</h1>
      <p className="text-[13px] text-muted-foreground mt-1 mb-6">Brief your reel and we will build the full scene-by-scene script.</p>

      <div className="rounded-xl border border-border bg-card p-7 space-y-5">
        {/* Topic */}
        <div>
          <label className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 block">Topic</label>
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>

        {/* Platform */}
        <div>
          <label className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 block">Platform</label>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Instagram Reels", "TikTok", "YouTube Shorts", "Facebook Reels"].map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Length */}
        <div>
          <label className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 block">Length</label>
          <Select value={length} onValueChange={setLength}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["15 seconds", "30 seconds", "45 seconds", "60 seconds", "90 seconds"].map((l) => (
                <SelectItem key={l} value={l}>{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Goal */}
        <div>
          <label className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 block">Goal</label>
          <Select value={goal} onValueChange={setGoal}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Brand awareness", "Drive first purchase", "Grow following", "Announce product", "Tell origin story"].map((g) => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tone */}
        <div>
          <label className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 block">Tone</label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Warm and personal", "Bold and energetic", "Calm and considered", "Playful", "Inspirational"].map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Key message */}
        <div>
          <label className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 block">Key message</label>
          <Textarea rows={2} value={keyMessage} onChange={(e) => setKeyMessage(e.target.value)} />
        </div>
      </div>

      {/* Brand DNA notice */}
      <div className="rounded-lg bg-secondary p-3 mt-4 flex items-start gap-2">
        <Dna size={14} className="text-primary mt-0.5 shrink-0" />
        <p className="text-[12px] text-muted-foreground leading-relaxed">
          Brand voice and positioning will be pulled automatically from your Roast & Co Brand DNA.
        </p>
      </div>

      <Button onClick={onBuild} disabled={loading} className="w-full h-12 mt-6 gap-2">
        {loading ? (
          <span className="animate-pulse">Building reel…</span>
        ) : (
          <>
            <Film size={16} /> Build reel
          </>
        )}
      </Button>
      <p className="text-[11px] text-muted-foreground text-center mt-2">Generates full scene-by-scene storyboard</p>
    </div>
  );
}
