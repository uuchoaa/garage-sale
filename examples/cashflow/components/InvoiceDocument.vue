<script setup lang="ts">
import { Stack, Cluster, Text } from 'wise-ui'

type InvoiceItem = {
  id: string
  title: string
  description: string
  hours: string
  rate: string
  price: string
}

type Party = { name: string; lines: string[] }

defineProps<{
  issuedOn: { date: string; datetime: string }
  dueOn: { date: string; datetime: string }
  from: Party
  to: Party
  items: InvoiceItem[]
  subtotal: string
  tax: string
  total: string
}>()
</script>

<template>
  <Stack gap="xl" tag="article">
    <Text size="md" weight="semibold">Fatura</Text>

    <Cluster gap="xl" wrap>
      <Stack gap="xs">
        <Text tone="muted">Emitida em</Text>
        <time :datetime="issuedOn.datetime">{{ issuedOn.date }}</time>
      </Stack>
      <Stack gap="xs">
        <Text tone="muted">Vencimento</Text>
        <time :datetime="dueOn.datetime">{{ dueOn.date }}</time>
      </Stack>
    </Cluster>

    <Cluster gap="xl" wrap>
      <Stack gap="xs">
        <Text weight="semibold">De</Text>
        <Text weight="medium">{{ from.name }}</Text>
        <Stack v-if="from.lines.length" gap="xs">
          <Text v-for="line in from.lines" :key="line" tone="muted">{{ line }}</Text>
        </Stack>
      </Stack>
      <Stack gap="xs">
        <Text weight="semibold">Para</Text>
        <Text weight="medium">{{ to.name }}</Text>
        <Stack v-if="to.lines.length" gap="xs">
          <Text v-for="line in to.lines" :key="line" tone="muted">{{ line }}</Text>
        </Stack>
      </Stack>
    </Cluster>

    <table>
      <thead>
        <tr>
          <th scope="col">Projetos</th>
          <th scope="col">Horas</th>
          <th scope="col">Taxa</th>
          <th scope="col">Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>
            <Stack gap="xs">
              <Text weight="medium">{{ item.title }}</Text>
              <Text tone="muted">{{ item.description }}</Text>
            </Stack>
          </td>
          <td>{{ item.hours }}</td>
          <td>{{ item.rate }}</td>
          <td>{{ item.price }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th scope="row" colspan="3">Subtotal</th>
          <td>{{ subtotal }}</td>
        </tr>
        <tr>
          <th scope="row" colspan="3">Imposto</th>
          <td>{{ tax }}</td>
        </tr>
        <tr>
          <th scope="row" colspan="3"><Text weight="semibold">Total</Text></th>
          <td><Text weight="semibold">{{ total }}</Text></td>
        </tr>
      </tfoot>
    </table>
  </Stack>
</template>
