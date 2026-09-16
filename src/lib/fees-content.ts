import { cache } from "react";
import type { Fee } from "@/types";
import { getPayloadClient } from "@/lib/payload";
import { richTextToParagraphs, richTextToPlainText } from "@/payload/richtext";

const getFeesGlobal = cache(async () => {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "fees" });
});

export async function getFeesIntro(): Promise<string> {
  const fees = await getFeesGlobal();
  return richTextToPlainText(fees.intro);
}

export async function getFees(): Promise<Fee[]> {
  const fees = await getFeesGlobal();
  return (fees.fees ?? []).map(
    (fee: {
      id?: string | null;
      name: string;
      price?: string | null;
      duration?: string | null;
      paragraphs?: unknown;
      itemsLabel?: string | null;
      items?: { value: string }[] | null;
      note?: string | null;
    }) => ({
      id: fee.id ?? "",
      name: fee.name,
      price: fee.price ?? "",
      duration: fee.duration ?? undefined,
      paragraphs: richTextToParagraphs(fee.paragraphs),
      itemsLabel: fee.itemsLabel ?? undefined,
      items: (fee.items ?? []).map((item) => item.value),
      note: fee.note ?? undefined,
    }),
  );
}
