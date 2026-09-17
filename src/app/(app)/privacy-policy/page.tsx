import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalPageView from "@/components/legal/LegalPageView";
import { getLegalPage } from "@/lib/legal-content";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage("privacy-policy");
  return buildMetadata(page?.title ?? "Privacy Policy", "", "/privacy-policy", page?.seo);
}

export default async function PrivacyPolicyPage() {
  const page = await getLegalPage("privacy-policy");
  if (!page) notFound();

  return <LegalPageView page={page} />;
}
