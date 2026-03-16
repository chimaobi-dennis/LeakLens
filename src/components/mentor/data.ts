import { BrandData, MentorBrand } from "./types";

export const brands: MentorBrand[] = [
  { id: "roast", name: "Roast & Co", colorClass: "bg-primary", startedDate: "Jan 2026" },
  { id: "lagos", name: "Lagos Eats", colorClass: "bg-emerald-500", startedDate: "Feb 2026" },
];

export const roastData: BrandData = {
  brand: brands[0],
  milestones: [
    { id: "m1", category: "Brand Discovery", name: "Identity and voice defined", timeAgo: "2 days ago" },
    { id: "m2", category: "Campaign Strategy", name: "Lagos launch campaign", timeAgo: "5 days ago" },
    { id: "m3", category: "Customer Insight", name: "Target audience profile", timeAgo: "1 week ago" },
    { id: "m4", category: "Product Positioning", name: "Third space positioning", timeAgo: "2 weeks ago" },
    { id: "m5", category: "Brand Discovery", name: "Packaging direction", timeAgo: "3 weeks ago" },
  ],
  messages: [
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
  ],
  milestoneMarkers: [
    { beforeMessageId: "1", milestoneId: "m1" },
    { beforeMessageId: "11", milestoneId: "m5" },
  ],
  savePrompts: [
    { afterMessageId: "15", label: "Save as brand voice: Serious without being earnest", dnaField: "Voice", value: "Serious without being earnest" },
    { afterMessageId: "11", label: "Save brand references: Aesop, Monocle — intelligent restraint", dnaField: "Brand references", value: "Aesop, Monocle — intelligent restraint" },
    { afterMessageId: "5", label: "Save positioning: The unclaimed third space between international chains and local street coffee", dnaField: "Positioning", value: "The unclaimed third space between international chains and local street coffee" },
    { afterMessageId: "4", label: "Save brand promise: Coffee that respects your intelligence and your city", dnaField: "Core promise", value: "Coffee that respects your intelligence and your city" },
  ],
  dnaFields: [
    { key: "Brand name", label: "Brand name", value: "Roast & Co", savedFrom: "Brand Discovery", savedTimeAgo: "2 days ago" },
    { key: "Industry", label: "Industry", value: "Specialty coffee & lifestyle", savedFrom: "Brand Discovery", savedTimeAgo: "2 days ago" },
    { key: "Voice", label: "Voice", value: "Serious without being earnest", savedFrom: "Brand Discovery", savedTimeAgo: "2 days ago" },
    { key: "Target audience", label: "Target audience", value: "Young Lagos professionals who moved back and want quality made for them", savedFrom: "Customer Insight", savedTimeAgo: "1 week ago" },
    { key: "Positioning", label: "Positioning", value: "The unclaimed third space between international chains and local street coffee", savedFrom: "Product Positioning", savedTimeAgo: "2 weeks ago" },
    { key: "Brand references", label: "Brand references", value: "Aesop, Monocle — intelligent restraint", savedFrom: "Brand Discovery", savedTimeAgo: "2 days ago" },
    { key: "Core promise", label: "Core promise", value: "Coffee that respects your intelligence and your city", savedFrom: "Brand Discovery", savedTimeAgo: "2 days ago" },
    { key: "Campaign strategy", label: "Campaign strategy", value: null },
    { key: "Customer insight", label: "Customer insight", value: null },
    { key: "Product positioning", label: "Product positioning", value: null },
  ],
};

export const lagosData: BrandData = {
  brand: brands[1],
  milestones: [
    { id: "lm1", category: "Brand Discovery", name: "Initial brand exploration", timeAgo: "3 days ago" },
  ],
  messages: [
    { id: "l1", role: "ai", content: "Welcome. Let us talk about Lagos Eats. I can see you are building a food delivery platform — tell me why this one will be different from everything else in the market." },
    { id: "l2", role: "founder", content: "Most delivery apps here treat food as a commodity. We want to treat it as culture. Every restaurant on our platform has a story and we want to tell it." },
    { id: "l3", role: "ai", content: "That is a meaningful differentiator. You are not building a logistics company with a food skin — you are building a media company with a delivery engine. The storytelling layer is what will create loyalty that discounts never can. Tell me more about the restaurants you are starting with." },
    { id: "l4", role: "founder", content: "Small independent spots mostly. The kind of places where the owner is the chef and the recipe has been in the family for decades." },
  ],
  milestoneMarkers: [
    { beforeMessageId: "l1", milestoneId: "lm1" },
  ],
  savePrompts: [
    { afterMessageId: "l3", label: "Save positioning: A media company with a delivery engine", dnaField: "Positioning", value: "A media company with a delivery engine" },
  ],
  dnaFields: [
    { key: "Brand name", label: "Brand name", value: "Lagos Eats", savedFrom: "Brand Discovery", savedTimeAgo: "3 days ago" },
    { key: "Industry", label: "Industry", value: "Food delivery & culture", savedFrom: "Brand Discovery", savedTimeAgo: "3 days ago" },
    { key: "Voice", label: "Voice", value: null },
    { key: "Target audience", label: "Target audience", value: null },
    { key: "Positioning", label: "Positioning", value: null },
    { key: "Brand references", label: "Brand references", value: null },
    { key: "Core promise", label: "Core promise", value: null },
    { key: "Campaign strategy", label: "Campaign strategy", value: null },
    { key: "Customer insight", label: "Customer insight", value: null },
    { key: "Product positioning", label: "Product positioning", value: null },
  ],
};
