# Garage-sale pilot — Ralph plan

Single source of truth for what remains to build the pilot. Ralph reads this file every iteration, picks the next unchecked task, implements it, flips the box, commits, exits. The Stop hook re-invokes until the completion promise at the bottom fires.

## Completion promise

When every `[ ]` in every phase below is `[x]` **and** `## Final verification` passes, append this literal line to the bottom of this file on a line of its own:

```
<promise>GARAGE_SALE_PILOT_COMPLETE</promise>
```

That sentinel ends the loop.

## How each iteration works

1. Read this file top to bottom. Read `docs/briefing.md` §-references as needed (it is the product spec). Read `CLAUDE.md` for conventions.
2. Pick the **first `[ ]`** task in document order. Do not skip ahead.
3. Implement only that task. Keep the diff narrow.
4. Run self-verification (see `## Self-verification`). If any check fails, fix before proceeding.
5. Flip `[ ]` → `[x]` **in this file**. Do not rewrite the task text, do not add new tasks, do not reorder.
6. Commit with message format: `plan(<phase-id>): <short task summary>` — e.g. `plan(P2.3): hoje pickup cards wired to orders store`. Stage only files relevant to the task.
7. Exit. Ralph's Stop hook re-invokes with the same prompt.

### Hard rules

- One task per iteration. No batching.
- Never edit this file except to (a) flip a checkbox, (b) append to `## Blockers` via the escape hatch, (c) append the completion promise at the very end.
- Never install a dependency that is not named in Phase 0 without first adding a line to `## Blockers` explaining why the non-goal list in §8 of the briefing no longer holds.
- Never add tests, mock servers, auth layers, CI, or mobile-first redesign work. They are explicit non-goals (`docs/briefing.md` §8).
- Never introduce a brand color, gradient, decorative emoji, pulsing badge, or confetti (`docs/briefing.md` §9).

## References

- Product spec: [`docs/briefing.md`](briefing.md) — screens, fixtures, behaviors, DoD.
- Conventions: [`../CLAUDE.md`](../CLAUDE.md) — stack, language, visual.
- Reference dump: [`../application-ui-v4/vue/`](../application-ui-v4/vue/) — copy/paste primary source. Cashflow stacked (`page-examples/*/02-stacked.vue`) is the base. See `application-ui-v4/GLOSSARY.md`.

## Working principle (reminder, do not violate)

- Copy the closest whole snippet from `application-ui-v4/vue/` before writing markup by hand. Adapt content inline.
- Duplication across the first 2–3 screens is fine. **Do not promote a component until a third screen would duplicate the same markup.** Name by domain (`PickupCard`, `ItemRow`), not by shape.
- `application-ui-v4/html/` primitives (`<el-dropdown>`, `<el-disclosure>` from `@tailwindplus/elements`) do **not** port. Use `@headlessui/vue` equivalents.
- No Storybook. No pattern library. No abstract `Button`/`Card`/`Modal` catalog.

## Self-verification (run after every task)

1. `pnpm typecheck` (alias for `vue-tsc --noEmit`) — zero errors.
2. `pnpm build` — succeeds.
3. If the task touched a visible surface: start `pnpm dev`, navigate to the affected route via the `ferrum` MCP, screenshot to `docs/screenshots/<phase-id>.png`, overwrite any previous screenshot for that phase-id. Confirm there are no console errors via `ferrum_console_messages`.
4. Forbidden-color sweep, limited to files changed in this iteration:
   ```
   rg -n 'text-(red|blue|green|indigo|yellow|purple|pink|orange|rose|sky|teal|emerald|lime|amber|violet|fuchsia|cyan)-' <changed-files>
   ```
   Hits are only allowed inside named status tokens (e.g. `em-risco` red tint per §5.7). Elsewhere → revert.
5. Currency and time sweep, limited to files changed in this iteration: any BRL literal must flow through `utils/money.ts`; any timestamp rendered to the user must flow through `utils/time.ts`. Inline `toLocaleString` → revert and route through the util.
6. Never flip `[ ]` → `[x]` when any self-verification step fails.

## Escape hatch

If a task fails self-verification **three iterations in a row** on the same checkbox:

1. Append to `## Blockers` a dated entry: task id, what was tried, what fails, smallest reproduction.
2. Change that task's marker from `[ ]` to `[!]` in place.
3. Continue with the next `[ ]` task in document order. Do not delete or rewrite the blocked task.

