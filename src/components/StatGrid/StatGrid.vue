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
  <dl class="grid grid-cols-1 bg-white sm:grid-cols-2 lg:grid-cols-4 lg:divide-x divide-tone-neutral-500/10 border-y border-tone-neutral-500/10">
    <div
      v-for="stat in items"
      :key="stat.label"
      class="relative isolate overflow-hidden px-6 py-7"
    >
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -right-16 -bottom-20 -z-10 h-56 w-56 rounded-full opacity-70"
        style="background: radial-gradient(closest-side, oklch(0.92 0.09 15), transparent 70%);"
      />
      <div class="flex items-baseline justify-between gap-2">
        <dt class="text-sm font-medium text-tone-neutral-500">{{ stat.label }}</dt>
        <span :class="['text-sm font-medium', deltaClass[stat.tone]]">{{ stat.delta }}</span>
      </div>
      <dd class="mt-3 text-3xl font-semibold tracking-tight text-tone-neutral-700">{{ stat.value }}</dd>
    </div>
  </dl>
</template>
