# DS Catalog

All structural primitives and blocks exposed by `@/components/ds`.

## Primitives

| Name | Kind | Purpose | Source path |
|------|------|---------|-------------|
| `Page` | Primitive | Page shell with padding, optional full-bleed variant, and `Page.Header` subcomponent (title, description, tabs, actions) | `ds/primitives/Page.tsx` |
| `Grid` | Primitive | CSS grid layout with semantic gap, divide, and border variants | `ds/primitives/Grid.tsx` |

## Blocks

| Name | Kind | Purpose | Source path | App UI source |
|------|------|---------|-------------|---------------|
| `Card` | Block | Simple surface container with optional `.Header` and `.Body` sub-components | `ds/blocks/Card.tsx` | — |
| `Alert` | Block | Inline status alert with icon; variants: `success`, `danger`, `warning`, `muted` | `ds/blocks/Alert.tsx` | — |
| `StatusPill` | Block | Rounded badge with inset ring; variants: `success`, `danger`, `warning`, `neutral` | `ds/blocks/StatusPill.tsx` | `elements/badges/05-pill-with-border.jsx` |
| `PageHeading` | Block | Page title + optional description + optional actions slot | `ds/blocks/PageHeading.tsx` | `headings/page-headings/01-with-actions.jsx` |
| `SecondaryNav` | Block | Underline tab navigation with mobile `<select>` fallback and optional trailing action | `ds/blocks/SecondaryNav.tsx` | `navigation/tabs/01-tabs-with-underline.jsx` |
| `StatsGrid` | Block | KPI grid in two variants: gap-px (`"gap"`) or shared-border card (`"card"`) | `ds/blocks/StatsGrid.tsx` | `data-display/stats/01-with-trending.jsx`, `05-with-shared-borders.jsx` |
| `DataTable` | Block | Generic typed table with optional row grouping and empty state | `ds/blocks/DataTable.tsx` | `lists/tables/01-simple.jsx`, `09-with-grouped-rows.jsx` |
| `CardWithHeader` | Block | Card with `divide-y` header band and inset-ring dark border | `ds/blocks/CardWithHeader.tsx` | `layout/cards/03-card-with-header.jsx` |
| `DescriptionList` | Block | `<dl>` with divide-y rows; 3-column label/value grid per row | `ds/blocks/DescriptionList.tsx` | `data-display/description-lists/01-left-aligned.jsx` |
| `EmptyState` | Block | Centered icon + title + description + optional action button | `ds/blocks/EmptyState.tsx` | `feedback/empty-states/01-simple.jsx` |

All App UI source paths are relative to `design-system/application-ui-v4/react/`.
