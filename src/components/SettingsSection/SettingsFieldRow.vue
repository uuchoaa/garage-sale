<script setup lang="ts">
import { useSlots } from 'vue'

defineProps<{
  label: string
  value?: string
  actionLabel?: string
  disabled?: boolean
}>()

defineEmits<{
  (e: 'action'): void
}>()

const slots = useSlots()
</script>

<template>
  <div class="flex items-center justify-between gap-4 py-3">
    <div class="flex min-w-0 flex-col gap-0.5">
      <span class="text-sm font-medium text-tone-neutral-700">{{ label }}</span>
      <div v-if="slots.default || value" class="truncate text-sm text-tone-neutral-500">
        <slot>{{ value }}</slot>
      </div>
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
