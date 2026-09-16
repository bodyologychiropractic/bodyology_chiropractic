import { cache } from "react";
import type { Service, ServiceDetailSection } from "@/types";
import { getPayloadClient } from "@/lib/payload";
import { richTextToPlainText } from "@/payload/richtext";

const getServiceDocs = cache(async () => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "services",
    limit: 100,
    sort: "title",
  });
  return result.docs;
});

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

export async function getServices(): Promise<Service[]> {
  const docs = await getServiceDocs();
  return docs.map((doc) => {
    const imageBase = doc.imageBaseName || doc.slug;
    const widths = (doc.imageWidths ?? []).map((w: { value: number }) => w.value);

    return {
      slug: doc.slug,
      title: doc.title,
      description: doc.description,
      icon: doc.icon as Service["icon"],
      image: {
        base: `/images/services/${imageBase}`,
        ext: "webp",
        widths: widths.length > 0 ? widths : [400, 640, 940],
      },
      detail: {
        sections: detailSections(
          richTextToPlainText(doc.whatItIs),
          richTextToPlainText(doc.howItWorks),
          richTextToPlainText(doc.howItHelps),
        ),
      },
    } satisfies Service;
  });
}

export async function findService(slug: string): Promise<Service | undefined> {
  const services = await getServices();
  return services.find((service) => service.slug === slug);
}

export async function findServiceDoc(slug: string) {
  const docs = await getServiceDocs();
  return docs.find((doc) => doc.slug === slug);
}
