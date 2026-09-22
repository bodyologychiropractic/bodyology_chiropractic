import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { seoField } from "../fields/seo";
import { authenticated } from "../access/authenticated";
import { revalidateCollection, revalidateCollectionDelete } from "../hooks/revalidate";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "icon", "_status"],
  },
  versions: {
    drafts: {
      autosave: { interval: 2000 },
    },
    maxPerDoc: 20,
  },
  access: {
    // Logged-in admin users can see drafts (e.g. in the admin panel);
    // everyone else only ever gets published services back from the API.
    read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }),
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: { afterChange: [revalidateCollection], afterDelete: [revalidateCollectionDelete] },
  fields: [
    {
      type: "text",
      name: "slug",
      label: "Slug",
      required: true,
      unique: true,
      hooks: {
        beforeDuplicate: [({ value }) => `${value}-copy-${Date.now()}`],
      },
    },
    {
      type: "text",
      name: "title",
      label: "Title",
      required: true,
      hooks: {
        beforeDuplicate: [({ value }) => `${value} (Copy)`],
      },
    },
    {
      type: "textarea",
      name: "description",
      label: "Short Description",
      required: true,
      admin: { description: "Used on service cards and as the fallback SEO description." },
    },
    {
      type: "select",
      name: "icon",
      label: "Icon",
      required: true,
      options: [
        { label: "Spine", value: "spine" },
        { label: "Needle", value: "needle" },
        { label: "Hands", value: "hands" },
        { label: "Fascia", value: "fascia" },
        { label: "Rehab", value: "rehab" },
      ],
    },
    {
      type: "upload",
      name: "image",
      label: "Image",
      relationTo: "media",
      admin: {
        description:
          "Primary image for this service. The site currently renders pre-optimised responsive files from /public/images/services using imageBaseName/imageWidths below; replace those once the static pipeline is retired.",
      },
    },
    {
      type: "text",
      name: "imageBaseName",
      label: "Static image base filename (legacy responsive pipeline)",
      admin: {
        description:
          "Filename (without width suffix/extension) under /public/images/services, e.g. 'dry-needling' for dry-needling-400.webp.",
      },
    },
    {
      type: "array",
      name: "imageWidths",
      label: "Static image widths",
      fields: [{ type: "number", name: "value", required: true }],
    },
    {
      type: "richText",
      name: "whatItIs",
      label: "What it is",
      editor: lexicalEditor(),
    },
    {
      type: "richText",
      name: "howItWorks",
      label: "How it works in the body",
      editor: lexicalEditor(),
    },
    {
      type: "richText",
      name: "howItHelps",
      label: "How it may help",
      editor: lexicalEditor(),
    },
    seoField,
  ],
};
