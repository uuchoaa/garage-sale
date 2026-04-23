# Archetypes

wise-ui is organized around a small, closed set of **screen archetypes** — recurring page shapes that cover the overwhelming majority of application UIs. Every screen in every consumer app should fall into one of these archetypes; if it doesn't, we scrutinize before inventing.

This document is the canonical reference. The per-app `briefing.md` files in `examples/<app>/` explain why each app instantiates an archetype the way it does.

---

## Why archetypes

- **LLM-generated screens need a closed vocabulary.** Archetypes give the model a shape to pick from and fill in, instead of inventing layout from scratch.
- **Design coherence across apps.** Two Cashflow invoices and two Planetaria deploys should feel like the same product family even though they solve different problems.
- **Review has a ruler.** "This detail screen doesn't look like either of our Detail archetypes" is a specific, actionable note.
- **The DS is sized by archetypes, not by screens.** If an archetype doesn't need a primitive, the primitive doesn't exist in v1.

## The 4 archetypes

| Archetype   | Purpose                                                  | Core reading order                                 |
|-------------|----------------------------------------------------------|----------------------------------------------------|
| **Home**    | Dashboard / landing. Scanable overview of many resources | Heading → stats/feed → lists                        |
| **Index**   | List view of a single collection with filters            | Heading + tabs → table/list → pagination           |
| **Detail**  | Deep view of one resource (editable or operational)      | Resource header → summary → body → activity        |
| **Settings** | Configuration pages grouped into sections                | Local nav → stacked sections (form or field list)  |

### Home

A dashboard. Lands the user with an at-a-glance read on the state of many things at once — not optimized for editing any single one.

- `PageHeading` with actions (usually a primary CTA like "New X")
- Either a `StatGrid` (KPIs with delta) **or** a lateral rail with a `FeedList` of recent activity — the two dialects split here
- One or more `PageSection`s with condensed summaries of key collections: grouped activity, recent clients, latest deploys

**Dialects**
- *Planetaria (sidebar):* `Page` with a left rail carrying the `FeedList` + main column with `ResourceList` of deployments
- *Cashflow (stacked):* full-width `StatGrid` on top, then `ActivityTable` grouped by day, then a `Grid` of client cards

### Index

List view of a single resource type. Optimized for scanning, filtering, and navigating into detail.

- `PageHeading` with filter `NavTabs` in the `nav` slot and a primary action (`New X`) in the `actions` slot
- Optional `Cluster` for search + secondary actions (`Export`, etc.)
- `ResourceTable` with columns + scoped slots per column
- `Pagination`

Both dialects share this shape; only the shell wrapping it differs.

### Detail

Deep view of a single resource. Two subtypes distinguishable by *what the user does here*:

- **Overview** (operational — "how is this resource doing?"): metrics + recent activity. Example: Planetaria project.
- **Document** (transactional — "what does this record say, and can I act on it?"): structured body + collaboration affordances. Example: Cashflow invoice.

Both subtypes share:
- `DetailHeading` with `eyebrow` / `title` / `description` + `leading` + `actions` slots. Distinct from `PageHeading` because the eyebrow/breadcrumb is part of the resource identity.

**Overview** adds:
- `PageHeading` with `NavTabs` for detail-local tabs (Overview / Activity / Settings / …)
- `StatGrid`
- `ResourceTable` with flat columns (no groups) showing recent events

**Document** adds:
- 2-column layout: `SummaryCard` rail + structured document body (e.g., `InvoiceDocument`)
- `Timeline` with heterogeneous events (`event` vs. `comment` slot scopes)
- Comment composer (`form` with `Textarea` + action cluster)

### Settings

Configuration. Always a **local sub-nav** (tabs or rail, dialect-dependent) + a stack of titled sections. Two subtypes by editing gesture:

- **Sectioned-form** (Planetaria): inputs are always visible; each section commits as a whole via its own `Save` button. Good when the user expects to fill in things together (profile, password).
- **Field-list** (Cashflow): each row shows `label + value + Update` affordance; edit happens progressively (dialog/slide-over). Good when most visits are read-only and updates are rare/per-field.

Both subtypes share:
- `SettingsSection` wrapper (title + description + body + optional actions slot)
- Last section often carries a destructive/dangerous action (delete account, etc.)

## The 2 dialects

Dialects are not just about shells — they're a coherent system of choices that runs through every archetype.

| Dimension              | Planetaria (sidebar dialect)             | Cashflow (stacked dialect)              |
|------------------------|------------------------------------------|-----------------------------------------|
| Shell                  | `SidebarShell` (persistent left nav)     | `StackedShell` (top nav + tabs)          |
| Home emphasis          | Activity feed + deploy list              | Stat grid + grouped activity            |
| Detail subtype         | **Overview** (metrics + flat activity)   | **Document** (rail + body + timeline)   |
| Settings subtype       | **Sectioned-form** (always-visible)      | **Field-list** (progressive disclosure) |
| Settings sub-nav       | `NavTabs` horizontal (inside page)       | `Page` rail with `NavGroup`             |
| Density                | Dense lists, rail for secondary content  | Breathable sections, less chrome        |
| Tone of primary CTAs   | Utility ("New project")                  | Transactional ("Nova fatura")           |

