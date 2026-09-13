import type { Service, ServiceDetailSection } from "@/types";
import chiropracticAdjustments from "../../content/services/chiropractic-adjustments.json";
import softTissueTherapy from "../../content/services/soft-tissue-therapy.json";
import dryNeedling from "../../content/services/dry-needling.json";
import electroDryNeedling from "../../content/services/electro-dry-needling.json";
import fascialManipulation from "../../content/services/fascial-manipulation.json";
import rehabilitation from "../../content/services/rehabilitation.json";

interface ServiceEntry {
  slug: string;
  title: string;
  description: string;
  icon: string;
  imageName: string;
  imageWidths: number[];
  whatItIs: string;
  howItWorks: string;
  howItHelps: string;
}

const SERVICE_ENTRIES: ServiceEntry[] = [
  chiropracticAdjustments,
  softTissueTherapy,
  dryNeedling,
  electroDryNeedling,
  fascialManipulation,
  rehabilitation,
];

function detailSections(
  whatItIs: string,
  howItWorks: string,
  howItHelps: string,
): ServiceDetailSection[] {
  return [
    { label: "What it is", body: whatItIs },
    { label: "How it works in the body", body: howItWorks },
    { label: "How it may help", body: howItHelps },
  ];
}

export const SERVICES: Service[] = SERVICE_ENTRIES.map((entry) => ({
  slug: entry.slug,
  title: entry.title,
  description: entry.description,
  icon: entry.icon as Service["icon"],
  image: { base: `/images/services/${entry.imageName}`, ext: "webp", widths: entry.imageWidths },
  detail: {
    sections: detailSections(entry.whatItIs, entry.howItWorks, entry.howItHelps),
  },
}));

export function findService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