Do not flip `[!]` → `[x]` except as part of an explicit unblock commit that references the blocker entry.

---

## Phase 0 — Scaffold

Goal: a `pnpm dev` that boots an empty app with the chosen stack, zero runtime or type errors.

- [ ] **P0.1** — Initialize `package.json` with pnpm and exact deps: `vue@^3`, `vue-router@^4`, `typescript@^5`, `vite@^5`, `@vitejs/plugin-vue`, `vue-tsc`, `tailwindcss@^4`, `@tailwindcss/vite`, `@headlessui/vue@^1.7`, `@heroicons/vue@^2`. Scripts: `dev`, `build`, `preview`, `typecheck`.
- [ ] **P0.2** — `vite.config.ts` with `@vitejs/plugin-vue` and `@tailwindcss/vite`. `tsconfig.json` strict, `moduleResolution: "bundler"`, DOM lib, path alias `@/* → src/*`. `tsconfig.node.json` for Vite config.
- [ ] **P0.3** — Directory scaffold under `src/`: `main.ts`, `App.vue`, `router/index.ts`, `views/` (empty), `components/` (empty), `stores/` (empty), `types/` (empty), `fixtures/` (empty), `utils/` (empty), `styles/main.css`.
- [ ] **P0.4** — Tailwind v4 entry at `src/styles/main.css`: `@import "tailwindcss";` plus `@variant dark (&:where(.dark, .dark *));` to keep the manual `.dark` class strategy the reference dump uses. Apply `class="dark"` on the root `<html>` via a single `document.documentElement.classList.add('dark')` in `main.ts` for the pilot — no theme toggle.
- [ ] **P0.5** — `index.html` with `#app` mount and `lang="pt-BR"`. `main.ts` creates the app, installs the router, mounts `#app`. `App.vue` renders `<RouterView />` only.
- [ ] **P0.6** — Boot check: `pnpm dev` serves on localhost, root path responds with a dark zinc background and the text `GarageSale` centered. `pnpm typecheck` and `pnpm build` both exit 0.

## Phase 1 — Foundations

Goal: domain types, seeded stores, navigable shell with seven empty routes. No screen bodies yet.

- [ ] **P1.1** — `src/types/domain.ts`: types for `Item`, `Buyer`, `Channel`, `Conversation`, `Message`, `Order`, `Campaign` matching briefing §4 exactly. All statuses as discriminated string unions (e.g. `ItemStatus = 'draft' | 'available' | 'reserved' | 'sold' | 'paused'`). Export a `Condition`, `Priority`, `ChannelKind`, `ChannelStatus`, `ConversationStatus`, `OrderStatus`, `ReadyForFlag` etc. — one named type per enum in the briefing.
- [ ] **P1.2** — Seed fixtures in `src/fixtures/` split by entity (`items.ts`, `buyers.ts`, `channels.ts`, `conversations.ts`, `orders.ts`, `campaigns.ts`) matching briefing §7 counts: ~10 buyers with pt-BR names, ~15 items (2 drafts / 3 sold / 2 reserved / 8 available) including Cama Box Queen / Ar-condicionado Split LG 12k / Cômoda Tok&Stok / sofá / etc., 5 channels in the states of §5.3, ~12 conversations including the full Maria Silva ↔ Cama Box Queen thread with 7 messages, ~5 orders spanning today / tomorrow / Saturday plus 2–3 completed, 2–3 past campaigns. IDs stable (`item-01`, `buyer-01`). Typed against P1.1.
- [ ] **P1.3** — Reactive store singletons under `src/stores/` — one file per entity. Each exports a `reactive()` array initialized from the corresponding fixture module, plus mutation functions it owns (`items`: `markReserved`, `markSold`, `markAvailable`, `pause`; `orders`: `schedule`, `confirmPayment`, `markPickedUp`, `markNoShow`, `reschedule`, `release`; `conversations`: `appendMessage`, `setStatus`, `archive`; etc.). No Pinia. Mutations update linked entities (e.g. `markPickedUp(order)` sets items to `sold`, order to `picked up`, returns items on `markNoShow`).
- [ ] **P1.4** — `src/router/index.ts` with seven named routes, all rendering placeholder views:
  - `/` → `DashboardView`
  - `/inventario` → `InventoryView`
  - `/canais` → `ChannelsView`
  - `/conversas` → `ConversationsView`
  - `/pendencias` → `FollowUpsView`
  - `/divulgacao` → `PromotionsView`
  - `/vendas` → `SalesView`
  Each view is a minimal SFC rendering `<h1>` with the screen title for now.
