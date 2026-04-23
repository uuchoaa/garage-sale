# Components

Every wise-ui component that is not a foundation primitive. Enumerative and authoritative — LLM generators read this as part of the prompt, so there is no "usually" or "can also."

See `docs/foundations.md` for tokens and layout/media/motion primitives. See `docs/yaml-grammar.md` for how screens reference these components in YAML.

---

## Shells

### `<StackedShell>`

Top-bar shell. Used when the app has flat navigation.

| Prop   | Type       | Default |
|--------|------------|---------|
| `nav`  | `NavItem[]`| —       |
| `user` | `User`     | —       |

Slots:
- `brand` — branding region (top-left); typical content: `<Logo>`.
- default — page body.

### `<SidebarShell>`

Left-sidebar shell with a sticky top bar. Used for dense apps with grouped nav.

| Prop   | Type        | Default |
|--------|-------------|---------|
| `nav`  | `NavItem[]` | —       |
| `user` | `User`      | —       |

Slots:
- `brand` — branding region (top of sidebar).
- `nav-extra` — additional sidebar sections (e.g. `<NavGroup>` for teams).
- `topbar` — content area top bar (typical: `<SearchField>`).
- default — page body.

Shared types:
- `NavItem = { label: string; to: string; icon?: Component; current?: boolean }`
- `User = { name: string; avatar: string }`

---

## Page structure

### `<Page>`

Main content container inside a shell. Provides the scaffolding for heading, sections, and an optional right rail.

Slots:
- default — page sections in order.
- `rail` — right-side aside (e.g. activity feed); renders as `<aside>` on lg+.

### `<PageHeading>`

Section under the shell top-bar that names the page and exposes secondary nav + primary action.

| Prop     | Type     | Default |
|----------|----------|---------|
| `title`  | `string` | —       |

Slots:
- `nav` — secondary navigation (e.g. `<NavTabs>`).
- `actions` — page-level actions (typically a `<Button>` or `<Menu>`).

### `<PageSection>`

Titled block of content, with an optional "see all" action link.

| Prop          | Type     | Default |
|---------------|----------|---------|
| `title`       | `string` | —       |
| `actionLabel` | `string` | —       |
| `actionHref`  | `string` | —       |

Slots:
- default — section body.

---

## Navigation

### `<NavTabs>`

Horizontal text-tabs (text-only or text+underline; no icon). Emits changes via `update:value`.

| Prop    | Type             | Default |
|---------|------------------|---------|
| `items` | `NavTabItem[]`   | —       |
| `value` | `string`         | —       |

`NavTabItem = { label: string; value: string; current?: boolean }`.

### `<NavGroup>`

Sidebar nav block with optional title.

| Prop      | Type                       | Default  |
|-----------|----------------------------|----------|
| `title`   | `string`                   | —        |
| `items`   | `NavGroupItem[]`           | —        |
| `variant` | `icons` · `initials`       | `icons`  |

`NavGroupItem = { label: string; to: string; icon?: Component; initial?: string; current?: boolean }`

- `variant="icons"` — items render with `icon`.
- `variant="initials"` — items render with `initial` (one-letter badge).

### `<SearchField>`

Search input with a magnifying-glass icon. Emits `update:value`.

| Prop          | Type     | Default |
|---------------|----------|---------|
| `placeholder` | `string` | —       |
| `value`       | `string` | —       |

---

## Actions

### `<Button>`

| Prop       | Type                                     | Default     |
|------------|------------------------------------------|-------------|
| `variant`  | `primary` · `secondary` · `ghost`        | `secondary` |
| `icon`     | icon component                           | —           |
| `disabled` | `boolean`                                | `false`     |

Slots:
- default — button label.

### `<Menu>`

Headless-backed popover menu. Generic — the trigger is consumer-provided.

Slots:
- `trigger` — the opener (icon, text, or both). Consumer wraps icons with `<Icon>` for sizing.
- default — `<MenuItem>` children.

### `<MenuItem>`

| Prop       | Type      | Default |
|------------|-----------|---------|
| `to`       | `string`  | —       |
| `value`    | `string`  | —       |
| `disabled` | `boolean` | `false` |

Slots:
- default — item label.

---

## Data display

### `<StatGrid>`

Renders a responsive grid of stats (`dl`-based).

| Prop    | Type     | Default |
|---------|----------|---------|
| `items` | `Stat[]` | —       |

`Stat = { label: string; value: string; delta: string; tone: Tone }`.

### `<StatusBadge>`

Pill-shaped label with semantic tone.

| Prop    | Type      | Default |
|---------|-----------|---------|
| `tone`  | `Tone`    | —       |
| `label` | `string`  | —       |

### `<StatusDot>`

Colored dot indicator.

| Prop   | Type   | Default |
|--------|--------|---------|
| `tone` | `Tone` | —       |

Consumers map domain states (e.g. `offline`, `online`, `error`) to `Tone` before passing.

### `<ActivityTable>`

Grouped-by-date activity table (3 cells per row: amount, meta, action).

| Prop     | Type               | Default |
|----------|--------------------|---------|
| `groups` | `ActivityGroup[]`  | —       |

`ActivityGroup = { label: string; datetime: string; entries: ActivityEntry[] }`
`ActivityEntry` is consumer-shaped; the scoped slots render the cells.

Scoped slots (all receive `{ entry }`):
- `amount` — leading cell: amount + status.
- `meta` — middle cell: counterparty / description.
- `action` — trailing cell: link + reference number.

### `<ResourceList>`

Flat list of rows with leading / title / meta / trailing regions. Row-wide click target when `itemHref` is set.

| Prop       | Type                                              | Default |
|------------|---------------------------------------------------|---------|
| `items`    | `T[]`                                             | —       |
| `itemHref` | `string` — key/path into each item (e.g. `"href"`) | —      |

Scoped slots (all receive `{ item }`):
- `leading` — left-most element (status dot, avatar, icon).
- `title` — row title.
- `meta` — secondary text below title.
- `trailing` — right-most element (tag, badge, chevron).

`itemHref` is a literal key or dotted path (no `$` prefix). The component resolves `item[path]` at runtime. In YAML: `itemHref: href`. In Vue: `item-href="href"`.

### `<FeedList>`

Vertical feed of items with a header line and a body block.

| Prop    | Type   | Default |
|---------|--------|---------|
| `items` | `T[]`  | —       |

Scoped slots (all receive `{ item }`):
- `header` — top line: avatar + name + time.
- `body` — body block: description of the event.

### `<Card>`

Rounded container with optional header and trailing header slot.

| Prop  | Type     | Default |
|-------|----------|---------|
| `tag` | HTML tag | `div`   |

Slots:
- `header` — leading content (logo + name).
- `header-trailing` — right-aligned content in the header row (typically `<Menu>`).
- default — card body.

### `<DescriptionList>`

`<dl>`-based key-value list.

Slots:
- default — `<DescriptionListItem>` children.

### `<DescriptionListItem>`

| Prop    | Type     | Default |
|---------|----------|---------|
| `label` | `string` | —       |

Slots:
- default — value content (can include `<StatusBadge>`, `<Cluster>`, text).

---

## Coverage

Every component imported by `examples/cashflow/Home.vue` and `examples/planetaria/Home.vue` is documented above. When a Home screen introduces a new component or a new prop/slot on an existing one, this doc updates in the same PR.
