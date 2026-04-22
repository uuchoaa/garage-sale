# Migration Plan — Align DS with Tailwind Plus App UI

Execution plan for migrating the project's design system to the Tailwind Plus App UI visual language. Designed to be executed iteratively (Ralph loop-compatible).

Source library: `/design-system/application-ui-v4/react/` — real JSX available for every block.

---

## Goal

Produce a design system that:

1. Matches the Tailwind Plus App UI visual language verbatim (palette, density, refinement).
2. Exposes a **Blocks catalogue** covering the recurring App UI patterns (headings, stats, tables, empty states, cards, navs, description lists, status pills).
3. Lives behind an opinionated contract: pages compose only from DS blocks and Catalyst primitives — never raw Tailwind color classes, never App UI JSX copied directly.
4. Ships with Storybook as visual documentation.

---

## Context files (read first, every iteration)

- `design-system/README.md` — vocabulary (Token, Primitive, Block, Page), layer rules, file organization
- `CLAUDE.md` — agent contract for page authoring
- `client/src/index.css` — all tokens
- `client/src/components/catalyst/` — interactive primitives (keep)
- `client/src/components/ds/` — structural primitives + blocks (rebuild)
- `design-system/application-ui-v4/react/` — **source of truth for all block JSX**
- `DESIGN_GUIDE.md` — **obsolete; delete in Phase 8**

---

## Translation guide

All blocks are ported from App UI source. Apply these translations when porting.

### Token mapping (App UI → semantic tokens)

| App UI classes | Semantic token |
|---|---|
| `text-gray-900 dark:text-white` | `text-foreground` |
| `text-gray-700 dark:text-gray-300` | `text-foreground` |
| `text-gray-100` | `text-foreground` |
| `text-gray-500 dark:text-gray-400` | `text-muted-foreground` |
| `bg-white dark:bg-gray-900` | `bg-card` |
| `bg-white dark:bg-gray-800/50` | `bg-card` |
| `bg-gray-50 dark:bg-gray-800/50` | `bg-muted` |
| `bg-gray-900/5 dark:bg-white/10` | `bg-foreground/5` (gap separator) |
| `divide-gray-200 dark:divide-white/10` | `divide-border` |
| `divide-gray-300 dark:divide-white/15` | `divide-border` |
| `border-gray-100 dark:border-white/10` | `border-border` |
| `border-gray-200 dark:border-white/10` | `border-border` |
| `inset-ring-gray-300 dark:inset-ring-white/10` | `inset-ring-border` |
| `shadow-sm dark:shadow-none dark:inset-ring dark:inset-ring-white/10` | `shadow-sm dark:shadow-none dark:inset-ring dark:inset-ring-border` |
| `text-indigo-600 dark:text-indigo-400` | `text-primary` |
| `bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500` | `bg-primary hover:bg-primary/90` |
| `focus-visible:outline-indigo-600` | `focus-visible:outline-primary` |
| `text-green-700 bg-green-50 inset-ring-green-600/20` | `text-status-success bg-status-success-subtle inset-ring-status-success-border/20` |
| `dark:bg-green-400/10 dark:text-green-400 dark:inset-ring-green-400/20` | (covered by tokens above) |
| `text-red-700 bg-red-50 inset-ring-red-600/10` | `text-status-danger bg-status-danger-subtle inset-ring-status-danger-border/10` |
| `dark:bg-red-400/10 dark:text-red-400` | (covered by tokens above) |
| `text-yellow-800 bg-yellow-50 inset-ring-yellow-600/20` | `text-status-warning bg-status-warning-subtle inset-ring-status-warning-border/20` |
| `text-rose-600 dark:text-rose-400` (negative trend) | `text-status-danger` |
| `text-green-800 bg-green-100 dark:bg-green-400/10 dark:text-green-400` | `text-status-success bg-status-success-subtle` |
| `text-red-800 bg-red-100 dark:bg-red-400/10 dark:text-red-400` | `text-status-danger bg-status-danger-subtle` |

### Icon mapping (Heroicons → Lucide)

App UI uses Heroicons. This project uses `lucide-react` exclusively.

