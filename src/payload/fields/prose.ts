import type { Field } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

/** Mirrors Tina's `proseFields`: eyebrow + title + rich-text paragraphs. */
export const proseFields: Field[] = [
  { type: "text", name: "eyebrow", label: "Eyebrow" },
  { type: "text", name: "title", label: "Title", required: true },
  {
    type: "richText",
    name: "paragraphs",
    label: "Paragraphs",
    editor: lexicalEditor(),
  },
];

/** Mirrors Tina's `checklistFields`: eyebrow + title + description + plain list items. */
export const checklistFields: Field[] = [
  { type: "text", name: "eyebrow", label: "Eyebrow" },
  { type: "text", name: "title", label: "Title", required: true },
  { type: "textarea", name: "description", label: "Description" },
  {
    type: "array",
    name: "items",
    label: "Items",
    fields: [{ type: "text", name: "value", label: "Item", required: true }],
  },
];
