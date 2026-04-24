# Packing — briefing

Packing is an example app we use to exercise **mobile-first, dense-list** patterns in wise-ui, and to stress capabilities the other two references don't need: bulk photo capture, grouped resource lists, and checkbox-as-state.

See `docs/archetypes.md` for the archetype system. This file is *why Packing looks the way it does*.

## Domain

Personal moving-house inventory. One user, no accounts, ephemeral tool (lifespan = one move, a few weeks). The domain is narrow:

- **Item** — a thing being moved. Title, room, box assignment (e.g. `B2 — Electronics`, `Loose furniture`), fragility note, photo(s), packed state.
- **Box** — a named container. Holds items. Has a room label.
- **Room** — source location of the item (Living Room, Kitchen, Bedroom, etc.).
- **Session** — a single batch-capture sweep: the user walks a room, photographs N things, catalogs them, commits.

No money. No shipping. No buyers. The app is a checklist + inventory — closer to a rich todo than a marketplace.

## The core flow

Most item creation happens via a **photo-first bulk capture** flow, not one-by-one in a form drawer. The user walks a room with a phone, snaps everything in sight, then catalogs from the couch later.

Four screens. Three form the capture flow; the fourth is the living list.

### 1. Capture (session start)

Collect photos fast, zero typing.

- `PageHeading` with `Session — Living Room` (room picker, fixed for the session).
- Primary area: large upload tile — camera on mobile, file picker / drop zone on laptop. Accepts multi-select.
- `ThumbStrip` of photos added so far, each with remove + reorder.
- Counter: `14 photos`.
- Primary action: `Catalog (14)` → Quick Catalog.
- Secondary: `Save session, continue later`. Session survives reload; returns to Quick Catalog on re-open.

### 2. Quick Catalog (one photo at a time)

Minimum viable metadata per photo, keyboard-driven on laptop.

- Photo on top, roughly 60% of viewport.
- Step indicator: `3 / 14`.
- Compact form below:
  - `Title` (autofocus).
  - `Box` — chip select; the last-used box is pre-selected (common case: several items into the same box).
  - `Fragility` — chip toggle (`none` / `fragile` / `transport upright`).
  - `More than one item in this photo?` — expands into N inline sub-rows, each with its own title.
- Nav: `Back · 3 / 14 · Next`. Keyboard: `←` / `→` to navigate, `Enter` to confirm and advance, `Esc` to skip.
- `Skip` leaves the photo attached to an empty-title draft.
- `Apply box to next N photos` — inline action under the Box chip.

### 3. Session Review

Scan the lot before committing.

- Grid of items created this session — each card is thumb + title + badges (box, fragility).
- Inline rename on title; tap thumb opens the full edit drawer (shared with the main list).
- `Bulk actions` bar: apply box, apply fragility, move all to another room.
- Drafts without titles are visually marked and sort first.
- Primary: `Finish session (14 items)` — commits everything and returns to the Inventory screen.

### 4. Inventory (main list)

The living state of the move.

- Mobile-first layout; works on laptop, designed for phone-in-hand.
- `PageHeading` with title `Inventory` plus `Reset` and `Export` actions.
- Progress bar under the heading: `Progress — 14 / 42 (33%)`. Items with the packed checkbox ticked count toward the total.
- Filter row: `Search items…` + three selects (`All rooms`, `All boxes`, `All statuses`).
- **Grouped list**: one section per room; header shows count (`LIVING ROOM (13)`). Each row:
  - Checkbox (left) — toggles packed state; this is *not* a bulk-selection control.
  - Title + badges (box assignment, fragility note).
  - Icon actions on the right: edit (opens drawer), delete.
- Add-item entry: `Add` in the page header actions on laptop; a full-width button at the bottom on mobile. No FAB.

Drafts without titles sort to the top of their room group.

## Dialect choices

### Mobile-first, density preserved

Cashflow and Planetaria are laptop-first. Packing inverts that — the user is holding a phone walking from room to room. Layouts must collapse cleanly to ~360px. Filter selects become a horizontal scroller if they don't fit. Thumbs shrink but never disappear.

### Checkbox is state, not selection

The leading checkbox on each item row toggles *packed / unpacked*. It is not a selection primitive. Bulk operations are entered from Session Review (scoped to a capture batch) or from a dedicated edit mode (out of scope for this briefing). Mixing the two meanings on the same control would be fatal to a single-purpose tool.

### Grouped list with counts

The main list groups by room because room is the dominant mental axis during a move. The count in the group header (`LIVING ROOM (13)`) is functional, not decoration — it lets the user sanity-check "did I miss anything in the living room?" at a glance. Cashflow also groups (by day) but without counts; Packing generalizes the header.

### No FAB

Despite the mobile-first framing, we skip the Material-style floating action button. The DS is rooted in Tailwind Plus — FABs are foreign. `Add` is a header action on laptop and a full-width footer button on mobile. Same component, different placement via slots.

### Detail = edit drawer, not page

Items are lightweight; a full Detail page is overkill. The drawer pattern from Cashflow's Inventory is the right shape — reuse it.

## Composition conventions

- **Copy** is English throughout. Primitives remain locale-neutral.
- **Money**: none.
- **Time**: relative (`just now`, `2h ago`, `yesterday`); `Jan 31` fallback beyond a week.
- **Status tones**: `packed → positive`, `draft → neutral`, `fragile → caution`.
- **Icons** from `@heroicons/vue/24/outline`: pencil, trash, arrow-down-tray, plus, cube. Minimal.

## New DS primitives this example demands

What we're buying by bringing Packing into the reference set:

1. `PhotoPicker` — multi-file select; camera on mobile, drop zone on laptop.
2. `ThumbStrip` — horizontal scrollable thumbnail list with remove + reorder.
3. `StepIndicator` — `3 / 14` with prev/next affordances and keyboard bindings. May compose over `Progress` + label rather than becoming its own primitive.
4. `GroupedList` — section header with leading title + trailing counter slot, over a slotted row renderer. Generalizes Cashflow's grouped-by-day list.
5. Inline `bulk-apply` affordance on chip selects — "apply to next N" and "apply to selected". Probably pattern-level, not a new primitive.

None of these block modeling the screens as static mocks — this is the implementation punch list for later.

## Open decisions

Carry these forward; they shape wireframes before code.

1. **Session as a persistent entity?** Yes → it survives reload; captures-in-flight have a URL. No → pure in-memory buffer; reload drops work. *Proposed: yes.*
2. **Default: 1 photo = 1 item?** With an inline "this photo has multiple items" expansion. *Proposed: yes.*
3. **Room fixed for the whole session?** *Proposed: yes; switching room = new session.*
4. **Drafts without titles allowed?** *Proposed: yes; sort to top, visually marked, never auto-deleted.*
5. **Laptop camera: webcam access or file picker only?** *Proposed: file picker only.*

## What Packing does NOT use

- No `SidebarShell` — too few sections; ephemeral tool.
- No `StackedShell` top tabs — the app has one primary screen (Inventory) plus a capture flow. Tabs would over-structure it.
- No `SummaryCard`, no `Timeline`, no document-body composite — nothing here is document-shaped.
- No `StatGrid` — progress is one number, already in the heading.
- No `Settings` — single-user, ephemeral, no preferences worth persisting.

If a future Packing screen reaches for one of these, stop — the app may have outgrown its briefing, or the wrong archetype was reached for.