| Heroicon import | Lucide equivalent |
|---|---|
| `ArrowUpIcon` (20/solid) | `ArrowUp` |
| `ArrowDownIcon` (20/solid) | `ArrowDown` |
| `PlusIcon` (20/solid) | `Plus` |
| `ChevronDownIcon` (16/solid) | `ChevronDown` |
| `PaperClipIcon` (20/solid) | `Paperclip` |
| `FolderIcon` (24/outline) | `Folder` |
| `DocumentIcon` (24/outline) | `FileText` |
| `EllipsisVerticalIcon` | `EllipsisVertical` |

### `inset-ring` in Tailwind v4

App UI uses `inset-ring inset-ring-{color}` — Tailwind v4 syntax for box-shadow-based inset borders. Our setup imports `@import "tailwindcss"` (v4), so this works natively. `inset-ring-border` resolves to `--color-border` which is already defined in `@theme inline`.

### Navigation pattern

App UI tabs use raw `<a href>` for navigation. In this project, use `onClick` callbacks (wouter-compatible). The `SecondaryNav` block accepts `tabs: Array<{ label, href?, onClick?, current }>`.

---

## Completion criteria

All must be true to emit `<promise>MIGRATION-COMPLETE</promise>`:

- [ ] Tokens in `index.css` match Tailwind Plus palette (indigo accent, saturated status colors, standard dark mode with `white/10` rings)
- [ ] Storybook installed and renders without errors (`pnpm storybook`)
- [ ] `ds/primitives/` contains only `Page` and `Grid`, each with `.stories.tsx`
- [ ] `ds/blocks/` contains at minimum: `PageHeading`, `StatsGrid`, `DataTable`, `StatusPill`, `SecondaryNav`, `CardWithHeader`, `DescriptionList`, `EmptyState` — each with `.stories.tsx`
- [ ] Obsolete primitives deleted: `ds/Card.tsx`, `ds/StatusBadge.tsx`, `ds/AlertBanner.tsx`
- [ ] All pages in `client/src/pages/` compose only from `@/components/ds` and `@/components/catalyst`; zero raw color classes
- [ ] `grep -rE "text-(green|red|white|zinc|gray|slate)-|bg-(white|green|red|zinc|gray|slate)-|dark:" client/src/pages/` returns nothing
- [ ] `pnpm check` passes
- [ ] `CLAUDE.md` updated to point at new DS structure
- [ ] `design-system/README.md` updated with Storybook convention
- [ ] `design-system/CATALOG.md` created listing all blocks and primitives
- [ ] `DESIGN_GUIDE.md` deleted

---

## Progress tracker

Update as each phase completes. Check boxes inline.

- [x] Phase 1 — Tokens reset
- [x] Phase 2 — Storybook setup
- [x] Phase 3 — Primitive rewrite (`Page`, `Grid`)
- [x] Phase 4 — Core block catalogue
- [x] Phase 5 — Cashflow validation page
- [x] Phase 6 — Migrate existing pages
- [x] Phase 7 — Delete obsolete primitives
- [x] Phase 8 — Documentation finalization

---

## Phase 1 — Reset tokens to App UI palette

Revert the contrast reductions applied in earlier sessions. Align tokens with App UI defaults.

**Files:** `client/src/index.css`

**Changes:**

- `--primary` / `--accent` → indigo (`oklch(0.54 0.24 264)` light / `oklch(0.65 0.22 264)` dark)
- Also update `--ring`, `--sidebar-primary`, `--sidebar-accent`, `--sidebar-ring` to indigo (they were all pointing to the old sage value)
- `--status-success` → saturated green:
  - Light: text `oklch(0.527 0.154 150)` / bg `oklch(0.982 0.018 155)` / border `oklch(0.627 0.194 149)`
  - Dark: text `oklch(0.723 0.219 149)` / bg+border `oklch(0.723 0.219 149 / 10%)`
- `--status-danger` → saturated red:
  - Light: text `oklch(0.505 0.213 27)` / bg `oklch(0.971 0.013 17)` / border `oklch(0.577 0.245 27)`
  - Dark: text `oklch(0.704 0.191 22)` / bg+border `oklch(0.637 0.237 25 / 10%)`
