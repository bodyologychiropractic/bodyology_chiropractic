import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import AOSProvider from "@/components/animations/AOSProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/seo/GoogleAnalytics";
import GoogleTagManager from "@/components/seo/GoogleTagManager";
import MetaPixel from "@/components/seo/MetaPixel";
import JsonLd from "@/components/seo/JsonLd";
import { practiceSchema, websiteSchema } from "@/lib/structured-data";
import { getAddress, getSiteDescription, getSiteName } from "@/lib/constants";
import { buildMetadata } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const [siteName, siteDescription, address] = await Promise.all([
    getSiteName(),
    getSiteDescription(),
    getAddress(),
  ]);
  const base = await buildMetadata(siteName, siteDescription, "/");
  return {
    ...base,
    title: `${siteName} | Chiropractor in ${address.suburb}, ${address.state}`,
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [practice, website] = await Promise.all([practiceSchema(), websiteSchema()]);

  return (
    <html lang="en-AU" className={`${inter.variable} h-full`}>
      <head>
        <link rel="preconnect" href="https://app.iconpractice.com" />
        <link rel="dns-prefetch" href="https://js.stripe.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <JsonLd data={[practice, website]} />
        <AOSProvider />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
        <GoogleTagManager />
        <MetaPixel />
      </body>
    </html>
  );
}
