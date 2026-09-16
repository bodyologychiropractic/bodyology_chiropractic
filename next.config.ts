import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  trailingSlash: true,
};

export default withPayload(nextConfig);
