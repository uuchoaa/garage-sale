<script setup lang="ts">
import {
  StackedShell,
  PageHeading,
  NavTabs,
  SearchField,
  ResourceTable,
  Pagination,
  Button,
  StatusBadge,
  Logo,
  Link,
  Text,
  Cluster,
  type NavItem,
  type NavTabItem,
  type Tone,
} from 'wise-ui'
import { PlusSmallIcon } from '@heroicons/vue/20/solid'

type StatusTab = NavTabItem
type Column = { key: string; label: string; align?: 'start' | 'end' }

type InvoiceStatus = 'paid' | 'open' | 'overdue'
type Invoice = {
  id: string
  ref: string
  href: string
  client: { name: string; logo: string }
  amount: string
  dueDate: { date: string; datetime: string }
  status: InvoiceStatus
}

const nav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Faturas', to: '/invoices', current: true },
  { label: 'Clientes', to: '/clients' },
  { label: 'Despesas', to: '/expenses' },
]

const user = { name: 'Tom Cook', avatar: '/avatars/tom.jpg' }

const statusTabs: StatusTab[] = [
  { label: 'Todas',      value: 'all', current: true },
  { label: 'Em aberto',  value: 'open' },
  { label: 'Pagas',      value: 'paid' },
  { label: 'Em atraso',  value: 'overdue' },
]

const columns: Column[] = [
  { key: 'client',  label: 'Cliente' },
  { key: 'amount',  label: 'Valor' },
  { key: 'due',     label: 'Vencimento' },
  { key: 'status',  label: 'Status' },
  { key: 'actions', label: '',          align: 'end' },
]

const invoices: Invoice[] = [
  { id: '1', ref: '00012', href: '/invoices/00012', client: { name: 'Reform',     logo: '/logos/reform.svg'    }, amount: 'R$ 7.600,00',  dueDate: { date: '30/04/2026', datetime: '2026-04-30' }, status: 'open'    },
  { id: '2', ref: '00011', href: '/invoices/00011', client: { name: 'Tuple, Inc', logo: '/logos/tuple.svg'     }, amount: 'R$ 10.560,00', dueDate: { date: '31/01/2026', datetime: '2026-01-31' }, status: 'paid'    },
  { id: '3', ref: '00010', href: '/invoices/00010', client: { name: 'SavvyCal',   logo: '/logos/savvycal.svg'  }, amount: 'R$ 14.000,00', dueDate: { date: '22/01/2026', datetime: '2026-01-22' }, status: 'paid'    },
  { id: '4', ref: '00009', href: '/invoices/00009', client: { name: 'Tuple',      logo: '/logos/tuple.svg'     }, amount: 'R$ 2.000,00',  dueDate: { date: '13/12/2025', datetime: '2025-12-13' }, status: 'overdue' },
  { id: '5', ref: '00008', href: '/invoices/00008', client: { name: 'Hellonext',  logo: '/logos/hellonext.svg' }, amount: 'R$ 3.200,00',  dueDate: { date: '05/05/2026', datetime: '2026-05-05' }, status: 'open'    },
  { id: '6', ref: '00007', href: '/invoices/00007', client: { name: 'Laravel',    logo: '/logos/laravel.svg'   }, amount: 'R$ 5.400,00',  dueDate: { date: '08/12/2025', datetime: '2025-12-08' }, status: 'overdue' },
]

const statusLabel: Record<InvoiceStatus, string> = {
  paid:    'Paga',
  open:    'Em aberto',
  overdue: 'Em atraso',
}

const statusTone: Record<InvoiceStatus, Tone> = {
  paid:    'positive',
  open:    'neutral',
  overdue: 'negative',
}

const pagination = {
  summary: '1 – 6 de 42',
  hasPrev: false,
  hasNext: true,
}
</script>

<template>
  <StackedShell :nav="nav" :user="user">
    <template #brand>
      <Logo src="/logo.svg" alt="Cashflow" size="lg" />
    </template>

    <PageHeading title="Faturas">
      <template #nav>
        <NavTabs :items="statusTabs" />
      </template>
      <template #actions>
        <Button variant="primary" :icon="PlusSmallIcon">Nova fatura</Button>
      </template>
    </PageHeading>

    <Cluster justify="between" align="center">
      <SearchField placeholder="Buscar faturas" />
      <Button variant="ghost">Exportar</Button>
    </Cluster>

    <ResourceTable :columns="columns" :items="invoices">
      <template #client="{ item }">
        <Cluster gap="sm" align="center">
          <Logo :src="item.client.logo" :alt="item.client.name" size="md" />
          <Text weight="medium">{{ item.client.name }}</Text>
        </Cluster>
      </template>

      <template #amount="{ item }">
        <Text>{{ item.amount }}</Text>
      </template>

      <template #due="{ item }">
        <time :datetime="item.dueDate.datetime">{{ item.dueDate.date }}</time>
      </template>

      <template #status="{ item }">
        <StatusBadge :tone="statusTone[item.status]" :label="statusLabel[item.status]" />
      </template>

      <template #actions="{ item }">
        <Link :to="item.href">Ver</Link>
      </template>
    </ResourceTable>

    <Pagination
      :summary="pagination.summary"
      :has-prev="pagination.hasPrev"
      :has-next="pagination.hasNext"
    />
  </StackedShell>
</template>
