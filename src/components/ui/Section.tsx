import type { ReactNode } from "react";
import type { SectionSpacing, SectionTone } from "@/types";

export interface SectionProps {
  children: ReactNode;
  /** Optional id so the section can be linked to directly. */
  id?: string;
  /** Vertical rhythm, driven by the --section-y tokens, so every section matches. */
  spacing?: SectionSpacing;
  /** Background treatment. */
  tone?: SectionTone;
  className?: string;
  containerClassName?: string;
}

const spacings: Record<SectionSpacing, string> = {
  sm: "section-y-sm",
  base: "section-y",
  lg: "section-y-lg",
  none: "",
};

const tones: Record<SectionTone, string> = {
  default: "bg-background text-foreground",
  surface: "bg-surface text-foreground",
  dark: "bg-surface-strong text-on-dark",
};

export default function Section({
  children,
  id,
  spacing = "base",
  tone = "default",
  className = "",
  containerClassName = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={[spacings[spacing], tones[tone], className].filter(Boolean).join(" ")}
    >
      <div className={["container-page", containerClassName].filter(Boolean).join(" ")}>
        {children}
      </div>
    </section>
  );
}
