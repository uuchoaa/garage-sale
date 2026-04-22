# Garage Sale — Agent Contract

## Stack
- React 19, TypeScript, Tailwind v4, Vite
- Catalyst UI (`client/src/components/catalyst/`) — low-level form/interactive primitives
- DS primitives and blocks (`client/src/components/ds/`) — layout, surfaces, and recurring UI patterns
- Tokens defined in `client/src/index.css` via `@theme inline` + `:root` / `.dark`
- Routing: wouter. No react-router.
- Dark mode forced via `ThemeProvider defaultTheme="dark"` in `App.tsx`

## Design System Rules

### Pages — mandatory structure

Every page component MUST use DS primitives for layout:

```tsx
import { Page, Grid, Card } from "@/components/ds"

export default function MyPage() {
  return (
    <Page>
      <Page.Header title="Título" description="Subtítulo opcional" />
      <Grid cols={2} gap="md">
        <Card>...</Card>
        <Card>...</Card>
      </Grid>
    </Page>
  )
}
```

For full-bleed layouts (e.g. Messages — split panels edge-to-edge):

```tsx
<Page variant="full-bleed">...</Page>
```

### Text colors — semantic tokens only

Never use raw Tailwind color classes for text. Use semantic tokens:

| Intent         | Class                  |
|----------------|------------------------|
| Primary text   | `text-foreground`      |
| Secondary/muted| `text-muted-foreground`|
| Status success | `text-status-success`  |
| Status danger  | `text-status-danger`   |
| Status warning | `text-status-warning`  |

### Surfaces — semantic tokens only

| Intent         | Class           |
|----------------|-----------------|
| Page background| `bg-background` |
| Card / panel   | `bg-card`       |
| Subtle fill    | `bg-muted`      |
| Border         | `border-border` |

### Status indicators — use DS block

```tsx
import { StatusPill } from "@/components/ds"

<StatusPill variant="success">Conectado</StatusPill>
<StatusPill variant="danger">Reautenticar</StatusPill>
<StatusPill variant="neutral">Não conectado</StatusPill>
```

Variants: `success` | `danger` | `warning` | `neutral`

Map domain statuses to these four variants in the consuming page (not inside StatusPill).

### Alerts and banners — use DS block

```tsx
import { Alert } from "@/components/ds"

<Alert variant="danger">Sua autenticação expirou.</Alert>
<Alert variant="success">Configurações salvas.</Alert>
<Alert variant="muted">Conecte este canal para começar.</Alert>
```

Variants: `success` | `danger` | `warning` | `muted`

## DS Block Catalogue

Every primitive and block has a `.stories.tsx`. Consult Storybook (`pnpm storybook`) for visuals. See `design-system/CATALOG.md` for the full table.

| Export | Kind | When to use |
|--------|------|-------------|
| `Page` | Primitive | Every page root — provides padding and layout shell |
| `Grid` | Primitive | CSS grid with semantic gap / divide / border options |
| `Card` | Block | Simple surface container (no required header) |
| `Alert` | Block | Inline status messages |
| `StatusPill` | Block | Rounded status badge (4 variants) |
| `PageHeading` | Block | Title + description + actions slot |
| `SecondaryNav` | Block | Underline tab navigation with mobile fallback |
| `StatsGrid` | Block | KPI grid (`"gap"` or `"card"` variant) |
| `DataTable` | Block | Generic typed table with optional row grouping |
| `CardWithHeader` | Block | Card with divide-y header band |
| `DescriptionList` | Block | Label/value list with divide-y rows |
| `EmptyState` | Block | Centered empty-state with icon and action |

## ❌ Forbidden in page files

- Raw color classes: `text-green-*`, `text-red-*`, `text-white`, `text-zinc-*`
  → Use `text-foreground`, `text-muted-foreground`, `text-status-*`
- `dark:` overrides for colors already covered by semantic tokens
  → Tokens handle dark mode internally
- `bg-white` / `bg-zinc-900` for surfaces
  → Use `bg-card` or `bg-background`
- `bg-green-*` / `bg-red-*` for inline status backgrounds
  → Use `<Alert>` or `bg-status-*-subtle`
- Bare `<div className="flex ...">` or `<div className="grid ...">` for page structure
  → Use `<Grid>` or `<Page>`

## Allowed anywhere (Catalyst)

`Button`, `Input`, `InputGroup`, `Select`, `Checkbox`, `CheckboxField`,
`Avatar`, `Badge`, `Divider`, `Field`, `FieldGroup`, `Label`, `Description`,
`Heading`, `Text`, `Textarea`, `Dialog`, `Dropdown`

## Icons

Lucide only (`lucide-react`). Never heroicons or emoji as decorative elements.

## Typography rules

- Page title: `text-xl font-semibold` (via `Page.Header`)
- Section header: `text-sm font-semibold`
- Body / content: `text-sm`
- Metadata / timestamps: `text-xs text-muted-foreground`
- Prices / data: `font-mono` (maps to JetBrains Mono)

## Reference files

- `design-system/README.md` — vocabulary, layering rules, Storybook convention
- `design-system/CATALOG.md` — full block/primitive table with source references
- `client/src/index.css` — all token definitions
- `client/src/components/ds/` — DS primitives and blocks source
- `client/src/components/catalyst/` — Catalyst UI source
