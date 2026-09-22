import type { GlobalConfig } from "payload";
import { authenticated } from "../access/authenticated";
import { revalidateGlobal } from "../hooks/revalidate";

export const Settings: GlobalConfig = {
  slug: "settings",
  label: "Site Settings",
  access: { read: () => true, update: authenticated },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { type: "text", name: "siteName", label: "Site Name", required: true },
    { type: "text", name: "siteTagline", label: "Tagline" },
    { type: "textarea", name: "siteDescription", label: "Site Description" },
    { type: "text", name: "bookingUrl", label: "Booking URL" },
    {
      type: "group",
      name: "practitioner",
      label: "Practitioner",
      fields: [
        { type: "text", name: "name", label: "Name" },
        { type: "text", name: "role", label: "Role" },
        {
          type: "array",
          name: "intro",
          label: "Intro Paragraphs",
          fields: [{ type: "textarea", name: "value", label: "Paragraph", required: true }],
        },
        {
          type: "array",
          name: "credentials",
          label: "Credentials",
          fields: [{ type: "text", name: "value", label: "Credential", required: true }],
        },
      ],
    },
    {
      type: "group",
      name: "address",
      label: "Address",
      fields: [
        { type: "text", name: "street", label: "Street" },
        { type: "text", name: "suburb", label: "Suburb" },
        { type: "text", name: "state", label: "State" },
        { type: "text", name: "postcode", label: "Postcode" },
        { type: "text", name: "country", label: "Country" },
      ],
    },
    { type: "text", name: "phoneE164", label: "Phone (E.164)" },
    {
      type: "group",
      name: "contact",
      label: "Contact",
      fields: [
        { type: "text", name: "phone", label: "Phone (display)" },
        { type: "text", name: "email", label: "Email" },
        { type: "text", name: "website", label: "Website" },
        { type: "text", name: "parking", label: "Parking note" },
        { type: "text", name: "region", label: "Region label" },
      ],
    },
    {
      type: "array",
      name: "openingHours",
      label: "Opening Hours",
      fields: [
        { type: "text", name: "days", label: "Days" },
        { type: "text", name: "hours", label: "Hours" },
      ],
    },
    {
      type: "array",
      name: "socialLinks",
      label: "Social Links",
      fields: [
        { type: "text", name: "label", label: "Label" },
        { type: "text", name: "href", label: "URL" },
        {
          type: "select",
          name: "icon",
          label: "Icon",
          options: ["facebook", "instagram"],
        },
      ],
    },
    {
      type: "array",
      name: "navLinks",
      label: "Navigation Links",
      fields: [
        { type: "text", name: "label", label: "Label" },
        { type: "text", name: "href", label: "URL" },
      ],
    },
  ],
};
