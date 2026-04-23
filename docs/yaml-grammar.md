# YAML grammar for wise-ui screens

Canonical, enumerative spec of the YAML dialect used to author screens. The translator consumes this grammar and emits a target-specific file (today: `.vue`). The grammar is target-neutral by construction — see `docs/targets.md`.

---

## Document shape

A screen is a YAML document with the following top-level keys.

| Key     | Required | Type                         | Purpose                                                      |
|---------|----------|------------------------------|--------------------------------------------------------------|
| `name`  | yes      | string                       | PascalCase identifier for the screen (file + stub script).    |
| `types` | no       | `{ TypeName: string }`       | TS-like type declarations used by the data contract.          |
| `data`  | no       | `{ varName: any }`           | Data the screen consumes; mock values inline during authoring. |
| `root`  | yes      | Node                         | The single root Node of the screen.                           |

Future top-level keys (reserved; not yet used): `imports`, `fixtures`, `meta`.

---

## Node shape

Every Node is a YAML mapping. Reserved keys drive structure; every non-reserved key is a prop (for components) or an attribute (for native tags).

| Key        | Type                                       | Purpose                                                             |
|------------|--------------------------------------------|---------------------------------------------------------------------|
| `type`     | string                                     | Component (PascalCase) or native HTML tag (lowercase).               |
| `slots`    | `{ slotName: SlotValue }`                  | Named slots.                                                         |
| `children` | `(Node \| string)[]`                       | Default-slot children; strings become text nodes.                    |
| `text`     | string                                     | Default-slot single-text content (supports interpolation).           |
| `repeat`   | `{ source, as, key }`                      | Iteration (v-for equivalent).                                        |
| `if`       | string (path or interpolation)             | Conditional rendering (v-if equivalent).                             |
| *other*    | any                                        | Prop/attribute on the component or native tag.                       |

Rules:
- `children` and `text` are mutually exclusive.
- `text` is syntactic sugar for `children: ["<that string>"]`.
- Reserved key names cannot be used as prop names by components. When a component would otherwise need a `type`/`slots`/`children`/`text`/`repeat`/`if` prop, rename the prop.

### Component vs native tag

- `type` starts with an **uppercase letter** → wise-ui component (`Logo`, `StackedShell`, `ResourceList`).
- `type` starts with a **lowercase letter** → native HTML tag (`time`, `code`, `img`, `ul`). Non-reserved keys pass through as attributes.

The translator never emits markup for a node whose type it does not recognize.

### Slots

`slots` is a mapping of slot name → slot value. Two forms:

**Unscoped slot** — value is an array of Nodes (or strings):
```yaml
slots:
  brand:
    - { type: Logo, src: /logo.svg, alt: Cashflow, size: lg }
```

**Scoped slot** — value is an object with `scope` (the destructured variable name) plus `children` or `text`:
```yaml
slots:
  amount:
    scope: entry
    children:
      - { type: Text, weight: medium, text: $entry.amount }
```

Slot names are stable across the DS. Canonical names include: `brand`, `nav`, `nav-extra`, `topbar`, `actions`, `rail`, `trigger`, `header`, `header-trailing`, `body`, `leading`, `title`, `meta`, `trailing`, `amount`, `action`. Adding a new slot name is a DS decision that goes in `docs/components.md`.

### Repeat

`repeat` models iteration. It has three required keys:

| Key      | Type                  | Purpose                                              |
|----------|-----------------------|------------------------------------------------------|
| `source` | binding (`$arr`)      | The array to iterate.                                |
| `as`     | identifier            | Loop variable name, usable in child bindings.        |
| `key`    | binding               | Unique key per iteration (required; no defaults).    |

Example:
```yaml
- type: Card
  repeat: { source: $clients, as: client, key: $client.id }
  children:
    - { type: Text, text: $client.name }
```

Repeat applies to the node it decorates (the `Card`), not the parent.

### Conditional

`if` takes a binding expression (path or interpolation that evaluates to truthy/falsy).

```yaml
- type: Text
  if: $entry.tax
  text: "${entry.tax} imposto"
```

The grammar does not permit `else` or `elif`. To choose between alternatives, use two separate nodes with complementary `if` expressions.

---

## Bindings

A binding references data (from `data`, a `repeat` loop variable, or a slot scope variable).

Three forms, in order of preference:

1. **Path reference** — whole prop value is a binding to a path:
   ```yaml
   to: $entry.href
   items: $stats
   ```
2. **Expression** — wrap an expression in `${…}`:
   ```yaml
   tone: ${statusTone[entry.status]}
   ```
3. **Interpolation** — `${…}` inside a string literal:
   ```yaml
   text: "Fatura #${entry.ref}"
   text: "${entry.tax} imposto"
   ```

### Allowed inside `${…}`

- Identifiers: `name`, `entry`, `item`.
- Property access: `a.b.c`.
- Index access with a literal string key or a path: `statusTone["paid"]`, `statusTone[entry.status]`.
- Nothing else. No arithmetic, no ternaries, no method calls, no arrow functions, no string concatenation.

If a component needs a derived value, it must either (a) accept a path-accessor (e.g. `itemHref: $item.href`) and resolve internally, or (b) accept a semantic prop and let the consumer pre-map in `data`/`locale`.

### Bindings inside `repeat`

A `repeat.as` name introduces a loop variable into the binding scope of that node and all descendants. Nested repeats stack (inner loop shadows outer on name collision — avoid collisions).

### Bindings inside scoped slots

A `scope` name introduces a destructured variable from the parent component's scoped slot. Use it like any other binding root.

---

## Pure-literal values

Any value that is not a binding is a YAML literal (string, number, boolean, list, map). No escape is needed.

```yaml
title: Cashflow              # string
size: lg                      # token literal
current: true                 # boolean
cols: { base: 1, lg: 3 }      # map
items: [a, b, c]              # list
```

---

## Data section

`data` declares the variables the screen consumes. During authoring, inline mock values live here. In production, a separate fixtures/store file supplies them and `data` shrinks to a contract (name → type).

```yaml
types:
  NavItem: "{ label: string; to: string; current?: boolean }"

data:
  nav:
    - { label: Home,    to: /,        current: true }
    - { label: Faturas, to: /invoices }
```

The stub `<script>` emitted by the translator re-declares every `data` key as a `ref`/`const` of the corresponding type. Replacing the stub is how a screen goes to production.

---

## Reserved names

Never use these as data variable names, scope names, or repeat aliases:
- `type`, `slots`, `children`, `text`, `repeat`, `if`
- `name`, `types`, `data`, `root`

These would conflict with grammar keys or top-level document keys.

---

## Examples

See `examples/cashflow/Home.yaml` and `examples/planetaria/Home.yaml`. Those two files together are the conformance suite for v1 of this grammar — any grammar change must keep both of them valid.

---

## What the grammar intentionally does not express

- Animations / motion — lives in wise-ui components (see `docs/foundations.md#motion-contracts-per-component`).
- Interactivity (validation, state machines, event handlers) — lives in the target-specific `<script>` layer.
- Styling primitives beyond DS tokens — no CSS, no Tailwind, no inline styles.
- Target-specific prop names — the grammar stays semantic.
