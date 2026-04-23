<script setup lang="ts">
import type { Tone } from '../../tokens'

type Stat = { label: string; value: string; delta: string; tone: Tone }

defineProps<{
  items: Stat[]
}>()

const deltaClass: Record<Tone, string> = {
  positive: 'text-tone-positive-700',
  negative: 'text-tone-negative-700',
  warning: 'text-tone-warning-700',
  neutral: 'text-tone-neutral-500',
  accent: 'text-tone-accent-700',
}
</script>

<template>
  <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <div
      v-for="stat in items"
      :key="stat.label"
      class="flex flex-col gap-1 rounded-lg bg-white px-4 py-5 ring-1 ring-inset ring-tone-neutral-500/10"
    >
      <dt class="text-sm font-medium text-tone-neutral-500">{{ stat.label }}</dt>
      <dd class="flex items-baseline justify-between gap-2">
        <span class="text-2xl font-semibold text-tone-neutral-700">{{ stat.value }}</span>
        <span :class="['text-sm font-medium', deltaClass[stat.tone]]">{{ stat.delta }}</span>
      </dd>
    </div>
  </dl>
</template>
