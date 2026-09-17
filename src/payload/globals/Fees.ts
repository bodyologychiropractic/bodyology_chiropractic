import type { GlobalConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { seoField } from "../fields/seo";
import { authenticated } from "../access/authenticated";

export const Fees: GlobalConfig = {
  slug: "fees",
  label: "Fees Page",
  access: { read: () => true, update: authenticated },
  fields: [
    { type: "richText", name: "intro", label: "Intro", editor: lexicalEditor() },
    {
      type: "array",
      name: "fees",
      label: "Fee Items",
      fields: [
        { type: "text", name: "id", label: "ID (unique slug)", required: true },
        { type: "text", name: "name", label: "Name", required: true },
        { type: "text", name: "price", label: "Price" },
        { type: "text", name: "duration", label: "Duration" },
        {
          type: "richText",
          name: "paragraphs",
          label: "Paragraphs",
          editor: lexicalEditor(),
        },
        { type: "text", name: "itemsLabel", label: "Items Label" },
        {
          type: "array",
          name: "items",
          label: "Items",
          fields: [{ type: "text", name: "value", label: "Item", required: true }],
        },
        { type: "textarea", name: "note", label: "Note" },
      ],
    },
    seoField,
  ],
};
