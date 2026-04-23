# wise-ui

Vue-based design system based on Tailwind Plus Application UI bundle.

## Repo state

DS implemented (50 components). All 8 reference screens (Cashflow + Planetaria × Home/Index/Detail/Settings) typecheck and compile from `wise-ui`.

- `src/` — DS. One dir per component (`ComponentName/ComponentName.vue` + `index.ts`).
- `src/tokens.ts` — `Tone | Size | Weight | Gap | Duration | Easing | Distance | Breakpoint` + `Responsive<T>`.
- `src/styles.css` — Tailwind v4 entry + `@theme` tokens + reduced-motion overrides.
- `dev/` — Vite harness. `pnpm dev` → http://localhost:5173 → picker for the 8 screens.
- `examples/{cashflow,planetaria}/` — reference screens in `.vue` + optional `.schema.ts`, plus `briefing.md` explaining the app's dialect. Source of truth for what the DS must serve.
- `docs/` — `archetypes.md`, `foundations.md`, `components.md`, `file-structure.md`, `targets.md`.

## Stack

- **Framework**: Vue 3 (`<script setup>` + Composition API), TypeScript.
- **Build**: Vite (lib consumed via path alias `wise-ui` → `src/index.ts`; migrates to workspace when a second consumer appears).
- **Styling**: Tailwind CSS v4 (CSS-first config in `src/styles.css`).
- **Interactive primitives**: `@headlessui/vue` (Menu, Switch; Dialog/Disclosure/Combobox as they arrive).
- **Forms**: VeeValidate + Zod (`@vee-validate/zod`). `.schema.ts` colocated with the screen.
- **Icons**: `@heroicons/vue` (outline 24 + solid 20), one family only.
- **Router/state/test runner**: deferred until a second screen forces the decision.

## Scripts

- `pnpm dev` — Vite dev server; harness renders the 8 reference screens.
- `pnpm typecheck` — `vue-tsc --noEmit` across `src/`, `dev/`, `examples/`.
- `pnpm build` — typecheck + Vite build (not yet wired to an output target; dead-simple for now).

### Why Vue over React

1. **Form-heavy UX.** The briefing leans on controlled inputs (inventory edit drawer §5.2, composer + quick-reply chips §5.4, campaign builder §5.6, live-filter bars everywhere). `v-model` collapses the `value` / `onChange` pair into one directive — meaningfully less boilerplate at this scale.
2. **Live-preview reactivity.** Promotions (§5.6) updates preview and button labels as items and channels toggle. This is textbook `ref` / `computed`; the React equivalent would lean on `useEffect` dependency arrays that get fragile fast.
3. **Lower drift from the reference dump.** `application-ui-v4/vue/` templates are near-literal HTML with `v-for` / `:prop` / `@event`. Copy-paste from `02-stacked.vue` carries far less translation cost than the JSX equivalent (`class` → `className`, map expressions, `'use client'`).
4. **Single-user, throwaway tool.** React's ecosystem advantage (hireability, library breadth) is not load-bearing for a 12-day personal tool.

Trade-off accepted: smaller ecosystem, `.value` unwrapping in `<script setup>`. Neither blocks the pilot.

## Next session — pick one to lead

The DS renders the 8 screens but has never been seen in a browser. Everything else is a downstream choice from what we find when we look.

1. **Visual pass in the browser.** Boot `pnpm dev`, walk the 8 screens, note what's broken / off-brand / spacing-wrong / motion-missing. The tone palette in `src/styles.css` is oklch placeholders — almost certainly wants a real pass. Expect 1–2 days of DS polish coming out of this.
2. **Migrate Detail / Home / Settings `.vue` of Cashflow to DS primitives.** Several reference screens are still the raw reverse-engineered Tailwind Plus output (Tailwind classes at the consumer, not DS components). Bring them into the closed vocabulary.
3. **5th archetype.** More vocabulary before coding further. Cheap, but defers the two above.

Default recommendation: **#1 first** (cheapest signal, likely surfaces DS gaps that change #2's priorities), then **#2**. #3 waits until we have reason to believe the current vocabulary is insufficient.

## Session log

### 2026-04-23 (session close)

Shipped the DS in four slices (scaffold+foundation → shells+nav+actions → data display → detail+settings+forms+motion). 50 components, all 8 screens compile. No visual pass yet. Inline `NavItem`/`NavGroupItem`/`NavTabItem`/`Tone` type decls in examples collapsed to imports from `wise-ui` now that the DS is the source of truth. `Text size="base"` → `size="md"` in two places (foundations has no `base`). Storybook, unit specs, motion verification in DOM — all untouched on purpose. Later same day: archetype system formalized in `docs/archetypes.md` with per-app `briefing.md`s; the YAML spec layer and the deterministic-translator ambition were dropped (see `docs/articles/`).

### 2026-04-23 (session decisions, earlier)

Locked in to unblock the Settings + Detail sweep:

- **Form stack**: VeeValidate + **Zod** (not Yup). `.schema.ts` uses Zod; type inference is nicer and the ecosystem is the one we'd reuse in a React port.
- **Settings sub-nav**: slot `#sidenav` on `<Page>`, not a dedicated `<SettingsLayout>` component. Same shell, one slot.
- **`SettingsRow`**: three separate components (`SettingsFieldRow`, `SettingsItemRow`, `SettingsToggleRow`) instead of one polymorphic variant. Determinism for LLM > reuse.
- **Detail scope**: split into draft-first / schemas-second if the reference is heavy. Don't block the sweep on one tela.

## Deferred

Intentionally off-table until a concrete signal demands them:

- **Storybook stories** for DS components. Screens are the spec; stories add value only when components drift from screens.
- **Unit specs.** Typecheck + visual pass catch most; add specs when a bug reappears or a component gets genuinely tricky.
- **Mocks / fixtures** beyond what a single screen needs.
- **Second-target ports** (React, Rails). Tracked in `docs/targets.md`; Vue-only for now.
- **Package publishing**. Alias `wise-ui` → `src/index.ts` is enough while the DS has one consumer tree.