- `--status-warning` → saturated yellow:
  - Light: text `oklch(0.554 0.135 66)` / bg `oklch(0.987 0.026 102)` / border `oklch(0.68 0.162 75)`
  - Dark: text `oklch(0.795 0.184 86)` / bg+border `oklch(0.795 0.184 86 / 10%)`
- Dark mode `--background` → `oklch(0.141 0.005 285.823)` (zinc-950) — verify already set
- Dark mode `--border` → `oklch(1 0 0 / 10%)` (white/10) — verify already set
- Add `--ring-subtle: oklch(1 0 0 / 10%)` in `.dark` / `oklch(0 0 0 / 10%)` in `:root`
- Add `--color-ring-subtle: var(--ring-subtle)` to `@theme inline`

Keep all other token names stable — only values change.

**Verify:**

```bash
pnpm check
```

---

## Phase 2 — Storybook setup

Storybook is already installed (`pnpm storybook` and `pnpm build-storybook` scripts exist). Only configuration and cleanup needed.

**Configure `.storybook/main.ts`:**

- Set `stories` glob: `['../client/src/**/*.stories.@(ts|tsx|mdx)']`
- Framework must be `@storybook/react-vite`
- Keep addons: essentials, interactions

**Configure `.storybook/preview.ts`:**

- Import `../client/src/index.css`
- Add a decorator that adds `.dark` class to `<html>` (app is forced dark)
- Set `parameters.backgrounds.default = 'dark'` with value matching `--background` dark token

**Clean up:**

- Delete `app/stories/` directory (generated examples: `Button.stories.ts`, `Header.stories.ts`, `Page.stories.ts`, etc.)

**Fallback (Tailwind v4 not activating in Storybook):**

Create `.storybook/vite.config.ts` mirroring the root `vite.config.ts` (react plugin + `@tailwindcss/vite` plugin).

**Verify:**

```bash
pnpm storybook
```

Confirm shell renders at http://localhost:6006 with dark background and tokens active.

---

## Phase 3 — Primitive rewrite

**Move:**
- `client/src/components/ds/Page.tsx` → `client/src/components/ds/primitives/Page.tsx`
- `client/src/components/ds/Grid.tsx` → `client/src/components/ds/primitives/Grid.tsx`

**Revise `Page`:**

- Keep `Page` and `Page.Header` API
- Add optional `Page.Header` props: `tabs?: Array<{label, current, onClick}>`, `secondary?: ReactNode` (for sibling nav)
- Remove anything that conflicts with App UI layout spacing

**Revise `Grid`:**

- Keep `cols`, `gap`
- Add `divide?: "x" | "y"` → adds `divide-x divide-border` or `divide-y divide-border`
- Add `border?: boolean` → adds `inset-ring inset-ring-border` pattern used in stats cards

**Stories required:**

- `Page.stories.tsx` — default, with tabs, with actions
- `Grid.stories.tsx` — 2/3/4 cols, gap variants, divide variant

**Update barrel:** `client/src/components/ds/index.ts` re-exports from `primitives/`.

**Verify:**

```bash
pnpm check
pnpm storybook
```

---

## Phase 4 — Core block catalogue

Build each block in `client/src/components/ds/blocks/`. Each requires a co-located `.stories.tsx`.

### Block specs (with source file references)

---

#### `StatusPill`

**Source:** `elements/badges/05-pill-with-border.jsx`

Rounded pill with inset ring. Variants: `success | danger | warning | neutral`.

```tsx
// App UI pattern (translated):
<span className="inline-flex items-center rounded-full bg-status-success-subtle px-2 py-1 text-xs font-medium text-status-success inset-ring inset-ring-status-success-border/20">
  Active
</span>
```

Props: `variant`, `children`.

---

#### `PageHeading`

**Source:** `headings/page-headings/01-with-actions.jsx`

Title + optional description + optional `actions` slot (ReactNode).

```tsx
// App UI pattern (translated):
<div className="md:flex md:items-center md:justify-between">
  <div className="min-w-0 flex-1">
    <h2 className="text-2xl/7 font-bold text-foreground sm:truncate sm:text-3xl sm:tracking-tight">
      {title}
    </h2>
  </div>
  {actions && <div className="mt-4 flex md:mt-0 md:ml-4">{actions}</div>}
</div>
```

Props: `title`, `description?`, `actions?`.

