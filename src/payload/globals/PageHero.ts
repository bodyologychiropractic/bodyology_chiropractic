import type { GlobalConfig } from "payload";
import { seoField } from "../fields/seo";
import { authenticated } from "../access/authenticated";

export const PageHero: GlobalConfig = {
  slug: "pageHero",
  label: "Page Heroes",
  access: { read: () => true, update: authenticated },
  fields: [
    {
      type: "group",
      name: "fees",
      label: "Fees Page Hero",
      fields: [
        { type: "text", name: "eyebrow", label: "Eyebrow" },
        { type: "text", name: "title", label: "Title" },
        seoField,
      ],
    },
    {
      type: "group",
      name: "contact",
      label: "Contact Page Hero",
      fields: [
        { type: "text", name: "eyebrow", label: "Eyebrow" },
        { type: "text", name: "title", label: "Title" },
        {
          type: "textarea",
          name: "description",
          label: "Description (use {{region}} as placeholder)",
        },
        seoField,
      ],
    },
    {
      type: "group",
      name: "services",
      label: "Services Page Hero",
      fields: [
        { type: "text", name: "eyebrow", label: "Eyebrow" },
        { type: "text", name: "title", label: "Title" },
        { type: "textarea", name: "description", label: "Description" },
        seoField,
      ],
    },
  ],
};
