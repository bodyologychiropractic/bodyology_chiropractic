import { cache } from "react";
import { getPayloadClient } from "@/lib/payload";

export const getFaqs = cache(async () => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "faqs",
    limit: 100,
    sort: "order",
  });
  return result.docs;
});
