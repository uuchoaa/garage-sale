---
name: Screens are authored in YAML; Vue is a compiled artifact
description: Each consumer screen has a YAML source of truth; a deterministic translator (rule-based or small local model) produces the .vue; production swaps the stub script for real wiring
type: project
originSessionId: b09699a7-167d-4bb0-b35f-7c419cf12540
---
Consumer screens (for Cashflow, Planetaria, Garage Sale) are authored as YAML files. A deterministic translator emits the `.vue` (template + stub script). Going to production means replacing the generated `<script>` stub with hand-wired data sources (API, stores), while the `<template>` stays machine-generated.

**Why this layering:**
- A YAML grammar is a smaller closed language than Vue — a small local model (Qwen-class) or even a rule-based translator can produce the `.vue` reliably from it.
- YAML is 5-10× fewer tokens than equivalent Vue for an LLM producing a briefing. Cheaper, faster.
- Auditing diffs happens on YAML, where every change is structural and readable — not on generated Vue where whitespace/reorderings create noise.
- Reinforces the DS determinism premise: non-determinism moves up one layer (brief → YAML), where the grammar is smaller and more controllable; YAML → Vue becomes mechanical.

**What YAML expresses:**
- Structure: components, nesting, slots, repeats, conditionals.
- Props: literal values or references to data.
- Token choices (`tone`, `size`, `gap`): enumerated strings only.
- Text content and interpolation.
- Data contract: the shape of variables the `<script>` is expected to produce.

**What YAML does not express:**
- Animations/motion — those live in wise-ui components, not in screens.
- Interactivity logic (validation, state machines, optimistic updates) — those live in the `<script>` and are hand-authored (or authored by a separate agent with richer context).
- Styling primitives beyond DS tokens — no CSS, no Tailwind, no inline styles.

**How to apply:**
- Treat `.yaml` as the canonical source; `.vue` as a build output. Edits to the `.vue` template are forbidden — regenerate from YAML instead.
- The `<script>` portion is *not* generated from YAML; it is either a stub for mock data (one mode) or hand-written wiring (production).
- When starting a new screen, start in YAML. When tempted to hand-tune the `.vue`, extend the YAML grammar instead.
- Derive the grammar from real screens, not in a vacuum. Add only what 2+ screens need.
