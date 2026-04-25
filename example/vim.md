# Vim Cheatsheet

## Movement

### Basic #normal #basics

- `h j k l` — left, down, up, right
- `w b e` — word forward, back, end
- `0 ^ $` — start of line, first non-blank, end
- `gg G` — top of file, bottom of file

### Jumps #normal

- `Ctrl+o Ctrl+i` — jump back, forward
- `%` — matching bracket
- `*` — search word under cursor
- `n N` — next, previous match

## Editing

### Insert & Change #insert

- `i a` — insert before, after cursor
- `I A` — insert at start, end of line
- `o O` — new line below, above
- `cc` — change whole line

### Delete & Yank #normal

- `dd` — delete line
- `yy` — yank line
- `p P` — paste after, before
- `u Ctrl+r` — undo, redo

## Search & Replace

### Commands #command

- `:/pattern` — search forward
- `:?pattern` — search backward
- `:%s/old/new/g` — replace all in file
- `:%s/old/new/gc` — replace with confirmation
