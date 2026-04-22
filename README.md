# wise-ui

Vue-based design system based on Tailwind Plus Application UI bundle.

## Repo state

Currently pre-implementation. The tree is intentionally lean:

- `application-ui-v4/` — reference pattern library + `GLOSSARY.md`.

## Stack

- **Framework**: Vue 3 (`<script setup>` + Composition API), TypeScript.
- **Build**: Vite.
- **Styling**: Tailwind CSS v4.
- **Interactive primitives**: `@headlessui/vue` (Dialog, Menu, Disclosure, Combobox).
- **Icons**: `@heroicons/vue` (outline + solid 20), one family only.
- **Router/state/test runner**: deferred until a second screen forces the decision.

### Why Vue over React

1. **Form-heavy UX.** The briefing leans on controlled inputs (inventory edit drawer §5.2, composer + quick-reply chips §5.4, campaign builder §5.6, live-filter bars everywhere). `v-model` collapses the `value` / `onChange` pair into one directive — meaningfully less boilerplate at this scale.
2. **Live-preview reactivity.** Promotions (§5.6) updates preview and button labels as items and channels toggle. This is textbook `ref` / `computed`; the React equivalent would lean on `useEffect` dependency arrays that get fragile fast.
3. **Lower drift from the reference dump.** `application-ui-v4/vue/` templates are near-literal HTML with `v-for` / `:prop` / `@event`. Copy-paste from `02-stacked.vue` carries far less translation cost than the JSX equivalent (`class` → `className`, map expressions, `'use client'`).
4. **Single-user, throwaway tool.** React's ecosystem advantage (hireability, library breadth) is not load-bearing for a 12-day personal tool.

Trade-off accepted: smaller ecosystem, `.value` unwrapping in `<script setup>`. Neither blocks the pilot.
