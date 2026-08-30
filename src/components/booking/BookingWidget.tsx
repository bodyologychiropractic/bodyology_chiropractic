"use client";

import { useEffect, useRef, useState } from "react";

const WIDGET_NAME = "CHM-iconpractice";
const QUEUE_KEY = "w1";
const WIDGET_SRC = "https://app.iconpractice.com/api/assets/js/widget.js";
const TARGET_ID = "chmwidget";

const CONFIG = {
  targetElementID: TARGET_ID,
  obToken: 607802,
  obToken2: 1532097,
};

type WidgetApi = ((method: string, config?: unknown) => void) & {
  q?: IArguments[];
};

export default function BookingWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    const w = window as unknown as Record<string, unknown>;

    w[WIDGET_NAME] = QUEUE_KEY;
    if (!w[QUEUE_KEY]) {
      const queued: WidgetApi = function (this: unknown) {
        (queued.q = queued.q || []).push(arguments);
      } as WidgetApi;
      w[QUEUE_KEY] = queued;
    }

    if (!document.getElementById(QUEUE_KEY)) {
      const script = document.createElement("script");
      script.id = QUEUE_KEY;
      script.src = WIDGET_SRC;
      script.async = true;
      document.head.appendChild(script);
    }

    (w[QUEUE_KEY] as WidgetApi)("init", CONFIG);
  }, [shouldLoad]);

  return (
    <div ref={containerRef} id={TARGET_ID} className="min-h-[36rem] w-full">
      <p className="py-12 text-center text-sm text-muted">Loading booking calendar…</p>
    </div>
  );
}
