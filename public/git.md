# Git Cheatsheet

## Create & Clone

### Start a repo #cli #beginner

- `git init` — initialize local repo
- `git clone <url>` — clone remote repo #web
- `git clone --depth 1 <url>` — shallow clone

### Snapshot #cli

- `git add .` — stage all changes
- `git add -p` — stage interactively
- `git commit -m "msg"` — commit staged
- `git commit --amend` — edit last commit
- `git status` — working tree status
- `git status -sb` — short branch status

## Branch & Merge

### Branching #advanced-topic

- `git branch` — list branches
- `git branch -a` — list all (remote too)
- `git checkout -b feat` — create & switch
- `git switch -c feat` — modern alternative
- `git branch -d feat` — delete branch
- `git branch -m old new` — rename branch

### Merging #advanced-topic

- `git merge feat` — merge into current
- `git merge --no-ff feat` — always create merge commit
- `git rebase main` — replay commits
- `git rebase -i HEAD~3` — interactive rebase
- `git merge --abort` — cancel merge
- `git cherry-pick <hash>` — apply single commit

## Inspect & Compare

### History #cli

- `git log --oneline` — compact log
- `git log --graph --oneline --all` — visual graph
- `git diff` — unstaged changes
- `git diff --cached` — staged changes
- `git blame <file>` — line annotations
- `git show <hash>` — show commit details

### Undo #advanced-topic

- `git reset HEAD~1` — undo last commit (keep changes)
- `git reset --hard HEAD~1` — undo last commit (discard)
- `git stash` — shelve changes
- `git stash pop` — apply and remove stash
- `git stash list` — list stashes
- `git restore <file>` — discard file changes
- `git restore --staged <file>` — unstage file

## Remote

### Sync #cli

- `git push` — push commits
- `git push -u origin main` — push & set upstream
- `git pull` — fetch & merge
- `git pull --rebase` — fetch & rebase
- `git fetch` — download objects
- `git fetch --prune` — fetch & clean refs

### Tracking #advanced-topic

- `git remote -v` — list remotes
- `git remote add origin <url>` — add remote
- `git branch -vv` — show tracking branches
