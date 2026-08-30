import Icon from "@/components/ui/Icon";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import type { Service } from "@/types";

export interface ServiceMediaProps {
  service: Service;
  sizes: string;
  aspect?: string;
  className?: string;
}

export default function ServiceMedia({
  service,
  sizes,
  aspect = "aspect-[4/3]",
  className = "",
}: ServiceMediaProps) {
  return (
    <div
      className={[
        "relative isolate w-full overflow-hidden rounded-xl bg-surface",
        aspect,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {service.image ? (
        <ResponsiveImage
          image={service.image}
          alt={service.title}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface to-surface-strong/10 text-primary/60">
          <Icon name={service.icon} className="h-12 w-12" />
        </span>
      )}

      <span
        aria-hidden="true"
        className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/10"
      />
    </div>
  );
}
