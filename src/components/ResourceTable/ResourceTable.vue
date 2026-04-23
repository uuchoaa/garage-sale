<script setup lang="ts" generic="T extends Record<string, any>">
type Column = { key: string; label: string; align?: 'start' | 'end' }

defineProps<{
  title?: string
  columns: Column[]
  items: T[]
}>()

defineSlots<Record<string, (props: { item: T }) => unknown>>()
</script>

<template>
  <div class="flex flex-col gap-3">
    <h2 v-if="title" class="text-base font-semibold text-tone-neutral-700">{{ title }}</h2>
    <div class="overflow-hidden rounded-lg ring-1 ring-inset ring-tone-neutral-500/10">
      <table class="w-full divide-y divide-tone-neutral-500/10 text-sm">
        <thead class="bg-tone-neutral-50/70">
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              scope="col"
              :class="[
                'px-4 py-3 text-xs font-semibold text-tone-neutral-500',
                col.align === 'end' ? 'text-right' : 'text-left',
              ]"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-tone-neutral-500/10 bg-white">
          <tr v-for="(item, i) in items" :key="i">
            <td
              v-for="col in columns"
              :key="col.key"
              :class="[
                'px-4 py-3 align-middle text-tone-neutral-700',
                col.align === 'end' ? 'text-right' : 'text-left',
              ]"
            >
              <slot :name="col.key" :item="item">{{ item[col.key] }}</slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
