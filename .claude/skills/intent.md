---
name: intent
description: Open a new Wise task from founder prose. Creates tasks/OP-N-<slug>/ with intent.md + meta.yml in state:idea and commits to main. Use when the user runs `/intent <prose>` to capture a new request.
---

# /intent — open a new Wise task

The user invoked `/intent <prose>`. Capture that prose as a new Wise task directory on `main`.

## Preconditions

- `git status` is clean. If not, stop and ask the founder to reconcile.
- Current branch is `main`. If not, stop and ask.
- `tasks/_rules.yml` exists (rail is installed). If not, abort with `"Wise Process not installed — run scripts/codex/install.sh"`.

## Steps

1. Find the next OP-N: parse `tasks/OP-*-*/meta.yml`, take `max(id)+1`. Start at 1 if none.
2. Derive a kebab-case slug from the prose (≤ 40 chars, `[a-z0-9-]`).
3. Create `tasks/OP-N-<slug>/`:
   - `intent.md` — single H1 with the slug as title, then the founder's prose verbatim.
   - `meta.yml`:
     ```yaml
     id: OP-N
     state: idea
     evidence: manual
     attempts: 0
     assignee: null
     pr: null
     branch: null
     large_ok: false
     ```
   - `attempts.log` — empty file.
4. `git add tasks/OP-N-<slug>/`
5. `git commit -m "[OP-N] chore: open intent"`
6. Report: `OP-N-<slug>` path + one line summary + `"Next: run /plan when ready."`

## Rails

- Never write `spec.md`. That is `/plan`'s job.
- Never set `state` to anything other than `idea`.
- Never branch or push — intent commits land on `main`.
- One task per invocation. If the prose covers multiple distinct changes, capture one and tell the founder to spawn the rest via `/spawn` later.
