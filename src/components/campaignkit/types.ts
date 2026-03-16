export interface AssetCard {
  id: string;
  name: string;
  color: string;
  platform: string;
  platformColor: string;
}

export interface BriefData {
  productName: string;
  targetAudience: string;
  campaignGoal: string;
  tone: string;
  keyBenefit: string;
  callToAction: string;
}

export type PlatformTab =
  | "Headlines"
  | "Instagram"
  | "Facebook Ad"
  | "Google Ad"
  | "Email"
  | "WhatsApp"
  | "Twitter/X"
  | "SMS";

export const platformTabs: PlatformTab[] = [
  "Headlines",
  "Instagram",
  "Facebook Ad",
  "Google Ad",
  "Email",
  "WhatsApp",
  "Twitter/X",
  "SMS",
];

export const campaignGoals = [
  "Drive first purchase",
  "Build awareness",
  "Grow following",
  "Promote offer",
  "Launch product",
];

export const toneOptions = [
  "Confident and warm",
  "Bold and direct",
  "Playful",
  "Professional",
  "Urgent",
];

export function getRoastAssets(): AssetCard[] {
  return [
    { id: "a1", name: "Coffee bag on marble", color: "#C8951A", platform: "Instagram", platformColor: "#E1306C" },
    { id: "a2", name: "Testimonial card", color: "#1A2A4A", platform: "Facebook", platformColor: "#4267B2" },
    { id: "a3", name: "Feature card", color: "#1A3A38", platform: "General", platformColor: "#6B7280" },
    { id: "a4", name: "Announcement visual", color: "#1E1E1E", platform: "Instagram", platformColor: "#E1306C" },
    { id: "a5", name: "Lifestyle scene", color: "#8B6E4E", platform: "Facebook", platformColor: "#4267B2" },
    { id: "a6", name: "Pricing card", color: "#EEF0F2", platform: "General", platformColor: "#6B7280" },
  ];
}

export function getLagosAssets(): AssetCard[] {
  return [
    { id: "a1", name: "Jollof spice pack", color: "#2D6A4F", platform: "Instagram", platformColor: "#E1306C" },
    { id: "a2", name: "Menu card", color: "#1B4332", platform: "Facebook", platformColor: "#4267B2" },
    { id: "a3", name: "Promo banner", color: "#40916C", platform: "General", platformColor: "#6B7280" },
    { id: "a4", name: "Launch teaser", color: "#1E1E1E", platform: "Instagram", platformColor: "#E1306C" },
    { id: "a5", name: "Food scene", color: "#95D5B2", platform: "Facebook", platformColor: "#4267B2" },
    { id: "a6", name: "Feature list", color: "#D8F3DC", platform: "General", platformColor: "#6B7280" },
  ];
}

export function getRoastBrief(): BriefData {
  return {
    productName: "Roast & Co Signature Blend",
    targetAudience: "Young professionals, Lagos 25–35",
    campaignGoal: "Drive first purchase",
    tone: "Confident and warm",
    keyBenefit: "Premium quality, locally rooted, serious without being earnest",
    callToAction: "Order your first bag today",
  };
}

export function getLagosBrief(): BriefData {
  return {
    productName: "Lagos Eats Jollof Spice Mix",
    targetAudience: "Home cooks & food lovers, Lagos & diaspora",
    campaignGoal: "Build awareness",
    tone: "Playful",
    keyBenefit: "Authentic party jollof flavor at home",
    callToAction: "Get your spice mix now",
  };
}

export interface PlatformContent {
  copy: string;
  headline?: string;
  subject?: string;
  charCount?: string;
}

export function getRoastContent(): Record<PlatformTab, PlatformContent> {
  return {
    Headlines: {
      copy: "",
    },
    Instagram: {
      copy: "The coffee that Lagos deserved. Single origin. Seriously sourced. Made for people who moved back and refused to compromise. ☕ Order your first bag — link in bio.",
    },
    "Facebook Ad": {
      copy: "Tired of choosing between quality and connection? Roast & Co is specialty coffee that feels like it was made for you — because it was. Lagos-rooted. World-class quality. Order today.",
    },
    "Google Ad": {
      headline: "Premium Lagos Coffee | Roast & Co",
      copy: "Single-origin specialty coffee rooted in Lagos. Serious quality, serious sourcing. Order your first bag today.",
    },
    Email: {
      subject: "The coffee Lagos has been waiting for",
      copy: "We built Roast & Co for a specific person — someone who has lived elsewhere, experienced great coffee, moved back to Lagos, and refused to settle.\n\nOur Signature Blend is single-origin, ethically sourced, and roasted right here in Lagos. It's premium coffee that doesn't compromise on quality or character.\n\nOrder your first bag today and taste the difference.",
    },
    WhatsApp: {
      copy: "Hey! ☕ We're Roast & Co — Lagos's first serious specialty coffee brand. Single origin, ethically sourced, delivered to your door. Want to try your first bag? Reply YES and we'll sort you out.",
    },
    "Twitter/X": {
      copy: "Lagos finally has the coffee it deserves. Single-origin. Seriously sourced. No compromise.\n\n☕ Roast & Co — order your first bag today.\nroastandco.com/first",
    },
    SMS: {
      copy: "Roast & Co: Premium Lagos coffee delivered. Single-origin, seriously sourced. First bag 20% off → roastandco.com/first",
      charCount: "142 / 160",
    },
  };
}

export function getLagosContent(): Record<PlatformTab, PlatformContent> {
  return {
    Headlines: { copy: "" },
    Instagram: {
      copy: "Bring the party jollof home. 🍚 Lagos Eats Jollof Spice Mix — the flavor your kitchen has been missing. Grab yours today — link in bio.",
    },
    "Facebook Ad": {
      copy: "Remember that jollof from the owambe that made you go back three times? Now you can make it at home. Lagos Eats Jollof Spice Mix — authentic flavor, zero stress.",
    },
    "Google Ad": {
      headline: "Authentic Jollof Spice Mix | Lagos Eats",
      copy: "Make party jollof at home with Lagos Eats Spice Mix. Authentic Nigerian flavors, perfectly blended. Order now.",
    },
    Email: {
      subject: "Your jollof is about to change forever",
      copy: "We created Lagos Eats for one reason — to bring the best flavors of Lagos to every kitchen.\n\nOur Jollof Spice Mix captures that unmistakable party jollof flavor. Just add it to your pot and taste the difference.\n\nOrder your spice mix today.",
    },
    WhatsApp: {
      copy: "Hey! 🍚 Lagos Eats here. Our Jollof Spice Mix makes party jollof at home easy. Want to try it? Reply YES!",
    },
    "Twitter/X": {
      copy: "Your home jollof is about to hit different. Lagos Eats Jollof Spice Mix — party flavor, your kitchen.\n\n🍚 lagoseats.com/spice",
    },
    SMS: {
      copy: "Lagos Eats: Party jollof at home! Jollof Spice Mix now available. Order → lagoseats.com/spice",
      charCount: "98 / 160",
    },
  };
}

export const roastHeadlines = [
  "The coffee Lagos deserved all along",
  "Seriously sourced. Seriously Lagos.",
  "Premium coffee that feels like home",
  "Quality you moved back for",
  "Lagos coffee, world-class standards",
  "Your morning ritual, elevated",
];

export const lagosHeadlines = [
  "Party jollof, meet your kitchen",
  "The spice mix Lagos swears by",
  "Bring the owambe home",
  "Authentic flavor, zero compromise",
  "Your jollof will never be the same",
  "Lagos flavor in every pot",
];
