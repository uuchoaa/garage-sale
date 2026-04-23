---
name: Current phase (2026-04-23) — screens drafted, DS unimplemented
description: 4 archetypes × 2 apps drafted against an unimplemented wise-ui package; src/ empty; next choice is implement DS vs build YAML translator vs 5th archetype
type: project
originSessionId: 9eefaf1b-b886-4dfa-a37d-88630de31156
---
**Screen coverage (as of 2026-04-23):**

Four archetypes × two reference apps = 8 screens in `examples/`:

|           | Cashflow                | Planetaria               |
|-----------|-------------------------|--------------------------|
| Home      | `Home.{yaml,vue}`       | `Home.{yaml,vue}`        |
| Index     | `Index.{yaml,vue}`      | `Index.{yaml,vue}`       |
| Detail    | `Detail.{yaml,vue}`     | `Detail.{yaml,vue}`      |
| Settings  | `Settings.{yaml,vue}`   | `Settings.{yaml,vue}`    |

Home (both apps) is the pinned conformance suite for YAML grammar v1. Index/Detail/Settings are drafts that proposed new primitives — all of which are now cataloged in `docs/components.md`.

**`src/` is empty.** All screens import from `'wise-ui'`, but the package has no implementations. The code is proposal-grade: validated by eye against the catalog, not by running.

**Why:** DS emerges from product (see `feedback_ds_emerges_from_product.md`). Four archetypes across two apps has produced a stable enough vocabulary to justify the DS → code step; cataloging *before* implementation prevents API drift.

**How to apply** — when starting a new session, the natural next phases, in rough order of readiness:

1. **Implement wise-ui primitives in `src/`.** `docs/components.md` is the spec; `docs/foundations.md` has tokens + layout/media/motion primitives; `docs/file-structure.md` has the layout.
2. **Build the YAML→Vue translator.** Grammar in `docs/yaml-grammar.md`; `.yaml` files are intended ground truth, `.vue` files currently hand-written in parallel. Closing this loop validates "YAML as source of truth."
3. **Add a 5th archetype** only if a real product need surfaces (empty states / error / onboarding / auth — none pressing today).

Before acting: read `docs/components.md` for the vocabulary and `git log --oneline -15` to see the latest archetype cadence and any drift since this memory was written. The pattern per archetype is: draft both apps → propose new primitives → catalog in `docs/components.md` → commit as `feat(<app>): …` + `docs: catalog …`.
