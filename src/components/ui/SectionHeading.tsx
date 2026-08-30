import type { HTMLAttributes, ReactNode } from "react";

export interface SectionHeadingProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Small label above the title. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Centred headings get the short teal rule under the title. */
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
  ...props
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={[centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={[
          "text-2xl font-semibold tracking-tight text-balance text-primary sm:text-3xl lg:text-4xl",
          eyebrow ? "mt-3" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {title}
      </h2>

      <span
        aria-hidden="true"
        className={["mt-4 block h-0.5 w-16 bg-accent", centered ? "mx-auto" : ""]
          .filter(Boolean)
          .join(" ")}
      />

      {description ? (
        <p className="mt-4 text-base text-muted sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
