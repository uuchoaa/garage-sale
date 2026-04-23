# Multi-target output (vision)

This document captures the multi-target architecture discussed during the foundation pass. **Current scope is Vue only.** The goal here is to preserve the reasoning so future sessions can pick up where we left off without re-deriving it.

---

## The core idea

Screens are authored in a **closed-grammar YAML** (see `docs/yaml-grammar.md`). A deterministic translator emits a target-specific artifact. Because the YAML is target-neutral, the same source can produce outputs in different technologies — provided a wise-ui implementation exists in that target.

```
Briefing → LLM → structured Markdown
                    ↓ (parser: rules + light LLM)
                 YAML (canonical source of truth)
                    ↓ (deterministic translator)
              ┌─────┴──────┬─────────────┬─────────────┐
           Vue SFC     React TSX    Rails VC      …future…
```

## Conditions for target-neutrality

The YAML is portable **iff**:

1. **Bindings are path expressions + closed operators only.** No arbitrary JS: no arrow functions, no ternaries, no method calls. Allowed: `$name`, `$a.b.c`, `${a[b.c]}`, `"text ${x}"`. Anything richer belongs in the `<script>` layer, not in the YAML.
2. **Component vocabulary is target-agnostic.** Names, props, slot keys, and token values are the same across targets. What differs is how the target emits them.
3. **Interactivity is not in the YAML.** Form validation, state machines, event handlers, optimistic updates — all of that lives in the hand-authored (or separately-generated) `<script>` portion of the target output. YAML describes structure + bindings, nothing more.

## Target analysis

### Vue (current scope)

- Native slot system maps 1:1 to the YAML slot grammar.
- Scoped slots map to `slot: { scope, children }` in YAML.
- `v-for` / `v-if` map to `repeat` / `if`.
- Reactive state (`ref`, `computed`) lives in the hand-authored `<script>`.
- **Status:** the grammar is derived from Vue and proven against two Homes.

### React (close analog)

- wise-ui component names/props map directly. Slots in Vue → named children props in React (`<Card header={...} headerTrailing={...}>`) or render-function children for scoped slots.
- `repeat` → `.map()` in JSX.
- State/effects via hooks.
- Token CSS (Tailwind) is identical.
- **Estimated port cost:** meaningful but bounded — each wise-ui component reimplemented in React with the same public API.
- **Open question:** how to express scoped slots ergonomically. `header={({ item }) => <…>}` is one answer; another is a context-based pattern.

### Rails (ViewComponent)

- Different mental model: server-rendered, no reactive state.
- Slots exist (`ViewComponent::Slotable`), with similar semantics to Vue's.
- Interactivity migrates to **Turbo + Stimulus**: the YAML doesn't change, but the stub "script" becomes a Stimulus controller wiring + Turbo Frame/Stream configuration.
- Componentes map to ViewComponent classes + `.html.erb` templates.
- **Estimated port cost:** higher than React, because the interactivity story is reshaped from reactive → event-driven over HTTP.
- **Open question:** how much of the form/interactive surface the YAML can still describe vs. how much becomes hand-authored Stimulus. Likely form layout stays in YAML; form behavior stays in Stimulus.

### Other plausible targets

- **Svelte** — very close to Vue conceptually; near-mechanical port.
- **HTMX / Alpine** — hybrid server + sprinkles; similar to Rails case.
- **Static HTML** — the simplest translator, useful for prototyping.
- **Non-web (React Native, SwiftUI, Compose)** — technically possible but stretches the premise; token-mapping and layout-primitive implementations are the main work.

## What the grammar must avoid to stay portable

- Arrow functions in bindings (e.g. `itemHref: ${(d) => d.href}`). Replace with path-accessors where the component resolves a key (`itemHref: $item.href`, where the DS says "this prop is a path into each item").
- Target-specific prop names (e.g. `v-model`, `:style`, `class=`). Props should be semantic (`value`, `onChange`, `tone`).
- Framework-specific directives in YAML. `if` / `repeat` are fine because the translator emits the idiomatic form per target.
- Imports of target-specific libraries inside the YAML (e.g. heroicon imports). The YAML references icons by name; the translator resolves them per target (Vue `@heroicons/vue`, React `@heroicons/react`).

## What lives in which layer

| Concern | Layer | Notes |
|---------|-------|-------|
| Structure of the screen | YAML | Components, slots, repeats, conditionals |
| Token choices | YAML | `tone`, `size`, `gap`, `weight` |
| Bindings to data | YAML | Path access + interpolation only |
| Mock data | Alongside YAML (fixtures) | Kept out of the structural YAML once the grammar stabilizes |
| Data-fetching / store wiring | Target `<script>` | Hand-authored or separately generated |
| Interactivity (validation, state machines) | Target `<script>` | Per-target idiom |
| Animation / motion | wise-ui components (all targets) | Per `project_animations_first_class` |
| Styling primitives | wise-ui components (Tailwind shared) | Zero Tailwind at consumer |

## Open questions (revisit when expanding targets)

1. **wise-ui port strategy.** Do we maintain parallel codebases (`wise-ui-vue`, `wise-ui-react`, `wise-ui-rails`) or a source-of-truth spec that compiles to each? The latter is ambitious; the former is more pragmatic and matches how most cross-framework DSs operate.
2. **Token distribution.** Tokens as CSS custom properties (shared across targets) vs. framework-specific theme providers. CSS custom properties plus Tailwind variants is the simplest common denominator.
3. **Icon strategy.** Heroicons have Vue, React, and raw SVG exports. An icon naming convention (`PlusSmall`, not `PlusSmallIcon`) lets the translator pick the target-specific import.
4. **Rails interactivity boundary.** Exactly how much of a form lives in YAML when the target is Rails/Turbo. Decision probably deferred until we actually try a Rails target.
5. **Testing strategy across targets.** Snapshot tests per target; same YAML input → compare expected per-target outputs. Keeps regressions honest.

## Revisit trigger

Open this doc when:
- Considering a second target (beyond Vue).
- Introducing a binding form or prop convention that might not port cleanly.
- Writing the translator and hitting a portability decision.
