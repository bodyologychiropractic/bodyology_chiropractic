import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section>
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8">
        <Button href="/" fullWidthOnMobile>
          Back to home
        </Button>
      </div>
    </Section>
  );
}
