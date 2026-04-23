# Foundations

Closed vocabulary for wise-ui. Consumer code — hand-written or LLM-generated — MUST use values from these sets. Any Tailwind class in a consumer file is a DS gap, not a shortcut.

---

## Tokens

Token types are exported from `wise-ui` as TypeScript unions. Props that take a token accept one of these literals exactly.

### `Tone`

| Value       | Use                                     |
|-------------|-----------------------------------------|
| `positive`  | success, paid, healthy, online          |
| `negative`  | error, overdue, failed, at risk         |
| `warning`   | caution, pending, at threshold          |
| `neutral`   | generic, info, no state                 |
| `accent`    | brand-forward, highlighted, "current"   |

### `Size`

`xs` · `sm` · `md` · `lg` · `xl`

Default per primitive is noted in its spec.

### `Weight`

`regular` · `medium` · `semibold` · `bold`

### `Gap`

`none` · `xs` · `sm` · `md` · `lg` · `xl`

### `Duration`

| Token    | ms (baseline) | ms (reduced-motion) |
|----------|---------------|---------------------|
| `fast`   | 120           | 0                   |
| `normal` | 200           | 0                   |
| `slow`   | 320           | 0                   |

### `Easing`

| Token      | Intent                                |
|------------|---------------------------------------|
| `standard` | default for most transitions          |
| `enter`    | element appearing (decelerate)        |
| `exit`     | element leaving (accelerate)          |
| `spring`   | playful, physical feel (rare)         |

### `Distance`

`sm` · `md` · `lg` — used by distance-based motion primitives (`SlideIn`).

### `Breakpoint` (for responsive props)

`base` · `sm` · `md` · `lg` · `xl`

Responsive props take an object: `:cols="{ base: 1, md: 2, lg: 3 }"`.

---

## Layout primitives

Every primitive accepts an optional `tag` prop (default listed). Layout primitives express structure through `gap`, `align`, `justify` — never through Tailwind.

### `<Stack>`

Vertical flex. Default `tag="div"`.

| Prop      | Values                                          | Default   |
|-----------|-------------------------------------------------|-----------|
| `gap`     | `Gap`                                           | `md`      |
| `align`   | `start` · `center` · `end` · `stretch`          | `stretch` |
| `tag`     | HTML tag or component                           | `div`     |

### `<Cluster>`

Horizontal flex with wrap. Default `tag="div"`.

| Prop       | Values                                                    | Default  |
|------------|-----------------------------------------------------------|----------|
| `gap`      | `Gap`                                                     | `md`     |
| `align`    | `start` · `center` · `end` · `baseline`                   | `center` |
| `justify`  | `start` · `center` · `end` · `between` · `around`         | `start`  |
| `wrap`     | `boolean`                                                 | `true`   |
| `tag`      | HTML tag or component                                     | `div`    |

### `<Grid>`

CSS grid. Default `tag="div"`.

| Prop   | Values                                       | Default |
|--------|----------------------------------------------|---------|
| `cols` | `number` \| `Partial<Record<Breakpoint,number>>` | `1`     |
| `gap`  | `Gap`                                        | `md`    |
| `tag`  | HTML tag or component                        | `div`   |

Examples:
- `<Grid :cols="3" gap="lg">` — 3 cols, gap lg.
- `<Grid :cols="{ base: 1, lg: 3 }" gap="lg" tag="ul" role="list">`

---

## Media primitives

### `<Icon>`

Wraps a heroicon (or any component) with a token-sized box.

| Prop   | Values               | Default |
|--------|----------------------|---------|
| `src`  | icon component       | —       |
| `size` | `Size`               | `md`    |

### `<Logo>`

Square product/brand logo with small radius. Used for company/team/client marks.

| Prop   | Values | Default |
|--------|--------|---------|
| `src`  | url    | —       |
| `alt`  | string | —       |
| `size` | `Size` | `md`    |

### `<Avatar>`

Circular person avatar with optional fallback.

