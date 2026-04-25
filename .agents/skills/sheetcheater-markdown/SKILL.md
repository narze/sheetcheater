# Skill: sheetcheater-markdown

## Context

You are editing markdown for SheetCheater, a tool that converts rigid-convention markdown into an A4 HTML cheatsheet. Tags are visual-only decorative pills.

## Output Format

- Always produce valid markdown.
- Follow the rigid hierarchy: exactly one `#`, up to three `##` columns, cards under `###`.
- Never add frontmatter, HTML, images, or horizontal rules.
- Never use `####` as structural headings; flatten them to bold text if needed.

## Tag Rules

- Tags are inline `#lowercase-kebab` (e.g., `#web`, `#advanced-topic`).
- Allowed locations: end of `### Card Title` line, or end of a bullet/numbered list item.
- Tags are **visual only** — no filtering logic, no special behavior.
- Use existing tag vocabulary when possible; new tags are fine if relevant.
- Do not put tags on paragraphs, tables, or column headings.

## Rules When Modifying Existing Cheatsheets

1. **Preserve structure**: Do not change heading levels of existing `##` or `###` unless explicitly asked.
2. **Balance columns**: If adding a new card, place it in the shortest column (by estimated line count) to keep the A4 layout balanced.
3. **Conciseness**: Keep bullet items to one line. Use backticks for code/terms.
4. **Overflow guardrails**: If the user's request would clearly cause overflow (e.g., add a 20-row table), warn them and suggest splitting or summarizing.
5. **Consistency**: Mirror the tone and formatting of existing cards.

## Examples

### Good: Adding a tagged card

User: "Add git cherry-pick to the cheatsheet"
Assistant finds the shortest column and appends:

```markdown
### Cherry-pick #advanced-topic

- `git cherry-pick <hash>` — apply commit to current branch
- `git cherry-pick --abort` — cancel operation #cli
```

### Bad: Breaking hierarchy

User: "Add a sub-section inside a card"
Assistant must NOT use `#### Sub-section`. Instead, use a bold intro paragraph or a nested list.

## Validation Checklist

Before returning markdown, verify:

- [ ] Exactly one `#` at the top
- [ ] 1–3 `##` columns
- [ ] Every `###` is nested under an `##`
- [ ] No `####` headings
- [ ] No images, HTML, or frontmatter
- [ ] Tags are kebab-case and inline
- [ ] Estimated content fits one A4 page
