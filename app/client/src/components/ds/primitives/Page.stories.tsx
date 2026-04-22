import type { Meta, StoryObj } from "@storybook/react-vite"
import { Page } from "./Page"

const meta: Meta<typeof Page> = {
  title: "Primitives/Page",
  component: Page,
}
export default meta

type Story = StoryObj<typeof Page>

export const Default: Story = {
  render: () => (
    <Page>
      <Page.Header title="Dashboard" description="Visão geral da sua conta." />
      <div className="rounded-lg bg-card p-6 text-muted-foreground text-sm">
        Conteúdo da página
      </div>
    </Page>
  ),
}

export const WithActions: Story = {
  render: () => (
    <Page>
      <Page.Header
        title="Inventário"
        description="Gerencie seus produtos."
        actions={
          <button className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Novo produto
          </button>
        }
      />
      <div className="rounded-lg bg-card p-6 text-muted-foreground text-sm">
        Conteúdo da página
      </div>
    </Page>
  ),
}

export const WithTabs: Story = {
  render: () => (
    <Page>
      <Page.Header
        title="Cashflow"
        tabs={[
          { label: "Últimos 7 dias", current: true },
          { label: "Últimos 30 dias", current: false },
          { label: "Todo o período", current: false },
        ]}
        secondary={
          <button className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            + Nova fatura
          </button>
        }
      />
      <div className="rounded-lg bg-card p-6 text-muted-foreground text-sm">
        Conteúdo filtrado
      </div>
    </Page>
  ),
}
