---
name: File structure conventions (colocation; schemas with forms)
description: Colocation is the default for DS components and screens; form schemas live with the screen, not the component; full spec in docs/file-structure.md
type: project
originSessionId: b09699a7-167d-4bb0-b35f-7c419cf12540
---
File structure conventions for this repo are pinned in `docs/file-structure.md`. Read that doc when placing new files.

**Load-bearing rules:**
- Colocation is the default. DS components live under `src/components/<Name>/` with their stories/specs/index next to the `.vue`. Screens live at `examples/<app>/<Name>.vue` with their YAML, schema, spec, and mock next to them.
- Form schemas (Yup/Zod) live with the **screen** that owns the form, not with the DS component. DS components are presentational.
- Shared fixtures/components across screens go to `examples/<app>/fixtures/` and `examples/<app>/components/` (app-scoped), not to `src/`.
- `.schema.ts` is Vue-specific (script layer); it does not survive a Rails port unchanged.

**How to apply:**
- Before creating a file, check `docs/file-structure.md` for the pattern.
- If the doc doesn't cover a case, extend it in the same PR that introduces the pattern.
