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
    {
      type: "group",
      name: "firstTimeService",
      label: "First Time Visit Section",
      admin: {
        description:
          "Homepage section with numbered steps for new patients, a Book Online button, and a promo banner image below it.",
      },
      fields: [
        { type: "text", name: "title", label: "Title" },
        { type: "textarea", name: "description", label: "Description" },
        {
          type: "array",
          name: "steps",
          label: "Steps",
          labels: { singular: "Step", plural: "Steps" },
          fields: [
            { type: "upload", name: "image", label: "Image", relationTo: "media" },
            { type: "text", name: "title", label: "Title", required: true },
            { type: "textarea", name: "description", label: "Description" },
          ],
        },
        {
          type: "upload",
          name: "bannerImage",
          label: "Banner image (shown below the Book Online button)",
          relationTo: "media",
          admin: {
            description: "Set the alt text on the Media item itself for SEO/accessibility.",
          },
        },
      ],
    },
    seoField,
  ],
};
