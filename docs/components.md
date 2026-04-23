# Components

Every wise-ui component that is not a foundation primitive. Enumerative and authoritative — LLM generators read this as part of the prompt, so there is no "usually" or "can also."

See `docs/foundations.md` for tokens and layout/media/motion primitives. See `docs/archetypes.md` for how screens compose these components.

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

Main content container inside a shell. Provides the scaffolding for heading, sections, an optional right rail, and an optional left sub-nav.

Slots:
- default — page sections in order.
- `rail` — right-side aside (e.g. activity feed); renders as `<aside>` on lg+.
- `sidenav` — left-side vertical sub-nav (e.g. `<NavGroup variant="icons">`); renders as `<aside>` on lg+. Typical use: settings screens with sub-navigation.

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

| Prop       | Type                                               | Default     |
|------------|----------------------------------------------------|-------------|
| `variant`  | `primary` · `secondary` · `ghost` · `danger`       | `secondary` |
| `icon`     | icon component                                     | —           |
| `disabled` | `boolean`                                          | `false`     |
| `type`     | `button` · `submit` · `reset`                      | `button`    |

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

`itemHref` is a literal key or dotted path. The component resolves `item[path]` at runtime. Example: `item-href="href"` picks `item.href` for each row.

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

### `<ResourceTable>`

Flat data table with column config + one scoped slot per column key. Use when data is tabular and columns are known ahead of time (vs. `<ResourceList>` for row-shaped lists, or `<ActivityTable>` for grouped-by-date activity).

| Prop      | Type        | Default |
|-----------|-------------|---------|
| `title`   | `string`    | —       |
| `columns` | `Column[]`  | —       |
| `items`   | `T[]`       | —       |

`Column = { key: string; label: string; align?: 'start' \| 'end' }`

Scoped slots: one per column `key`, each receives `{ item }`. A column without a matching slot renders `item[key]` as plain text.

Convention for trailing row actions: add a column with `key: "actions"`, `label: ""`, `align: "end"`, and provide the matching scoped slot (typically a `<Link>` or `<Menu>`). No dedicated "actions" prop — the scoped-slot mechanism already covers it.

### `<Pagination>`

Prev/next pagination control for listed data (typically below a `<ResourceTable>` or `<ResourceList>`). Stateless — the consumer owns page state.

| Prop      | Type      | Default |
|-----------|-----------|---------|
| `summary` | `string`  | —       |
| `hasPrev` | `boolean` | —       |
| `hasNext` | `boolean` | —       |

`summary` is pre-formatted by the consumer (e.g. `"1 – 10 de 42"`) — the component does not format numbers, since pt-BR/en formatting lives upstream.

Emits: `prev`, `next`. When `hasPrev`/`hasNext` is `false` the corresponding button is rendered disabled (not hidden) to keep the control's horizontal layout stable.

---

## Detail

### `<DetailHeading>`

Hero heading for detail/resource pages: `eyebrow` + `title` + optional `description`, with a leading region (logo/avatar/status dot) and trailing actions.

| Prop          | Type     | Default |
|---------------|----------|---------|
| `eyebrow`     | `string` | —       |
| `title`       | `string` | —       |
| `description` | `string` | —       |

Slots:
- `leading` — left-side element (`<Logo>`, `<Avatar>`, `<StatusDot>`).
- `title` — overrides the `title` prop for compound titles (e.g. `<Text>Planetaria</Text><Text tone="muted"> / </Text><Text>mobile-api</Text>`). When provided, `title` prop is ignored.
- `actions` — right-side buttons, badges, or menus.

### `<SummaryCard>`

Opinionated summary panel: a title block, a stack of labeled rows, and an optional footer (usually a link).

Slots:
- `title` — top block (e.g. amount + status).
- default — `<SummaryCardRow>` children.
- `footer` — bottom link/action.

### `<SummaryCardRow>`

| Prop    | Type            | Default |
|---------|-----------------|---------|
| `icon`  | icon component  | —       |
| `label` | `string`        | —       |

Slots:
- default — the value content.

### `<Timeline>`

Vertical timeline of events with two item shapes (simple event line vs. comment card). The component routes per item based on `item.kind === 'commented'`; consumers provide both slots.

| Prop    | Type  | Default |
|---------|-------|---------|
| `items` | `T[]` | —       |

Scoped slots (both receive `{ item }`):
- `event` — single-line event row (`<Text>person</Text> <Text>action</Text> <time>`).
- `comment` — comment card (avatar + body).

`item` must expose `kind` (`'commented'` selects `#comment`, anything else selects `#event`) and `id`. Other shape is consumer-defined.

---

## Settings

### `<SettingsSection>`

Titled settings section with divided rows and an optional actions row at the bottom.

| Prop          | Type     | Default |
|---------------|----------|---------|
| `title`       | `string` | —       |
| `description` | `string` | —       |