### Why sub-nav differs by dialect

- **Planetaria has a persistent left sidebar** for the global nav. Adding a second left sidebar for a local Settings sub-nav creates a "double sidebar" that fights for attention. Horizontal `NavTabs` inside the page keeps hierarchy legible.
- **Cashflow has a top bar** for the global nav. Adding horizontal tabs for Settings would stack two horizontal navs. A local left rail (`Page.sidenav` slot) gives the Settings sub-nav its own spatial region without competing.

This rule generalizes: **local nav should be perpendicular to global nav**.

## Primitives matrix

Primitives used by each archetype. Absence of a primitive from an archetype is intentional.

| Primitive            | Home | Index | Detail (overview) | Detail (document) | Settings (form) | Settings (field-list) |
|----------------------|:----:|:-----:|:-----------------:|:-----------------:|:---------------:|:---------------------:|
| `PageHeading`        |  ✓   |   ✓   |         ✓         |                   |       ✓         |                       |
| `DetailHeading`      |      |       |         ✓         |         ✓         |                 |                       |
| `PageSection`        |  ✓   |       |                   |                   |                 |                       |
| `NavTabs`            |  ✓   |   ✓   |         ✓         |                   |       ✓         |                       |
| `StatGrid`           |  ✓   |       |         ✓         |                   |                 |                       |
| `ActivityTable`      |  ✓   |       |                   |                   |                 |                       |
| `ResourceList`       |  ✓   |       |                   |                   |                 |                       |
| `ResourceTable`      |      |   ✓   |         ✓         |                   |                 |                       |
| `FeedList`           |  ✓   |       |                   |                   |                 |                       |
| `Timeline`           |      |       |                   |         ✓         |                 |                       |
| `SummaryCard`        |      |       |                   |         ✓         |                 |                       |
| `InvoiceDocument`\*  |      |       |                   |         ✓         |                 |                       |
| `SettingsSection`    |      |       |                   |                   |       ✓         |           ✓           |
| `SettingsFormSection`|      |       |                   |                   |       ✓         |                       |
| `SettingsFieldRow`   |      |       |                   |                   |                 |           ✓           |
| `SettingsItemRow`    |      |       |                   |                   |                 |           ✓           |
| `SettingsToggleRow`  |      |       |                   |                   |       ✓         |           ✓           |
| `Pagination`         |      |   ✓   |                   |                   |                 |                       |
| `NavGroup`           |      |       |                   |                   |                 |           ✓           |
| Form inputs†         |      |       |                   |         ✓         |       ✓         |                       |

\* App-specific composite, lives under `examples/cashflow/components/`.
† `TextField`, `Textarea`, `Select`, `Switch`, `AvatarField`.

## Architectural decisions

### AD-1 — App × archetype pairing is fixed at v1

Every Detail subtype is bound to one dialect; mixing (e.g., a Cashflow Overview-style detail) is out of scope for v1. This keeps the DS testable: we only need to guarantee that each **archetype × dialect** cell in the matrix renders cleanly.

Revisit when a third app enters that doesn't fit either dialect cleanly.

### AD-2 — `DescriptionListItem` and `SettingsFieldRow` stay separate

They look similar but carry different intents:
- `DescriptionListItem` = term/value for read-only semantic description (`<dl><dt><dd>`). Static.
- `SettingsFieldRow` = "here is the current value; click Update to change it". Implies an editable affordance.

Unifying via a shared `action` slot would blur the semantic intent. We'd rather duplicate a little wrapper.

### AD-3 — Empty / error / loading are variants, not archetypes

Every list-shaped primitive (`ResourceTable`, `ResourceList`, `ActivityTable`, `FeedList`, `Timeline`) carries empty/error/loading slots. We don't define a separate "Empty Screen" archetype.

Rationale: the state is local to the data it replaces; surrounding chrome (heading, actions, filters) stays. A standalone empty screen loses context.

### AD-4 — Composite per-app components live under `examples/<app>/components/`

Examples: `InvoiceDocument.vue`. These compose DS primitives into something too specific to generalize (an invoice *is* a Cashflow concern). They never import `styles.css` directly; they stay within the closed vocabulary.

### AD-5 — Screens are hand-written `.vue` against the DS

No intermediate representation. `examples/<app>/<Screen>.vue` is the spec, the implementation, and what ships. The DS's closed vocabulary is enforced by what the screen imports — if it reaches for Tailwind classes or native markup for something a primitive covers, that's a bug in the screen or a gap in the DS.

Multi-target (React/Rails) is re-visited only when a real second consumer appears. See `docs/articles/event-sourced-frontend-i-didnt-build.md` for background.

## Checklist for a new screen

Before writing anything:

1. Which archetype does this fit? (Home / Index / Detail / Settings)
2. Which dialect? (Usually inherited from the app.)
3. Does it need any primitive not in the matrix? If yes, **stop** — either the screen doesn't fit an archetype (rare, discuss), or we're about to extend the DS (deliberate, separate PR).
4. Does it introduce new data tokens (`Tone`, `Status`, etc.)? Add them to `docs/foundations.md` first.
5. Write the `.vue` using only DS imports; sanity-check against the corresponding `briefing.md`.
