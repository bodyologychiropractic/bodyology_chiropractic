import Section from "@/components/ui/Section";
import { getHomeHealthFundsSection } from "@/lib/home-content";
import HealthFundsMarquee from "./HealthFundsMarquee";

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9L10 14.9l-5.2 2.9 1-5.9-4.3-4.2 5.9-.8L10 1.5z" />
    </svg>
  );
}

function GoogleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.4 0-13.8 4.1-17.1 10.1z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.4-2.1 14.1-5.5l-6.5-5.5c-2 1.5-4.6 2.4-7.6 2.4-5.2 0-9.6-3.3-11.3-8l-6.6 5C9.9 39.7 16.4 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.5 5.5C41.1 36 44 30.5 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}

export default async function HealthFundsSection() {
  const section = await getHomeHealthFundsSection();
  if (!section.title && section.funds.length === 0) return null;

  const rating = section.googleRating.rating;

  return (
    <Section tone="default">
      <div className="mx-auto max-w-2xl text-center" data-aos="fade-up">
        {section.title ? (
          <h2 className="text-2xl font-semibold tracking-tight text-balance text-primary sm:text-3xl">
            {section.title}
          </h2>
        ) : null}
        {section.description ? (
          <p className="mt-2 text-sm text-muted sm:text-base">{section.description}</p>
        ) : null}
      </div>

      {section.funds.length > 0 ? (
        <div className="mx-auto mt-10 max-w-5xl" data-aos="fade-up">
          <HealthFundsMarquee funds={section.funds} />
        </div>
      ) : null}

      {rating ? (
        <div
          className="mt-10 flex items-center justify-center gap-3"
          data-aos="fade-up"
        >
          <GoogleIcon className="h-7 w-7" />
          <span className="text-lg font-semibold text-foreground">{rating.toFixed(1)}</span>
          <span className="flex items-center gap-0.5 text-accent">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon key={index} className="h-4 w-4" />
            ))}
          </span>
          {section.googleRating.reviewCount ? (
            <span className="text-sm text-muted">{section.googleRating.reviewCount} reviews</span>
          ) : null}
        </div>
      ) : null}
    </Section>
  );
}
