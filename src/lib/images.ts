import type { ResponsiveImageSet } from "@/types";

export function imageSrc(image: ResponsiveImageSet, width: number): string {
  return `${image.base}-${width}.${image.ext}`;
}

export function largestSrc(image: ResponsiveImageSet): string {
  return imageSrc(image, Math.max(...image.widths));
}

export function buildSrcSet(image: ResponsiveImageSet): string {
  return [...image.widths]
    .sort((a, b) => a - b)
    .map((width) => `${imageSrc(image, width)} ${width}w`)
    .join(", ");
}

export function buildMobileSrcSet(image: ResponsiveImageSet): string | undefined {
  if (!image.mobile) return undefined;
  return [...image.mobile.widths]
    .sort((a, b) => a - b)
    .map((width) => `${image.mobile!.base}-${width}.${image.ext} ${width}w`)
    .join(", ");
}
