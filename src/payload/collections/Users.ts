import type { Access, FieldAccess } from "payload";
import type { CollectionConfig } from "payload";

const isAdmin: Access = ({ req }) => (req.user as { role?: string } | null)?.role === "admin";
const isAdminField: FieldAccess = ({ req }) => (req.user as { role?: string } | null)?.role === "admin";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  admin: { useAsTitle: "email" },
  access: {
    // Nobody can create a user through the public API or the /admin "create
    // first user" screen — including the very first account. The initial
    // admin is created via `npm run create-admin` (scripts/create-admin.ts),
    // which uses Payload's local API and requires direct database access.
    // After that, only an existing admin can create more users.
    create: isAdmin,
    read: isAdmin,
    update: ({ req, id }) => isAdmin({ req }) || req.user?.id === id,
    delete: isAdmin,
  },
  fields: [
    {
      type: "select",
      name: "role",
      label: "Role",
      required: true,
      defaultValue: "admin",
      options: [{ label: "Admin", value: "admin" }],
      access: {
        // Only an admin can set/change roles — a self-updating user can't
        // promote themselves via the update access rule above.
        update: isAdminField,
      },
    },
  ],
};