---

#### `SecondaryNav`

**Source:** `navigation/tabs/01-tabs-with-underline.jsx`

Underline tabs with mobile `<select>` fallback. Accepts `onClick` handlers (no `href`).

Key pattern:
- Mobile: native `<select>` with `ChevronDown` overlay
- Desktop: `border-b border-border` nav with `aria-current="page"` on active tab
- Active tab: `border-primary text-primary`
- Inactive: `border-transparent text-muted-foreground hover:border-border hover:text-foreground`

Props: `tabs: Array<{ label, current, onClick? }>`, `trailingAction?` (ReactNode).

---

#### `StatsGrid` + `Stat`

**Two variants from source:**

1. **Gap-px grid** (`data-display/stats/01-with-trending.jsx`):
   - `<dl className="grid grid-cols-1 gap-px bg-foreground/5 sm:grid-cols-2 lg:grid-cols-4">`
   - Each cell: `bg-card px-4 py-10`
   - Change indicator: `text-status-danger` (negative) / `text-foreground` (positive)

2. **Shared-border card** (`data-display/stats/05-with-shared-borders.jsx`):
   - `<dl className="grid grid-cols-1 divide-border overflow-hidden rounded-lg bg-card shadow-sm md:grid-cols-3 md:divide-x dark:shadow-none dark:inset-ring dark:inset-ring-border">`
   - Value: `text-primary`
   - Change badge: `bg-status-success-subtle text-status-success` / `bg-status-danger-subtle text-status-danger`
   - Icon: `ArrowUp` / `ArrowDown` from `lucide-react`

`StatsGrid` prop `variant?: "gap" | "card"` selects between the two. Default `"gap"`.

`Stat` props: `name`, `value`, `change?`, `changeType?: "positive" | "negative"`, `previousValue?`.

---

#### `DataTable`

**Source:** `lists/tables/01-simple.jsx` (flat) + `lists/tables/09-with-grouped-rows.jsx` (grouped)

Generic table accepting typed column definitions and row data. Supports optional row grouping.

```tsx
interface Column<T> {
  key: keyof T
  label: string
  align?: "left" | "right"
  render?: (value: T[keyof T], row: T) => ReactNode
}

interface RowGroup<T> {
  label: string
  rows: T[]
}
```

Key pattern from source (translated):
- Wrapper: `min-w-full divide-y divide-border`
- Header cell: `text-sm font-semibold text-foreground`
- Body divider: `divide-y divide-border`
- Group header row: `bg-muted text-sm font-semibold text-foreground`
- Data cell: `text-sm text-muted-foreground`

Props: `columns`, `rows?` (flat), `groups?` (grouped), `emptyMessage?`.

---

#### `CardWithHeader`

**Source:** `layout/cards/03-card-with-header.jsx`

Card with `divide-y` separating header band from body.

```tsx
// App UI pattern (translated):
<div className="divide-y divide-border overflow-hidden rounded-lg bg-card shadow-sm dark:shadow-none dark:inset-ring dark:inset-ring-border">
  <div className="px-4 py-5 sm:px-6">{header}</div>
  <div className="px-4 py-5 sm:p-6">{children}</div>
</div>
```

Props: `header` (ReactNode), `children`, `className?`.

---

#### `DescriptionList`

**Source:** `data-display/description-lists/01-left-aligned.jsx`

`<dl>` with `divide-y divide-border` rows. Each item is a 3-column grid (label | value spanning 2 cols).

```tsx
// Row pattern (translated):
<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
  <dt className="text-sm/6 font-medium text-foreground">{label}</dt>
  <dd className="mt-1 text-sm/6 text-muted-foreground sm:col-span-2 sm:mt-0">{value}</dd>
</div>
```

Props: `title?`, `description?`, `items: Array<{ label, value: ReactNode }>`.

---

#### `EmptyState`

**Source:** `feedback/empty-states/01-simple.jsx`

Centered icon + title + description + optional action button.

Key pattern (translated):
- Icon: `mx-auto size-12 text-muted-foreground` (pass a Lucide icon component)
- Title: `mt-2 text-sm font-semibold text-foreground`
- Description: `mt-1 text-sm text-muted-foreground`
- Action: `bg-primary` button

