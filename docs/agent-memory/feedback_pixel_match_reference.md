---
name: Examples stay English + USD (no pt-BR pass)
description: Reference screens (examples/cashflow, examples/planetaria) use English copy and USD formatting — no pt-BR localization planned. DS primitives stay locale-neutral.
type: feedback
originSessionId: e8bd7202-48b7-4402-8f9e-e1167b54b6af
---
**User directive (2026-04-23, confirmed):** `esqueca pt-br na app`.

The earlier "pt-BR + BRL" convention in CLAUDE.md is gone. Reference screens — and every doc/briefing that describes them — are authored in English with USD formatting. There is no scheduled localization pass.

**Why:** two axes of variation (layout + locale) hid DS gaps during reviews. Pinning to English keeps the examples aligned with the Tailwind Plus source material they reverse-engineer from, so any divergence is a deliberate DS choice rather than a translation artifact.

**How to apply:**
- `examples/cashflow/*.vue` and `examples/planetaria/*.vue` use English copy, USD (`$10,560.00`, commas as thousands, dot as decimal), and English absolute dates (`January 31, 2023`).
- Relative time uses English idiom: `just now`, `2h ago`, `yesterday`, `5 days ago`.
- DS primitives in `src/` remain locale-neutral — no hardcoded strings.
- Don't re-introduce pt-BR into any file under `examples/` or any doc that describes them without an explicit user directive.
