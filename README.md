# wise-ui

Vue-based design system based on Tailwind Plus Application UI bundle.

## Repo state

DS implemented (50 components). All 8 reference screens (Cashflow + Planetaria × Home/Index/Detail/Settings) typecheck and compile from `wise-ui`.

Light mode only. No dark mode support: no `dark:` variants in components, no dark tokens in `src/styles.css`, no toggle in the harness. Lands in Phase 3 (theming) — see roadmap below.

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


## Deferred

Intentionally off-table until a concrete signal demands them:

- **Storybook stories** for DS components. Screens are the spec; stories add value only when components drift from screens.
- **Unit specs.** Typecheck + visual pass catch most; add specs when a bug reappears or a component gets genuinely tricky.
- **Mocks / fixtures** beyond what a single screen needs.
- **Second-target ports** (React, Rails). Tracked in `docs/targets.md`; Vue-only for now.
- **Package publishing**. Alias `wise-ui` → `src/index.ts` is enough while the DS has one consumer tree.

## Roadmap

### Phase 1 — Foundation · done (2026-04-23)

DS v1: 50 components, 8 reference screens (Cashflow + Planetaria × Home/Index/Detail/Settings), archetype system 4×2, token system, motion primitives. Scope locked in `docs/`. Light-only, no tests, no publishing, no theming.

Reference screens stay synced with the DS — they are not "finished", they are maintained.

### Phase 2 — Real consumer · next

Turn **Cashflow** from reference screen into a working app: state, forms, fake persistence, routing. This is where the DS meets the friction LLM-generated screens don't exercise — loading / empty / error states, forms at scale, edge cases — and where Foundation proves it holds up.

- [ ] Lift Cashflow out of `examples/` into a consumer app (structure decided when we start)
- [ ] Wire state, forms, fake persistence
- [ ] One e2e test covering the golden path
- [ ] Opportunistic visual pass on primitives that surface as weak along the way

Planetaria stays as reference. One real consumer is enough signal to validate the DS at app scale.

### Phase 3 — Extensibility

Input: model 1–2 Tailwind Plus _archived_ Page Examples (no implementation — modeling + notes only, same treatment Cashflow and Planetaria got) to probe the limits of the DS. Output: a clear line between what the DS configures and what a consumer app implements.

- [ ] Model archived Page Examples (no impl)
- [ ] Dark mode — ships as a special case of theming, not as a standalone feature
- [ ] Token overrides + brand palette
- [ ] Scope question: DS responsibility vs. app responsibility

Garage Sale fits here as a third real consumer if the motivation holds.

### Phase 4 — Make it shine

- [ ] Docs site built on a Tailwind Plus template (Protocol primarily; also Commit, Syntax) — https://tailwindcss.com/plus/templates#browse
- [ ] Expand e2e coverage
- [ ] Visual artifacts: landing, component gallery
