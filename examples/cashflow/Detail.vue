<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import {
  StackedShell,
  Page,
  DetailHeading,
  SummaryCard,
  SummaryCardRow,
  Timeline,
  Textarea,
  Button,
  StatusBadge,
  Logo,
  Text,
  Link,
  Avatar,
  Stack,
  Cluster,
} from 'wise-ui'
import {
  CalendarDaysIcon,
  CreditCardIcon,
  UserCircleIcon,
} from '@heroicons/vue/20/solid'
import { PaperClipIcon } from '@heroicons/vue/20/solid'
import InvoiceDocument from './components/InvoiceDocument.vue'
import { commentSchema } from './Detail.schema'

type NavItem = { label: string; to: string; current?: boolean }
type Tone = 'positive' | 'negative' | 'neutral' | 'accent'

type ActivityKind = 'created' | 'edited' | 'sent' | 'viewed' | 'paid' | 'commented'
type ActivityEntry = {
  id: string
  kind: ActivityKind
  person: { name: string; avatar?: string }
  date: string
  datetime: string
  comment?: string
}

const nav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Faturas', to: '/invoices', current: true },
  { label: 'Clientes', to: '/clients' },
  { label: 'Despesas', to: '/expenses' },
]

const user = { name: 'Tom Cook', avatar: '/avatars/tom.jpg' }

const invoice = {
  ref: '00011',
  client: { name: 'Tuple, Inc', logo: '/logos/tuple.svg' },
  amount: 'R$ 10.560,00',
  status: 'paid' as const,
  statusLabel: 'Paga',
  payer: 'Alex Curren',
  dueDate: { date: '31/01/2026', datetime: '2026-01-31' },
  issuedOn: { date: '23/01/2026', datetime: '2026-01-23' },
  paymentMethod: 'Paga com MasterCard',
  from: {
    name: 'Acme, Inc.',
    lines: ['Rua Cynthia, 7363', 'Pinheiros, São Paulo'],
  },
  to: {
    name: 'Tuple, Inc',
    lines: ['886 Walter Street', 'New York, NY 12345'],
  },
  items: [
    { id: '1', title: 'Redesign de logo',     description: 'Novo logo e guia de ativos digitais.', hours: '20,0', rate: 'R$ 100,00', price: 'R$ 2.000,00' },
    { id: '2', title: 'Redesign de site',     description: 'Design e desenvolvimento do novo site.', hours: '52,0', rate: 'R$ 100,00', price: 'R$ 5.200,00' },
    { id: '3', title: 'Cartões de visita',    description: 'Design e produção de 500 cartões.',     hours: '12,0', rate: 'R$ 100,00', price: 'R$ 1.200,00' },
    { id: '4', title: 'Design de camisetas',  description: 'Três conceitos de camiseta.',           hours: '4,0',  rate: 'R$ 100,00', price: 'R$ 400,00'   },
  ],
  subtotal: 'R$ 8.800,00',
  tax: 'R$ 1.760,00',
  total: 'R$ 10.560,00',
}

const statusTone: Record<'paid' | 'overdue' | 'withdraw', Tone> = {
  paid:     'positive',
  overdue:  'negative',
  withdraw: 'neutral',
}

const activity: ActivityEntry[] = [
  { id: '1', kind: 'created',  person: { name: 'Chelsea Hagon' }, date: 'há 7d', datetime: '2026-04-16T10:32' },
  { id: '2', kind: 'edited',   person: { name: 'Chelsea Hagon' }, date: 'há 6d', datetime: '2026-04-17T11:03' },
  { id: '3', kind: 'sent',     person: { name: 'Chelsea Hagon' }, date: 'há 6d', datetime: '2026-04-17T11:24' },
  { id: '4', kind: 'commented', person: { name: 'Chelsea Hagon', avatar: '/avatars/hagon.jpg' }, comment: 'Falei com o cliente; ele confirmou que a fatura será paga até o dia 25.', date: 'há 3d', datetime: '2026-04-20T15:56' },
  { id: '5', kind: 'viewed',   person: { name: 'Alex Curren' },  date: 'há 2d', datetime: '2026-04-21T09:12' },
  { id: '6', kind: 'paid',     person: { name: 'Alex Curren' },  date: 'há 1d', datetime: '2026-04-22T09:20' },
]

