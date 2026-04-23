---
name: Current phase (2026-04-23 session close) — DS v1 implemented, no visual pass
description: 50 components in src/, all 8 reference screens typecheck and compile; never rendered in a browser; next choice is visual pass vs YAML translator vs 5th archetype
type: project
originSessionId: 9eefaf1b-b886-4dfa-a37d-88630de31156
---
**DS v1 implemented as of 2026-04-23 (second session that day).**

50 components landed under `src/components/*`. Shipped in four slices: foundation → shells+nav+actions → data display → detail+settings+forms+motion. All 8 reference screens in `examples/{cashflow,planetaria}/{Home,Index,Detail,Settings}.vue` import from `'wise-ui'` and pass `pnpm typecheck`. Dev harness in `dev/App.vue` routes between the 8 screens.

**Why:** See `feedback_ds_emerges_from_product.md` — four archetypes × two apps produced a stable vocabulary; implementation was deferred until the catalog stopped drifting. Also see README "Repo state" section (now authoritative; this memory is just a pointer).

**What has NOT happened yet:**

- No visual pass. Nothing has been rendered in a browser this session (ferrum MCP couldn't reach the dev server from its container; we stopped chasing). The oklch tone palette in `src/styles.css` is placeholder.
- No YAML→Vue translator. Every `.vue` screen is still hand-written alongside its `.yaml` sibling.
- No Storybook, no unit specs. Intentional per README "Deferred."

**How to apply** — next session, read the README first (it's the source of truth for repo state and next-session priorities). The memory will stay in sync only if someone remembers to update it; the README update is part of the session-close habit starting today. Ranked choices from the README:

1. **Visual pass in browser** — boot `pnpm dev`, walk the 8 screens, fix what's broken / off-brand / motion-missing. Cheapest signal, likely surfaces DS gaps that reorder everything below.
2. **YAML→Vue translator** — deterministic emitter using `docs/yaml-grammar.md`. Depends on DS being roughly right.
3. **5th archetype** — defers both above; only do it if a concrete product need shows up.

**Non-obvious stuff worth remembering:**

- `wise-ui` resolves via path alias (`tsconfig paths` + `vite resolve.alias`), not via workspace or npm publish. Migrate if a second consumer tree appears.
- Form stack is VeeValidate + Zod; `.schema.ts` colocated with screen (see `feedback_decide_after_proposal.md` and README "Session decisions").
- Example `.vue` files now import types (`NavItem`, `NavGroupItem`, `NavTabItem`, `Tone`) from `wise-ui` instead of redeclaring them inline. This is the pattern for any new example.
- `Text` has no `size="base"` — it's `"md"`. Foundations vocabulary is `xs · sm · md · lg · xl`.
