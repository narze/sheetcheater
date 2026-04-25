import type { Cheatsheet, Tag } from "./types.js";

const COLOR_PAIRS = [
  { bg: "bg-red-100", text: "text-red-700" },
  { bg: "bg-orange-100", text: "text-orange-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-yellow-100", text: "text-yellow-700" },
  { bg: "bg-lime-100", text: "text-lime-700" },
  { bg: "bg-green-100", text: "text-green-700" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-teal-100", text: "text-teal-700" },
  { bg: "bg-cyan-100", text: "text-cyan-700" },
  { bg: "bg-sky-100", text: "text-sky-700" },
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-indigo-100", text: "text-indigo-700" },
  { bg: "bg-violet-100", text: "text-violet-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-fuchsia-100", text: "text-fuchsia-700" },
  { bg: "bg-pink-100", text: "text-pink-700" },
  { bg: "bg-rose-100", text: "text-rose-700" },
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getTagClasses(label: string): string {
  const idx = hashString(label) % COLOR_PAIRS.length;
  const pair = COLOR_PAIRS[idx];
  return `${pair.bg} ${pair.text}`;
}

function renderTag(tag: Tag): string {
  const classes = getTagClasses(tag.label);
  return `<span class="inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium rounded-full ${classes}">${tag.label}</span>`;
}

function renderInlineTags(tags: Tag[]): string {
  if (tags.length === 0) return "";
  return `<span class="inline-flex gap-1 ml-1.5">${tags.map(renderTag).join("")}</span>`;
}

function renderBlockTags(tags: Tag[]): string {
  if (tags.length === 0) return "";
  return `<div class="flex flex-wrap gap-1 mt-1">${tags.map(renderTag).join("")}</div>`;
}

export function renderCheatsheet(cheatsheet: Cheatsheet): string {
  const columnsHtml = cheatsheet.columns
    .map((column) => {
      const cardsHtml = column.cards
        .map((card) => {
          const blocksHtml = card.blocks
            .map((block) => {
              const tagsHtml = renderBlockTags(block.tags);
              return `<div class="text-sm text-gray-700 leading-relaxed">${block.html}${tagsHtml}</div>`;
            })
            .join("");

          const cardTagsHtml = renderInlineTags(card.tags);

          return `
            <article class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
              <h3 class="text-sm font-semibold text-gray-900 mb-2 flex items-center flex-wrap">
                ${card.title}${cardTagsHtml}
              </h3>
              <div class="space-y-1">${blocksHtml}</div>
            </article>
          `;
        })
        .join("");

      return `
        <section class="flex flex-col gap-3">
          <h2 class="text-base font-bold text-gray-900 uppercase tracking-wide border-b border-gray-200 pb-1">${column.title}</h2>
          ${cardsHtml}
        </section>
      `;
    })
    .join("");

  return `
    <div class="cheatsheet-page">
      <header class="mb-4">
        <h1 class="text-2xl font-bold text-gray-900">${cheatsheet.title}</h1>
      </header>
      <div class="grid grid-cols-3 gap-4">${columnsHtml}</div>
    </div>
  `;
}

export function renderFullPage(cheatsheet: Cheatsheet, options: { cdn?: boolean } = {}): string {
  const body = renderCheatsheet(cheatsheet);
  const tailwindCdn = options.cdn ? `<script src="https://cdn.tailwindcss.com"></script>` : "";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${cheatsheet.title}</title>
${tailwindCdn}
<style>
@page { size: A4; margin: 10mm; }
@media print {
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .cheatsheet-page { box-shadow: none !important; margin: 0 !important; padding: 0 !important; }
}
.cheatsheet-page {
  width: 210mm;
  min-height: 297mm;
  padding: 10mm;
  margin: 0 auto;
  box-sizing: border-box;
  background: white;
}
</style>
</head>
<body class="bg-gray-100">
<div id="overflow-warning" style="display:none;position:fixed;top:0;left:0;right:0;background:#ef4444;color:white;text-align:center;padding:8px;font-size:14px;z-index:50;">
  Warning: content exceeds one A4 page. Consider removing content.
</div>
${body}
<script>
(function() {
  function checkOverflow() {
    const page = document.querySelector('.cheatsheet-page');
    const warning = document.getElementById('overflow-warning');
    if (!page || !warning) return;
    const maxHeight = 1123; // ~A4 height at 96dpi
    if (page.scrollHeight > maxHeight) {
      warning.style.display = 'block';
      console.warn('SheetCheater: Content exceeds one A4 page (' + page.scrollHeight + 'px > ' + maxHeight + 'px)');
    } else {
      warning.style.display = 'none';
    }
  }
  window.addEventListener('load', checkOverflow);
  window.addEventListener('resize', checkOverflow);
})();
</script>
</body>
</html>`;
}
