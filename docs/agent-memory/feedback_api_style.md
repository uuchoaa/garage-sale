---
name: wise-ui prefers idiomatic Vue (slot-based) over compound components
description: For wise-ui's API, prefer named/scoped slots with `<template #name>` over compound child components (Card+CardHeader+CardBody); keep native tags (a, time, img, ul) native unless there's a clear DS reason to wrap
type: feedback
originSessionId: b09699a7-167d-4bb0-b35f-7c419cf12540
---
When designing wise-ui component APIs, favor idiomatic Vue patterns over heavily opinionated React-style APIs.

**Preferred:**
- Named and scoped slots via `<template #name>` / `<template #name="{ data }">` for configurable regions (e.g. `<Card><template #header>...</template>...</Card>`).
- Native HTML tags where they're already well-behaved: `<a>`, `<time>`, `<img>`, `<ul>`, `<span>` — accessibility and browser behavior come for free.
- Layout/tokens exposed through dedicated primitives (`<Stack>`, `<Cluster>`, `<Grid>`) where spacing/consistency actually matters.

**Avoided:**
- Compound-component chains like `<Card><CardHeader><CardBody>` as a default style — reads more "React-y" and doesn't map as cleanly to Vue's slot idioms.
- Wrappers for every native tag (`<Link>`, `<Time>`, `<Logo>`) when the native element already covers the need.
- Shell components that orchestrate named children via provide/inject just to avoid `<template #>`.

**Why:** The user evaluated a fully opinionated alternative (`<Page><Grid><Card><CardHeader>` everywhere, no `<template>` slots, no native tags) against a slot-based version of the same Cashflow home page and judged the slot-based version "more Vue-ish." The opinionated version also carried maintenance cost (29 vs 13 components) without a proportional governance win at the current scale (two reference apps).

**How to apply:**
- When modeling a new component API, reach for slots first; only split into compound children when the compound reads meaningfully better (rare).
- Don't wrap `<a>`, `<time>`, `<img>` unless the DS adds something real (e.g. router integration that justifies a wrapper).
- `<Stack>`/`<Cluster>`/`<Grid>` are still fair game — layout primitives are a different case from element wrapping.
