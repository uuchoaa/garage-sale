---
name: Multi-target vision (Vue now; React/Rails later)
description: YAML canonical grammar is target-neutral by design; wise-ui is Vue-only for now; full vision, constraints, and open questions live in docs/targets.md
type: project
originSessionId: b09699a7-167d-4bb0-b35f-7c419cf12540
---
The project architecture supports targets beyond Vue (React, Rails ViewComponent, Svelte, HTMX/Alpine, static HTML, possibly native). **Current scope: Vue only.** Targets will be added when justified.

Full rationale, per-target analysis, portability rules, and open questions live in `docs/targets.md`. Read that document when considering anything that might affect cross-target portability of the YAML grammar or DS API.

**Load-bearing constraints today (even in Vue-only mode):**
- YAML bindings are **path expressions + closed operators only**. No arrow functions, no ternaries, no method calls. If a prop needs richer expression, push it into the component (e.g. `itemHref: $item.href` where ResourceList resolves the path internally).
- Component prop names stay semantic, not framework-flavored (no `v-model`, no `class=`, no `:style`).
- Icons referenced by name, not by framework-specific import path.

**How to apply:**
- Any change to the YAML grammar or DS prop API is evaluated against "does this still port to React/Rails?" even while Rails/React aren't in scope. If the answer needs work, document the tradeoff in `docs/targets.md` and proceed only with awareness.
- Don't port to other targets on spec alone — wait for a concrete need.
