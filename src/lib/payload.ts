import { getPayload, type Payload } from "payload";
import config from "@payload-config";

let cached: Promise<Payload> | null = null;

/** Cached Payload local-API instance for use in Server Components. */
export function getPayloadClient(): Promise<Payload> {
  if (!cached) {
    cached = getPayload({ config });
  }
  return cached;
}
