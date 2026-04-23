# File structure

Conventions for where things live in the repo. Enumerative — LLM-generated code follows these without improvisation.

---

## Default: colocation

Everything that belongs to a component or a screen lives next to it.

### DS components (`src/components/`)

One directory per component:

```
src/components/TextField/
  TextField.vue          # component
  TextField.stories.ts   # Storybook stories
  TextField.spec.ts      # unit tests
  index.ts               # re-exports
```

Never split a component's files across `src/stories/`, `src/tests/`, etc.

### Screens (`examples/<app>/`)

One file per screen at the app root, plus colocated siblings:

```
examples/cashflow/
  Home.vue
  Home.yaml
  Settings.vue
  Settings.yaml
  Settings.schema.ts     # Yup/Zod schema for the form
  Settings.spec.ts       # screen-level test (when present)
  Settings.mock.ts       # test fixtures specific to this screen
  .TODO                  # app-level tracking
```

---

## Schemas live with forms, not with components

DS components are **presentational**. They accept `value`, `error`, `errorMessage`, `disabled` as props; they emit `update:value` and `blur`. They do not validate.

Validation is the form's responsibility, so the schema lives with the screen that owns the form:

- `examples/cashflow/Settings.schema.ts` ✓
- `src/components/TextField/TextField.schema.ts` ✗ — TextField has no domain to validate.

**Exception:** a component whose contract includes validation by construction (e.g. `<EmailField>`, `<CurrencyField>`) can export a default schema. This is rare; most DS components stay schema-free.

---

## Shared things

Not everything colocates. Things shared across screens/tests live at the app level, not under a specific screen:

```
examples/cashflow/
  fixtures/              # shared mocks across screens
    clients.ts
    invoices.ts
  components/            # app-local components (composed of DS)
    InvoiceForm.vue
```

`fixtures/` and `components/` here are **app-scoped**, not DS-scoped. DS-scoped equivalents would live under `src/`.

---

## Schemas and the target-boundary

`.schema.ts` is **Vue-specific** — it lives in the script layer, which is target-specific. When/if we port to React, schemas carry over mostly as-is (TS + Zod/Yup work in React). When we port to Rails, the equivalent is Active Record / dry-validation in `app/models/`, not a `.schema.ts` file.

The YAML source of truth for a screen never mentions schemas — validation wiring happens in the hand-authored script layer. See `docs/targets.md` for the full layering.

---

## Naming

- Components: `PascalCase.vue` (e.g. `TextField.vue`).
- Screens: `PascalCase.vue` (e.g. `Home.vue`, `Settings.vue`).
- Siblings: same `PascalCase` base, different extension/suffix (e.g. `Settings.schema.ts`).
- Index files: `index.ts` (lowercase).
- Fixtures, mocks, and shared helpers: `camelCase.ts`.
- Directories: `PascalCase` for component dirs (`TextField/`), `camelCase` for utility dirs (`fixtures/`, `components/`).
