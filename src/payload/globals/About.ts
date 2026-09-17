import type { GlobalConfig } from "payload";
import { seoField } from "../fields/seo";
import { checklistFields, proseFields } from "../fields/prose";
import { authenticated } from "../access/authenticated";

export const About: GlobalConfig = {
  slug: "about",
  label: "About Page",
  access: { read: () => true, update: authenticated },
  fields: [
    { type: "group", name: "intro", label: "Intro", fields: proseFields },
    { type: "group", name: "practitioner", label: "Practitioner", fields: proseFields },
    { type: "group", name: "beyondPain", label: "Beyond the Pain", fields: proseFields },
    { type: "group", name: "fascia", label: "Fascia", fields: proseFields },
    { type: "group", name: "careApproach", label: "Care Approach", fields: checklistFields },
    { type: "textarea", name: "careApproachNote", label: "Care Approach Note" },
    { type: "group", name: "conditions", label: "Conditions", fields: checklistFields },
    { type: "group", name: "qualifications", label: "Qualifications", fields: checklistFields },
    { type: "textarea", name: "closing", label: "Closing Statement" },
    seoField,
  ],
};
