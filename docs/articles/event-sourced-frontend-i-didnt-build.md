# The Event-Sourced Frontend I Didn't Build

*Or: how I talked myself down from a WebSocket cathedral for a 12-day personal tool.*

---

## The setup

I'm building a personal tool to run a moving sale — roughly 15 items, a handful of advertising channels (WhatsApp, OLX, Instagram, Marketplace), a stream of buyers negotiating and scheduling pickups. A single user (me), a laptop, twelve days. When the move is done, the tool stops existing.

The backend is Rails. The frontend is Vue. The domain is richer than it sounds — buyers reserve items, pickups get rescheduled, conversations go idle, campaigns get republished. There's an activity feed on the dashboard and another on each item. It looks like a small thing until you start listing the real-time surface area.

So naturally I started sketching an event-sourced Rails app, an ActionCable duplex channel, and a Vue event bus that would fan events into reactive stores. Within an hour I had a cathedral in my head.

This is the story of how I dismantled it in the same afternoon.

## Modeling the events felt right

The briefing made event modeling easy. State transitions are explicit: `available → reserved → sold` on pickup, back to `available` on no-show. The dashboard is driven by an activity feed. Campaign metrics are literally a projection over events.

I wrote out the catalog — `item.price_lowered`, `conversation.idle_24h`, `order.at_risk`, `campaign.generated_sale`. Each event tagged with its source:

- `user` — the seller clicked something
- `tick` — the server discovered a time-based condition
- `ingress` — a message arriving from an external channel (post-pilot)

That split alone is important. Almost every event is user-initiated and doesn't need to be pushed anywhere. The client that caused it already knows. Only `tick` and `ingress` need a transport back to the browser.

It should have been a red flag. I ignored it and kept going.

## Channels for read and write

The seduction at full event sourcing is the idea that writes and reads share one pipeline. Over ActionCable you can both `perform_action(:mark_picked_up)` and subscribe to the resulting event. Phoenix Channels in Elixir do this beautifully. Rails is less polished at it but can get there.

The frontend code reads clean:

```ts
const ch = consumer.subscriptions.create(
  { channel: 'OrderChannel', id: orderId },
  { received: (evt) => eventStore.apply(evt) }
)

ch.perform('mark_picked_up', { command_id: uuid(), total_actual: 120000 })
```

The server broadcasts the resulting events on the same topic. Every subscriber — including the one who just sent the command — receives them and updates. There's no "update on POST response and also on cable push" dualism. There's just one path.

It's hard to overstate how nice this reads. I was sold.

## Then I listed the costs

Before committing, I wrote down what I'd give up by removing HTTP from the write path:

- **Observability.** Rails request logs, Sentry grouping, request tracing, browser devtools — all tuned for HTTP. ActionCable logging is thinner, less structured, harder to grep. On a team, this is a daily tax.
- **Middleware.** CSRF, rate limiting, structured param parsing. Cable gets some but not all, and not identically.
- **Error UX.** HTTP status codes carry error shape for free. Over WebSocket you design your own ack envelope. If a single handler forgets to emit `command.rejected`, the UI hangs on a spinner forever.
- **Retries and reconnection.** HTTP clients retry 5xx with backoff by default. WebSocket disconnects mid-command leave you unsure whether the command landed. You need idempotency by `command_id` and a `processed_commands` table just to avoid duplicates.
- **Testing.** Rails request specs are the paved road. Cable tests are second-class, and covering a command-to-projection-to-broadcast flow in one test is painful.
- **Fallback.** HTTP passes every proxy. WebSockets don't.

For a tool with a hundred thousand daily users, each of these is a real decision. For a single-user tool on my laptop, most of them don't apply. But the ones that do — observability and testing — are the ones I'd feel every day of those twelve days.

## Three honest alternatives

I wrote down the options.

**A. HTTP writes that return their events, cable only for tick and ingress.** The POST response includes the array of events it emitted. The frontend applies those events the same way it applies cable-pushed events. Cable has one job: deliver events the client couldn't have initiated.

**B. HTTP writes, Server-Sent Events for reads.** SSE is HTTP streaming. The browser reconnects natively. It's debuggable with `curl -N`. Less infrastructure than ActionCable, no Redis pub-sub, no channel class hierarchy. One-way by design — but that's exactly what the read path needs.

**C. No push at all. Poll.** The trigger conditions in my briefing gate on days and hours. A 30-second poll of `/dashboard` covers every one of them. Zero new transport, zero reconnection logic, zero ack envelope.

A is the clever option. B is the simpler option. C is the option that admits single-user tools don't need real-time.

I went with A because the cable subscription was already in the design and it keeps the door open for ingress later. But I came close to C, and for some projects C would clearly be the right call.

## Then I overengineered the Vue side

With the backend settled, I turned to the frontend and started sketching:

