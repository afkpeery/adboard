import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const industries = {
  "ai-tech": {
    name: "AI & Tech",
    headline: "Big ideas deserve a bigger stage.",
    description: "Explore digital billboard campaign planning for AI products, SaaS platforms, developer tools, and technology launches.",
    intro: "A strong technology campaign turns a complicated product into a clear reason to care. A skyline placement gives your idea a moment of focus; the landing page should make the next step equally clear.",
    audience: "Founders, developers, product teams, and people looking for better ways to work.",
    sections: [
      { title: "Lead with the outcome", text: "Use the billboard to explain one useful result: a faster workflow, a clearer decision, or a task made easier. Save the model names and feature matrix for the destination page. A short headline and a recognizable visual are easier to understand while visitors explore the city." },
      { title: "Match the destination to the promise", text: "Send curious visitors to a focused product demo, a useful example, or a concise getting-started guide. Keep the billboard headline and landing-page headline aligned, and show the product in action before asking for a commitment." },
      { title: "Plan the launch in stages", text: "Try a smaller placement to compare creative ideas before committing to a larger footprint. Measure qualified visits and completed trials alongside clicks. A larger sign improves prominence, but the offer and destination still determine whether attention becomes interest." },
    ],
    ideas: ["An interactive product demo", "A developer-tool launch", "A focused SaaS free trial"],
  },
  lifestyle: {
    name: "Lifestyle",
    headline: "Make your brand part of the everyday.",
    description: "Plan digital billboard campaigns for fashion, fitness, travel, wellness, and independent lifestyle brands.",
    intro: "Lifestyle campaigns work when people can picture a product in their own day. Build the creative around a specific moment, a memorable visual, and an invitation that feels easy to follow.",
    audience: "People discovering new routines, independent brands, places to visit, and products that fit their lives.",
    sections: [
      { title: "Show a moment people recognize", text: "Choose one use case: the morning run, a weekend away, or a room that finally feels right. Keep the brand visible and give the image enough space to do its work. Clear, specific storytelling can make a small placement feel distinctive." },
      { title: "Make the offer easy to understand", text: "A seasonal collection, a first-visit offer, or a useful guide can give a visitor a reason to click. State any restrictions on the destination page and keep promotion dates accurate. Avoid promises about health, savings, or results that the advertiser cannot support." },
      { title: "Track interest beyond the first click", text: "Compare product views, newsletter signups, and completed purchases when a production analytics connection is available. Use a dedicated destination or campaign parameters to distinguish visitors from each creative concept." },
    ],
    ideas: ["A limited seasonal collection", "An independent fitness studio", "A destination travel guide"],
  },
  gaming: {
    name: "Gaming",
    headline: "Your next launch belongs in the spotlight.",
    description: "Discover billboard campaign ideas for games, gaming communities, creators, and interactive entertainment.",
    intro: "Give players a glimpse of the experience before asking them to join it. A distinctive character, a compelling world, or an unmistakable gameplay moment can communicate more than a crowded feature list.",
    audience: "Players, stream viewers, independent game supporters, and communities exploring their next shared experience.",
    sections: [
      { title: "Build the creative around the game", text: "Show what makes the experience recognizable. Keep a clear focal point and make the title readable at smaller sizes. If movement is part of the creative, provide a calm version for visitors who prefer reduced motion." },
      { title: "Choose one player action", text: "Ask visitors to wishlist the game, watch a trailer, or join a playtest. Sending every placement to the same generic homepage makes it harder to understand which creative brings interested players. A focused destination creates a clearer journey." },
      { title: "Time the placement to a real milestone", text: "A demo release, community event, or launch window gives the campaign a concrete story. Make platform availability, age guidance, and release timing easy to find on the linked page. Update those details when plans change." },
    ],
    ideas: ["An indie-game wishlist campaign", "A public playtest invitation", "A creator-led community event"],
  },
  finance: {
    name: "Finance",
    headline: "Earn attention. Build understanding.",
    description: "Explore clear, responsible digital billboard campaign planning for financial tools, education, and business software.",
    intro: "Financial products ask for trust as well as attention. Use the billboard to make a useful idea understandable, then give visitors the context they need to evaluate it on the destination page.",
    audience: "Small-business owners, professionals, and people comparing tools for budgeting, accounting, and financial learning.",
    sections: [
      { title: "Make a specific, supportable promise", text: "Explain what the tool helps someone do, such as organizing expenses or understanding cash flow. Keep claims accurate and avoid implying guaranteed returns or outcomes. Any necessary eligibility, fee, and risk information should be easy to access." },
      { title: "Use education as a useful starting point", text: "A clear guide, a budgeting worksheet, or a product walkthrough can answer a real question before a visitor signs up. Keep educational material separate from personalized recommendations and explain the assumptions behind examples." },
      { title: "Measure meaningful progress", text: "A production campaign should consider qualified account starts, completed product tours, or useful guide downloads alongside clicks. More attention alone does not tell you whether people understand the product or are a good fit for it." },
    ],
    ideas: ["A small-business accounting demo", "A financial education resource", "A transparent budgeting-tool launch"],
  },
  creative: {
    name: "Creative",
    headline: "Put a new point of view on the skyline.",
    description: "Plan memorable billboard campaigns for design studios, artists, creative tools, agencies, and independent makers.",
    intro: "Creative work deserves room to speak. Use a placement to share a distinctive point of view, then let interested visitors explore the people, process, and work behind it.",
    audience: "Designers, makers, creative teams, collectors, and businesses looking for a new collaborator.",
    sections: [
      { title: "Let one strong idea lead", text: "A single image, a bold typographic statement, or a short piece of motion can make a clear impression. Keep the visual hierarchy deliberate: the work first, the identity second, and one next step. Check that the message remains legible in a smaller placement." },
      { title: "Connect attention to a body of work", text: "Link to a focused case study, a collection, or a concise service page. Explain the problem the work solved and make credits easy to find. A beautiful billboard can start the conversation; a thoughtful destination helps it continue." },
      { title: "Give the campaign a purpose", text: "Choose whether the goal is a project inquiry, a collection visit, or a product signup. Evaluate the placement against that action. Refresh the creative when the story changes, rather than adding more messages to an already busy visual." },
    ],
    ideas: ["An independent studio launch", "A digital art collection", "A creative-software product demo"],
  },
} as const;