Slots:
- default — row children (`<SettingsFieldRow>`, `<SettingsItemRow>`, `<SettingsToggleRow>`).
- `actions` — bottom action row (e.g. `<Button variant="ghost" icon="..">Adicionar outro ...</Button>`).

### `<SettingsFieldRow>`

Display-first field: label on the left, current value on the right, action button (e.g. "Atualizar") at the end.

| Prop          | Type      | Default |
|---------------|-----------|---------|
| `label`       | `string`  | —       |
| `value`       | `string`  | —       |
| `actionLabel` | `string`  | —       |
| `disabled`    | `boolean` | `false` |

Emits: `action`.

Slots:
- default — overrides `value` for rich content.

### `<SettingsItemRow>`

List-item row for things like bank accounts, integrations.

| Prop          | Type             | Default |
|---------------|------------------|---------|
| `icon`        | icon component   | —       |
| `title`       | `string`         | —       |
| `description` | `string`         | —       |
| `actionLabel` | `string`         | —       |
| `disabled`    | `boolean`        | `false` |

Emits: `action`.

### `<SettingsToggleRow>`

Label + optional description + trailing `<Switch>`.

| Prop          | Type      | Default |
|---------------|-----------|---------|
| `label`       | `string`  | —       |
| `description` | `string`  | —       |
| `checked`     | `boolean` | —       |
| `disabled`    | `boolean` | `false` |

Emits: `update:checked`.

### `<SettingsFormSection>`

Form-first settings section: 2-column layout (title/description on the left, form fields + submit on the right).

| Prop            | Type                       | Default   |
|-----------------|----------------------------|-----------|
| `title`         | `string`                   | —         |
| `description`   | `string`                   | —         |
| `submitLabel`   | `string`                   | —         |
| `submitVariant` | `primary` · `danger`       | `primary` |

Slots:
- default — form fields (`<TextField>`, `<Select>`, `<AvatarField>`, etc.).

Emits: `submit`. The parent wires validation via VeeValidate + Zod — the schema lives with the screen (`./Screen.schema.ts`). When the default slot contains no fields, `submitLabel` is not rendered (e.g. a danger "Delete account" button placed as a child handles its own action).

---

## Form primitives

Presentational inputs. Props are uniform: `value` / `label` / `description?` / `error?` / `errorMessage?` / `disabled?` / `required?` / `autocomplete?`. Emits: `update:value`, `blur`. Validation is not performed by these components — schemas live with the owning form (screen), wired via VeeValidate.

### `<TextField>`

| Prop       | Type                                                | Default |
|------------|-----------------------------------------------------|---------|
| `type`     | `text` · `email` · `password` · `url` · `tel`       | `text`  |
| `label`    | `string`                                            | —       |
| `value`    | `string`                                            | —       |

Slots:
- `prefix` — inline leading content (e.g. `<Text tone="muted">planetaria.io/</Text>`).
- `suffix` — inline trailing content.

### `<Textarea>`

| Prop     | Type      | Default |
|----------|-----------|---------|
| `label`  | `string`  | —       |
| `value`  | `string`  | —       |
| `rows`   | `number`  | `3`     |

### `<Select>`

| Prop      | Type              | Default |
|-----------|-------------------|---------|
| `label`   | `string`          | —       |
| `value`   | `string`          | —       |
| `options` | `SelectOption[]`  | —       |

`SelectOption = { value: string; label: string }`. Options-as-prop (not slot-of-`<option>`) for LLM determinism.

### `<AvatarField>`

Avatar + "Change" button + hint text. Used in profile/personal-info forms.

| Prop          | Type     | Default |
|---------------|----------|---------|
| `src`         | `string` | —       |
| `alt`         | `string` | —       |
| `hint`        | `string` | —       |
| `actionLabel` | `string` | —       |

Emits: `change` (file).

### `<Switch>`

Toggle primitive.

| Prop       | Type               | Default |
|------------|--------------------|---------|
| `label`    | `string`           | —       |
| `checked`  | `boolean`          | —       |
| `size`     | `sm` · `md`        | `md`    |
| `disabled` | `boolean`          | `false` |

Emits: `update:checked`. Motion: thumb translates with `Duration.fast` / `Easing.standard`; `prefers-reduced-motion` collapses the transition to 0.

### `<Fieldset>`, `<Label>`, `<HelperText>`, `<ErrorMessage>`

Public but mostly internal — composed by the fields above.

- `<Fieldset>` — semantic group wrapper; slots `legend` + default. Use to group related fields (e.g. a radio group). Not required in the `<SettingsFormSection>` shape.
- `<Label>` — rendered inside form primitives; consumed via the `label` prop. Direct use is rare.
- `<HelperText>` — rendered from the `description` prop on form primitives.
- `<ErrorMessage>` — rendered from `errorMessage` on form primitives.

---

## Coverage

Every component imported by `examples/{cashflow,planetaria}/{Home,Index,Detail,Settings}.vue` is documented above. When a new screen introduces a new component or new prop/slot on an existing one, this doc updates in the same PR.
