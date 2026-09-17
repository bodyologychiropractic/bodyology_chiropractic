import type { GlobalConfig } from "payload";
import { seoField } from "../fields/seo";
import { authenticated } from "../access/authenticated";
import { revalidateGlobal } from "../hooks/revalidate";

export const Home: GlobalConfig = {
  slug: "home",
  label: "Home Page",
  access: { read: () => true, update: authenticated },
  hooks: { afterChange: [revalidateGlobal] },
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
