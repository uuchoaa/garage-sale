---
name: Animations are a first-class citizen of wise-ui
description: Motion is part of the DS contract, not a polish pass — tokens, primitives, and per-component contracts; prefers-reduced-motion respected by default
type: project
originSessionId: b09699a7-167d-4bb0-b35f-7c419cf12540
---
wise-ui treats animation as a foundational concern, at the same level as color or spacing.

Concretely this means:
- **Motion tokens** live alongside other design tokens: `duration` (fast/normal/slow), `easing` (standard/enter/exit/spring), `distance` (sm/md/lg). No magic ms values in consumer or component code.
- **Motion primitives** are exported: `<FadeIn>`, `<SlideIn>`, `<Collapse>`, `<Stagger>` — thin wrappers over Vue `<Transition>`/`<TransitionGroup>` that consume the tokens.
- **Per-component motion is baked in.** Each stateful component (`Menu`, `Dialog`, `NavTabs`, `ResourceList`, `StatusDot`, etc.) declares its own transitions internally. Consumers do not animate DS components manually.
- **`prefers-reduced-motion` is respected by default** via the token layer — under reduced motion, durations collapse and distance-based primitives degrade to opacity-only.
- **List layout changes use FLIP** via `<TransitionGroup>` inside list primitives (`ResourceList`, `FeedList`).

**Why:** Motion carries meaning (state change, hierarchy, origin of new elements). When it's retrofitted, it drifts and becomes inconsistent; consumers add one-off transitions that fight DS defaults. Embedding motion at the foundation level avoids that class of drift.

**How to apply:**
- When designing a new component, write a "motion contract" (what animates, when, which tokens) in the same PR as the component itself — not later.
- Reject motion values in consumer code that aren't tokens (e.g. `transition-duration: 250ms` — should be `duration-fast` or equivalent).
- When an interaction feels choppy or missing, the fix is a DS change (update tokens or component contract), not a consumer override.
