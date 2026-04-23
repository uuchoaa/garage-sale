# Multi-target output (deferred)

wise-ui is **Vue-only** today. The previous plan was to author screens in a target-neutral YAML grammar and run a deterministic translator to emit Vue / React / Rails. That plan is paused.

## Current posture

- Screens are hand-written `.vue` against the DS (see `docs/archetypes.md`, AD-5).
- The DS primitives (`src/components/*`) carry the Tailwind styling; consumer screens stay within the closed vocabulary.
- No intermediate representation; `examples/<app>/<Screen>.vue` is the spec.

## When to revisit

A second consumer with real requirements — React SPA, Rails + ViewComponent, Svelte, etc. — with a concrete deadline. At that point, the portability question stops being speculative and can be answered with the actual constraints the second consumer imposes.

Until then, don't pay the tooling cost of target-neutrality. The DS surface is small enough that a hand port of the primitives to a second framework is a finite, bounded task — probably cheaper than maintaining a translator and a grammar alongside the screens.

## Principles worth preserving

A few things that made sense in the original plan and should still guide the DS regardless of target:

- **Zero Tailwind at the consumer.** Primitives absorb all styling. Consumer screens never write `class="..."` with Tailwind utilities.
- **Semantic props only.** `tone` / `size` / `gap` / `weight` are the vocabulary. No `:style`, no framework-specific escape hatches in consumer code.
- **Icons referenced by name, not by import.** The DS exposes a mapping; consumer code writes `<Icon src="PlusSmall" />`, not a direct `@heroicons/vue` import. This keeps the door open for cross-framework icon families without changing screens.
- **Interactivity lives in the script layer, not the template.** Validation, state machines, data-fetching — all of that is target-specific and hand-written per screen. Templates stay structural.

These rules survive the YAML retirement because they're about the DS, not about the intermediate representation.
