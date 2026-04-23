<script setup lang="ts">
import { useSlots } from 'vue'

defineProps<{
  title?: string
  description?: string
}>()

const slots = useSlots()
</script>

<template>
  <section class="flex flex-col gap-4 border-b border-tone-neutral-500/10 pb-8">
    <header v-if="title || description" class="flex flex-col gap-1">
      <h3 v-if="title" class="text-base font-semibold text-tone-neutral-700">{{ title }}</h3>
      <p v-if="description" class="text-sm text-tone-neutral-500">{{ description }}</p>
    </header>
    <div class="divide-y divide-tone-neutral-500/10">
      <slot />
    </div>
    <div v-if="slots.actions" class="pt-2">
      <slot name="actions" />
    </div>
  </section>
</template>
