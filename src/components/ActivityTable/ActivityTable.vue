<script setup lang="ts" generic="T extends { id: string }">
type Group = { label: string; datetime: string; entries: T[] }

defineProps<{
  groups: Group[]
}>()

defineSlots<{
  amount(props: { entry: T }): unknown
  meta(props: { entry: T }): unknown
  action(props: { entry: T }): unknown
}>()
</script>

<template>
  <table class="w-full text-sm">
    <tbody class="divide-y divide-tone-neutral-500/10">
      <template v-for="group in groups" :key="group.datetime">
        <tr class="bg-tone-neutral-50/50">
          <th
            colspan="3"
            scope="colgroup"
            class="px-4 py-3 text-left text-xs font-semibold text-tone-neutral-500"
          >
            <time :datetime="group.datetime">{{ group.label }}</time>
          </th>
        </tr>
        <tr v-for="entry in group.entries" :key="entry.id">
          <td class="px-4 py-5 align-top">
            <slot name="amount" :entry="entry" />
          </td>
          <td class="px-4 py-5 align-top">
            <slot name="meta" :entry="entry" />
          </td>
          <td class="px-4 py-5 align-top text-right">
            <slot name="action" :entry="entry" />
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
