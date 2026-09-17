import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

/** Minimal Lexical rich-text JSON: one paragraph node per plain-text string. */
export function toLexical(paragraphs: string[]): SerializedEditorState {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: paragraphs
        .filter((p) => p && p.trim().length > 0)
        .map((text) => ({
          type: "paragraph",
          format: "",
          indent: 0,
          version: 1,
          direction: "ltr" as const,
          children: [
            {
              type: "text",
              format: 0,
              detail: 0,
              mode: "normal",
              style: "",
              text,
              version: 1,
            },
          ],
        })),
    },
  } as unknown as SerializedEditorState;
}

/** Convenience: wrap a single plain-text string as one-paragraph Lexical JSON. */
export function toLexicalSingle(text: string): SerializedEditorState {
  return toLexical([text]);
}

export type LexicalBlock =
  | { type: "heading"; tag: "h2" | "h3"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

function textNode(text: string) {
  return { type: "text", format: 0, detail: 0, mode: "normal", style: "", text, version: 1 };
}

/** Build multi-block Lexical JSON (headings, paragraphs, bullet lists) for longer-form content. */
export function toLexicalDoc(blocks: LexicalBlock[]): SerializedEditorState {
  const children = blocks.map((block) => {
    if (block.type === "heading") {
      return {
        type: "heading",
        tag: block.tag,
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr" as const,
        children: [textNode(block.text)],
      };
    }
    if (block.type === "list") {
      return {
        type: "list",
        listType: "bullet",
        tag: "ul",
        start: 1,
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr" as const,
        children: block.items.map((item) => ({
          type: "listitem",
          format: "",
          indent: 0,
          version: 1,
          value: 1,
          direction: "ltr" as const,
          children: [textNode(item)],
        })),
      };
    }
    return {
      type: "paragraph",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: [textNode(block.text)],
    };
  });

  return {
    root: { type: "root", format: "", indent: 0, version: 1, direction: "ltr", children },
  } as unknown as SerializedEditorState;
}

interface LexicalNode {
  type?: string;
  text?: string;
  children?: LexicalNode[];
}

/** Extract plain-text paragraphs back out of a Lexical JSON value (best-effort). */
export function richTextToParagraphs(value: unknown): string[] {
  if (!value || typeof value !== "object") return [];
  const root = (value as { root?: LexicalNode }).root;
  if (!root?.children) return [];

  const extractText = (node: LexicalNode): string => {
    if (typeof node.text === "string") return node.text;
    if (!node.children) return "";
    return node.children.map(extractText).join("");
  };

  return root.children
    .map((node) => extractText(node).trim())
    .filter((text) => text.length > 0);
}

/** Extract a single plain-text string (paragraphs joined with a blank line). */
export function richTextToPlainText(value: unknown): string {
  return richTextToParagraphs(value).join("\n\n");
}
