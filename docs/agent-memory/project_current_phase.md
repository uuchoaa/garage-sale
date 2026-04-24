---
name: Current phase — Phase 1 done; Phase 2 (Cashflow as real consumer) is next
description: Roadmap formalized in README (4 phases). Phase 1 Foundation closed 2026-04-23; Phase 2 = lift Cashflow from reference screen into a working app with state/forms/persistence; Phase 3 = Extensibility (dark mode lives here as a theming special case); Phase 4 = docs site + polish
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

**Roadmap formalized 2026-04-24.** README `## Roadmap` is authoritative — 4 phases: (1) Foundation · done, (2) Real consumer · next, (3) Extensibility, (4) Make it shine. Read the README first every session; this memory is just a pointer.

**Phase 2 shape:** turn Cashflow from reference screen into a working app — state, forms, fake persistence, routing. Planetaria stays as reference (one real consumer is enough signal). Visual pass is opportunistic inside Phase 2, not a separate stage.

**Explicitly out of Phase 2:** dark mode (theming special case → Phase 3), second real consumer, publishing.

**Non-obvious stuff worth remembering:**

- `wise-ui` resolves via path alias (`tsconfig paths` + `vite resolve.alias`), not via workspace or npm publish. Migrate if a second consumer tree appears.
- Form stack is VeeValidate + Zod; `.schema.ts` colocated with screen (see `feedback_decide_after_proposal.md` and README "Session decisions").
- Example `.vue` files now import types (`NavItem`, `NavGroupItem`, `NavTabItem`, `Tone`) from `wise-ui` instead of redeclaring them inline. This is the pattern for any new example.
- `Text` has no `size="base"` — it's `"md"`. Foundations vocabulary is `xs · sm · md · lg · xl`.
