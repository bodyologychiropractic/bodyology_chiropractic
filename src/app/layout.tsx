import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import AOSProvider from "@/components/animations/AOSProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { practiceSchema, websiteSchema } from "@/lib/structured-data";
import { ADDRESS, SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import { buildMetadata } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export function generateMetadata(): Metadata {
  return {
    ...buildMetadata(SITE_NAME, SITE_DESCRIPTION, "/"),
    title: `${SITE_NAME} | Chiropractor in ${ADDRESS.suburb}, ${ADDRESS.state}`,
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${inter.variable} h-full`}>
      <head>
        <link rel="preconnect" href="https://app.iconpractice.com" />
        <link rel="dns-prefetch" href="https://js.stripe.com" />
      </head>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <JsonLd data={[practiceSchema(), websiteSchema()]} />
        <AOSProvider />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
