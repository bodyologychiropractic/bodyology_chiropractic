import type { GlobalConfig } from "payload";
import { seoField } from "../fields/seo";

export const Home: GlobalConfig = {
  slug: "home",
  label: "Home Page",
  access: { read: () => true },
  fields: [
    {
      type: "group",
      name: "servicesSection",
      label: "Services Section",
      fields: [
        { type: "text", name: "eyebrow", label: "Eyebrow" },
        { type: "text", name: "title", label: "Title" },
        { type: "textarea", name: "description", label: "Description" },
      ],
    },
    seoField,
  ],
};
