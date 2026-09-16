import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Services } from "./payload/collections/Services";
import { Settings } from "./payload/globals/Settings";
import { Fees } from "./payload/globals/Fees";
import { About } from "./payload/globals/About";
import { Home } from "./payload/globals/Home";
import { PageHero } from "./payload/globals/PageHero";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  editor: lexicalEditor(),
  collections: [Users, Media, Services],
  globals: [Settings, Fees, About, Home, PageHero],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