- [ ] **P1.5** — `src/components/AppShell.vue` adapted from `application-ui-v4/vue/page-examples/home-screens/02-stacked.vue`:
  - Replace Cashflow logo area with a plain zinc wordmark `GarageSale` (no brand image).
  - Replace the 4-item nav with seven `RouterLink`s in pt-BR: `Painel · Inventário · Canais · Conversas · Pendências · Divulgação · Vendas`. Active link uses the reference dump's active styling.
  - Keep the mobile `Dialog` menu, keep the notification bell icon, drop the avatar dropdown (single-user tool, no account menu — replace with an inline text `Pinheiros, SP`).
  - Zinc palette only; remove any indigo/brand classes carried from the reference.
  - `App.vue` now wraps `<RouterView />` in `<AppShell>`.
- [ ] **P1.6** — Utilities in `src/utils/`:
  - `money.ts` — `formatBRL(amount: number): string` returning `R$ 1.234,56`; drops cents when whole (`R$ 1.200`).
  - `time.ts` — `relativeTime(iso: string, now?: Date): string` returning `agora`, `há Xmin`, `há Xh`, `ontem`, `há N dias`, falling back to `DD/MM` after 7 days. Timezone `America/São_Paulo`.
  - `buyerColor.ts` — `initials(name: string)` and `tintClass(buyerId: string)` returning one of ~8 stable zinc tint classes keyed by a simple hash of the id.
- [ ] **P1.7** — Navigation smoke test: `pnpm dev`, click each of the 7 nav links via `ferrum`, confirm each renders its placeholder `<h1>` with no console errors. Screenshot `docs/screenshots/P1.png` of the shell on `/`.

## Phase 2 — Dashboard (§5.1)

Goal: `"opening the dashboard tells me within 2 seconds what I should do next"`.

- [ ] **P2.1** — Paste the closest Cashflow home snippet from `application-ui-v4/vue/page-examples/home-screens/02-stacked.vue` into `views/DashboardView.vue` as the starting markup. Remove Cashflow copy. Reduce stats row to a single line (not four cards): `X dias até a mudança · Y/Z itens vendidos · R$ recebido / R$ combinado`, plus a thin progress bar underneath. Data from `stores/items` and `stores/orders`.
- [ ] **P2.2** — `Pra fazer agora` queue block: derived list, prioritized in this order — today's pickups not yet picked up → orders with status `combinado` older than 2 days without payment confirmation → unanswered conversations → items stalled (>5 days since last activity with `< 2` conversations). Each row: one-line description + single action button that routes to the owning screen (e.g. `Confirmar pagamento` → `/vendas`). Empty state: `Nada urgente agora` — no badge, no icon, no alarm color.
- [ ] **P2.3** — `Hoje` block: today's orders as cards (time, buyer initials+name, items joined with `·`, total in BRL, status badge, single primary action depending on status — `Marcar retirado` / `Confirmar pagamento` / `No-show` / `Remarcar`). Actions call the corresponding store mutations and immediately reflect state.
- [ ] **P2.4** — `Acompanhamento` collapsible (`@headlessui/vue` `Disclosure`), closed by default: 7-day sales sparkline (inline SVG, zinc stroke, no axes, no animation), list of items stalled >5 days (3 max, title + days idle), most productive channel line (derived: channel with most `sold` items among seeded data).
- [ ] **P2.5** — Verify: screen reads top-to-bottom in the three-question order from §5.1 (status → urgent → today). Empty `Pra fazer agora` renders as honest empty state. All money through `formatBRL`, all times through `relativeTime`. Screenshot `docs/screenshots/P2.png`.

## Phase 3 — Inventory (§5.2)

Goal: `"find, filter, and edit any item in under 10 seconds; drafts never get buried"`.

