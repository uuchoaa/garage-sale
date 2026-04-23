---
name: Mirror agent memory into the repo at docs/agent-memory/
description: Every memory write (create/update/delete) in ~/.claude/.../memory/ must be mirrored to docs/agent-memory/ in the repo; both locations stay in sync
type: feedback
originSessionId: b09699a7-167d-4bb0-b35f-7c419cf12540
---
Every time a memory file is created, updated, or deleted under `~/.claude/projects/-Users-rafaeluchoa-Workspaces-wise-ui/memory/`, mirror the same change to `docs/agent-memory/` in the repo. Both directories stay in sync byte-for-byte, including `MEMORY.md`.

**Why:** The user wants project-critical context to live in the repo itself, not only in ~/.claude. That way the project survives loss of the local Claude state (machine change, config reset, memory corruption, session handoff to another tool) and can be version-controlled like the rest of the codebase.

**How to apply:**
- On memory create: write the file in the canonical location *and* in `docs/agent-memory/` with the same content.
- On memory update: update both copies in the same turn.
- On memory delete: `rm` from both locations.
- Never let the two diverge — if a discrepancy is found, re-sync from whichever was updated most recently (verify with a quick `diff`).
- Also update `MEMORY.md` index in both locations.
- If adding a new mirror policy (different path, structure), update this memory first.
