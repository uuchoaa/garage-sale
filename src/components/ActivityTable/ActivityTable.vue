<script setup lang="ts" generic="T extends { id: string }">
type Group = { label: string; datetime: string; entries: T[] }

defineProps<{
  groups: Group[]
}>()

defineSlots<{
  amount(props: { entry: T }): unknown
  meta(props: { entry: T }): unknown
  action(props: { entry: T }): unknown
  icon(props: { entry: T }): unknown
}>()
</script>

<template>
  <table class="w-full text-left">
    <thead class="sr-only">
      <tr>
        <th>Amount</th>
        <th class="hidden sm:table-cell">Client</th>
        <th>More details</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="group in groups" :key="group.datetime">
        <tr class="text-sm/6 text-tone-neutral-700">
          <th
            scope="colgroup"
            colspan="3"
            class="relative isolate py-2 font-semibold"
          >
            <time :datetime="group.datetime">{{ group.label }}</time>
            <div
              class="absolute inset-y-0 right-full -z-10 w-screen border-b border-tone-neutral-500/15 bg-tone-neutral-50/80"
            />
            <div
              class="absolute inset-y-0 left-0 -z-10 w-screen border-b border-tone-neutral-500/15 bg-tone-neutral-50/80"
            />
          </th>
        </tr>
        <tr v-for="entry in group.entries" :key="entry.id">
          <td class="relative py-5 pr-6">
            <div class="flex gap-x-6">
              <slot name="icon" :entry="entry" />
              <div class="flex-auto">
                <slot name="amount" :entry="entry" />
              </div>
            </div>
            <div
              class="absolute right-full bottom-0 h-px w-screen bg-tone-neutral-500/10"
            />
            <div
              class="absolute bottom-0 left-0 h-px w-screen bg-tone-neutral-500/10"
            />
          </td>
          <td class="hidden py-5 pr-6 sm:table-cell">
            <slot name="meta" :entry="entry" />
          </td>
          <td class="py-5 text-right">
            <slot name="action" :entry="entry" />
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
