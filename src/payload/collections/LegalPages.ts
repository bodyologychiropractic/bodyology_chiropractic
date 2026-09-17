import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { authenticated } from "../access/authenticated";
import { revalidateCollection, revalidateCollectionDelete } from "../hooks/revalidate";
import { seoField } from "../fields/seo";

export const LegalPages: CollectionConfig = {
  slug: "legal-pages",
  labels: { singular: "Legal Page", plural: "Legal Pages" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "slug"] },
  access: { read: () => true, create: authenticated, update: authenticated, delete: authenticated },
  hooks: { afterChange: [revalidateCollection], afterDelete: [revalidateCollectionDelete] },
  fields: [
    {
      type: "select",
      name: "slug",
      label: "Page",
      required: true,
      unique: true,
      options: [
        { label: "Privacy Policy", value: "privacy-policy" },
        { label: "Terms & Conditions", value: "terms-conditions" },
      ],
    },
    { type: "text", name: "title", label: "Title", required: true },
    {
      type: "richText",
      name: "body",
      label: "Content",
      editor: lexicalEditor(),
    },
    seoField,
  ],
};