- [ ] **P3.1** — Paste the closest dense-table snippet from `application-ui-v4/vue/lists/tables/` into `views/InventoryView.vue`. Columns per §5.2: checkbox, thumbnail (zinc placeholder if no image), item (title + sub-line), price, priority, status, interest count, ready-for chips (WhatsApp check / OLX warning), last-updated relative, kebab.
- [ ] **P3.2** — Header band above the table: counter line `N itens · K vendidos · R reservados · A disponíveis · D rascunhos` derived from `stores/items`, plus two buttons `+ Adicionar itens` (stub — opens the same drawer in `new` mode) and `Ações em lote` (disabled when no rows selected).
- [ ] **P3.3** — Filter row: search-by-title (live, no submit), status multi-select, priority multi-select, sort dropdown (`recentes` / `caros primeiro` / `rascunhos primeiro` / `parados`). Filters apply as user types, no reload. Drafts sort to the top and are visually marked `rascunho · falta título e preço` when either field is empty.
- [ ] **P3.4** — Side drawer (`@headlessui/vue` `Dialog`, slide from right) with the full edit form: photos grid, title, price + `aceita propostas` toggle, condition, priority, sell-by date, status, description, collapsible `Completar pra OLX` (category, dimensions, delivery offered, location). Save writes to `stores/items` and closes the drawer; the row updates in place with no route change.
- [ ] **P3.5** — Verify: typing in search updates rows in < 100ms on the seeded dataset; open/edit/save loop updates the row without flicker; draft row stays pinned to the top. Screenshot `docs/screenshots/P3.png`.

## Phase 4 — Channels (§5.3)

Goal: `"I never post into a broken channel without noticing"`.

- [ ] **P4.1** — `views/ChannelsView.vue` — one card per channel, paste layout from the closest Cashflow card list in `application-ui-v4/vue/lists/`. States rendered from `stores/channels`: WhatsApp connected (posted items count, active conversations, last activity, contacts), OLX connected (quota bar `8/10 anúncios grátis`, note `R$ 12,90 cada` for paid slots, nested active-listings table with views/messages/posted date), Instagram `sessão expirada` strip + `Reconectar` button (no-op), Mercado Livre + Facebook dimmed cards with `Conectar` (no-op).
- [ ] **P4.2** — WhatsApp card sub-list `Grupos para divulgação`: group name, member count, days since last post, whether ever used. Purely read; no edit affordances.
- [ ] **P4.3** — Verify: expired Instagram renders the warning strip prominently but without a pulsing badge or alarm color beyond a muted amber border; dimmed cards have reduced opacity, not greyed-out to the point of illegibility; quota bar is thin, zinc, no animation. Screenshot `docs/screenshots/P4.png`.

## Phase 5 — Conversations (§5.4)

Goal: `"clear an inbox of 20 unanswered threads in 10 minutes without ever typing the same reply twice"`.

- [ ] **P5.1** — `views/ConversationsView.vue` three-column layout (paste from the closest chat/messaging snippet in `application-ui-v4/vue/` if present, else hand-layout following §5.4 dimensions: left 360px, right 320px, center fills). Right column hides below `lg` breakpoint.
- [ ] **P5.2** — Left column: filter tabs `Sem resposta · Ativas · Combinado pendente · Arquivadas` + search box. Thread list grouped by item: item heading (thumb + title + price + open-threads count) then one row per buyer conversation. Active thread highlighted.
- [ ] **P5.3** — Center column sticky header: item thumb 56px + title + price + reservation badge if applicable + waitlist note. Quick-action bar: `Marcar vendido` / `Liberar reserva` / `Propor preço` / `Agendar retirada` / `Ver item`. Scrollable message list below, sent-by styling for me vs buyer. Composer at the bottom with quick-reply chips that fill the textarea on click, textarea, send button. Sending appends locally (no backend), clears the composer, updates the left preview.
- [ ] **P5.4** — Right column: bigger item photo, price, description, status, link to inventory drawer (reuses P3.4 drawer via route query `?edit=<itemId>`), `também interessados` mini-waitlist (other buyers with open threads for the same item).
- [ ] **P5.5** — Inconsistency strip: for threads with an `inconsistencyNote` field in fixtures, render a single muted zinc line above the composer stating the contradiction. No icon, no color, no alarm.
- [ ] **P5.6** — Verify: switching threads swaps center + right with no flicker of the left column; `Marcar vendido` archives the thread and removes it from the left list; sent messages appear instantly. Screenshot `docs/screenshots/P5.png`.

## Phase 6 — Follow-ups (§5.5)

Goal: `"an item never sits stale for a week without me deciding to drop it, relist it, or donate it"`.