```
Components
  ↓
Pinia stores (one per aggregate, reducer per event.type)
  ↓
Event bus (dedupe by event.id, fan-out to stores)
  ↑
HTTP dispatcher (returns events[]) + Cable subscriber (reconnect with lastEventId)
```

Plus a bootstrap that hydrates from a snapshot endpoint, an optimistic UI layer with rollback on rejection, and a command bus with correlation IDs threaded through every event.

This is a reasonable architecture. I've shipped variations of it at scale. On a platform I ran for a decade, we pushed more than a million events a day through something very close to this. It works. It earns its keep when you have multiple concurrent writers and real-time collaboration requirements.

The garage sale has one user. On one laptop. Typing one command at a time.

## The conceptual mistake

The mistake I was about to make is worth naming: **event sourcing on the backend does not require event sourcing on the frontend.**

The backend has reasons to be event-sourced. It gives you the activity feed for free, keeps campaign metrics honest, and prepares the ground for future channel integrations. Nothing about that choice forces the frontend to reconstruct state by folding events.

The backend can present a normal REST API to the frontend. Internally, it dispatches commands, emits events, and projects them into read models. The read models are plain ActiveRecord tables. The API serializes them as JSON like any Rails API. The frontend consumes them with no awareness of how they were produced.

The only part of the event log that ever reaches the frontend is the *activity feed*, and that's a single `GET /activity` returning a list. Not a pipeline. Just a list.

## What I actually shipped

Here is what the Vue side looks like now:

```ts
// src/stores/orders.ts
export const useOrdersStore = defineStore('orders', () => {
  const byId = ref<Record<string, Order>>({})

  async function load() {
    const list = await api.get<Order[]>('/orders')
    byId.value = Object.fromEntries(list.map(o => [o.id, o]))
  }

  async function markPickedUp(id: string, total: number) {
    byId.value[id] = await api.post<Order>(
      `/orders/${id}/pickup`,
      { total_actual: total },
    )
  }

  const today = computed(() =>
    Object.values(byId.value).filter(o => isToday(o.scheduled_at))
  )

  return { byId, today, load, markPickedUp }
})
```

One Pinia store per resource. Each action hits an endpoint that returns the updated resource. Assign it into the dictionary. The component re-renders.

No event bus. No reducers on the frontend. No dispatcher. No optimistic rollback. No correlation IDs. No `lastEventId` reconnection logic. No Redis pub-sub.

For tick events — item stalled, conversation idle, order at risk — I poll:

```ts
export function usePoll(fn: () => Promise<void>, ms = 30_000) {
  onMounted(fn)
  const id = setInterval(fn, ms)
  onUnmounted(() => clearInterval(id))
}
```

Thirty seconds covers every trigger in the briefing. The shortest one is measured in hours.

The activity feed is a store with one `load` function.

## What I gave up

Honest accounting.

| | Event-driven version | Shipped version |
|---|---|---|
| Latency for tick events | ~50ms over cable | up to 30s |
| Cross-store updates from one action | automatic via bus | refetch per store |
| Optimistic UI | built-in envelope | manual per action if needed |
| Time-travel debugging | free (event log) | none |
| Multi-device sync | free | none |

The top row is the only one I'd miss in production, and it doesn't apply here. Multi-device sync is explicitly out of scope — single user, single laptop. Time-travel debugging is nice but not worth the cost.

Optimistic UI I'd add in exactly one place when it proves needed: the message composer. Everywhere else, the request completes fast enough that the spinner feels correct.

## When I'd build the cathedral

Three conditions, any one of them, would send me back up the stack:

1. **More than one writer** — multiple devices, multiple users, or concurrent tabs. Writes from one client need to reach another. Cable earns its keep.
2. **External ingress** — real WhatsApp or OLX messages arriving without the user's action. Push becomes non-optional.
3. **Cross-aggregate reactivity that starts producing ugly refetch chains.** When completing an order has to update items, dashboard, activity, campaign metrics, and three other views, the event bus starts paying for itself.

None of these apply to a moving sale run by one person on one laptop for twelve days.

## The lesson I keep relearning

Every few years I talk myself into building real-time infrastructure I don't need, because the *domain* is exciting. Events feel natural, WebSockets feel inevitable, and you end up with a reactive cathedral for a problem that an HTTP response and a `setInterval` would solve.

The domain being rich doesn't mean the infrastructure has to be rich. The rule I try to remember: **real-time infrastructure earns its place when users demand it, not when the data model deserves it.**

A moving sale has a rich data model. It also has one user. The second fact is the one that decides the architecture.

The backend is still event-sourced. The activity feed is still an event log. The pipeline to the frontend is still a plain HTTP API, because that's the interface the frontend actually needs.

I saved a week of work I wasn't going to need for another year. The tool ships in twelve days, does what it has to, and stops existing when the boxes are packed. That's the entire job.

---

*Rafael Uchôa is a full-stack engineer based in São Paulo. He writes Rails and Vue for a living, and practices the discipline of not building what isn't needed yet.*
