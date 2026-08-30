import type { IconName } from "@/types";

export interface IconProps {
  name: IconName;
  className?: string;
}

/** Single-stroke line icons, drawn on a 24x24 grid so they align at any size. */
const paths: Record<IconName, React.ReactNode> = {
  spine: (
    <>
      <path d="M12 3v18" />
      <path d="M9 6h6M8.5 10h7M8.5 14h7M9 18h6" />
    </>
  ),
  needle: (
    <>
      <path d="M4 20l5-5" />
      <path d="M8.5 15.5l6-6" />
      <path d="M13 11l-2-2M15 9l-2-2" />
      <path d="M14.5 9.5L20 4" />
    </>
  ),
  hands: (
    <>
      <path d="M9 21v-6M9 15V7a1.2 1.2 0 0 1 2.4 0v5" />
      <path d="M6.6 15V9.5a1.2 1.2 0 0 1 2.4 0" />
      <path d="M15 21v-6M15 15V7a1.2 1.2 0 0 0-2.4 0v5" />
      <path d="M17.4 15V9.5a1.2 1.2 0 0 0-2.4 0" />
    </>
  ),
  fascia: (
    <>
      <path d="M12 3c-2 2-2 3 0 5s2 3 0 5 -2 3 0 5 2 2 0 3" />
      <path d="M9 6h6M9 11h6M9 16h6" />
    </>
  ),
  rehab: (
    <>
      <circle cx="14" cy="5" r="1.6" />
      <path d="M13 9l-3 3 2 3 1 5" />
      <path d="M10 12l-4 1" />
      <path d="M15 11l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5z" />
  ),
  pin: (
    <>
      <path d="M12 21s6.5-6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  check: <path d="M6 12.5l4 4 8-9" />,
  facebook: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M15 8h-1.6A1.9 1.9 0 0 0 11.5 10v2M9.8 12.4h4" />
      <path d="M11.5 12v8.5" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="16.7" cy="7.3" r="0.9" />
    </>
  ),
};

export default function Icon({ name, className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
