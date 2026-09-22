"use client";

import Marquee from "react-fast-marquee";
import type { Media } from "@/payload-types";

export default function HealthFundsMarquee({ funds }: { funds: Media[] }) {
  return (
    <Marquee autoFill pauseOnHover gradient gradientWidth={64} speed={40}>
      {funds.map((fund, index) => (
        <div key={`${fund.id}-${index}`} className="mx-8 h-10 w-auto sm:h-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fund.url ?? undefined}
            alt={fund.alt ?? ""}
            loading="eager"
            decoding="async"
            className="h-full w-auto object-contain"
          />
        </div>
      ))}
    </Marquee>
  );
}
