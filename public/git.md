# Git Cheatsheet

## Create & Clone

### Start a repo #cli #beginner

- `git init` — initialize local repo
- `git clone <url>` — clone remote repo #web

### Snapshot #cli

- `git add .` — stage all changes
- `git commit -m "msg"` — commit staged
- `git status` — working tree status

## Branch & Merge

### Branching #advanced-topic

- `git branch` — list branches
- `git checkout -b feat` — create & switch
- `git switch -c feat` — modern alternative
- `git branch -d feat` — delete branch

### Merging #advanced-topic

- `git merge feat` — merge into current
- `git rebase main` — replay commits
- `git merge --abort` — cancel merge
- `git cherry-pick <hash>` — apply single commit

## Inspect & Compare

### History #cli

- `git log --oneline` — compact log
- `git diff` — unstaged changes
- `git blame <file>` — line annotations

### Undo #advanced-topic

- `git reset HEAD~1` — undo last commit
- `git stash` — shelve changes
- `git stash pop` — apply stash
- `git restore <file>` — discard changes

## Remote

### Sync #cli

- `git push` — push commits
- `git pull` — fetch & merge
- `git fetch` — download objects

### Tracking #advanced-topic

- `git remote -v` — list remotes
- `git remote add origin <url>` — add remote
