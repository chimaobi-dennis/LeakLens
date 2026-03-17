import { useState } from "react";
import { ArrowLeft, Pencil, Play, FileText, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onBackToHome: () => void;
  onEditBrief: () => void;
}

interface Scene {
  number: string;
  time: string;
  color: string;
  visual: string;
  voiceover: string;
  onScreen: string;
  transition: string;
  music: string;
}

const scenes: Scene[] = [
  {
    number: "01",
    time: "0:00–0:12",
    color: "#1A2A1A",
    visual: "Aerial shot of Stockholm at golden hour. Camera slowly descends toward a kitchen counter with the Nordform Daily Stack in foreground.",
    voiceover: "Two years ago I was training for Lidingöloppet, reading about longevity, and taking supplements I did not trust from brands that overclaimed everything.",
    onScreen: "Stockholm, 2024",
    transition: "Slow fade",
    music: "Minimal ambient, building slowly",
  },
  {
    number: "02",
    time: "0:12–0:24",
    color: "#0A1A1A",
    visual: "Close-up hands sorting through supplement bottles. Clean Nordic light. Slow deliberate motion.",
    voiceover: "Not because the science was not there. But because no brand communicated it honestly. Every label overclaimed. Every brand oversold. Nobody respected the intelligence of the person buying it.",
    onScreen: "The trust gap in wellness",
    transition: "Cut",
    music: "Continues building, subtle texture enters",
  },
  {
    number: "03",
    time: "0:24–0:36",
    color: "#0A1A2A",
    visual: "The formulation process. Clean lab setting. Ingredients being measured. Close-up of Lion's Mane capsules being filled.",
    voiceover: "So we built Nordform. Three adaptogens. Lion's Mane for focus. Ashwagandha for stress. Reishi for sleep. Evidence-based. Honestly communicated. No miracle claims.",
    onScreen: "Three adaptogens. One daily ritual.",
    transition: "Match cut on motion",
    music: "Full rhythm now, clean and confident",
  },
  {
    number: "04",
    time: "0:36–0:48",
    color: "#1A0A1A",
    visual: "The Daily Stack on a marble kitchen counter. A hand reaches for it. Stockholm apartment visible through a window in soft focus behind.",
    voiceover: "Nordform is not wellness for the sake of it. It is supplements that respect your intelligence. Built for Stockholm. Built for skeptics.",
    onScreen: "Built for Stockholm. Built for skeptics.",
    transition: "Slow push in",
    music: "Peaks warmly, melodic hook",
  },
  {
    number: "05",
    time: "0:48–1:00",
    color: "#1A2A2A",
    visual: "The Nordform packaging centred on a clean surface. Logo reveal. Forest green fills the frame edge.",
    voiceover: "Nordform. Clarity from the north.",
    onScreen: "Nordform — nordform.se",
    transition: "Fade to black",
    music: "Resolves, clean outro",
  },
];

const pills = ["Instagram Reels", "60 seconds", "5 scenes", "Warm and personal"];

export function ReelStoryboard({ onBackToHome, onEditBrief }: Props) {
  const [teleprompter, setTeleprompter] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);

  if (teleprompter) {
    const scene = scenes[currentScene];
    return (
      <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "hsl(160 25% 7%)" }}>
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <p className="text-[12px] text-muted-foreground mb-1">Scene {currentScene + 1} of {scenes.length}</p>
          <p className="text-[11px] text-muted-foreground mb-10">{scene.time}</p>
          <p className="font-display text-[28px] leading-[1.8] text-center max-w-[680px]" style={{ color: "hsl(36 33% 94%)" }}>
            "{scene.voiceover}"
          </p>
          <p className="text-primary italic text-base mt-6">{scene.onScreen}</p>
        </div>
        <div className="h-16 border-t border-border flex items-center justify-between px-6">
          <Button
            variant="ghost"
            size="sm"
            disabled={currentScene === 0}
            onClick={() => setCurrentScene((s) => s - 1)}
            className="gap-1"
          >
            <ChevronLeft size={14} /> Prev
          </Button>
          <div className="flex gap-2">
            {scenes.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentScene(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === currentScene ? "bg-primary" : "bg-muted-foreground/30"}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              disabled={currentScene === scenes.length - 1}
              onClick={() => setCurrentScene((s) => s + 1)}
              className="gap-1"
            >
              Next <ChevronRight size={14} />
            </Button>
            <button onClick={() => setTeleprompter(false)} className="text-[12px] text-primary hover:underline">
              Exit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onEditBrief} className="flex items-center gap-1 text-[13px] text-primary hover:underline">
          <ArrowLeft size={14} /> Edit brief
        </button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => { setCurrentScene(0); setTeleprompter(true); }} className="gap-1.5">
            <Play size={14} /> Teleprompter
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <FileText size={14} /> Export PDF
          </Button>
          <Button size="sm" className="gap-1.5">
            <Download size={14} /> Export script
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <h2 className="font-sans text-base font-medium text-foreground">Nordform Origin Story</h2>
        <Pencil size={13} className="text-muted-foreground" />
      </div>

      <div className="flex gap-2 mb-8">
        {pills.map((p) => (
          <span key={p} className="text-[11px] px-2.5 py-0.5 rounded-[10px] bg-muted text-muted-foreground">{p}</span>
        ))}
      </div>

      <div className="space-y-4">
        {scenes.map((scene) => (
          <div key={scene.number} className="rounded-xl border border-border overflow-hidden bg-card flex flex-col md:flex-row">
            <div className="w-full md:w-[240px] shrink-0 p-5" style={{ background: scene.color }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Scene {scene.number}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-[10px]" style={{ background: "rgba(45,74,62,0.2)", color: "#2D4A3E" }}>
                  {scene.time}
                </span>
              </div>
              <div className="rounded-lg h-[100px] mb-3" style={{ background: `${scene.color}cc`, border: "1px solid rgba(255,255,255,0.06)" }} />
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Visual direction</p>
              <p className="text-[12px] text-muted-foreground leading-relaxed">{scene.visual}</p>
            </div>
            <div className="flex-1 p-5 space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Voiceover</p>
                <p className="text-sm text-foreground leading-[1.7]">"{scene.voiceover}"</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">On screen text</p>
                <p className="text-[13px] text-primary italic">{scene.onScreen}</p>
              </div>
              <div className="flex gap-6">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Transition </span>
                  <span className="text-[12px] text-foreground">{scene.transition}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Music </span>
                  <span className="text-[12px] text-foreground">{scene.music}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
