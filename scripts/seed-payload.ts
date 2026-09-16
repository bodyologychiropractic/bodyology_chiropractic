import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { toLexical, toLexicalSingle } from "../src/payload/richtext";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname, "..");
const contentDir = path.join(root, "content");

function readJson<T>(relPath: string): T {
  const full = path.join(contentDir, relPath);
  return JSON.parse(fs.readFileSync(full, "utf8")) as T;
}

function toArrayField(values: string[] | undefined) {
  return (values ?? []).map((value) => ({ value }));
}

async function run() {
  const payload = await getPayload({ config });

  const existingServices = await payload.find({ collection: "services", limit: 1 });
  if (existingServices.docs.length > 0) {
    console.log("Database already has content — skipping seed.");
    process.exit(0);
  }

  // ---- settings -----------------------------------------------------
  const settings = readJson<{
    siteName: string;
    siteTagline: string;
    siteDescription: string;
    bookingUrl: string;
    practitioner: { name: string; role: string; intro: string[]; credentials: string[] };
    address: { street: string; suburb: string; state: string; postcode: string; country: string };
    phoneE164: string;
    contact: { phone: string; email: string; website: string; parking: string; region: string };
    openingHours: { days: string; hours: string }[];
    socialLinks: { label: string; href: string; icon: string }[];
    navLinks: { label: string; href: string }[];
  }>("settings/settings.json");

  await payload.updateGlobal({
    slug: "settings",
    data: {
      siteName: settings.siteName,
      siteTagline: settings.siteTagline,
      siteDescription: settings.siteDescription,
      bookingUrl: settings.bookingUrl,
      practitioner: {
        name: settings.practitioner.name,
        role: settings.practitioner.role,
        intro: toArrayField(settings.practitioner.intro),
        credentials: toArrayField(settings.practitioner.credentials),
      },
      address: settings.address,
      phoneE164: settings.phoneE164,
      contact: settings.contact,
      openingHours: settings.openingHours,
      socialLinks: settings.socialLinks as never,
      navLinks: settings.navLinks,
    },
  });
  console.log("Seeded settings global");

  // ---- fees -----------------------------------------------------------
  const fees = readJson<{
    intro: string;
    fees: {
      id: string;
      name: string;
      price: string;
      duration?: string;
      paragraphs: string[];
      itemsLabel?: string;
      items?: string[];
      note?: string;
    }[];
  }>("fees/fees.json");

  await payload.updateGlobal({
    slug: "fees",
    data: {
      intro: toLexicalSingle(fees.intro) as never,
      fees: fees.fees.map((fee) => ({
        id: fee.id,
        name: fee.name,
        price: fee.price,
        duration: fee.duration,
        paragraphs: toLexical(fee.paragraphs) as never,
        itemsLabel: fee.itemsLabel,
        items: toArrayField(fee.items),
        note: fee.note,
      })),
    },
  });
  console.log("Seeded fees global");

  // ---- about ------------------------------------------------------------
  interface ProseJson {
    eyebrow?: string;
    title: string;
    paragraphs: string[];
  }
  interface ChecklistJson {
    eyebrow?: string;
    title: string;
    description?: string;
    items: string[];
  }
  const about = readJson<{
    intro: ProseJson;
    practitioner: ProseJson;
    beyondPain: ProseJson;
    fascia: ProseJson;
    careApproach: ChecklistJson;
    careApproachNote: string;
    conditions: ChecklistJson;
    qualifications: ChecklistJson;
    closing: string;
  }>("about/about.json");

  const prose = (p: ProseJson) => ({
    eyebrow: p.eyebrow,
    title: p.title,
    paragraphs: toLexical(p.paragraphs) as never,
  });
  const checklist = (c: ChecklistJson) => ({
    eyebrow: c.eyebrow,
    title: c.title,
    description: c.description,
    items: toArrayField(c.items),
  });

  await payload.updateGlobal({
    slug: "about",
    data: {
      intro: prose(about.intro),
      practitioner: prose(about.practitioner),
      beyondPain: prose(about.beyondPain),
      fascia: prose(about.fascia),
      careApproach: checklist(about.careApproach),
      careApproachNote: about.careApproachNote,
      conditions: checklist(about.conditions),
      qualifications: checklist(about.qualifications),
      closing: about.closing,
    },
  });
  console.log("Seeded about global");

  // ---- home ---------------------------------------------------------------
  const home = readJson<{
    servicesSection: { eyebrow: string; title: string; description: string };
  }>("home/home.json");

  await payload.updateGlobal({
    slug: "home",
    data: { servicesSection: home.servicesSection },
  });
  console.log("Seeded home global");

  // ---- pageHero -------------------------------------------------------------
  const heroes = readJson<{
    fees: { eyebrow: string; title: string };
    contact: { eyebrow: string; title: string; description: string };
    services: { eyebrow: string; title: string; description: string };
  }>("pages/heroes.json");

  await payload.updateGlobal({
    slug: "pageHero",
    data: heroes,
  });
  console.log("Seeded pageHero global");

  // ---- services (+ media) -----------------------------------------------
  interface ServiceJson {
    slug: string;
    title: string;
    description: string;
    icon: string;
    imageName: string;
    imageWidths: number[];
    whatItIs: string;
    howItWorks: string;
    howItHelps: string;
  }

  const serviceFiles = fs
    .readdirSync(path.join(contentDir, "services"))
    .filter((f) => f.endsWith(".json"));

  for (const file of serviceFiles) {
    const svc = readJson<ServiceJson>(`services/${file}`);
    const largestWidth = Math.max(...svc.imageWidths);
    const imageFilename = `${svc.imageName}-${largestWidth}.webp`;
    const imagePath = path.join(root, "public", "images", "services", imageFilename);

    let mediaId: number | undefined;
    if (fs.existsSync(imagePath)) {
      const existingMedia = await payload.find({
        collection: "media",
        where: { filename: { equals: imageFilename } },
        limit: 1,
      });

      if (existingMedia.docs.length > 0) {
        mediaId = existingMedia.docs[0].id;
      } else {
        const buffer = fs.readFileSync(imagePath);
        const created = await payload.create({
          collection: "media",
          data: { alt: svc.title },
          file: {
            data: buffer,
            mimetype: "image/webp",
            name: imageFilename,
            size: buffer.length,
          },
        });
        mediaId = created.id;
      }
    } else {
      console.warn(`  Image not found for ${svc.slug}: ${imagePath} (skipping media)`);
    }

    const existingService = await payload.find({
      collection: "services",
      where: { slug: { equals: svc.slug } },
      limit: 1,
    });

    const data = {
      slug: svc.slug,
      title: svc.title,
      description: svc.description,
      icon: svc.icon as never,
      image: mediaId,
      imageBaseName: svc.imageName,
      imageWidths: svc.imageWidths.map((value) => ({ value })),
      whatItIs: toLexicalSingle(svc.whatItIs) as never,
      howItWorks: toLexicalSingle(svc.howItWorks) as never,
      howItHelps: toLexicalSingle(svc.howItHelps) as never,
    };

    if (existingService.docs.length > 0) {
      await payload.update({
        collection: "services",
        id: existingService.docs[0].id,
        data,
      });
    } else {
      await payload.create({ collection: "services", data });
    }
    console.log(`Seeded service: ${svc.slug}`);
  }

  console.log("\nSeed complete.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