| Prop       | Values | Default |
|------------|--------|---------|
| `src`      | url    | —       |
| `alt`      | string | —       |
| `size`     | `Size` | `md`    |
| `fallback` | string | —       |

### `<VisuallyHidden>`

Replaces `class="sr-only"`. Renders children only to assistive tech.

### `<Link>`

Navigation link with DS-tokenized tone. Wraps a native `<a>`.

| Prop       | Values                | Default  |
|------------|-----------------------|----------|
| `to`       | url                   | —        |
| `tone`     | `Tone` · `muted`      | `accent` |
| `external` | `boolean`             | `false`  |

### `<Text>`

Text with token-driven styling.

| Prop     | Values                                | Default   |
|----------|---------------------------------------|-----------|
| `size`   | `Size`                                | inherit   |
| `weight` | `Weight`                              | `regular` |
| `tone`   | `Tone` · `muted`                      | inherit   |
| `tag`    | `span` · `p` · `h1`..`h6` · `code`    | `span`    |

---

## Motion primitives

All motion primitives read from the token layer and respect `prefers-reduced-motion` automatically.

### `<FadeIn>`

| Prop       | Values       | Default   |
|------------|--------------|-----------|
| `duration` | `Duration`   | `normal`  |
| `easing`   | `Easing`     | `enter`   |
| `delay`    | `Duration`   | —         |
| `appear`   | `boolean`    | `true`    |

### `<SlideIn>`

| Prop       | Values                                 | Default  |
|------------|----------------------------------------|----------|
| `from`     | `up` · `down` · `left` · `right`       | `up`     |
| `distance` | `Distance`                             | `md`     |
| `duration` | `Duration`                             | `normal` |
| `easing`   | `Easing`                               | `enter`  |

Under `prefers-reduced-motion: reduce`, SlideIn degrades to FadeIn.

### `<Collapse>`

| Prop       | Values       | Default  |
|------------|--------------|----------|
| `open`     | `boolean`    | —        |
| `duration` | `Duration`   | `fast`   |

### `<Stagger>`

Applies a per-child delay to direct children that are motion primitives.

| Prop           | Values       | Default |
|----------------|--------------|---------|
| `childrenDelay`| `Duration`   | `fast`  |

---

## Motion contracts per component

Every stateful component declares its motion here. Contracts update with the component.

| Component         | Trigger            | Motion                                                     | Tokens                       |
|-------------------|--------------------|------------------------------------------------------------|------------------------------|
| `Menu`            | open / close       | fade + scale (95%→100%)                                    | `duration.fast`, `ease.enter`|
| `Dialog` (modal)  | open / close       | backdrop fade; panel fade + scale                          | `duration.normal`, `ease.enter` / `ease.exit` |
| `Dialog` (sheet)  | open / close       | backdrop fade; panel slide from edge                       | `duration.normal`, `distance.lg` |
| `NavTabs`         | tab switch         | active indicator slides under new tab                      | `duration.fast`, `ease.standard` |
| `ResourceList`    | item add / remove  | FLIP via `<TransitionGroup>`; fade + slide                 | `duration.normal`, `distance.sm`, `ease.standard` |
| `FeedList`        | item add           | fade in from bottom                                        | `duration.normal`, `distance.sm`, `ease.enter` |
| `StatusDot[error]`| always             | pulse loop (opacity)                                       | `duration.slow`, `ease.standard` |
| `StatusDot[online]`| state change      | single pulse on appear                                      | `duration.normal`, `ease.standard` |
| `Collapse`        | open / close       | height + opacity                                           | `duration.fast`              |

---

## Rules

1. **No Tailwind classes in consumer code.** If you need spacing, use a layout primitive. If you need sizing, use a media primitive. If you need a utility, file a DS gap.
2. **No magic ms values.** All durations/easings are tokens.
3. **One canonical way.** If two APIs could express the same thing, only one ships.
4. **Tokens in types.** Every token family has an exported TypeScript union; consumers reference the type, never string literals in isolation.