Props: `icon?` (LucideIcon), `title`, `description?`, `action?: { label, onClick }`.

---

### Contract for all blocks

- TypeScript `interface Props` with JSDoc on each prop
- One-line JSDoc at file top: what it is, when NOT to use
- Zero raw color classes — only semantic tokens (see Translation guide above)
- Co-located `.stories.tsx`: default story + every variant

### Barrel

Export each block from `ds/index.ts`.

**Verify:**

```bash
pnpm check
pnpm storybook
```

All block stories render. No TypeScript errors.

---

## Phase 5 — Cashflow validation page

Create `client/src/pages/Cashflow.tsx` as proof that the block catalogue covers App UI patterns.

**Compose using:**
- `StatsGrid` + `Stat` — revenue, overdue, outstanding, expenses (variant `"gap"`)
- `SecondaryNav` — "Last 7 days | Last 30 days | All-time" + "+ New invoice" trailing action
- `DataTable` with `groups` — recent activity grouped by date
- `CardWithHeader` grid — recent clients cards

**Acceptance:**

- Zero `className` with raw color/bg classes
- Composes only from `@/components/ds` and `@/components/catalyst`

Add route to `App.tsx` under `/cashflow`.

**Verify:**

```bash
pnpm check
pnpm dev
```

Smoke-check in browser. Any raw class needed = missing block → add to Phase 4 and loop.

---

## Phase 6 — Migrate existing pages

Rewrite each page using the new DS:

- `Dashboard.tsx`
- `Inventory.tsx`
- `Channels.tsx`
- `Messages.tsx`
- `Settings.tsx`

Per page: replace raw color classes, custom card markup, custom status badges, custom alert banners with blocks from the catalogue.

**Verify per page:**

```bash
grep -nE "text-(green|red|white|zinc|gray|slate)-|bg-(white|green|red|zinc|gray|slate)-|dark:" client/src/pages/<Page>.tsx
# Must return nothing.
```

Final:

```bash
pnpm check
```

---

## Phase 7 — Delete obsolete primitives

After all pages use the new blocks, the old primitives have no remaining imports.

**Delete:**

- `client/src/components/ds/Card.tsx`
- `client/src/components/ds/StatusBadge.tsx`
- `client/src/components/ds/AlertBanner.tsx`

Clean up `ds/index.ts` barrel.

**Verify:**

```bash
pnpm check
grep -r "from \"@/components/ds/Card\"" client/src/
grep -r "from \"@/components/ds/StatusBadge\"" client/src/
grep -r "from \"@/components/ds/AlertBanner\"" client/src/
# All must return nothing.
```

---

## Phase 8 — Documentation finalization

**Update `CLAUDE.md`:**

- Primitives section reflects `Page`/`Grid` only
- Blocks section lists the current catalogue with one-line purpose each
- Add: "Every primitive and block has a `.stories.tsx`. Consult Storybook (`pnpm storybook`) for visuals."
- Remove references to `StatusBadge`, `AlertBanner`, old `Card`

**Update `design-system/README.md`:**

- Add a "Visual documentation" section pointing at Storybook
- Add the Storybook convention: every primitive and block ships with stories

**Create `design-system/CATALOG.md`:**

- Table: Name | Kind (Primitive / Block) | Purpose | Source path | App UI source
- Must include every entry in `ds/primitives/` and `ds/blocks/`

**Delete `DESIGN_GUIDE.md`** — obsolete; replaced by `design-system/README.md` + Storybook.

**Verify:**

```bash
ls DESIGN_GUIDE.md 2>&1 | grep -q "No such file"
test -f design-system/CATALOG.md
```

---

## Blocker protocol

If blocked on a decision that requires human judgment (e.g., visual calibration a token can't express, API shape ambiguity):

1. Append the blocker to `design-system/BLOCKERS.md` — context, what was tried, what decision is needed.
2. Leave other phases untouched.
3. Emit `<promise>BLOCKED</promise>`.

Never make destructive decisions when blocked. Prefer leaving a TODO marker in code with `// TODO(migration-plan):` prefix.

---

## Completion

When all completion criteria are satisfied and the progress tracker is fully checked:

Emit `<promise>MIGRATION-COMPLETE</promise>`.
