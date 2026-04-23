# Planetaria — briefing

Planetaria is the sample app we use to exercise the **sidebar dialect** of wise-ui. Think of it as a developer tools product (deploys, projects, domains) — lots of operational telemetry, dense lists, users who live in it all day.

See `docs/archetypes.md` for the archetype system overall. This file is about *why Planetaria looks the way it does* — the choices that define the dialect.

## Domain

Planetaria ships a web app for managing deploy targets. The screens cover:

- **Home** — `Deployments` feed: what's running now, what shipped recently
- **Index** — `Projects`: filterable table of all projects
- **Detail** — a single project's overview (metrics, recent deploys)
- **Settings** — `Account`: profile, password, sessions, delete

It's fictional but modeled after the kind of app where the user stays logged-in all day and scans for problems.

## Dialect choices

### Persistent left sidebar

The user is an operator. They pivot between sections (Projects / Deployments / Activity / Domains / Usage / Settings) many times per session. A persistent left sidebar with icons + labels is the lowest-cost way to support that — it's always in peripheral vision, and position memory is the dominant affordance.

Teams live in a secondary `NavGroup` in the sidebar (`nav-extra` slot) because team context scopes what the user is looking at; promoting it to a separate nav would hide it.

A `SearchField` lives in the `topbar` slot. Search is global (jump to a project by name) and orthogonal to the sidebar nav.

### Dense content, rails for secondary concerns

On **Home**, the `Page` uses a left rail for the activity feed and reserves the main column for the deploy list. The rail pattern lets secondary, "what's happening" content live alongside the scan target without competing for primary attention.

### Detail = **Overview** subtype

A project is fundamentally operational — the question "how is this resource doing?" dominates. So the detail page reads:

1. **`PageHeading` with `NavTabs`** — local scope tabs (Overview / Activity / Settings / Collaborators / Notifications). Horizontal because the shell's left sidebar is already the vertical axis.
2. **`DetailHeading`** with a `StatusDot` (leading slot), team/name composed title, description ("Deploys do GitHub via branch main"), and environment badge (actions slot). The eyebrow is implicit (team name acts as it).
3. **`StatGrid`** — 4 operational metrics (deploys, avg time, servers, success rate). No deltas because the story here is "absolute state", not "change".
4. **`ResourceTable`** with flat columns (User / Commit / Status / Duration / Deployed at). Flat, not grouped by day — the user is scanning for recent failures, not reviewing a day's work.

No comments, no document body, no summary rail. That's the Document subtype, not this one.

### Settings = **Sectioned-form** subtype

Account settings are filled in holistically, not field by field. You open Settings to change one thing, probably, but you want to see what's set around it. So:

- Horizontal `NavTabs` for sub-nav (Conta / Notificações / Faturamento / Equipes / Integrações). Not a left rail because the shell already has one.
- `SettingsFormSection` with always-visible inputs. Each section commits as a whole via its own `Save`.
- Password section and "Encerrar outras sessões" are both short form sections; delete account at the end is a single-button danger section.

Form state lives in a side-car `.schema.ts` (VeeValidate + Zod). The YAML only describes shape and initial data; wiring is target-specific.

## Composition conventions

- **Copy** is pt-BR, even though some technical labels stay in English by preference (`main`, `deploy` — treated as loanwords). `Projetos`, `Configurações`, `Colaboradores` are translated.
- **Time** is mostly relative (`há 45 minutos`, `há 2 dias`) with an ISO `datetime` attribute for the `<time>` element. Absolute dates only when more than a week out.
- **Status tones** come from the closed vocabulary: `online → positive`, `offline → neutral`, `error → negative`.
- **Icons** from `@heroicons/vue/24/outline` (Folder, Server, Signal, GlobeAlt, ChartBarSquare, Cog6Tooth). Kept minimal in the nav — one per item, no decoration.

## What Planetaria does NOT use

This is how we stay honest about the archetype system.

- No `SummaryCard` (that's a Document-subtype affordance; Planetaria has no document-shaped resources).
- No `Timeline` with comments (same reason — deploys aren't collaborative in the way invoices are).
- No `ActivityTable` grouped by day (Home uses `ResourceList` + `FeedList` instead).
- No `SettingsFieldRow` / `SettingsItemRow` (those belong to the Field-list subtype, Cashflow's dialect).

If a future Planetaria screen wants one of these, stop and reconsider — either the new screen is actually a different subtype, or we're about to muddy the dialect.
