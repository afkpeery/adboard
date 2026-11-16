import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const origin = "https://adboard-neon-city.nuttysugar21.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: { default: "AdBoard™ — The city is your canvas", template: "%s | AdBoard™" },
  description:
    "Explore a neon city of brands. Discover campaigns, compare digital billboard space, and plan your next big moment on AdBoard.",
  applicationName: "AdBoard",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AdBoard™",
    title: "AdBoard™ — The city is your canvas",
    description: "A living city of brands, ideas, and digital billboards. Explore the AdBoard marketplace demo.",
    url: origin,
  },
  twitter: {
    card: "summary",
    title: "AdBoard™ — The city is your canvas",
    description: "Discover your next favorite brand in a neon digital city.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080911",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${origin}/#organization`,
      name: "AdBoard",
      url: origin,
      description: "An interactive digital billboard marketplace demonstration.",
    },
    {
      "@type": "WebSite",
      "@id": `${origin}/#website`,
      name: "AdBoard",
      url: origin,
      publisher: { "@id": `${origin}/#organization` },
      description: "Explore digital billboard inventory and discover campaigns in an interactive neon city.",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
