# Garage Sale — Agent Contract

## Stack
- React 19, TypeScript, Tailwind v4, Vite
- Catalyst UI (`client/src/components/catalyst/`) — low-level form/interactive primitives
- DS primitives (`client/src/components/ds/`) — layout and status components
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

### Status indicators — use DS component

```tsx
import { StatusBadge } from "@/components/ds"

<StatusBadge status="connected" />
<StatusBadge status="needs_auth" />
<StatusBadge status="not_connected" />
```

Available statuses: `connected` | `needs_auth` | `suspended` | `quota_exceeded` |
`not_connected` | `unanswered` | `active` | `pickup_pending`

To add a new status, register it in `StatusBadge.tsx → statusRegistry`.

### Alerts and banners — use DS component

```tsx
import { AlertBanner } from "@/components/ds"

<AlertBanner variant="danger">Sua autenticação expirou.</AlertBanner>
<AlertBanner variant="success">Configurações salvas.</AlertBanner>
<AlertBanner variant="muted">Conecte este canal para começar.</AlertBanner>
```

## ❌ Forbidden in page files

- Raw color classes: `text-green-*`, `text-red-*`, `text-white`, `text-zinc-*`
  → Use `text-foreground`, `text-muted-foreground`, `text-status-*`
- `dark:` overrides for colors already covered by semantic tokens
  → Tokens handle dark mode internally
- `bg-white` / `bg-zinc-900` for surfaces
  → Use `bg-card` or `bg-background`
- `bg-green-*` / `bg-red-*` for inline status backgrounds
  → Use `<AlertBanner>` or `bg-status-*-subtle`
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

- `DESIGN_GUIDE.md` — full visual language (palette, spacing, motion, anti-patterns)
- `client/src/index.css` — all token definitions
- `client/src/components/ds/` — DS primitives source
- `client/src/components/catalyst/` — Catalyst UI source
