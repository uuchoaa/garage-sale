---
name: DS emerges from product
description: wise-ui components are extracted from real screens of Cashflow and Planetaria, not pre-built as a generic catalog. application-ui-v4/ is reference, not scaffold.
type: feedback
originSessionId: 0a17e24c-844d-4f6e-994b-ec9cf0c15f8d
---
wise-ui is extracted from real screens, not pre-built as a generic catalog. No upfront `<Button>` / `<Card>` / `<Input>` library. A component gets promoted only when the same pattern appears in ~2-3 real screens across the reference apps (**Cashflow** and **Planetaria** — see `docs/assets/application-ui-v4/GLOSSARY.md`).

The `application-ui-v4/` dump (both `html/` and `react/`) is a reference pattern library — browsed, grepped, and cherry-picked from. It is **not** a scaffold. Do not copy its structure wholesale into `src/`. Do not mirror its folder layout into the product.

Storybook, component catalogs, pattern libraries come **after** the DS exists — never before. A prior `chore: setup storybook` commit was wiped by `chore: fresh start` precisely because the catalog was ahead of the product.

**Why:** The user wants the DS to *emerge* from real consumer needs. Pre-built catalogs lock in the wrong abstractions before real product constraints surface. Cashflow (stacked shell, invoicing domain) and Planetaria (sidebar shell, deployments domain) are the two reference apps wise-ui must cover — their screens drive component shape.

**How to apply:**
- When starting a screen, copy the closest full snippet from `application-ui-v4/html/` for the matching app (Cashflow → stacked, Planetaria → sidebar).
- Adapt content inline. Duplication across the first 2-3 screens is fine and expected.
- Only extract a component when the third screen would duplicate the same markup. Name it neutrally (`<Button>`, `<StatCard>`) — wise-ui stays domain-agnostic so future consumers can use it too.
- Resist suggestions to "build the DS first" or "set up Storybook now". Redirect to: build the next screen, then revisit.
- `application-ui-v4/` stays read-only reference. Don't edit it, don't extract READMEs per subcategory (filenames + grep are enough).
