import { buildMobileSrcSet, buildSrcSet, largestSrc } from "@/lib/images";
import type { ResponsiveImageSet } from "@/types";

interface ResponsiveImageProps {
  image: ResponsiveImageSet;
  alt: string;
  sizes: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  mobileBreakpoint?: number;
}

export default function ResponsiveImage({
  image,
  alt,
  sizes,
  fill = false,
  priority = false,
  className = "",
  mobileBreakpoint = 640,
}: ResponsiveImageProps) {
  const mobileSrcSet = buildMobileSrcSet(image);
  const layout = fill ? "absolute inset-0 h-full w-full" : "";

  return (
    <picture>
      {mobileSrcSet ? (
        <source
          media={`(max-width: ${mobileBreakpoint}px)`}
          srcSet={mobileSrcSet}
          sizes={sizes}
          type="image/webp"
        />
      ) : null}
      <img
        src={largestSrc(image)}
        srcSet={buildSrcSet(image)}
        sizes={sizes}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className={`${layout} ${className}`.trim()}
      />
    </picture>
  );
}
