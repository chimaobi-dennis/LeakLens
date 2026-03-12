import { Button } from "@/components/ui/button";

const Mentor = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="flex flex-col items-center gap-6 max-w-lg text-center mt-[-10vh]">
        <div className="w-12 h-12 rounded-full bg-primary animate-amber-pulse" />
        <h1 className="font-display text-4xl text-foreground">
          What are we building today?
        </h1>
        <p className="font-ui text-base text-muted-foreground leading-relaxed">
          Tell me about your idea or your brand and we will figure out the rest together.
        </p>
        <div className="flex gap-3">
          <Button>I have an idea to explore</Button>
          <Button variant="outline">I already have a brand</Button>
        </div>
      </div>
    </div>
  );
};

export default Mentor;
