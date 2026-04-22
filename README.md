# wise-ui

Vue-based UI project in the **wise** tooling family. Seed product: a personal command-center for running a one-time moving sale across WhatsApp, OLX, Instagram, Mercado Livre, and Facebook Marketplace (see [`docs/briefing.md`](docs/briefing.md)). Single user, local-only, intended to stop existing once that move is done — any reusable UI will emerge from building it first.

## Status

Pre-implementation. The product spec is fixed; the scaffold is not yet in place.

- Product spec (7 screens, domain model, visual principles): [`docs/briefing.md`](docs/briefing.md)
- Working conventions and stack rationale: [`CLAUDE.md`](CLAUDE.md)
- Reference UI dump (read-only Tailwind Plus App UI): [`application-ui-v4/`](application-ui-v4/GLOSSARY.md)

## Stack

- Vue 3 (`<script setup>` + Composition API), TypeScript
- Vite
- Tailwind CSS v4
- `@headlessui/vue` for interactive primitives (Dialog, Menu, Disclosure, Combobox)
- `@heroicons/vue` for icons

Router, state library, and test runner are deferred until a second screen forces the decision. See [`CLAUDE.md`](CLAUDE.md#stack) for the rationale behind Vue over React.

## Getting started

Scaffold not yet created — this section will fill in once `package.json` lands. Expected shape:

```sh
pnpm install
pnpm dev
```

## Next To Do

Implementation is queued for autonomous execution via the [Ralph Wiggum plugin](https://github.com/anthropics/claude-code/blob/main/plugins/ralph-wiggum/README.md) (Stop-hook loop). The full plan lives in [`docs/plan.md`](docs/plan.md) — 55 tasks across 9 phases, one task per loop iteration, checkboxes as progress ledger.

Kick it off with:

```
/ralph-loop "Read docs/plan.md and execute exactly one task per iteration per the loop rules it defines. Do not start a new task until the previous one is committed. Do not edit the plan file except to flip checkboxes, append blockers, or append the completion promise. When the plan's Final verification passes, append <promise>GARAGE_SALE_PILOT_COMPLETE</promise> as the last line of docs/plan.md and commit." --completion-promise "GARAGE_SALE_PILOT_COMPLETE" --max-iterations 100
```

Before invoking, review the decisions baked into the plan (change the plan first if any are wrong):

- Nav labels (pt-BR): `Painel · Inventário · Canais · Conversas · Pendências · Divulgação · Vendas` (P1.5)
- Routes in pt-BR (`/inventario`, `/divulgacao`, ...) (P1.4)
- No Pinia — `reactive()` store singletons (P1.3)
- Tailwind v4 with manual `.dark` on `<html>`, no theme toggle (P0.4)
- pnpm; dependency list pinned in P0.1

After Ralph exits (promise fired or iteration cap hit): inspect `docs/plan.md` for remaining `[ ]` / `[!]` boxes and `## Blockers` entries.

## Conventions

- Code, comments, filenames, docs: **English**.
- UI copy (rendered strings): **pt-BR** (seller is in Pinheiros, São Paulo).
- Money: BRL, formatted `R$ 1.234,56`, no cents when whole.
- Time: relative (`agora`, `há 2h`, `ontem`); fall back to `DD/MM` beyond a week. Timezone: `America/São_Paulo`.
- Visual palette: zinc only. No brand color, no gradients, no decorative emojis. Full list in [`docs/briefing.md`](docs/briefing.md#9-visual-principles-non-negotiable).

## Non-goals for the pilot

No real channel integrations, no auth, no mobile-first redesign, no automated tests, no payment processing. Everything external is a fixture. See [`docs/briefing.md` §8](docs/briefing.md#8-non-goals-for-this-pilot).
