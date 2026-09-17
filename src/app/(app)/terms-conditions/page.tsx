import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalPageView from "@/components/legal/LegalPageView";
import { getLegalPage } from "@/lib/legal-content";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage("terms-conditions");
  return buildMetadata(page?.title ?? "Terms & Conditions", "", "/terms-conditions", page?.seo);
}

export default async function TermsConditionsPage() {
  const page = await getLegalPage("terms-conditions");
  if (!page) notFound();

  return <LegalPageView page={page} />;
}
