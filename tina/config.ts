import { defineConfig } from "tinacms";

const branch =
  process.env.TINA_PUBLIC_BRANCH ||
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const proseFields = [
  { type: "string" as const, name: "eyebrow", label: "Eyebrow" },
  { type: "string" as const, name: "title", label: "Title", required: true },
  {
    type: "string" as const,
    name: "paragraphs",
    label: "Paragraphs",
    list: true,
    ui: { component: "textarea" },
  },
];

const checklistFields = [
  { type: "string" as const, name: "eyebrow", label: "Eyebrow" },
  { type: "string" as const, name: "title", label: "Title", required: true },
  { type: "string" as const, name: "description", label: "Description", ui: { component: "textarea" } },
  { type: "string" as const, name: "items", label: "Items", list: true },
];

export default defineConfig({
  branch,
  clientId: process.env.CUSTOM_SIDE_ID || null,
  token: process.env.CUSTOM_SIDE_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "settings",
        label: "Site Settings",
        path: "content/settings",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        fields: [
          { type: "string", name: "siteName", label: "Site Name", required: true },
          { type: "string", name: "siteTagline", label: "Tagline" },
          {
            type: "string",
            name: "siteDescription",
            label: "Site Description",
            ui: { component: "textarea" },
          },
          { type: "string", name: "bookingUrl", label: "Booking URL" },
          {
            type: "object",
            name: "practitioner",
            label: "Practitioner",
            fields: [
              { type: "string", name: "name", label: "Name" },
              { type: "string", name: "role", label: "Role" },
              { type: "string", name: "intro", label: "Intro Paragraphs", list: true, ui: { component: "textarea" } },
              { type: "string", name: "credentials", label: "Credentials", list: true },
            ],
          },
          {
            type: "object",
            name: "address",
            label: "Address",
            fields: [
              { type: "string", name: "street", label: "Street" },
              { type: "string", name: "suburb", label: "Suburb" },
              { type: "string", name: "state", label: "State" },
              { type: "string", name: "postcode", label: "Postcode" },
              { type: "string", name: "country", label: "Country" },
            ],
          },
          { type: "string", name: "phoneE164", label: "Phone (E.164)" },
          {
            type: "object",
            name: "contact",
            label: "Contact",
            fields: [
              { type: "string", name: "phone", label: "Phone (display)" },
              { type: "string", name: "email", label: "Email" },
              { type: "string", name: "website", label: "Website" },
              { type: "string", name: "parking", label: "Parking note" },
              { type: "string", name: "region", label: "Region label" },
            ],
          },
          {
            type: "object",
            name: "openingHours",
            label: "Opening Hours",
            list: true,
            fields: [
              { type: "string", name: "days", label: "Days" },
              { type: "string", name: "hours", label: "Hours" },
            ],
          },
          {
            type: "object",
            name: "socialLinks",
            label: "Social Links",
            list: true,
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "href", label: "URL" },
              {
                type: "string",
                name: "icon",
                label: "Icon",
                options: ["facebook", "instagram"],
              },
            ],
          },
          {
            type: "object",
            name: "navLinks",
            label: "Navigation Links",
            list: true,
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "href", label: "URL" },
            ],
          },
        ],
      },
      {
        name: "fees",
        label: "Fees Page",
        path: "content/fees",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        fields: [
          { type: "string", name: "intro", label: "Intro", ui: { component: "textarea" } },
          {
            type: "object",
            name: "fees",
            label: "Fee Items",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name }),
            },
            fields: [
              { type: "string", name: "id", label: "ID (unique slug)", required: true },
              { type: "string", name: "name", label: "Name", required: true },
              { type: "string", name: "price", label: "Price" },
              { type: "string", name: "duration", label: "Duration" },
              {
                type: "string",
                name: "paragraphs",
                label: "Paragraphs",
                list: true,
                ui: { component: "textarea" },
              },
              { type: "string", name: "itemsLabel", label: "Items Label" },
              { type: "string", name: "items", label: "Items", list: true },
              { type: "string", name: "note", label: "Note", ui: { component: "textarea" } },
            ],
          },
        ],
      },
      {
        name: "about",
        label: "About Page",
        path: "content/about",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        fields: [
          { type: "object", name: "intro", label: "Intro", fields: proseFields },
          { type: "object", name: "practitioner", label: "Practitioner", fields: proseFields },
          { type: "object", name: "beyondPain", label: "Beyond the Pain", fields: proseFields },
          { type: "object", name: "fascia", label: "Fascia", fields: proseFields },
          { type: "object", name: "careApproach", label: "Care Approach", fields: checklistFields },
          {
            type: "string",
            name: "careApproachNote",
            label: "Care Approach Note",
            ui: { component: "textarea" },
          },
          { type: "object", name: "conditions", label: "Conditions", fields: checklistFields },
          { type: "object", name: "qualifications", label: "Qualifications", fields: checklistFields },
          { type: "string", name: "closing", label: "Closing Statement", ui: { component: "textarea" } },
        ],
      },
      {
        name: "service",
        label: "Services",
        path: "content/services",
        format: "json",
        ui: {
          router: () => "/services",
          filename: {
            readonly: true,
            slugify: (values) => `${values?.slug || "service"}`,
          },
        },
        fields: [
          { type: "string", name: "slug", label: "Slug", required: true },
          { type: "string", name: "title", label: "Title", required: true },
          {
            type: "string",
            name: "description",
            label: "Short Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "icon",
            label: "Icon",
            options: ["spine", "needle", "hands", "fascia", "rehab"],
          },
          { type: "string", name: "imageName", label: "Image file name (in /public/images/services)" },
          { type: "string", name: "whatItIs", label: "What it is", ui: { component: "textarea" } },
          {
            type: "string",
            name: "howItWorks",
            label: "How it works in the body",
            ui: { component: "textarea" },
          },
          { type: "string", name: "howItHelps", label: "How it may help", ui: { component: "textarea" } },
        ],
      },
      {
        name: "home",
        label: "Home Page",
        path: "content/home",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        fields: [
          {
            type: "object",
            name: "servicesSection",
            label: "Services Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description" },
            ],
          },
        ],
      },
      {
        name: "pageHero",
        label: "Page Heroes",
        path: "content/pages",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        fields: [
          {
            type: "object",
            name: "fees",
            label: "Fees Page Hero",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "title", label: "Title" },
            ],
          },
          {
            type: "object",
            name: "contact",
            label: "Contact Page Hero",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "title", label: "Title" },
              {
                type: "string",
                name: "description",
                label: "Description (use {{region}} as placeholder)",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "services",
            label: "Services Page Hero",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
            ],
          },
        ],
      },
    ],
  },
});
