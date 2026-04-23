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
  BrandMark,
  Card,
  DescriptionList,
  DescriptionListItem,
  Menu,
  MenuItem,
  Grid,
  Stack,
  Cluster,
  Icon,
  Text,
  Link,
  VisuallyHidden,
  type NavItem,
  type NavTabItem,
  type Tone,
} from 'wise-ui'
import { EllipsisHorizontalIcon, PlusSmallIcon } from '@heroicons/vue/20/solid'
import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
} from '@heroicons/vue/24/outline'

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

type BrandColor = 'indigo' | 'rose' | 'amber' | 'emerald' | 'slate' | 'sky' | 'purple' | 'fuchsia'

type Client = {
  id: string
  name: string
  brand: BrandColor
  lastInvoice: { date: string; datetime: string; amount: string; status: ActivityStatus }
}

const nav: NavItem[] = [
  { label: 'Home', to: '/', current: true },
  { label: 'Invoices', to: '/invoices' },
  { label: 'Clients', to: '/clients' },
  { label: 'Expenses', to: '/expenses' },
]

const user = { name: 'Tom Cook' }

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
  { id: '1', name: 'Tuple',    brand: 'indigo', lastInvoice: { date: 'December 13, 2022', datetime: '2022-12-13', amount: '$2,000.00',  status: 'overdue' } },
  { id: '2', name: 'SavvyCal', brand: 'amber',  lastInvoice: { date: 'January 22, 2023', datetime: '2023-01-22', amount: '$14,000.00', status: 'paid'    } },
  { id: '3', name: 'Reform',   brand: 'slate',  lastInvoice: { date: 'January 23, 2023', datetime: '2023-01-23', amount: '$7,600.00',  status: 'paid'    } },
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

const kindIcon: Record<ActivityKind, typeof ArrowDownCircleIcon> = {
  income:    ArrowUpCircleIcon,
  outgoing:  ArrowDownCircleIcon,
  recurring: ArrowPathIcon,
}
</script>

<template>
  <StackedShell :nav="nav" :user="user">
    <template #brand>
      <a href="/" aria-label="Cashflow" class="inline-flex items-center">
        <svg viewBox="0 0 54 33" class="h-7 w-auto fill-tone-accent-700" aria-hidden="true">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
          />
        </svg>
      </a>
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
          <Cluster gap="md" align="start">
            <Icon :src="kindIcon[entry.kind]" size="md" class="text-tone-neutral-500" aria-hidden="true" />
            <Stack gap="xs">
              <Cluster gap="sm">
                <Text weight="medium">{{ entry.amount }} USD</Text>
                <StatusBadge :tone="statusTone[entry.status]" :label="statusLabel[entry.status]" />
              </Cluster>
              <Text v-if="entry.tax" tone="muted" size="xs">{{ entry.tax }} tax</Text>
            </Stack>
          </Cluster>
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
              <BrandMark :name="client.name" :color="client.brand" size="md" />
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
