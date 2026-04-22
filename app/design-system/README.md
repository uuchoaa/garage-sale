# Design System

The vocabulary, layering, and rules that govern how we build UI. This document is the shared contract — any human or agent touching the code should follow it.

---

## Vocabulary

Four terms. Use them precisely.

### Token

Design value: color, spacing, radius, typography. Exposed as CSS custom property and consumed through Tailwind classes.

- **Lives in:** `client/src/index.css`
- **Looks like:** `text-foreground`, `bg-card`, `border-border`, `text-status-danger`, `rounded-md`
- **Is the only source of truth for visual values.**

### Primitive

Atomic component. No domain logic. Combines tokens and (at most) other primitives.

Two flavors:

- **Interactive primitive** — behavior + presentation, typically wraps Headless UI.
  Source: Catalyst (Tailwind Plus kit). Examples: `Button`, `Input`, `Dialog`, `Dropdown`, `Combobox`, `Avatar`, `Badge`, `Link`, `Heading`.

- **Structural primitive** — pure layout scaffolding.
  Ours. Examples: `Page`, `Grid`.

- **Lives in:**
  - `client/src/components/catalyst/` (interactive, Tailwind Plus kit)
  - `client/src/components/ds/primitives/` (structural, ours)

### Block

Composition of primitives forming a recurring unit. Named after the term Tailwind Plus uses for the same concept — no new vocabulary to learn.

Examples:

- **Generic** (reusable in any app): `PageHeading`, `StatsGrid`, `DataTable`, `EmptyState`, `StatusPill`, `SecondaryNav`, `Feed`, `CardWithHeader`, `DescriptionList`.
- **Domain** (specific to this app): `ChannelCard`, `ConversationItem`, `PickupCard`.

- **Lives in:** `client/src/components/ds/blocks/` — flat. Generic and domain coexist; naming distinguishes them (pattern name vs. domain noun).

### Page

Full screen. Composes blocks and primitives. Holds routing, data fetching, and page-level state.

- **Lives in:** `client/src/pages/`

---

## Layer rules

Imports flow one direction only:

```
Page       → Blocks, Primitives
Block      → Primitives, other Blocks
Primitive  → Tokens, (at most) other Primitives
Token      → self-contained (CSS variables)
```

A Page never uses raw Tailwind color classes. A Block may use utility classes for layout, never for color — always via token.

---

## File organization

```
client/src/
├── index.css                          # Tokens
├── components/
│   ├── catalyst/                      # Interactive primitives (Tailwind Plus)
│   └── ds/
│       ├── primitives/                # Structural primitives (Page, Grid, …)
│       ├── blocks/                    # Blocks — generic + domain, flat
│       └── index.ts                   # Barrel export
└── pages/                             # Pages

design-system/
└── README.md                          # This document
```

Public import surface is the barrel: `import { Page, Grid, StatsGrid } from "@/components/ds"`. Keeps agent-generated code predictable.

---

## When to create a Block

Extract to a block when **one** of these is true:

- The pattern appears in 2+ places.
- The JSX is non-trivial (>30 lines or deep nesting).
- It encodes a visual decision worth enforcing consistently.

Otherwise, inline in the page is fine. Not every piece of JSX needs to be a block. Premature abstraction hurts more than duplication.

---

## Adopting Tailwind Plus blocks

Tailwind Plus ships UI blocks as copy-pasteable JSX with raw Tailwind classes. The workflow:

1. Copy the block from Tailwind Plus.
2. Replace raw color classes with semantic tokens (`text-gray-500` → `text-muted-foreground`, `bg-white` → `bg-card`, `text-indigo-600` → `text-accent`).
3. Replace inline elements with primitives where applicable (raw `<button>` → Catalyst `Button`, raw `<a>` → Catalyst `Link`).
4. Save to `client/src/components/ds/blocks/<BlockName>.tsx`.
5. Export from `ds/index.ts`.

Pages import the block. They never copy Tailwind Plus JSX directly.

---

## Forbidden in Pages

- Raw color classes: `text-green-*`, `text-red-*`, `bg-white`, `bg-zinc-*`, `dark:text-*`, etc. Use tokens.
- Inline `flex` / `grid` / `div` for structural layout. Use `<Grid>` or extract a block.
- Copying JSX from Tailwind Plus directly. Always go through a block.

---

## Forbidden in Blocks

- Domain imports from `pages/`. Blocks don't know about routing, data, or business logic.
- Raw color classes. Same rule as Pages — tokens only.

---

## Decisions recorded

- **Term: "Block", not "Composition" or "Pattern"** — aligns with Tailwind Plus terminology. One vocabulary, not two.
- **Flat `ds/blocks/` directory** — generic and domain blocks together. Enforced by naming discipline, not folder structure. Avoids premature taxonomy.
- **No sub-category for structural primitives** — only two exist today (`Page`, `Grid`). Split if the category grows past ~5.
- **Catalyst stays** — it is Tailwind Plus's own interactive primitive kit with Headless UI already integrated. Replacing it would mean rebuilding Dialog, Combobox, Dropdown, etc. from scratch.

---

## Visual documentation

Every primitive and block ships with a co-located `.stories.tsx` file (CSF3 format). Run Storybook to browse the full catalogue with live previews:

```bash
pnpm storybook   # http://localhost:6006
```

Stories convention:
- One `default` story showing typical usage
- Additional named exports for each variant or state
- Dark mode forced via the `dark` decorator (matches the forced-dark app theme)

New blocks must include stories before the PR merges.

---

## References

- `client/src/index.css` — token definitions
- `client/src/components/catalyst/` — interactive primitives (Tailwind Plus kit)
- `client/src/components/ds/` — structural primitives and blocks (ours)
- `design-system/CATALOG.md` — full block and primitive catalogue with source references
- [Tailwind Plus UI Blocks](https://tailwindcss.com/plus/ui-blocks/application-ui) — source material for new blocks
