import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#080911", color: "#f6f4ff", fontFamily: "Arial, sans-serif", padding: 28 }}>
      <div style={{ maxWidth: 480 }}>
        <p style={{ color: "#c9a1ff", letterSpacing: "0.18em", fontSize: 12 }}>ADBOARD™ / 404</p>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 56px)", lineHeight: 1.05, margin: "24px 0" }}>This street doesn’t exist.</h1>
        <p style={{ color: "#a7a5b7", lineHeight: 1.8, marginBottom: 32 }}>The city is still waiting. Head back to the skyline to explore campaigns and discover your next favorite brand.</p>
        <Link href="/" style={{ display: "inline-block", background: "#c6ff71", color: "#101509", borderRadius: 10, padding: "14px 22px", textDecoration: "none", fontWeight: 700 }}>Return to the city ↗</Link>
      </div>
    </main>
  );
}
