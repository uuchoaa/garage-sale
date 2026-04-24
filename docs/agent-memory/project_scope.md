---
name: wise-ui scope and relationship to apps
description: wise-ui is the project (a Vue DS on Tailwind Plus Application UI); Cashflow and Planetaria are the reference apps the DS must support
type: project
originSessionId: b09699a7-167d-4bb0-b35f-7c419cf12540
---
**wise-ui** is the project itself: a Vue 3 design system built on top of the Tailwind Plus Application UI bundle. It is NOT a consumer application.

Consumers of wise-ui:
- **Cashflow** and **Planetaria** — the two reference apps from the Tailwind Plus dump (see `docs/assets/application-ui-v4/GLOSSARY.md`). wise-ui must cover the component surface both apps exercise (sidebar shell + stacked shell, their respective navs, detail screens, settings screens).

**Why:** Scoping decisions for wise-ui are driven by what Cashflow and Planetaria need.

**How to apply:**
- When evaluating whether a component/primitive belongs in wise-ui, ask: does Cashflow or Planetaria use it?
- wise-ui's component API stays neutral/English; consumer-specific locale/currency/timezone conventions belong in apps built *with* wise-ui, not in the DS itself.
