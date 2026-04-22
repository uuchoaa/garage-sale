# Garage Sale

A personal command center for running a moving sale. One seller, multiple channels, many buyers in parallel — this tool keeps track of everything so you don't have to.

UI copy is in Brazilian Portuguese (pt-BR). Designed for laptop use in São Paulo.

## What it does

Seven screens, each answering one question:

| Screen | Question |
| :--- | :--- |
| **Dashboard** | What do I need to do right now? |
| **Inventory** | What do I have and what's its status? |
| **Channels** | Where am I publishing and are those channels healthy? |
| **Conversations** | Who's asking about what? |
| **Follow-ups** | What needs a nudge? |
| **Promotions** | How do I publish a batch across multiple channels at once? |
| **Sales** | Who's coming to pick up, and when? |

## Stack

- **React 19** + **TypeScript** — client
- **Vite 7** — dev server and build
- **Tailwind CSS 4** — styling (Slate & Sage palette, zinc-based, no gradients)
- **Radix UI** — accessible primitives
- **shadcn/ui** — component layer on top of Radix
- **wouter** — client-side routing
- **Express** — thin static-file server for production
- **pnpm** — package manager

## Getting started

```bash
cd app
pnpm install
pnpm dev        # starts Vite dev server at http://localhost:3000
```

For production:

```bash
pnpm build      # compiles client + bundles server
pnpm start      # runs Express on port 3000 (or $PORT)
```

Type-check without emitting:

```bash
pnpm check
```

## Project layout

```
app/
├── client/
│   ├── index.html
│   └── src/
│       ├── App.tsx          # routes + layout shell
│       ├── main.tsx
│       ├── index.css
│       ├── components/      # shared UI components
│       ├── pages/           # one file per screen
│       └── contexts/
├── server/
│   └── index.ts             # Express static server
├── shared/
│   └── const.ts             # types and constants shared across client/server
├── DESIGN_GUIDE.md          # color palette, typography, component rules
├── package.json
└── vite.config.ts
```

## Design rules

The full spec is in `DESIGN_GUIDE.md`. Short version:

- **Palette**: Slate + Sage only — no brand color, no gradients.
- **Type**: Geist Sans for UI, JetBrains Mono for prices/dates/status chips.
- **Density**: every number on screen should have an action or a reason to be there.
- **Motion**: 75 ms transitions max, `ease-out`. No bouncy animations, no skeletons, no confetti.
- **Shadows**: none. Depth via borders and background-color shifts.

## Pilot scope

This is a temporary tool for a one-time sale. The pilot ships with fixture data (≈10 buyers, ≈15 items, ≈12 conversations, ≈5 orders) so every screen feels populated without any real channel integration. Channel actions (send, reconnect, publish) are placeholders. No auth, no mobile-first redesign, no automated tests.
