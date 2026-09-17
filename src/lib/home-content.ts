import { cache } from "react";
import { getPayloadClient } from "@/lib/payload";

const getHomeGlobal = cache(async () => {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "home" });
});

export async function getHomeServicesSection() {
  const home = await getHomeGlobal();
  return {
    eyebrow: home.servicesSection?.eyebrow ?? "",
    title: home.servicesSection?.title ?? "",
    description: home.servicesSection?.description ?? "",
  };
}

export async function getHomeFirstTimeService() {
  const home = await getHomeGlobal();
  const section = home.firstTimeService;

  return {
    title: section?.title ?? "",
    description: section?.description ?? "",
    steps: (section?.steps ?? []).map((step) => ({
      image: typeof step.image === "object" ? step.image : null,
      title: step.title,
      description: step.description ?? "",
    })),
    bannerImage: typeof section?.bannerImage === "object" ? section.bannerImage : null,
  };
}