- [ ] **P6.1** — `views/FollowUpsView.vue` two-column layout. Paste closest grid/list snippet from `application-ui-v4/vue/lists/`.
- [ ] **P6.2** — Left column `Itens sem tração` (derived: `available` items posted >3 days ago with ≤1 conversation): each card = thumb + title + price + priority badge, muted line `Divulgado em N canais há X dias · Y conversas`, suggestion line (`Baixar 10%? Republicar no grupo da faculdade?`), primary `Republicar agora` + secondary `Baixar preço` + kebab with `Ver no inventário` / `Pausar item` / `Marcar como doação`. All actions are one-click, optimistic, and remove/replace the card inline with a small success toast.
- [ ] **P6.3** — Right column `Conversas paradas` (derived: threads with no response >24h): buyer avatar + name + channel badge + item thumb + title, last message as quote, status line (`Sem resposta dele há 28h` or `Sem resposta sua há 30h`), pre-filled nudge composer, primary `Enviar cutucada` + secondary `Abrir conversa` linking to the thread.
- [ ] **P6.4** — Header urgency filter: `Tudo · Só urgente · Apenas itens prioritários`. Muted footer: `3 dias sem conversa · 24h sem resposta — configurável`. Defaults only — the configurable bit is a placeholder.
- [ ] **P6.5** — Verify: acting on a card removes it or updates state in place; toast is zinc, no color, auto-dismiss 2s; urgency filter narrows both columns. Screenshot `docs/screenshots/P6.png`.

## Phase 7 — Promotions / Divulgação (§5.6)

Goal: `"publish 8 items × WhatsApp+3 groups+OLX in under 2 minutes, with zero retyping"`.

- [ ] **P7.1** — `views/PromotionsView.vue` two-column layout: right column selection (sticky), left column preview (scrollable). Paste the closest form + preview snippet from `application-ui-v4/vue/forms/` or `application-ui-v4/vue/page-examples/` as starting point.
- [ ] **P7.2** — Right column section 1 `Itens`: list of `available` items with checkboxes; priority toggle at top (`Todos · Alta · Média · Baixa`) filters the list; header `Itens selecionados (N)` updates live.
- [ ] **P7.3** — Right column section 2 `Canais`: channel checkboxes. WhatsApp expands to group checkboxes (family / college / school parents, with member counts). OLX checkbox shows inline quota warning computed live: `N itens × 1 anúncio = N/Quota disponíveis. K vão pra anúncios pagos R$ 12,90 cada.` Instagram disabled while session expired.
- [ ] **P7.4** — Right column section 3 `Validação`: derived checklist. Green check `Todos os N itens prontos pra zap` if every selected item has `readyForWhatsapp: true`; amber line `K itens incompletos pra OLX: %{titles}` with `Completar agora` link jumping to the inventory edit drawer for the first offender.
- [ ] **P7.5** — Left column preview: tab per selected destination (one tab per WhatsApp group + one OLX tab). WhatsApp tab renders a chat-bubble preview with an editable message body (whitespace preserved); above it a small line `Vai sair em: <groupName> · <memberCount> membros · WhatsApp`. Flyer sub-section: template selector (`Grade 3×3 · Lista vertical · Item solo · Sem flyer`) + flyer rendering with up to 9 item thumbs. OLX tab renders a simplified listing preview with pagination dots `1 de N anúncios` and note `OLX cria N anúncios separados`.
- [ ] **P7.6** — Top action bar: `Cancelar` + `Publicar em N canais selecionados` (N updates live). Publish creates a new `Campaign` in `stores/campaigns` with per-channel-per-item publications (placeholder — no network call), prepends to the `Divulgações anteriores` table below the form, and flashes a zinc success alert.
- [ ] **P7.7** — `Divulgações anteriores` table under the form: `Data · Itens · Canais · Conversas geradas · Vendidos`. Reads from `stores/campaigns`.
- [ ] **P7.8** — Verify: toggling items / channels updates preview content and the publish button's N count with no reload; publishing a campaign prepends to the history table immediately. Screenshot `docs/screenshots/P7.png`.

## Phase 8 — Sales (§5.7)

Goal: `"pickup day never surprises me — I know the sequence, the totals, and who's flaky"`.

