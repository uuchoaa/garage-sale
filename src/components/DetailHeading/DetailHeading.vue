<script setup lang="ts">
import { useSlots } from 'vue'

defineProps<{
  eyebrow?: string
  title?: string
  description?: string
}>()

const slots = useSlots()
</script>

<template>
  <header class="flex flex-wrap items-start gap-4 border-b border-tone-neutral-500/10 pb-6">
    <div v-if="slots.leading" class="shrink-0">
      <slot name="leading" />
    </div>
    <div class="flex min-w-0 flex-1 flex-col gap-1">
      <p v-if="eyebrow" class="text-sm font-medium text-tone-neutral-500">{{ eyebrow }}</p>
      <h1 v-if="slots.title" class="text-2xl font-semibold text-tone-neutral-700">
        <slot name="title" />
      </h1>
      <h1 v-else class="text-2xl font-semibold text-tone-neutral-700">{{ title }}</h1>
      <p v-if="description" class="text-sm text-tone-neutral-500">{{ description }}</p>
    </div>
    <div v-if="slots.actions" class="flex shrink-0 flex-wrap items-center gap-2">
      <slot name="actions" />
    </div>
  </header>
</template>