const kindLabel: Record<ActivityKind, string> = {
  created:   'criou',
  edited:    'editou',
  sent:      'enviou',
  viewed:    'visualizou',
  paid:      'pagou',
  commented: 'comentou',
}

const comment = useForm({ validationSchema: toTypedSchema(commentSchema) })
const [commentBody] = comment.defineField('body')
const submitComment = comment.handleSubmit(() => {})
</script>

<template>
  <StackedShell :nav="nav" :user="user">
    <template #brand>
      <Logo src="/logo.svg" alt="Cashflow" size="lg" />
    </template>

    <Page>
      <DetailHeading :eyebrow="`Fatura #${invoice.ref}`" :title="invoice.client.name">
        <template #leading>
          <Logo :src="invoice.client.logo" :alt="invoice.client.name" size="xl" />
        </template>
        <template #actions>
          <Button variant="ghost">Copiar URL</Button>
          <Button variant="ghost">Editar</Button>
          <Button variant="primary">Enviar</Button>
        </template>
      </DetailHeading>

      <SummaryCard>
        <template #title>
          <Cluster justify="between" align="center">
            <Stack gap="xs">
              <Text tone="muted" size="sm">Valor</Text>
              <Text size="base" weight="semibold">{{ invoice.amount }}</Text>
            </Stack>
            <StatusBadge :tone="statusTone[invoice.status]" :label="invoice.statusLabel" />
          </Cluster>
        </template>
        <SummaryCardRow :icon="UserCircleIcon" label="Cliente">
          {{ invoice.payer }}
        </SummaryCardRow>
        <SummaryCardRow :icon="CalendarDaysIcon" label="Vencimento">
          <time :datetime="invoice.dueDate.datetime">{{ invoice.dueDate.date }}</time>
        </SummaryCardRow>
        <SummaryCardRow :icon="CreditCardIcon" label="Pagamento">
          {{ invoice.paymentMethod }}
        </SummaryCardRow>
        <template #footer>
          <Link to="/invoices/00011/receipt">Baixar recibo →</Link>
        </template>
      </SummaryCard>

      <InvoiceDocument
        :issued-on="invoice.issuedOn"
        :due-on="invoice.dueDate"
        :from="invoice.from"
        :to="invoice.to"
        :items="invoice.items"
        :subtotal="invoice.subtotal"
        :tax="invoice.tax"
        :total="invoice.total"
      />

      <Timeline :items="activity">
        <template #event="{ item }">
          <Text weight="medium">{{ item.person.name }}</Text>
          <Text tone="muted"> {{ kindLabel[item.kind] }} a fatura.</Text>
          <time :datetime="item.datetime">{{ item.date }}</time>
        </template>

        <template #comment="{ item }">
          <Avatar :src="item.person.avatar" :alt="item.person.name" size="sm" />
          <Stack gap="xs">
            <Cluster justify="between">
              <Text>
                <Text weight="medium">{{ item.person.name }}</Text>
                <Text tone="muted"> comentou</Text>
              </Text>
              <time :datetime="item.datetime">{{ item.date }}</time>
            </Cluster>
            <Text tone="muted">{{ item.comment }}</Text>
          </Stack>
        </template>
      </Timeline>

      <form @submit.prevent="submitComment">
        <Textarea
          v-model:value="commentBody"
          label="Adicionar comentário"
          placeholder="Escreva um comentário..."
          :rows="2"
          :error-message="comment.errors.value.body"
        />
        <Cluster justify="between" align="center">
          <Button variant="ghost" :icon="PaperClipIcon" aria-label="Anexar arquivo" />
          <Button variant="secondary" type="submit">Comentar</Button>
        </Cluster>
      </form>
    </Page>
  </StackedShell>
</template>
