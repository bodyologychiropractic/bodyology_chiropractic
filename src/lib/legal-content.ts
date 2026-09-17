import { cache } from "react";
import { getPayloadClient } from "@/lib/payload";

export const getLegalPage = cache(async (slug: "privacy-policy" | "terms-conditions") => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "legal-pages",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0] ?? null;
});
