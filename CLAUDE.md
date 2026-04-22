# wise-ui

Vue-based UI project in the **wise** tooling family. The seed product driving this repo is **garage-sale** — a personal command-center for a one-time moving sale across WhatsApp, OLX, Instagram, Mercado Livre, and Facebook Marketplace. Single user, temporary, stops existing when the move is done.

Repo identity: `wise-ui`. Product the UI is built for: `garage-sale` (still referred to as "GarageSale" throughout the briefing and visible UI copy).

The full product spec — 7 screens, domain model, visual principles, definition of done — lives in [`docs/briefing.md`](docs/briefing.md). That document is the source of truth; this file only captures working conventions.

## Working principle: DS emerges from the product

GarageSale is the north star. The design system is **extracted from real screens**, not pre-built as a catalog.

- Build the next screen first. Copy the closest full snippet from [`application-ui-v4/html/`](application-ui-v4/GLOSSARY.md), adapt content inline.
- Duplication across the first 2-3 screens is fine. Resist premature abstraction.
- Only promote a component when a third screen would duplicate the same markup. Name it by what it *is* in GarageSale's domain (`PickupCard`, `ItemRow`), not by shape (`Card`, `TableRow`).
- Storybook and pattern libraries come **after** the DS exists — never before.

## Reference dump

`application-ui-v4/` is a read-only Tailwind Plus App UI pattern library, not a scaffold:

- Primary copy source: **`vue/`** (matches the chosen stack — see Repo state). Interactive primitives come from `@headlessui/vue`.
- `html/` remains useful as a reference for dark-mode class pairs and overall markup shape, but interactivity there (`<el-dropdown>` / `<el-disclosure>` from `@tailwindplus/elements`) does not port 1:1 to Vue — use Headless UI equivalents instead.
- `react/` is ignored.
- **Cashflow (App B, stacked shell)** is the chosen base for GarageSale. See [`application-ui-v4/GLOSSARY.md`](application-ui-v4/GLOSSARY.md) for the two reference apps and the rationale.
- Navigate by filename + `grep`. Per-subcategory READMEs are intentionally not extracted.

## Language conventions

- Code, comments, filenames, docs: **English**.
- UI copy (rendered strings): **pt-BR** (the seller is in Pinheiros, São Paulo).
- Money: always BRL, formatted `R$ 1.234,56`, no cents when whole.
- Time: relative ("agora", "há 2h", "ontem"), fall back to `DD/MM` beyond a week. Timezone: `America/São_Paulo`.

## Visual non-negotiables

Summarized from `docs/briefing.md` §9:

- **Palette**: zinc only. No brand color. No gradients. Near-absent shadows. Subtle borders.
- **Type**: tight, data-dense. Numbers beat labels. Labels beat prose.
- **Forbidden**: decorative emojis, oversized icons, pulsing badges, greeting messages, confetti, 3D charts, animated progress bars, flashing skeletons.
- **Icons**: outline or solid, one family, never oversized.
- **Density**: every screen answers its own question above the fold.

## Repo state

Currently pre-implementation. The tree is intentionally lean:

- `docs/briefing.md` — product spec.
- `application-ui-v4/` — reference pattern library + `GLOSSARY.md`.
- `.mcp.json` — wise-erp MCP server config.
- `.gitignore`.

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
