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
  <nav class="flex w-full gap-x-8 text-sm/6 font-semibold sm:w-auto sm:text-sm/7">
    <button
      v-for="item in items"
      :key="item.value"
      type="button"
      :class="[
        'transition-colors',
        item.current || value === item.value
          ? 'text-tone-accent-700'
          : 'text-tone-neutral-700 hover:text-tone-neutral-500',
      ]"
      @click="$emit('update:value', item.value)"
    >
      {{ item.label }}
    </button>
  </nav>
</template>
