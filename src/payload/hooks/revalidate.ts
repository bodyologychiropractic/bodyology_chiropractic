import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from "payload";

// Content site-wide is small enough that invalidating the whole tree on any
// save is simpler and safer than tracking which route each field affects.
//
// revalidatePath only works inside a Next.js request (e.g. a save made
// through the /admin panel, which runs as a Next.js route handler). When
// Payload's local API is used from a standalone script (seed, migrate,
// create-admin) there is no such request context, and calling it throws
// "Invariant: static generation store missing". That must never break the
// actual write, so it's swallowed here — cache invalidation is best-effort.
function revalidateAll() {
  try {
    revalidatePath("/", "layout");
  } catch {
    // Not running inside a Next.js request — nothing to revalidate.
  }
}

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc }) => {
  revalidateAll();
  return doc;
};

export const revalidateCollection: CollectionAfterChangeHook = ({ doc }) => {
  revalidateAll();
  return doc;
};

export const revalidateCollectionDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidateAll();
  return doc;
};
