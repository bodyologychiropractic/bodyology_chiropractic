import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

export interface LegalRichTextProps {
  data: SerializedEditorState;
}

export default function LegalRichText({ data }: LegalRichTextProps) {
  return (
    <div
      className="max-w-3xl space-y-4 text-base leading-relaxed text-muted sm:text-lg
        [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:first:mt-0
        [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-foreground
        [&_p]:mt-4 [&_p]:first:mt-0
        [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6
        [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6
        [&_li]:leading-relaxed
        [&_a]:font-medium [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-secondary
        [&_strong]:font-semibold [&_strong]:text-foreground"
      data-aos="fade-up"
    >
      <RichText data={data} />
    </div>
  );
}
