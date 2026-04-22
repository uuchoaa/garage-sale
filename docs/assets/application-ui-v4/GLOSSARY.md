# Reference apps

The `page-examples/` folder bundles two demo apps, each shown in three
states (home / detail / settings), sharing the same base components.
We name them after the branding the Tailwind team planted in the examples
themselves, so the dump reads like two real products instead of "App A /
App B".

## Planetaria (sidebar shell)

- **Domain:** deployments / DevOps
- **Shell:** sidebar (`application-shells/sidebar/`)
- **Top-level nav:** Dashboard, Team, Projects, Calendar, Documents, Reports
- **Teams switcher:** Planetaria, Protocol, Tailwind Labs
- **User:** Tom Cook
- **Screens:**
  - Home — `page-examples/home-screens/01-sidebar.html` — "Deployments" (activity feed)
  - Detail — `page-examples/detail-screens/01-sidebar.html` — deployment detail (Overview)
  - Settings — `page-examples/settings-screens/01-sidebar.html` — "Account Settings"

## Cashflow (stacked shell)

- **Domain:** invoicing / finance
- **Shell:** stacked (`application-shells/stacked/`)
- **Top-level nav:** Home, Invoices, Clients, Expenses
- **User:** Tom Cook
- **Screens:**
  - Home — `page-examples/home-screens/02-stacked.html` — "Cashflow" (recent activity + recent clients)
  - Detail — `page-examples/detail-screens/02-stacked.html` — "Invoice" (summary + activity)
  - Settings — `page-examples/settings-screens/02-stacked.html` — "General Settings" (Profile, Bank accounts, Integrations, Language and dates)