type IndustrySlug = keyof typeof industries;
type PageProps = { params: Promise<{ slug: string }> };
const origin = (process.env.NEXT_PUBLIC_SITE_URL || "https://adboard-neon-city.nuttysugar21.chatgpt.site").replace(/\/+$/, "");

function isIndustrySlug(slug: string): slug is IndustrySlug {
  return Object.hasOwn(industries, slug);
}

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isIndustrySlug(slug)) return { title: "Industry not found" };
  const industry = industries[slug];
  return {
    title: `${industry.name} advertising`,
    description: industry.description,
    alternates: { canonical: `${origin}/industries/${slug}/` },
    openGraph: { title: `${industry.name} advertising | AdBoard™`, description: industry.description, url: `${origin}/industries/${slug}/`, type: "website" },
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isIndustrySlug(slug)) notFound();
  const industry = industries[slug];
  return (
    <main style={{ minHeight: "100vh", background: "radial-gradient(ellipse at top right, #24143d, transparent 55%), #080911", color: "#f4f2fa", fontFamily: "Arial, sans-serif", padding: "32px clamp(24px, 6vw, 96px) 64px" }}>
      <nav aria-label="Breadcrumb" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, fontSize: 13, color: "#aaa5bd", marginBottom: 80 }}>
        <Link href="/" style={{ color: "#f4f2fa", fontWeight: 800, fontSize: 22, textDecoration: "none", marginRight: "auto" }}>AdBoard<sup style={{ fontSize: 10 }}>™</sup></Link>
        <Link href="/" style={{ color: "#aaa5bd" }}>The city</Link><span aria-hidden="true">/</span><span>{industry.name}</span>
      </nav>
      <article style={{ maxWidth: 860, margin: "0 auto" }}>
        <p style={{ color: "#c6ff71", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>{industry.name} / Campaign field notes</p>
        <h1 style={{ fontSize: "clamp(38px, 6.5vw, 74px)", lineHeight: 1.03, letterSpacing: "-0.05em", margin: "24px 0" }}>{industry.headline}</h1>
        <p style={{ fontSize: "clamp(17px, 2vw, 21px)", lineHeight: 1.7, color: "#b9b3ca", maxWidth: 740 }}>{industry.intro}</p>
        <div style={{ border: "1px solid #393044", borderRadius: 14, padding: 24, margin: "36px 0 50px", background: "#ffffff04" }}><p style={{ margin: "0 0 10px", fontSize: 12, color: "#c6ff71", letterSpacing: ".12em", textTransform: "uppercase" }}>Who you could reach</p><p style={{ margin: 0, color: "#c9c4d6", lineHeight: 1.7 }}>{industry.audience}</p></div>
        {industry.sections.map((section) => <section key={section.title} style={{ marginBottom: 36 }}><h2 style={{ fontSize: 24, letterSpacing: "-0.02em" }}>{section.title}</h2><p style={{ color: "#aaa5bb", lineHeight: 1.9, fontSize: 16 }}>{section.text}</p></section>)}
        <section style={{ marginTop: 50, paddingTop: 24, borderTop: "1px solid #30283c" }}>
          <h2 style={{ fontSize: 24 }}>Three ways to start</h2>
          <ul style={{ paddingLeft: 20, color: "#c8c1d8", lineHeight: 2.2 }}>{industry.ideas.map((idea) => <li key={idea}>{idea}</li>)}</ul>
          <Link href={`/?category=${slug}`} style={{ display: "inline-block", color: "#0a1003", background: "#c6ff71", fontWeight: 700, textDecoration: "none", borderRadius: 10, padding: "15px 24px", marginTop: 20 }}>Explore {industry.name} in the city ↗</Link>
          <p style={{ color: "#8d879f", fontSize: 12, lineHeight: 1.7, marginTop: 24 }}>AdBoard is an interactive marketplace demo. Campaigns, prices, and audience figures are illustrative. No payments are processed.</p>
        </section>
        <nav aria-label="Explore other industries" style={{ marginTop: 56, display: "flex", gap: 18, flexWrap: "wrap", fontSize: 13 }}>
          {Object.entries(industries).filter(([otherSlug]) => otherSlug !== slug).map(([otherSlug, other]) => <Link href={`/industries/${otherSlug}/`} key={otherSlug} style={{ color: "#bcb1d1" }}>{other.name} ↗</Link>)}
        </nav>
      </article>
    </main>
  );
}
