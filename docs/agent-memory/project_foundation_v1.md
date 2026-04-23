---
name: Foundation v1 baseline (closed 2026-04-23)
description: First version of the wise-ui foundation is closed, anchored on Cashflow Home + Planetaria Home; future changes to the pinned docs require justification
type: project
originSessionId: b09699a7-167d-4bb0-b35f-7c419cf12540
---
The v1 foundation of wise-ui was closed on **2026-04-23**, anchored on two reference screens: `examples/cashflow/Home.vue` and `examples/planetaria/Home.vue`.

**Pinned artifacts** (the baseline):
- `docs/foundations.md` — tokens + layout/media/motion primitives + motion contracts.
- `docs/components.md` — enumerative catalog of all non-primitive components (shells, page structure, nav, actions, data display).
- `docs/archetypes.md` — 4×2 archetype × dialect system (added same-day; replaces the earlier YAML-grammar doc).
- `docs/targets.md` — multi-target posture (Vue-only today; multi-target deferred).
- `examples/cashflow/Home.vue` — Stacked shell reference.
- `examples/planetaria/Home.vue` — Sidebar shell reference.

**What "closed" means:**
- These docs are authoritative. Changes are deliberate, not casual.
- Both Home screens serve as the conformance suite — any DS change must keep both valid.
- Adding a component, slot, or token is OK when a new real screen justifies it; the change propagates to docs + conformance screens in the same pass.
- The archetype set has since grown past Home (Index, Detail, Settings implemented for both apps as of 2026-04-23) — current phase is tracked in `project_current_phase.md`.
- The YAML spec layer was removed later that day; references to `.yaml` files are historical.

**Pattern for future changes:**
1. New screen introduces a requirement not covered by v1.
2. Decide: extend existing component/primitive/grammar, or add a new one?
3. Update the relevant docs in `docs/*` first.
4. Update the conformance screens if the change affects them.
5. Mirror memory if the change creates a new project premise.

**How to apply:**
- When starting work that touches the baseline, read all pinned docs first.
- When proposing a change, say which baseline artifact(s) it affects.
- Don't silently drift — if a change feels ad-hoc, surface it explicitly.
