"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type AOSModule = typeof import("aos");

export default function AOSProvider() {
  const pathname = usePathname();
  const aosRef = useRef<AOSModule | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;

    void (async () => {
      const [{ default: AOS }] = await Promise.all([
        import("aos"),
        import("aos/dist/aos.css"),
      ]);
      if (cancelled) return;

      aosRef.current = AOS as unknown as AOSModule;
      AOS.init({
        duration: 600,
        easing: "ease-out",
        once: true,
        offset: 60,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    aosRef.current?.refreshHard();
  }, [pathname]);

  return null;
}
