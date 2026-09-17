import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { authenticated } from "../access/authenticated";
import { revalidateCollection, revalidateCollectionDelete } from "../hooks/revalidate";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  labels: { singular: "FAQ", plural: "FAQs" },
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "order"],
  },
  defaultSort: "order",
  access: { read: () => true, create: authenticated, update: authenticated, delete: authenticated },
  hooks: { afterChange: [revalidateCollection], afterDelete: [revalidateCollectionDelete] },
  fields: [
    { type: "text", name: "question", label: "Question", required: true },
    {
      type: "richText",
      name: "answer",
      label: "Answer",
      required: true,
      editor: lexicalEditor(),
    },
    {
      type: "number",
      name: "order",
      label: "Display order",
      required: true,
      defaultValue: 0,
      admin: { description: "Lower numbers show first." },
    },
  ],
};