- [ ] **P8.1** — `views/SalesView.vue` — page title `Vendas` + metrics line `Combinado: R$ X · Recebido: R$ Y · Em risco: R$ Z (combinado há +2 dias sem pagamento confirmado)`. Two tabs: `Agenda` and `Concluídas`.
- [ ] **P8.2** — `Agenda` tab: orders grouped by day (`Hoje — DD/MM`, `Amanhã — DD/MM`, `<weekday> — DD/MM`). Each order = card with time, buyer, items joined, total, status badge (`Combinado` / `Pago` / `aguardando pagamento` / `em risco`), pickup address (default `Retira aqui · Pinheiros, SP`), `ver conversa` link to the source thread, action buttons by status: `Marcar retirado` / `Confirmar pagamento` / `Marcar no-show` / `Remarcar` / `Liberar reserva`.
- [ ] **P8.3** — At-risk tint: orders scheduled in the past without confirmed payment render with a subtle red border-left. No red background, no icon, no pulsing.
- [ ] **P8.4** — `Concluídas` tab: dense table `Item · Comprador · Combinado · Real · Data retirada`. Last ~10 entries from `stores/orders`. Real column only shows after the order is marked picked up.
- [ ] **P8.5** — Verify: marking an order picked up moves its card from Agenda to Concluídas and the linked items become `sold` in inventory and on the dashboard; `Remarcar` opens a date-time picker (`@headlessui/vue` popover or native `datetime-local`) and moves the card to the new day section without reload. Screenshot `docs/screenshots/P8.png`.

## Phase 9 — Cross-cutting polish

Goal: every non-negotiable from §6, §9, §10 holds across the whole app.

- [ ] **P9.1** — Global behaviors audit (§6):
  - Every BRL literal in `src/` flows through `formatBRL`. Grep proves it.
  - Every user-visible time string flows through `relativeTime`. Grep proves it.
  - Buyer avatars use `buyerColor.tintClass(id)` — same buyer, same tint everywhere. Walk through Conversations → Sales → Follow-ups and confirm visually via ferrum screenshots.
  - Nudge/suggestion composers are **pre-filled**, never blank.
  - Threads with `inconsistencyNote` render the subtle single-line strip.
  - Empty states use honest pt-BR copy (`Nada urgente agora`, `Nenhum item parado`, etc.), not marketing.
- [ ] **P9.2** — Visual non-negotiables sweep (§9):
  - `rg -n 'text-(red|blue|green|indigo|yellow|purple|pink|orange|rose|sky|teal|emerald|lime|amber|violet|fuchsia|cyan)-' src/` — every hit is either inside a named status token or removed. Document the allowed exceptions at the top of `src/styles/main.css` as CSS comments.
  - `rg -n 'from-|to-|bg-gradient' src/` — zero hits.
  - `rg -n 'animate-(pulse|bounce|ping|spin)' src/` — zero hits except a load spinner if genuinely necessary (it is not, for the pilot).
  - `rg -n 'shadow-(lg|xl|2xl)' src/` — zero hits. Only `shadow-sm` or no shadow.
  - Icon imports only from `@heroicons/vue/20/solid` and `@heroicons/vue/24/outline`. No other icon libraries.
- [ ] **P9.3** — Definition of done walkthrough (§10). For each of the 8 criteria, execute the journey via `ferrum` end-to-end and record pass/fail plus a screenshot in `docs/dod.md` (create the file in this task). Any fail → create a `[!]` entry in `## Blockers`, fix in a follow-up task within this phase, retest. Do not proceed until all 8 pass.
- [ ] **P9.4** — Remove dev scaffolding: no `console.log`, no `TODO` markers, no `<!-- -->` reminder comments in `src/`. `rg -n 'TODO|FIXME|XXX|console\.(log|warn|error)' src/` → zero hits (except genuine error handlers that surface to the UI, of which there should be ~none for this pilot).
- [ ] **P9.5** — Append the completion promise:
  ```
  <promise>GARAGE_SALE_PILOT_COMPLETE</promise>
  ```
  as the final line of this file. Commit with `plan(P9.5): pilot complete`. The Stop hook ends the loop on the next invocation.

---

## Final verification

Running walkthrough captured in `docs/dod.md` (produced by P9.3). The eight DoD criteria from briefing §10 transcribed:

1. Open Dashboard and within 2 seconds know what to do next.
2. Filter Inventory, open an item, edit it, see the row update in place.
3. Clear an inbox of unanswered threads without leaving Conversations.
4. Publish 8 items × WhatsApp+3 groups+OLX in under 2 minutes from Promotions with a live preview.
5. Mark a pickup completed / confirm payment / reschedule / no-show from Sales, and see the state propagate to Inventory and Dashboard.
6. Follow-ups surfaces every stale item and stale thread with a one-click remedy.
7. Channels tells the truth about each channel (including OLX quota and reconnection needs).
8. Nothing on screen is decorative. Every number has a next action or a reason to be seen.

## Blockers

None yet. Escape hatch will append entries here.
