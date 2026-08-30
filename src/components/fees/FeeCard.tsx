import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import type { Fee } from "@/types";

export interface FeeCardProps {
  fee: Fee;
}

export default function FeeCard({ fee }: FeeCardProps) {
  return (
    <Card id={fee.id} className="flex h-full scroll-mt-20 flex-col">
      <h2 className="text-lg font-semibold text-balance text-primary sm:text-xl">
        {fee.name}
      </h2>

      <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-2xl font-semibold text-accent">{fee.price}</span>
        {fee.duration ? (
          <span className="flex items-center gap-1.5 text-sm text-muted">
            <Icon name="clock" className="h-4 w-4" />
            {fee.duration}
          </span>
        ) : null}
      </p>

      <div className="mt-4 space-y-3 text-base leading-relaxed text-muted">
        {fee.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {fee.items ? (
        <>
          {fee.itemsLabel ? (
            <p className="mt-5 text-sm font-medium text-foreground">{fee.itemsLabel}</p>
          ) : null}
          <ul className="mt-3 space-y-2">
            {fee.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {fee.note ? (
        <p className="mt-5 text-sm leading-relaxed text-muted">{fee.note}</p>
      ) : null}
    </Card>
  );
}
