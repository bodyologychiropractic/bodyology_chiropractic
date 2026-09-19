import path from "path";
import { fileURLToPath } from "url";
import { buildConfig, type Plugin } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Services } from "./payload/collections/Services";
import { LegalPages } from "./payload/collections/LegalPages";
import { Faqs } from "./payload/collections/Faqs";
import { Settings } from "./payload/globals/Settings";
import { Fees } from "./payload/globals/Fees";
import { About } from "./payload/globals/About";
import { Home } from "./payload/globals/Home";
import { PageHero } from "./payload/globals/PageHero";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const plugins: Plugin[] = process.env.BLOB_READ_WRITE_TOKEN
  ? [
      vercelBlobStorage({
        collections: { media: true },
        token: process.env.BLOB_READ_WRITE_TOKEN,
      }),
    ]
  : [];

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  editor: lexicalEditor(),
  collections: [Users, Media, Services, LegalPages, Faqs],
  globals: [Settings, Fees, About, Home, PageHero],
  plugins,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
    push: false,
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
