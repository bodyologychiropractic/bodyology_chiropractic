import type { CollectionConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Media: CollectionConfig = {
  slug: "media",
  admin: { useAsTitle: "alt" },
  access: { read: () => true },
  upload: {
    staticDir: path.resolve(dirname, "../../../public/media"),
    imageSizes: [
      { name: "thumbnail", width: 400 },
      { name: "card", width: 768 },
      { name: "hero", width: 1600 },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [{ type: "text", name: "alt", label: "Alt text" }],
};
