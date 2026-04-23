<script setup lang="ts">
import type { Tone } from '../../tokens'

type Stat = { label: string; value: string; delta: string; tone: Tone }

defineProps<{
  items: Stat[]
}>()

const deltaClass: Record<Tone, string> = {
  positive: 'text-tone-neutral-700',
  negative: 'text-tone-negative-500',
  warning: 'text-tone-warning-700',
  neutral: 'text-tone-neutral-500',
  accent: 'text-tone-accent-700',
}

function cellBorder(idx: number) {
  if (idx === 1) return 'sm:border-l'
  if (idx === 2) return 'lg:border-l'
  return ''
}
</script>

<template>
  <div
    class="border-b border-b-tone-neutral-500/15 lg:border-t lg:border-t-tone-neutral-500/10"
  >
    <dl
      class="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0"
    >
      <div
        v-for="(stat, idx) in items"
        :key="stat.label"
        :class="[
          cellBorder(idx),
          'flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-tone-neutral-500/10 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8 border-tone-neutral-500/10',
        ]"
      >
        <dt class="text-sm/6 font-medium text-tone-neutral-500">{{ stat.label }}</dt>
        <dd :class="['text-xs font-medium', deltaClass[stat.tone]]">{{ stat.delta }}</dd>
        <dd
          class="w-full flex-none text-3xl/10 font-medium tracking-tight text-tone-neutral-700"
        >
          {{ stat.value }}
        </dd>
      </div>
    </dl>
  </div>
</template>
