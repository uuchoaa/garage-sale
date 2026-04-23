<script setup lang="ts">
import {
  StackedShell,
  PageHeading,
  PageSection,
  NavTabs,
  Button,
  StatGrid,
  StatusBadge,
  ActivityTable,
  Card,
  DescriptionList,
  DescriptionListItem,
  Menu,
  MenuItem,
  Grid,
  Stack,
  Cluster,
  Icon,
  Logo,
  Text,
  Link,
  VisuallyHidden,
  type NavItem,
  type NavTabItem,
  type Tone,
} from 'wise-ui'
import { EllipsisHorizontalIcon, PlusSmallIcon } from '@heroicons/vue/20/solid'

type RangeTab = NavTabItem
type Stat = { label: string; value: string; delta: string; tone: Tone }

type ActivityStatus = 'paid' | 'overdue' | 'withdraw'
type ActivityKind = 'income' | 'outgoing' | 'recurring'
type ActivityEntry = {
  id: string
  kind: ActivityKind
  amount: string
  tax?: string
  status: ActivityStatus
  counterparty: string
  description: string
  ref: string
  href: string
}
type ActivityGroup = { label: string; datetime: string; entries: ActivityEntry[] }

type Client = {
  id: string
  name: string
  logo: string
  lastInvoice: { date: string; datetime: string; amount: string; status: ActivityStatus }
}

const nav: NavItem[] = [
  { label: 'Home', to: '/', current: true },
  { label: 'Faturas', to: '/invoices' },
  { label: 'Clientes', to: '/clients' },
  { label: 'Despesas', to: '/expenses' },
]

const user = { name: 'Tom Cook', avatar: '/avatars/tom.jpg' }

const ranges: RangeTab[] = [
  { label: 'Últimos 7 dias', value: '7d', current: true },
  { label: 'Últimos 30 dias', value: '30d' },
  { label: 'Todo o período', value: 'all' },
]

const stats: Stat[] = [
  { label: 'Receita',            value: 'R$ 405.091', delta: '+4,75%',  tone: 'positive' },
  { label: 'Faturas em atraso',  value: 'R$ 12.787',  delta: '+54,02%', tone: 'negative' },
  { label: 'Faturas em aberto',  value: 'R$ 245.988', delta: '-1,39%',  tone: 'positive' },
  { label: 'Despesas',           value: 'R$ 30.156',  delta: '+10,18%', tone: 'negative' },
]

const activity: ActivityGroup[] = [
  {
    label: 'Hoje',
    datetime: '2026-04-23',
    entries: [
      { id: '1', kind: 'income',    amount: 'R$ 7.600',  tax: 'R$ 500',  status: 'paid',     counterparty: 'Reform',   description: 'Redesign do site', ref: '00012', href: '/invoices/00012' },
      { id: '2', kind: 'outgoing',  amount: 'R$ 10.000',                 status: 'withdraw', counterparty: 'Tom Cook', description: 'Salário',          ref: '00011', href: '/invoices/00011' },
    ],
  },
  {
    label: 'Ontem',
    datetime: '2026-04-22',
    entries: [
      { id: '3', kind: 'recurring', amount: 'R$ 2.000',  tax: 'R$ 130',  status: 'overdue',  counterparty: 'Tuple',    description: 'Design de logo',   ref: '00009', href: '/invoices/00009' },
    ],
  },
]

const clients: Client[] = [
  { id: '1', name: 'Tuple',    logo: '/logos/tuple.svg',    lastInvoice: { date: '13/12/2025', datetime: '2025-12-13', amount: 'R$ 2.000',  status: 'overdue' } },
  { id: '2', name: 'SavvyCal', logo: '/logos/savvycal.svg', lastInvoice: { date: '22/01/2026', datetime: '2026-01-22', amount: 'R$ 14.000', status: 'paid'    } },
  { id: '3', name: 'Reform',   logo: '/logos/reform.svg',   lastInvoice: { date: '23/01/2026', datetime: '2026-01-23', amount: 'R$ 7.600',  status: 'paid'    } },
]

const statusLabel: Record<ActivityStatus, string> = {
  paid:     'Pago',
  overdue:  'Em atraso',
  withdraw: 'Saída',
}

const statusTone: Record<ActivityStatus, Tone> = {
  paid:     'positive',
  overdue:  'negative',
  withdraw: 'neutral',
}
</script>

<template>
  <StackedShell :nav="nav" :user="user">
    <template #brand>
      <Logo src="/logo.svg" alt="Cashflow" size="lg" />
    </template>

    <PageHeading title="Cashflow">
      <template #nav>
        <NavTabs :items="ranges" />
      </template>
      <template #actions>
        <Button variant="primary" :icon="PlusSmallIcon">Nova fatura</Button>
      </template>
    </PageHeading>

    <StatGrid :items="stats" />

    <PageSection title="Atividade recente">
      <ActivityTable :groups="activity">
        <template #amount="{ entry }">
          <Stack gap="xs">
            <Cluster gap="sm">
              <Text weight="medium">{{ entry.amount }}</Text>
              <StatusBadge :tone="statusTone[entry.status]" :label="statusLabel[entry.status]" />
            </Cluster>
            <Text v-if="entry.tax" tone="muted" size="xs">{{ entry.tax }} imposto</Text>
          </Stack>
        </template>

        <template #meta="{ entry }">
          <Stack gap="xs">
            <Text>{{ entry.counterparty }}</Text>
            <Text tone="muted" size="xs">{{ entry.description }}</Text>
          </Stack>
        </template>

        <template #action="{ entry }">
          <Stack gap="xs" align="end">
            <Link :to="entry.href">Ver<VisuallyHidden> transação</VisuallyHidden></Link>
            <Text tone="muted" size="xs">Fatura #{{ entry.ref }}</Text>
          </Stack>
        </template>
      </ActivityTable>
    </PageSection>

    <PageSection title="Clientes recentes" action-label="Ver todos" action-href="/clients">
      <Grid :cols="{ base: 1, lg: 3 }" gap="lg" tag="ul" role="list">
        <Card v-for="client in clients" :key="client.id" tag="li">
          <template #header>
            <Cluster gap="md" align="center">
              <Logo :src="client.logo" :alt="client.name" size="xl" />
              <Text weight="medium">{{ client.name }}</Text>
            </Cluster>
          </template>

          <template #header-trailing>
            <Menu>
              <template #trigger>
                <Icon :src="EllipsisHorizontalIcon" size="sm" aria-hidden="true" />
              </template>
              <MenuItem :to="`/clients/${client.id}`">Ver</MenuItem>
              <MenuItem :to="`/clients/${client.id}/edit`">Editar</MenuItem>
            </Menu>
          </template>

          <DescriptionList>
            <DescriptionListItem label="Última fatura">
              <time :datetime="client.lastInvoice.datetime">{{ client.lastInvoice.date }}</time>
            </DescriptionListItem>
            <DescriptionListItem label="Valor">
              <Cluster gap="sm" align="center">
                <Text>{{ client.lastInvoice.amount }}</Text>
                <StatusBadge :tone="statusTone[client.lastInvoice.status]" :label="statusLabel[client.lastInvoice.status]" />
              </Cluster>
            </DescriptionListItem>
          </DescriptionList>
        </Card>
      </Grid>
    </PageSection>
  </StackedShell>
</template>
