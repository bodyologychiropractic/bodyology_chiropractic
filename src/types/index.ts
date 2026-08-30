import type { ReactNode } from "react";

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline-light";

export type SectionSpacing = "none" | "sm" | "base" | "lg";

export type SectionTone = "default" | "surface" | "dark";

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: IconName;
  image?: ResponsiveImageSet;
  detail?: ServiceDetail;
}

export interface ServiceDetailSection {
  label: string;
  body: string;
}

export interface ServiceDetail {
  sections?: ServiceDetailSection[];
  paragraphs?: string[];
  itemsLabel?: string;
  items?: string[];
}

export type IconName =
  | "spine"
  | "needle"
  | "hands"
  | "fascia"
  | "rehab"
  | "calendar"
  | "phone"
  | "pin"
  | "clock"
  | "mail"
  | "check"
  | "facebook"
  | "instagram";

export interface ProseContent {
  id: string;
  eyebrow?: string;
  title: string;
  paragraphs: string[];
}

export interface ChecklistContent {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: string[];
}

export interface Fee {
  id: string;
  name: string;
  price: string;
  duration?: string;
  paragraphs: string[];
  itemsLabel?: string;
  items?: string[];
  note?: string;
}

export interface OpeningHour {
  days: string;
  hours: string;
}

export interface WithChildren {
  children: ReactNode;
}

export interface WithClassName {
  className?: string;
}

export interface PageMetaInput {
  title: string;
  description: string;
  path: string;
}

export interface ResponsiveImageSet {
  base: string;
  ext: "webp" | "jpg" | "png";
  widths: number[];
  mobile?: { base: string; widths: number[] };
}
