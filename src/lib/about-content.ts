import { cache } from "react";
import type { ChecklistContent, ProseContent } from "@/types";
import { getPayloadClient } from "@/lib/payload";
import { richTextToParagraphs } from "@/payload/richtext";

const getAbout = cache(async () => {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "about" });
});

function toProse(id: string, group: { eyebrow?: string | null; title: string; paragraphs?: unknown }): ProseContent {
  return {
    id,
    eyebrow: group.eyebrow ?? undefined,
    title: group.title,
    paragraphs: richTextToParagraphs(group.paragraphs),
  };
}

function toChecklist(
  id: string,
  group: {
    eyebrow?: string | null;
    title: string;
    description?: string | null;
    items?: { value: string }[] | null;
  },
): ChecklistContent {
  return {
    id,
    eyebrow: group.eyebrow ?? undefined,
    title: group.title,
    description: group.description ?? undefined,
    items: (group.items ?? []).map((item) => item.value),
  };
}

export async function getAboutIntro(): Promise<ProseContent> {
  const about = await getAbout();
  return toProse("about-intro", about.intro);
}

export async function getAboutPractitioner(): Promise<ProseContent> {
  const about = await getAbout();
  return toProse("practitioner", about.practitioner);
}

export async function getAboutBeyondPain(): Promise<ProseContent> {
  const about = await getAbout();
  return toProse("beyond-pain", about.beyondPain);
}

export async function getAboutFascia(): Promise<ProseContent> {
  const about = await getAbout();
  return toProse("fascia", about.fascia);
}

export async function getAboutCareApproach(): Promise<ChecklistContent> {
  const about = await getAbout();
  return toChecklist("care-approach", about.careApproach);
}

export async function getAboutCareApproachNote(): Promise<string> {
  const about = await getAbout();
  return about.careApproachNote ?? "";
}

export async function getAboutConditions(): Promise<ChecklistContent> {
  const about = await getAbout();
  return toChecklist("conditions", about.conditions);
}

export async function getAboutQualifications(): Promise<ChecklistContent> {
  const about = await getAbout();
  return toChecklist("qualifications", about.qualifications);
}

export async function getAboutClosing(): Promise<string> {
  const about = await getAbout();
  return about.closing ?? "";
}

export async function getAboutSeo() {
  const about = await getAbout();
  return about.seo ?? {};
}
