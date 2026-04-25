import MarkdownIt from "markdown-it";
import type { Cheatsheet, Column, Card, Tag } from "./types.js";

const TAG_RE = /(^|\s)#([a-z][a-z0-9-]*)/g;

function extractTags(text: string): { cleaned: string; tags: Tag[] } {
  const tags: Tag[] = [];
  const seen = new Set<string>();
  const cleaned = text.replace(TAG_RE, (match, prefix, label) => {
    if (!seen.has(label)) {
      seen.add(label);
      tags.push({ raw: match.trim(), label });
    }
    return prefix; // keep the space/punctuation before the tag, remove tag itself
  });
  return { cleaned: cleaned.trim(), tags };
}

export function parseCheatsheet(mdText: string): Cheatsheet {
  const md = new MarkdownIt({ html: false, breaks: false, linkify: false });

  // Custom inline rule to prevent #tags from being parsed as headings
  // We do this by replacing #tags with a placeholder before markdown parsing
  // Then restore after. Simpler approach: parse markdown first, then extract tags from text content.

  const tokens = md.parse(mdText, {});

  const cheatsheet: Cheatsheet = { title: "", columns: [] };
  let currentColumn: Column | null = null;
  let currentCard: Card | null = null;
  let heading1Found = false;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === "heading_open") {
      const level = parseInt(token.tag.slice(1), 10);
      const inline = tokens[i + 1];
      i++; // skip inline
      const close = tokens[i + 1];
      if (close && close.type === "heading_close") i++;

      const rawText = inline?.content ?? "";

      if (level === 1) {
        if (!heading1Found) {
          cheatsheet.title = extractTags(rawText).cleaned;
          heading1Found = true;
        }
        currentColumn = null;
        currentCard = null;
      } else if (level === 2) {
        const { cleaned, tags } = extractTags(rawText);
        currentColumn = { title: cleaned, cards: [] };
        currentCard = null;
        if (tags.length > 0) {
          // Column titles don't support tags visually; ignore or attach to first card if needed.
          // For now, tags on column titles are ignored.
        }
        cheatsheet.columns.push(currentColumn);
      } else if (level === 3) {
        const { cleaned, tags } = extractTags(rawText);
        currentCard = { title: cleaned, tags, blocks: [] };
        if (currentColumn) {
          currentColumn.cards.push(currentCard);
        } else {
          // orphan card — create a default column
          currentColumn = { title: "", cards: [currentCard] };
          cheatsheet.columns.push(currentColumn);
        }
      } else if (level >= 4 && currentCard) {
        // Flatten h4+ into bold paragraph
        const { cleaned } = extractTags(rawText);
        currentCard.blocks.push({
          type: "html",
          html: `<p class="font-semibold text-gray-800 mt-2">${md.utils.escapeHtml(cleaned)}</p>`,
          tags: [],
        });
      }
      continue;
    }

    if (token.type === "inline") {
      // Skip if this inline was already consumed by heading processing above
      continue;
    }

    if (
      token.type === "inline" ||
      token.type === "heading_open" ||
      token.type === "heading_close"
    ) {
      continue;
    }

    if (token.type === "fence") {
      if (currentCard) {
        const { cleaned, tags } = extractTags(token.content);
        const codeHtml = md.utils.escapeHtml(cleaned);
        const langClass = token.info ? ` class="language-${md.utils.escapeHtml(token.info)}"` : "";
        currentCard.blocks.push({
          type: "html",
          html: `<pre class="bg-gray-50 border border-gray-200 rounded p-2 overflow-x-auto text-xs mt-1"><code${langClass}>${codeHtml}</code></pre>`,
          tags,
        });
      }
      continue;
    }

    // For other block-level tokens, render them and capture any tags in inline children
    if (token.type.endsWith("_open") || token.type === "hr" || token.type === "blockquote_open") {
      // Collect tokens until matching close
      const blockTokens = [token];
      const stack = [token.tag];
      let j = i + 1;
      for (; j < tokens.length; j++) {
        blockTokens.push(tokens[j]);
        if (tokens[j].type.endsWith("_open")) {
          if (tokens[j].tag) stack.push(tokens[j].tag);
        } else if (tokens[j].type.endsWith("_close")) {
          if (tokens[j].tag) stack.pop();
          if (stack.length === 0) break;
        }
      }
      i = j;

      // Render this block
      const html = md.renderer.render(blockTokens, md.options, {});

      // Extract tags from all inline tokens within this block
      const allTags: Tag[] = [];
      const seen = new Set<string>();
      for (const t of blockTokens) {
        if (t.type === "inline") {
          const { tags } = extractTags(t.content);
          for (const tag of tags) {
            if (!seen.has(tag.label)) {
              seen.add(tag.label);
              allTags.push(tag);
            }
          }
        }
      }

      if (currentCard) {
        currentCard.blocks.push({
          type: "html",
          html,
          tags: [],
        });
      }
    }
  }

  return cheatsheet;
}
