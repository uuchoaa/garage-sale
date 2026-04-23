<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon?: Component
  title: string
  description?: string
  actionLabel?: string
  disabled?: boolean
}>()

defineEmits<{
  (e: 'action'): void
}>()
</script>

<template>
  <div class="flex items-center gap-4 py-3">
    <component
      v-if="icon"
      :is="icon"
      class="h-6 w-6 shrink-0 text-tone-neutral-500"
      aria-hidden="true"
    />
    <div class="flex min-w-0 flex-1 flex-col">
      <span class="text-sm font-medium text-tone-neutral-700">{{ title }}</span>
      <span v-if="description" class="truncate text-sm text-tone-neutral-500">{{ description }}</span>
    </div>
    <button
      v-if="actionLabel"
      type="button"
      :disabled="disabled"
      class="shrink-0 text-sm font-medium text-tone-accent-700 hover:text-tone-accent-500 disabled:cursor-not-allowed disabled:opacity-50"
      @click="$emit('action')"
    >
      {{ actionLabel }}
    </button>
  </div>
</template>
