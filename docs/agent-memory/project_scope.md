---
name: wise-ui scope and relationship to apps
description: wise-ui is the project (a Vue DS on Tailwind Plus Application UI); Garage Sale is a future consumer; Cashflow and Planetaria are the reference apps the DS must support
type: project
originSessionId: b09699a7-167d-4bb0-b35f-7c419cf12540
---
**wise-ui** is the project itself: a Vue 3 design system built on top of the Tailwind Plus Application UI bundle. It is NOT a consumer application.

Consumers of wise-ui:
- **Cashflow** and **Planetaria** — the two reference apps from the Tailwind Plus dump (see `docs/assets/application-ui-v4/GLOSSARY.md`). wise-ui must cover the component surface both apps exercise (sidebar shell + stacked shell, their respective navs, detail screens, settings screens).
- **Garage Sale** — a future personal app (moving-sale tool, ~15 items, pt-BR, single-user) that will be built later *using* wise-ui. Not in this repo's scope right now.

**Why:** Scoping decisions for wise-ui should be driven by what Cashflow and Planetaria need, not by Garage Sale specifics. Garage Sale features (pt-BR UI copy, BRL, São Paulo timezone, moving-sale domain) are consumer concerns, not DS concerns.

**How to apply:**
- When evaluating whether a component/primitive belongs in wise-ui, ask: does Cashflow or Planetaria use it?
- Don't bake Garage Sale domain concepts (buyers, pickups, channels, campaigns) into wise-ui.
- The CLAUDE.md conventions about pt-BR copy, BRL, `America/São_Paulo` apply to apps built *with* wise-ui, not to wise-ui's own component API (which stays neutral/English).
