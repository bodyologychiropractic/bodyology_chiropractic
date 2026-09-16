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
