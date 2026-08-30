import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ButtonVariant } from "@/types";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  /** Render as a link when provided. */
  href?: string;
  /** Stretch to the full width on phones, shrink to content from `sm` up. */
  fullWidthOnMobile?: boolean;
  className?: string;
}

const base =
  "inline-flex min-h-11 items-center justify-center rounded-md px-6 py-3 text-sm tracking-wide font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent/90",
  secondary: "bg-primary text-on-dark hover:bg-primary/90",
  ghost: "bg-transparent text-primary hover:bg-primary/10",
  "outline-light": "border border-on-dark/60 bg-transparent text-on-dark hover:bg-on-dark/10",
};

export default function Button({
  children,
  variant = "primary",
  href,
  fullWidthOnMobile = false,
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
    base,
    variants[variant],
    fullWidthOnMobile ? "w-full sm:w-auto" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
