import type { Field } from "payload";

/** Reusable per-page/per-item SEO group: editable title tag + meta description. */
export const seoField: Field = {
  type: "group",
  name: "seo",
  label: "SEO",
  admin: { description: "Overrides for the page <title> and meta description." },
  fields: [
    { type: "text", name: "title", label: "SEO Title" },
    { type: "textarea", name: "description", label: "Meta Description" },
  ],
};
