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

export async function getHomeAboutSection() {
  const home = await getHomeGlobal();
  const section = home.aboutSection;

  return {
    image: typeof section?.image === "object" ? section.image : null,
    eyebrow: section?.eyebrow ?? "",
    title: section?.title ?? "",
    description: section?.description ?? "",
    points: (section?.points ?? []).map((point) => ({
      title: point.title,
      description: point.description ?? "",
    })),
    buttonLabel: section?.buttonLabel ?? "Learn More About Us",
  };
}

export async function getHomeHealthFundsSection() {
  const home = await getHomeGlobal();
  const section = home.healthFundsSection;

  return {
    title: section?.title ?? "",
    description: section?.description ?? "",
    funds: (section?.funds ?? [])
      .map((fund) => (typeof fund.image === "object" ? fund.image : null))
      .filter((image): image is NonNullable<typeof image> => image !== null),
    googleRating: {
      rating: section?.googleRating?.rating ?? null,
      reviewCount: section?.googleRating?.reviewCount ?? null,
      url: section?.googleRating?.url ?? "",
    },
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
