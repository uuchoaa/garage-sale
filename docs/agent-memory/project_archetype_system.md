---
name: 4 archetypes × 2 dialects (canonical in docs/archetypes.md)
description: wise-ui is organized around 4 screen archetypes (Home/Index/Detail/Settings) × 2 dialects (Planetaria sidebar, Cashflow stacked); new screens must fit this matrix or trigger explicit DS extension
type: project
originSessionId: e4fb4aef-b398-49ff-ad07-a6fed6af6153
---
wise-ui's product surface is the 4×2 matrix: Home, Index, Detail, Settings × Planetaria (sidebar dialect) / Cashflow (stacked dialect).

**Canonical reference:** `docs/archetypes.md`. Per-app intent documented at `examples/<app>/briefing.md`.

**Key pairings (fixed at v1):**
- Planetaria = `SidebarShell` + Detail-Overview subtype (metrics + flat activity table) + Settings-Sectioned-Form subtype (always-visible inputs, Save per section) + horizontal `NavTabs` sub-nav.
- Cashflow = `StackedShell` + Detail-Document subtype (SummaryCard rail + structured body + Timeline with comments + composer) + Settings-Field-List subtype (label/value/Update + progressive disclosure) + left `Page.sidenav` sub-nav.

**Rule of thumb — local nav is perpendicular to global nav.** Sidebar dialect uses horizontal tabs for Settings sub-nav; stacked dialect uses left rail. Avoids double-chrome.

**Why this matters:**
- LLM screen generation picks an archetype + dialect, fills data, done.
- Review has a ruler ("this doesn't look like our Overview").
- DS scope is bounded by the matrix — if no archetype needs a primitive, it doesn't exist in v1.

**How to apply:** Before writing a new screen, ask which cell of the matrix it occupies. If none, stop and discuss — either we misidentified the archetype, or we're extending the DS deliberately (separate PR, new entry in docs/archetypes.md).

Non-archetype concerns (empty/error/loading) are variants of list primitives (`ResourceTable`, `ResourceList`, `ActivityTable`, `FeedList`, `Timeline`) — not separate archetypes.
