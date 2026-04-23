---
name: Current phase (2026-04-23 session close) — DS v1 implemented; archetype system formalized; YAML layer removed
description: 50 components in src/, all 8 reference screens compile; archetype×dialect system canonical in docs/archetypes.md with per-app briefings; YAML spec layer and grammar deleted; examples are English+USD; next choice remains visual pass
type: project
originSessionId: 9eefaf1b-b886-4dfa-a37d-88630de31156
---
**DS v1 implemented as of 2026-04-23 (second session that day).**

50 components landed under `src/components/*`. Shipped in four slices: foundation → shells+nav+actions → data display → detail+settings+forms+motion. All 8 reference screens in `examples/{cashflow,planetaria}/{Home,Index,Detail,Settings}.vue` import from `'wise-ui'` and pass `pnpm typecheck`. Dev harness in `dev/App.vue` routes between the 8 screens.

**Archetype system formalized (2026-04-23, third session).** `docs/archetypes.md` is now canonical for the 4×2 matrix; `examples/<app>/briefing.md` explains per-app dialect choices. See `project_archetype_system.md`.

**YAML layer removed + English+USD reaffirmed (2026-04-23, fourth session).** Deleted all `examples/*/*.yaml`, `docs/yaml-grammar.md`, and the YAML-as-spec memory. `.vue` files are the only spec. `docs/targets.md` rewritten to reflect that multi-target is deferred. CLAUDE.md conventions simplified to English + USD. See `feedback_pixel_match_reference.md`.

**Why:** See `feedback_ds_emerges_from_product.md` — four archetypes × two apps produced a stable vocabulary; implementation was deferred until the catalog stopped drifting. Also see README "Repo state" section (now authoritative; this memory is just a pointer).

**What has NOT happened yet:**

- No visual pass. Nothing has been rendered in a browser this session (ferrum MCP couldn't reach the dev server from its container; we stopped chasing). The oklch tone palette in `src/styles.css` is placeholder.
- Some `.vue` reference screens (notably Cashflow Detail/Home/Settings) are still the raw reverse-engineered Tailwind Plus output — Tailwind classes at the consumer, not DS primitives. Migration is the #2 item in README's next-session list.
- No Storybook, no unit specs. Intentional per README "Deferred."

**How to apply** — next session, read the README first (it's the source of truth for repo state and next-session priorities). The memory will stay in sync only if someone remembers to update it; the README update is part of the session-close habit starting today. Ranked choices from the README:

1. **Visual pass in browser** — boot `pnpm dev`, walk the 8 screens, fix what's broken / off-brand / motion-missing. Cheapest signal, likely surfaces DS gaps that reorder everything below.
2. **Migrate Cashflow `.vue` screens to DS primitives** — Detail/Home/Settings still use raw Tailwind at the consumer. Bring them into the closed vocabulary.
3. **5th archetype** — defers both above; only do it if a concrete product need shows up.

**Non-obvious stuff worth remembering:**

- `wise-ui` resolves via path alias (`tsconfig paths` + `vite resolve.alias`), not via workspace or npm publish. Migrate if a second consumer tree appears.
- Form stack is VeeValidate + Zod; `.schema.ts` colocated with screen (see `feedback_decide_after_proposal.md` and README "Session decisions").
- Example `.vue` files now import types (`NavItem`, `NavGroupItem`, `NavTabItem`, `Tone`) from `wise-ui` instead of redeclaring them inline. This is the pattern for any new example.
- `Text` has no `size="base"` — it's `"md"`. Foundations vocabulary is `xs · sm · md · lg · xl`.
