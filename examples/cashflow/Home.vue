<script setup lang="ts">
import {
  StackedShell,
  HeroBlock,
  ContentBlock,
  PageHeading,
  PageSection,
  FilterLinks,
  Button,
  StatGrid,
  ActivityTable,
  Card,
  DescriptionList,
  DescriptionListItem,
  Menu,
  MenuItem,
  Grid,
  Icon,
  type NavItem,
  type NavTabItem,
  type Tone,
} from 'wise-ui'
import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
  EllipsisHorizontalIcon,
  PlusSmallIcon,
} from '@heroicons/vue/20/solid'

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
  { label: 'Home', to: '#' },
  { label: 'Invoices', to: '#' },
  { label: 'Clients', to: '#' },
  { label: 'Expenses', to: '#' },
]

const user = {
  name: 'Tom Cook',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const ranges: RangeFilter[] = [
  { label: 'Last 7 days', value: '7d', current: true },
  { label: 'Last 30 days', value: '30d' },
  { label: 'All-time', value: 'all' },
]

const stats: Stat[] = [
  { label: 'Revenue',              value: '$405,091.00', delta: '+4.75%',  tone: 'positive' },
  { label: 'Overdue invoices',     value: '$12,787.00',  delta: '+54.02%', tone: 'negative' },
  { label: 'Outstanding invoices', value: '$245,988.00', delta: '-1.39%',  tone: 'positive' },
  { label: 'Expenses',             value: '$30,156.00',  delta: '+10.18%', tone: 'negative' },
]

const activity: ActivityGroup[] = [
  {
    label: 'Today',
    datetime: '2023-03-22',
    entries: [
      { id: '1', kind: 'income',    amount: '$7,600.00 USD',  tax: '$500.00', status: 'paid',     counterparty: 'Reform',   description: 'Website redesign', ref: '00012', href: '#' },
      { id: '2', kind: 'outgoing',  amount: '$10,000.00 USD',                 status: 'withdraw', counterparty: 'Tom Cook', description: 'Salary',           ref: '00011', href: '#' },
      { id: '3', kind: 'recurring', amount: '$2,000.00 USD',  tax: '$130.00', status: 'overdue',  counterparty: 'Tuple',    description: 'Logo design',      ref: '00009', href: '#' },
    ],
  },
  {
    label: 'Yesterday',
    datetime: '2023-03-21',
    entries: [
      { id: '4', kind: 'income',    amount: '$14,000.00 USD', tax: '$900.00', status: 'paid',     counterparty: 'SavvyCal', description: 'Website redesign', ref: '00010', href: '#' },
    ],
  },
]

const clients: Client[] = [
  { id: '1', name: 'Tuple',    logo: 'https://tailwindcss.com/plus-assets/img/logos/48x48/tuple.svg',    lastInvoice: { date: 'December 13, 2022', datetime: '2022-12-13', amount: '$2,000.00',  status: 'overdue' } },
  { id: '2', name: 'SavvyCal', logo: 'https://tailwindcss.com/plus-assets/img/logos/48x48/savvycal.svg', lastInvoice: { date: 'January 22, 2023', datetime: '2023-01-22', amount: '$14,000.00', status: 'paid'    } },
  { id: '3', name: 'Reform',   logo: 'https://tailwindcss.com/plus-assets/img/logos/48x48/reform.svg',   lastInvoice: { date: 'January 23, 2023', datetime: '2023-01-23', amount: '$7,600.00',  status: 'paid'    } },
]

const statusLabel: Record<ActivityStatus, string> = {
  paid:     'Paid',
  overdue:  'Overdue',
  withdraw: 'Withdraw',
}

const statusPill: Record<ActivityStatus, string> = {
  paid:     'text-tone-positive-700 bg-tone-positive-50 ring-tone-positive-700/20',
  withdraw: 'text-tone-neutral-500 bg-tone-neutral-50 ring-tone-neutral-500/15',
  overdue:  'text-tone-negative-700 bg-tone-negative-50 ring-tone-negative-700/15',
}

const kindIcon: Record<ActivityKind, typeof ArrowUpCircleIcon> = {
  income:    ArrowUpCircleIcon,
  outgoing:  ArrowDownCircleIcon,
  recurring: ArrowPathIcon,
}
</script>

<template>
  <StackedShell :nav="nav" :user="user">
    <template #brand>
      <img
        class="h-8 w-auto"
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
    </template>

    <HeroBlock>
      <PageHeading title="Cashflow">
        <template #nav>
          <FilterLinks :items="ranges" />
        </template>
        <template #actions>
          <Button variant="primary" :icon="PlusSmallIcon">New invoice</Button>
        </template>
      </PageHeading>

      <StatGrid :items="stats" />
    </HeroBlock>

    <ContentBlock>
      <PageSection title="Recent activity" bleed-divider>
        <ActivityTable :groups="activity">
          <template #icon="{ entry }">
            <Icon
              :src="kindIcon[entry.kind]"
              size="md"
              class="hidden text-tone-neutral-500 sm:block"
              aria-hidden="true"
            />
          </template>

          <template #amount="{ entry }">
            <div class="flex items-start gap-x-3">
              <div class="text-sm/6 font-medium text-tone-neutral-700">{{ entry.amount }}</div>
              <div
                :class="[
                  statusPill[entry.status],
                  'rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                ]"
              >
                {{ statusLabel[entry.status] }}
              </div>
            </div>
            <div v-if="entry.tax" class="mt-1 text-xs/5 text-tone-neutral-500">
              {{ entry.tax }} tax
            </div>
          </template>

          <template #meta="{ entry }">
            <div class="text-sm/6 text-tone-neutral-700">{{ entry.counterparty }}</div>
            <div class="mt-1 text-xs/5 text-tone-neutral-500">{{ entry.description }}</div>
          </template>

          <template #action="{ entry }">
            <div class="flex justify-end">
              <a
                :href="entry.href"
                class="text-sm/6 font-medium text-tone-accent-700 hover:text-tone-accent-500"
              >
                View<span class="hidden sm:inline"> transaction</span>
                <span class="sr-only">, invoice #{{ entry.ref }}, {{ entry.counterparty }}</span>
              </a>
            </div>
            <div class="mt-1 text-xs/5 text-tone-neutral-500">
              Invoice <span class="text-tone-neutral-700">#{{ entry.ref }}</span>
            </div>
          </template>
        </ActivityTable>
      </PageSection>

      <PageSection title="Recent clients" action-label="View all" action-href="#">
        <Grid :cols="{ base: 1, lg: 3 }" gap="lg" tag="ul" role="list">
          <Card v-for="client in clients" :key="client.id" tag="li">
            <template #header>
              <div class="flex items-center gap-x-4">
                <img
                  :src="client.logo"
                  :alt="client.name"
                  class="size-12 flex-none rounded-lg bg-white object-cover ring-1 ring-tone-neutral-500/15"
                />
                <div class="text-sm/6 font-medium text-tone-neutral-700">{{ client.name }}</div>
              </div>
            </template>

            <template #header-trailing>
              <Menu>
                <template #trigger>
                  <Icon :src="EllipsisHorizontalIcon" size="sm" aria-hidden="true" />
                </template>
                <MenuItem :to="`#`">View</MenuItem>
                <MenuItem :to="`#`">Edit</MenuItem>
              </Menu>
            </template>

            <DescriptionList>
              <DescriptionListItem label="Last invoice">
                <time :datetime="client.lastInvoice.datetime">{{ client.lastInvoice.date }}</time>
              </DescriptionListItem>
              <DescriptionListItem label="Amount">
                <div class="flex items-start gap-x-2">
                  <div class="font-medium text-tone-neutral-700">{{ client.lastInvoice.amount }}</div>
                  <div
                    :class="[
                      statusPill[client.lastInvoice.status],
                      'rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                    ]"
                  >
                    {{ statusLabel[client.lastInvoice.status] }}
                  </div>
                </div>
              </DescriptionListItem>
            </DescriptionList>
          </Card>
        </Grid>
      </PageSection>
    </ContentBlock>
  </StackedShell>
</template>
