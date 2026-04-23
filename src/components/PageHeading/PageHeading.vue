<script setup lang="ts">
import { useSlots } from 'vue'

defineProps<{
  title: string
}>()

const slots = useSlots()
</script>

<template>
  <header class="flex flex-col gap-4 border-b border-tone-neutral-500/20 pb-5">
    <div class="flex flex-wrap items-baseline justify-between gap-3">
      <h1 class="text-2xl font-semibold text-tone-neutral-700">{{ title }}</h1>
      <div v-if="slots.actions" class="flex items-center gap-x-2">
        <slot name="actions" />
      </div>
    </div>
    <div v-if="slots.nav">
      <slot name="nav" />
    </div>
  </header>
</template>
