import { cache } from "react";
import { getPayloadClient } from "@/lib/payload";

const getPageHeroGlobal = cache(async () => {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "pageHero" });
});

export async function getFeesHero() {
  const hero = await getPageHeroGlobal();
  return {
    eyebrow: hero.fees?.eyebrow ?? "",
    title: hero.fees?.title ?? "",
    seo: hero.fees?.seo ?? {},
  };
}

export async function getContactHero() {
  const hero = await getPageHeroGlobal();
  return {
    eyebrow: hero.contact?.eyebrow ?? "",
    title: hero.contact?.title ?? "",
    description: hero.contact?.description ?? "",
    seo: hero.contact?.seo ?? {},
  };
}

export async function getServicesHero() {
  const hero = await getPageHeroGlobal();
  return {
    eyebrow: hero.services?.eyebrow ?? "",
    title: hero.services?.title ?? "",
    description: hero.services?.description ?? "",
    seo: hero.services?.seo ?? {},
  };
}
