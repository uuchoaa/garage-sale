import { useState } from "react"
import { Plus } from "lucide-react"
import {
  Page,
  PageHeading,
  SecondaryNav,
  StatsGrid,
  DataTable,
  CardWithHeader,
  StatusPill,
  Grid,
} from "@/components/ds"
import { Button } from "@/components/catalyst/button"
import type { Column, RowGroup } from "@/components/ds/blocks/DataTable"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Transaction extends Record<string, unknown> {
  id: string
  party: string
  type: "invoice" | "expense"
  amount: string
  status: "paid" | "overdue" | "pending" | "draft"
}

interface Client {
  id: string
  name: string
  initials: string
  lastInvoice: string
  totalBilled: string
  status: "paid" | "overdue" | "pending"
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const stats = [
  { name: "Receita", value: "R$ 48.291,00", change: "+4,75%", changeType: "positive" as const },
  { name: "Faturas em atraso", value: "R$ 3.820,00", change: "+54,02%", changeType: "negative" as const },
  { name: "Faturas pendentes", value: "R$ 12.450,00", change: "-1,39%", changeType: "positive" as const },
  { name: "Despesas", value: "R$ 9.104,00", change: "+10,18%", changeType: "negative" as const },
]

const activityGroups: RowGroup<Transaction>[] = [
  {
    label: "Hoje",
    rows: [
      { id: "1", party: "Mercado Livre", type: "invoice", amount: "R$ 1.200,00", status: "paid" },
      { id: "2", party: "Shopify Store", type: "expense", amount: "R$ 89,90", status: "paid" },
    ],
  },
  {
    label: "Ontem",
    rows: [
      { id: "3", party: "OLX Anúncios", type: "invoice", amount: "R$ 340,00", status: "overdue" },
      { id: "4", party: "Correios", type: "expense", amount: "R$ 52,40", status: "paid" },
      { id: "5", party: "Amazon Seller", type: "invoice", amount: "R$ 2.890,00", status: "pending" },
    ],
  },
  {
    label: "21 de abril",
    rows: [
      { id: "6", party: "Magazine Luiza", type: "invoice", amount: "R$ 5.600,00", status: "paid" },
      { id: "7", party: "Embalagens Brasil", type: "expense", amount: "R$ 420,00", status: "paid" },
    ],
  },
]

const clients: Client[] = [
  { id: "1", name: "Mercado Livre", initials: "ML", lastInvoice: "Hoje", totalBilled: "R$ 14.200,00", status: "paid" },
  { id: "2", name: "Amazon Seller", initials: "AS", lastInvoice: "Ontem", totalBilled: "R$ 8.900,00", status: "pending" },
  { id: "3", name: "OLX Anúncios", initials: "OL", lastInvoice: "21 abr", totalBilled: "R$ 3.100,00", status: "overdue" },
]

const statusPillVariant: Record<string, "success" | "danger" | "warning" | "neutral"> = {
  paid: "success",
  overdue: "danger",
  pending: "warning",
  draft: "neutral",
}

const statusLabel: Record<string, string> = {
  paid: "Pago",
  overdue: "Atrasado",
  pending: "Pendente",
  draft: "Rascunho",
}

// ---------------------------------------------------------------------------
// Table columns
// ---------------------------------------------------------------------------

const columns: Column<Transaction>[] = [
  { key: "party", label: "Parte" },
  {
    key: "type",
    label: "Tipo",
    render: (v) => (v === "invoice" ? "Fatura" : "Despesa"),
  },
  { key: "amount", label: "Valor", align: "right" },
  {
    key: "status",
    label: "Status",
    render: (v) => (
      <StatusPill variant={statusPillVariant[v as string]}>
        {statusLabel[v as string]}
      </StatusPill>
    ),
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

type Period = "7d" | "30d" | "all"

export default function Cashflow() {
  const [period, setPeriod] = useState<Period>("7d")

  const tabs = [
    { label: "Últimos 7 dias", current: period === "7d", onClick: () => setPeriod("7d") },
    { label: "Últimos 30 dias", current: period === "30d", onClick: () => setPeriod("30d") },
    { label: "Todo o período", current: period === "all", onClick: () => setPeriod("all") },
  ]

  return (
    <Page>
      <PageHeading title="Cashflow" description="Visão financeira do período selecionado." />

      <SecondaryNav
        tabs={tabs}
        trailingAction={
          <Button>
            <Plus className="size-4" />
            Nova fatura
          </Button>
        }
      />

      <div className="mt-8">
        <StatsGrid stats={stats} variant="gap" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold text-foreground">Atividade recente</h2>
          <DataTable columns={columns} groups={activityGroups} emptyMessage="Nenhuma transação no período." />
        </div>

        <div>
          <h2 className="mb-4 text-base font-semibold text-foreground">Clientes recentes</h2>
          <Grid cols={1} gap="md">
            {clients.map((client) => (
              <CardWithHeader
                key={client.id}
                header={
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                        {client.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{client.name}</p>
                        <p className="text-xs text-muted-foreground">Última fatura: {client.lastInvoice}</p>
                      </div>
                    </div>
                    <StatusPill variant={statusPillVariant[client.status]}>
                      {statusLabel[client.status]}
                    </StatusPill>
                  </div>
                }
              >
                <p className="text-sm text-muted-foreground">
                  Total faturado: <span className="font-medium text-foreground">{client.totalBilled}</span>
                </p>
              </CardWithHeader>
            ))}
          </Grid>
        </div>
      </div>
    </Page>
  )
}
