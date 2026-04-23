---
name: Suggest a commit message at the end of every cycle
description: After finishing a logical unit of work, proactively suggest a short conventional commit message (subject line only, no body); do not commit unless asked
type: feedback
originSessionId: b09699a7-167d-4bb0-b35f-7c419cf12540
---
At the end of every work cycle (a logical unit — e.g. a task list closed, a doc pass finished, a refactor landed), proactively suggest a conventional commit message for the changes.

Format:
- **Subject line only, no body.**
- Conventional prefix (`feat`, `fix`, `docs`, `chore`, `refactor`, etc.).
- Short (≤ ~70 chars).
- Scope in parentheses only when it genuinely clarifies (don't force it).

Do **not** commit unless explicitly asked. Just suggest.

**Why:** The user wants to keep a clean commit history without having to ask for a message every time. The suggestion fires at natural checkpoints so it lands alongside the work summary, not as an extra back-and-forth.

**How to apply:**
- A "cycle" is a logical boundary, not a single message. Signals: a task list went from all-in-progress to all-complete; a feature/doc pass wrapped; a refactor finished.
- If the cycle touched zero tracked files, skip.
- If multiple logical units happened in one cycle, propose one message that captures the most significant change (don't split into several messages for a single commit).
- If the user hasn't committed the previous cycle's changes yet, still suggest — they'll decide whether to merge or split.
- Never co-sign (per CLAUDE.md).
