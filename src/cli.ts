#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { parseCheatsheet } from "./parser.js";
import { renderFullPage } from "./renderer.js";

const inputPath = process.argv[2];
const outputPath = process.argv[3] || "output.html";

if (!inputPath) {
  console.error("Usage: sheetcheater <input.md> [output.html]");
  process.exit(1);
}

const mdText = readFileSync(inputPath, "utf-8");
const cheatsheet = parseCheatsheet(mdText);
const html = renderFullPage(cheatsheet, { cdn: true, showOverflowWarning: false });
writeFileSync(outputPath, html, "utf-8");
console.log(`Cheatsheet written to ${outputPath}`);

// Simple overflow estimation
const lineCount = mdText.split(/\n/).length;
if (lineCount > 80) {
  console.warn("Warning: markdown has many lines; may exceed one A4 page when rendered.");
}
