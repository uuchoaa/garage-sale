# Garage Sale — client briefing

A personal tool for running a moving sale over a few weeks. One seller, many channels, a lot of buyers messaging in parallel. The tool should feel like a calm command center — not a marketplace, not a CRM, not a chat app, but the thing that sits on top of all of them while the sale is running.

User-facing copy is in Brazilian Portuguese (pt-BR). The seller is based in Pinheiros, São Paulo.

---

## 1. Context

I'm moving in ~12 days. I need to sell ~15 household items — furniture, appliances, a bed, a sofa, a wardrobe, an air conditioner, a dresser, smaller pieces — and I'm advertising them across several channels at once:

- **WhatsApp** (my personal account, plus a few groups: family, college friends, the kids' school parents).
- **OLX** (classifieds; limited free listings per month, paid slots after that).
- **Instagram** (story / posts; currently logged out).
- **Mercado Livre** (not connected yet).
- **Facebook Marketplace** (not connected yet).

Each channel behaves differently. Buyers arrive on different channels, messages overlap, some reserve items and disappear, some show up late, some try to negotiate down, some are ready to pick up tomorrow. I need a single place to:

- See what's left, what's reserved, what's sold.
- Answer incoming messages without losing track of who's asking about what.
- Know who's coming to pick up what, and when.
- Know what's been sitting without traction and nudge it.
- Publish the same batch of items to multiple channels without re-typing.

This is a temporary tool for a one-time sale, not a product that scales. It should be fast, honest, and stop existing once the move is done.

---

## 2. Users & access

One user: me. No accounts, no invites, no roles. No multi-tenant concerns. Mobile responsiveness is nice-to-have, not required — I'll mostly use it on a laptop at home.

---

## 3. Product pillars

**Calm tech, data-dense.** Fill the screen with information I actually need, not decoration. A number without an action doesn't belong on screen.

**One-click nudges.** The tool should know what's stuck and offer me a pre-written message to send. I approve; it sends.

**Single source of truth for state.** If an item is reserved, that shows everywhere. If a pickup is scheduled, that shows everywhere. No manual sync between screens.

**Honest about what's real.** If a channel is disconnected, say so. If OLX quota is almost used up, say so. If a buyer contradicted themselves ("said Saturday, then said Sunday"), flag it subtly next to the thread. No surprises.

**No fluff.** No greeting messages, no confetti, no pulsing badges, no colored gradients, no decorative emojis, no 3D charts, no oversized icons. Zinc palette, tight type, generous whitespace, subtle borders, near-absent shadows.

---

## 4. Domain concepts

The tool revolves around a small set of things:

- **Item** — a physical thing I'm selling. Has a title, price, condition (new / like-new / used / with defect), priority (high / medium / low), photos, optional description, dimensions (for shipping-y channels), category, status (draft / available / reserved / sold / paused). Tracks whether it's ready to post on WhatsApp and on OLX (those require different info).
- **Buyer** — a person who contacted me. Name, initials, color (for their avatar), phone. One buyer can be asking about multiple items.
- **Channel** — a place where I publish and converse: WhatsApp, OLX, Instagram, Mercado Livre, Facebook. Each has a connection status (connected / needs reauthentication / suspended / quota exceeded / not connected) and channel-specific metadata (WhatsApp groups, OLX free-listings quota, etc.).
- **Conversation** — a thread with one buyer about one item on one channel. Has messages, a status (unanswered / active / pickup pending / archived), the last side who spoke, and optionally an "inconsistency note" (a subtle flag when the buyer contradicts themselves across messages).
- **Message** — one entry inside a conversation. Who wrote it, body, sent time, optional attachments.
- **Order** — a scheduled pickup: one buyer picks up one or more items at a given time and address. Has a status (agreed / paid / picked up / no-show), the agreed total, and the actual total (filled only after pickup). Can be linked back to the conversation that produced it.
- **Campaign** — one act of publishing a batch of items across a batch of channels, with a message body, a flyer template, and a publication date. I can look back at past campaigns to see how many conversations and sales each one generated.

State transitions worth calling out:
- An item goes from *available* to *reserved* when a buyer commits but hasn't picked up yet.
- When a pickup is scheduled, an *order* exists on top of the reservation.
- When the pickup happens, the order becomes *picked up* and the item becomes *sold*.
- If the buyer no-shows, the order is marked *no-show* and the items return to *available*.

---

## 5. Screens

Seven screens, reached from a left sidebar. I'll describe each: what's on it, what I do with it, and what success looks like.

### 5.1 Dashboard — "what do I need to do right now?"

The landing screen. Answers three questions in order:

1. **How's the sale going overall?** A single line at the top: "X days until the move · Y/Z items sold · R$ received / R$ agreed." A thin progress bar under it.
2. **Pra fazer agora — what needs my attention right now?** A short queue of urgent actions, each with a one-line description and a single button that resolves it. The queue is prioritized: today's pickups → orders awaiting payment → unanswered messages → items that have gone stale. If the queue is empty, it says "Nada urgente agora" — no red badge, no alarm.
3. **Hoje** — today's scheduled pickups as cards, with time, buyer, items, total, status, and the relevant action ("mark picked up", "confirm payment", "no-show", "reschedule").

Below, a collapsible **Acompanhamento** block (closed by default): a 7-day sparkline of sales per day, a short list of items stalled for >5 days, and a line showing the most productive channel. I don't look at it most days; I do look when I'm deciding whether to drop prices.

This screen is read-only. Every action links into the screen that owns it.

**Done when:** opening the dashboard tells me within 2 seconds what I should do next. If the urgent queue is empty, the sale is on track.

### 5.2 Inventory — "what do I have?"

A dense table of every item. This is where I manage the catalog.

Columns: checkbox, thumbnail, item (title + a small sub-line like "base + mattress"), price, priority, status, interest ("3 conversas"), ready-for chips (a green check if WhatsApp-ready, a warning if OLX still needs info), last-updated time, a kebab menu.

Above the table: filters (search by title, filter by status, by priority, by sort order: recent / expensive / drafts first / stalled). Filters apply as I type — no submit button, no page reload.

Above the filters: a page header with a counter line ("N items · K sold · R reserved · A available · D drafts") and two buttons: "+ Adicionar itens" and "Ações em lote" (disabled when no rows selected).

Clicking a row opens a side drawer with the full edit form: photos, title, price (with an "accept offers" toggle), condition, priority, sell-by date, status, description, and a collapsible section "Completar pra OLX" (category, dimensions, delivery offered, location). Save closes the drawer and updates the row in place — no full reload.

A draft row is visually marked ("rascunho · falta título e preço") and sorts to the top so I don't forget it.

**Done when:** I can find, filter, and edit any item in under 10 seconds; drafts never get buried.

### 5.3 Channels — "where am I publishing?"

An informational screen summarizing each channel's state. One card per channel.

- **WhatsApp**: connected. Shows posted items, active conversations, last activity, contact count. Below, a "Grupos para divulgação" list with group name, member count, days since last post, and whether the group has ever been used.
- **OLX**: connected. Shows a quota bar ("8/10 anúncios grátis"), a note about paid slots ("R$ 12,90 cada"), and a compact table "Anúncios ativos" with views, messages, posted date.
- **Instagram**: session expired. A warning strip with a "Reconectar" button.
- **Mercado Livre**: not connected. Dimmed card, "Conectar" button.
- **Facebook Marketplace**: not connected. Dimmed card, "Conectar" button.

No actions beyond the connect/reconnect buttons (placeholders for the pilot). This screen exists to tell me the truth about each channel at a glance.

**Done when:** I never post into a broken channel without noticing.

### 5.4 Conversations — "who's asking about what?"

A three-column chat view.

- **Left (~360px)** — thread list, grouped by item. Above it: filter tabs "Sem resposta · Ativas · Combinado pendente · Arquivadas" and a search box. Each item heading shows thumb + title + price + open-threads count, then a row per buyer currently in conversation about that item. The active thread is highlighted.
- **Center** — the selected thread. Sticky header with item thumb (56px) + title + price + badges ("Reservado pra Maria", waitlist notes). Below the header, a quick-action bar: *Marcar vendido*, *Liberar reserva*, *Propor preço*, *Agendar retirada*, *Ver item*. Then the scrollable message list. Then, if the thread has an inconsistency, a subtle strip explaining it. Then the composer: a row of quick-reply chips ("Sigo confirmado", "Pode buscar amanhã?", "Já reservei pra outra pessoa", "Topo R$ 950") that fill the textarea when clicked, a textarea, a send button.
- **Right (~320px, hidden on narrow screens)** — the current item's context: bigger photo, price, description, status, link to the inventory edit drawer, and a short "also interested" list (other buyers currently messaging about the same item — a mini-waitlist).

Switching threads swaps the center + right columns only, no full reload. Sending a message appends the bubble, clears the composer, and updates the thread preview on the left. Marking the item sold from the header archives the thread and removes it from the left column.

**Done when:** I can clear an inbox of 20 unanswered threads in 10 minutes without ever typing the same reply twice.

### 5.5 Follow-ups — "what needs a nudge?"

Two derived lists, side by side. Nothing here is edited directly — everything is a one-click action.

- **Itens sem tração** — items posted >3 days ago with little or no conversation. Each card: thumb + title + price + priority badge, then a muted line "Divulgado em 3 canais há 5 dias · 1 conversa", then a suggestion ("Baixar 10%? Republicar no grupo da faculdade?"), then actions: *Republicar agora*, *Baixar preço* (10% default), and a "Mais" menu with *Ver no inventário*, *Pausar item*, *Marcar como doação*.
- **Conversas paradas** — threads with no response for >24h. Each card: buyer avatar + name + channel badge + item thumb + title, then the last message as a quote, then the status ("Sem resposta dele há 28h" or "Sem resposta sua há 30h"), then a pre-filled mini-composer with a suggested nudge text + "Enviar cutucada" primary + "Abrir conversa" secondary link.

Above both lists: a page header and an urgency filter ("Tudo · Só urgente · Apenas itens prioritários"). Below: a muted footer explaining the defaults ("3 days without conversation · 24h without reply — configurable").

Actions produce immediate visual feedback: the card is removed (nudge sent, republished) or replaced with the updated state (price lowered), and a small success alert appears.

**Done when:** an item never sits stale for a week without me deciding to drop it, relist it, or donate it.

### 5.6 Promotions (Divulgação) — "publish a batch"

The tool for pushing a curated batch of items across multiple channels at once, with a live preview that updates as I select.

Layout: two columns.

**Right column — selection (sticky):**

1. **Itens** — a list of available items with checkboxes. Each row has a priority hint. A small priority toggle at the top (All / High / Medium / Low) filters the list. Header shows "Itens selecionados (N)".
2. **Canais** — channel checkboxes. WhatsApp expands into group checkboxes (family / college / school parents, each showing member count). OLX is a single checkbox, but shows an inline quota warning: "8 itens × 1 anúncio = 8/3 disponíveis. 5 vão pra anúncios pagos R$ 12,90 cada." Instagram is disabled while disconnected.
3. **Validação** — a checklist of derived sanity checks:
   - ✓ "Todos os N itens prontos pra zap" (green if every selected item is WhatsApp-ready).
   - ⚠ "K itens incompletos pra OLX: %{titles}" with a "Completar agora" link that jumps to the Inventory edit drawer.

**Left column — preview (scrollable):**

- Header: "Preview da divulgação" + a "Baixar flyer" button (no-op for pilot).
- A tab bar, one tab per selected destination (one WhatsApp group per tab, plus OLX if selected).
- Preview body depends on the active tab:
  - **WhatsApp tab**: a small header line ("Vai sair em: Pais Escola Pinheiros · 89 membros · WhatsApp") above a chat bubble rendering the editable message body (whitespace preserved).
  - **Flyer**: a template selector (Grade 3×3 / Lista vertical / Item solo / Sem flyer) and the flyer rendering with up to 9 item thumbs.
  - **OLX tab**: a simplified OLX listing preview with pagination dots ("1 de N anúncios"); a note under it: "OLX cria N anúncios separados".

A top action bar: "Cancelar" + "Publicar em N canais selecionados" (the number updates live).

Under the form: a **Divulgações anteriores** table of past campaigns with Data, Itens, Canais, Conversas geradas, Vendidos. New campaigns prepend to this table on publish.

Toggles update the preview and button labels without a round-trip. Publishing creates a campaign and its per-channel-per-item publications, prepends the row, and flashes a success alert.

**Done when:** I can publish 8 items across WhatsApp + 3 groups + OLX in under 2 minutes, with zero retyping.

### 5.7 Sales — "who's coming to pick up?"

The schedule of upcoming and completed pickups.

Top: page title "Vendas" and a metrics line: "Combinado: R$ X · Recebido: R$ Y · Em risco: R$ Z (combinado há +2 dias sem pagamento confirmado)."

Two tabs: **Agenda** (upcoming) and **Concluídas** (recent completions).

**Agenda**: orders grouped by day ("Hoje — 19 abr", "Amanhã — 20 abr", "Sáb — 22 abr"). Each day is a section; each order is a card showing time, buyer, item titles joined, total, status badge ("Combinado", "Pago", "aguardando pagamento", "em risco"), pickup address (default: "Retira aqui · Pinheiros, SP"), a link to the source conversation, and action buttons appropriate to the current status:

- *Marcar retirado* — completes the order; items become sold; card moves to Concluídas.
- *Confirmar pagamento* — status goes from Combinado → Pago.
- *Marcar no-show* — status becomes no-show; items return to available.
- *Remarcar* — opens a date/time picker; card moves to the new day.
- *Liberar reserva* — cancels the order; items return to available.
- *ver conversa* — jump to the source thread.

Orders scheduled in the past without payment get a red tint (at-risk).

**Concluídas**: a dense table of recent pickups: Item, Comprador, Combinado, Real, Data retirada. Shows the last ~10 entries.

**Done when:** pickup day never surprises me — I know the sequence, the totals, and who's flaky.

---

## 6. Behaviors that cut across screens

Some behaviors don't belong to one screen — they're global rules:

- **Money**: always BRL, always "R$ 1.234,56". No cents shown when whole. Prices can be edited; "accept offers" is a per-item toggle.
- **Time**: always relative when possible ("agora", "há 2h", "ontem", "há 3 dias"), fall back to "DD/MM" for anything older than a week. Timezone: America/São_Paulo.
- **Buyer identity**: avatars are initials on a fixed zinc tint per buyer (stable across sessions so I learn them visually).
- **Suggestions are opinionated**: the tool pre-fills nudge messages, suggests a 10% price drop, suggests which group to republish to. I approve; the tool sends. No blank text boxes when the tool could guess.
- **Inconsistency hints**: if a buyer says two different things across messages ("Saturday" then "Sunday"), the tool quietly flags the thread — no alarm, a single line.
- **Empty states are honest**: "Nada urgente agora" is a valid state and not a marketing moment.

---

## 7. Data seeded for the pilot

To make every screen feel real before any integration is wired up, the pilot ships with fixture data matching a plausible mid-sale snapshot:

- ~10 buyers with real-looking names (Maria Silva, João Costa, Camila Rocha, Lucas Santos, Ana Oliveira, Roberto Pinto, …).
- ~15 items (2 drafts, 3 sold, 2 reserved, 8 available): Cama Box Queen, Ar-condicionado Split LG 12k BTUs, Cômoda Tok&Stok, sofá, etc., with prices from the mocks.
- 5 channels with the states described in §5.3 (WhatsApp connected with 3 groups, OLX connected with 8/10 quota, Instagram needs reauthentication, Mercado Livre and Facebook not connected).
- ~12 conversations, including a full "Maria Silva ↔ Cama Box Queen" thread with 7 messages, last one "Posso ir buscar amanhã cedo?" sent 2 hours ago.
- ~5 orders covering today (Maria 14:00 paid, Roberto 08:30 at-risk), tomorrow (João 11:00), and Saturday (Lucas 10:00), plus 2–3 completed ones.
- 2–3 past campaigns with conversations- and sales-generated counts.

This density is enough to make each of the 7 screens feel populated without any real channel integration.

---

## 8. Non-goals (for this pilot)

- **No real channel integrations**: no WhatsApp Business API, no OLX API, no IG / ML / FB. All connections, quotas, and "send" actions are fixtures. When I click "Reconectar" or "Conectar", it's a placeholder.
- **No auth / multi-user**: single-user tool, runs locally.
- **No automated testing** as part of the pilot spec.
- **No mobile-first redesign**: the layouts above assume a laptop. Small-screen behavior is whatever falls out naturally.
- **No inventory import**: items are entered manually or via fixtures.
- **No payment processing**: payment is tracked as a status, not a transaction — I'm receiving Pix / cash outside the tool.

---

## 9. Visual principles (non-negotiable)

- **Palette**: zinc only. No brand color. No gradients. Near-absent shadows. Subtle borders.
- **Type**: tight, data-dense. Numbers beat labels. Labels beat prose.
- **Forbidden**: decorative emojis, oversized icons, pulsing badges, greeting messages, confetti, 3D charts, progress bars that animate for no reason, skeletons that flash.
- **Icons**: outline or solid, consistent family, never oversized.
- **Density**: a screen should answer the question it exists for without scrolling past hero space.

---

## 10. Definition of done for the pilot

The pilot is done when, on a laptop with the seeded data:

1. I open the Dashboard and within 2 seconds know what I should do next.
2. I can filter Inventory, open an item, edit it, and see the row update in place.
3. I can clear an inbox of unanswered threads without leaving the Conversations screen.
4. I can publish 8 items × WhatsApp+3groups+OLX in under 2 minutes from the Promotions screen, with a live preview.
5. I can mark a pickup as completed, confirm payment, reschedule, or no-show from the Sales screen, and the state propagates to Inventory and Dashboard.
6. The Follow-ups screen surfaces every stale item and stale thread with a one-click remedy.
7. The Channels screen tells me the truth about each channel, including OLX quota and reconnection needs.
8. Nothing on screen is decorative. Every number has a next action, or a reason to be seen.

When all of that holds, I can run the real 12-day sale on top of the tool.
