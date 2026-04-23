<script setup lang="ts">
import type { NavTabItem } from '../../internal/nav'

defineProps<{
  items: NavTabItem[]
  value?: string
}>()

defineEmits<{
  (e: 'update:value', value: string): void
}>()
</script>

<template>
  <nav class="flex space-x-6 border-b border-tone-neutral-500/20">
    <button
      v-for="item in items"
      :key="item.value"
      type="button"
      :class="[
        'border-b-2 px-1 pb-3 text-sm font-medium -mb-px',
        item.current || value === item.value
          ? 'border-tone-accent-700 text-tone-accent-700'
          : 'border-transparent text-tone-neutral-500 hover:text-tone-neutral-700 hover:border-tone-neutral-500/40',
      ]"
      @click="$emit('update:value', item.value)"
    >
      {{ item.label }}
    </button>
  </nav>
</template>
