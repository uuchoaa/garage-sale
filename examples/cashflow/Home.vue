<script setup lang="ts">
import {
  StackedShell,
  PageHeading,
  PageSection,
  FilterLinks,
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

type RangeFilter = NavTabItem
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
  { label: 'Invoices', to: '/invoices' },
  { label: 'Clients', to: '/clients' },
  { label: 'Expenses', to: '/expenses' },
]

const user = { name: 'Tom Cook', avatar: '/avatars/tom.jpg' }

const ranges: RangeFilter[] = [
  { label: 'Last 7 days', value: '7d', current: true },
  { label: 'Last 30 days', value: '30d' },
  { label: 'All-time', value: 'all' },
]

const stats: Stat[] = [
  { label: 'Revenue',            value: '$405,091.00', delta: '+4.75%',  tone: 'positive' },
  { label: 'Overdue invoices',   value: '$12,787.00',  delta: '+54.02%', tone: 'negative' },
  { label: 'Outstanding invoices', value: '$245,988.00', delta: '-1.39%', tone: 'positive' },
  { label: 'Expenses',           value: '$30,156.00',  delta: '+10.18%', tone: 'negative' },
]

const activity: ActivityGroup[] = [
  {
    label: 'Today',
    datetime: '2023-03-22',
    entries: [
      { id: '1', kind: 'income',    amount: '$7,600.00',  tax: '$500.00', status: 'paid',     counterparty: 'Reform',   description: 'Website redesign', ref: '00012', href: '/invoices/00012' },
      { id: '2', kind: 'outgoing',  amount: '$10,000.00',                 status: 'withdraw', counterparty: 'Tom Cook', description: 'Salary',           ref: '00011', href: '/invoices/00011' },
    ],
  },
  {
    label: 'Yesterday',
    datetime: '2023-03-21',
    entries: [
      { id: '3', kind: 'recurring', amount: '$14,000.00', tax: '$900.00', status: 'paid',     counterparty: 'SavvyCal', description: 'Website redesign', ref: '00010', href: '/invoices/00010' },
      { id: '4', kind: 'recurring', amount: '$2,000.00',  tax: '$130.00', status: 'overdue',  counterparty: 'Tuple',    description: 'Logo design',      ref: '00009', href: '/invoices/00009' },
    ],
  },
]

const clients: Client[] = [
  { id: '1', name: 'Tuple',    logo: '/logos/tuple.svg',    lastInvoice: { date: 'December 13, 2022', datetime: '2022-12-13', amount: '$2,000.00',  status: 'overdue' } },
  { id: '2', name: 'SavvyCal', logo: '/logos/savvycal.svg', lastInvoice: { date: 'January 22, 2023', datetime: '2023-01-22', amount: '$14,000.00', status: 'paid'    } },
  { id: '3', name: 'Reform',   logo: '/logos/reform.svg',   lastInvoice: { date: 'January 23, 2023', datetime: '2023-01-23', amount: '$7,600.00',  status: 'paid'    } },
]

const statusLabel: Record<ActivityStatus, string> = {
  paid:     'Paid',
  overdue:  'Overdue',
  withdraw: 'Withdraw',
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
        <FilterLinks :items="ranges" />
      </template>
      <template #actions>
        <Button variant="primary" :icon="PlusSmallIcon">New invoice</Button>
      </template>
    </PageHeading>

    <StatGrid :items="stats" />

    <PageSection title="Recent activity">
      <ActivityTable :groups="activity">
        <template #amount="{ entry }">
          <Stack gap="xs">
            <Cluster gap="sm">
              <Text weight="medium">{{ entry.amount }} USD</Text>
              <StatusBadge :tone="statusTone[entry.status]" :label="statusLabel[entry.status]" />
            </Cluster>
            <Text v-if="entry.tax" tone="muted" size="xs">{{ entry.tax }} tax</Text>
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
            <Link :to="entry.href">View<VisuallyHidden> transaction</VisuallyHidden></Link>
            <Text tone="muted" size="xs">Invoice #{{ entry.ref }}</Text>
          </Stack>
        </template>
      </ActivityTable>
    </PageSection>

    <PageSection title="Recent clients" action-label="View all" action-href="/clients">
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
              <MenuItem :to="`/clients/${client.id}`">View</MenuItem>
              <MenuItem :to="`/clients/${client.id}/edit`">Edit</MenuItem>
            </Menu>
          </template>

          <DescriptionList>
            <DescriptionListItem label="Last invoice">
              <time :datetime="client.lastInvoice.datetime">{{ client.lastInvoice.date }}</time>
            </DescriptionListItem>
            <DescriptionListItem label="Amount">
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
