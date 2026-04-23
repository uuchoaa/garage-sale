---
name: YAML-as-spec posture (2026-04-23 reversal)
description: Original "YAML is source of truth, Vue is a build output" ambition is paused; YAMLs are now design specs, .vue files are what ships; deterministic translator revisited only when a real second consumer (React/Rails) appears
type: project
originSessionId: b09699a7-167d-4bb0-b35f-7c419cf12540
---
**Posture change recorded 2026-04-23.** The YAML-as-source-of-truth ambition is on ice.

**Today's reality:**
- `examples/<app>/<Screen>.yaml` files are **design specs** — they document what a screen should render and with which DS primitives. They do NOT compile to Vue.
- `examples/<app>/<Screen>.vue` is **what ships**. It imports from `wise-ui` and enforces the closed vocabulary by what it uses.
- The deterministic YAML→Vue translator does not exist. Implementing it was a tooling cost paid 100% upfront for a multi-target benefit that may never materialize.

**Why:** Modern Claude-class LLMs write Vue respecting a closed component catalog when given the catalog and a clear prompt; they don't need an intermediate DSL. The translator would re-implement what Vue already provides (v-for/v-if/scoped slots/v-bind), add a 3-layer debug chain, and lose IDE support on the authoring language. See `docs/archetypes.md` AD-5 and `docs/articles/event-sourced-frontend-i-didnt-build.md` for the longer reasoning.

**When to revisit:** A real second consumer shows up (React SPA, Rails + ERB, etc.) with a concrete deadline. At that point build the translator with real requirements, not speculative ones.

**How to apply today:**
- When drafting a new screen, you can sketch the YAML first as a spec — it's a cheap way to think — but the Vue is the deliverable, hand-written against the DS.
- Don't treat YAML edits as authoritative over Vue. If the two diverge, the Vue wins; update the YAML to match.
- Don't extend the YAML grammar for new use cases. If a new shape is needed, it belongs in `docs/archetypes.md` as a new archetype or archetype variant.
- YAML files still have value: they're compact screen-level specs that pair nicely with `briefing.md`. Keep them in sync when substantial structural changes land.
