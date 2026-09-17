import { getPayload } from "payload";
import config from "../src/payload.config";

async function run() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn(
      "ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin account creation. " +
        "Set both env vars to have `npm run build` create your admin login automatically.",
    );
    process.exit(0);
  }

  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    console.log(`User ${email} already exists — nothing to do.`);
    process.exit(0);
  }

  await payload.create({
    collection: "users",
    data: { email, password, role: "admin" },
  });

  console.log(`Admin user ${email} created. You can now log in at /admin.`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
