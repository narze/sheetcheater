# Markdown Structure & Rules

SheetCheater converts rigid-convention markdown into an A4 HTML cheatsheet.

## Convention: Rigid Hierarchy

| Element        | Markdown                               | Role                                     | Rules                                                                                |
| -------------- | -------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------ |
| **Page Title** | `# Title`                              | Cheatsheet title                         | Exactly one H1. Must be first block.                                                 |
| **Column**     | `## Section Name`                      | Creates a new vertical column            | Max 3 per page. Order = left→right.                                                  |
| **Card**       | `### Card Title`                       | Creates a card inside the current column | Must be under `##`. Multiple allowed.                                                |
| **Card Body**  | Lists, paragraphs, tables, code blocks | Content inside the card                  | `####+` flattened to bold text or paragraphs.                                        |
| **Tags**       | Inline `#tag-name`                     | Visual pill badges                       | Must be inline. Parsed after space or punctuation. Kebab-case. No spaces inside tag. |

## Tag Rules

- Tags are written inline as `#lowercase-kebab` (e.g., `#web`, `#advanced-topic`).
- Allowed locations:
  - At the end of a `### Card Title` line.
  - At the end of a bullet/numbered list item.
- Tags are **purely decorative** — no filtering, no search, no interactivity.
- Colors are **auto-assigned** based on a hash of the tag string, producing consistent pastel pills.
- Tags on cards and list items only.

## Example Valid Input

```markdown
# Git Cheatsheet

## Create & Clone

### Start a repo #cli #beginner

- `git init` — initialize local repo
- `git clone <url>` — clone remote repo #web

### Snapshot #cli

- `git add .` — stage all changes
- `git commit -m "msg"` — commit staged

## Branch & Merge

### Branching #advanced-topic

- `git branch` — list branches
- `git checkout -b feat` — create & switch

### Merging #advanced-topic

- `git merge feat` — merge into current
- `git rebase main` — replay commits

## Inspect & Compare

### History

- `git log --oneline` — compact log
- `git diff` — unstaged changes

### Undo

- `git reset HEAD~1` — undo last commit
- `git stash` — shelve changes
```

## Constraints for Authors

- Keep total content to fit **one A4 page** (the tool will warn if overflowed).
- Use **concise bullet points**; avoid long paragraphs.
- Tables are allowed but keep them narrow (3-column layout has limited width per column).
- Do not use images or embed HTML.
- Do not use `####` expecting nested cards; they become plain bold text.
