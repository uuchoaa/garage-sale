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
  <div class="relative isolate overflow-hidden border-y border-tone-neutral-500/10 bg-white">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
    >
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style="
          background-image: linear-gradient(to top right, #ff80b5, #9089fc);
          clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%);
        "
      />
    </div>
    <dl class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x divide-tone-neutral-500/10">
      <div v-for="stat in items" :key="stat.label" class="relative px-6 py-7">
        <div class="flex items-baseline justify-between gap-2">
          <dt class="text-sm font-medium text-tone-neutral-500">{{ stat.label }}</dt>
          <span :class="['text-sm font-medium', deltaClass[stat.tone]]">{{ stat.delta }}</span>
        </div>
        <dd class="mt-3 text-3xl font-semibold tracking-tight text-tone-neutral-700">{{ stat.value }}</dd>
      </div>
    </dl>
  </div>
</template>
