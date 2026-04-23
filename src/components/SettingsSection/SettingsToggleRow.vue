<script setup lang="ts">
import Switch from '../Switch/Switch.vue'

defineProps<{
  label: string
  description?: string
  checked: boolean
  disabled?: boolean
}>()

defineEmits<{
  (e: 'update:checked', value: boolean): void
}>()
</script>

<template>
  <div class="flex items-center justify-between gap-4 py-3">
    <div class="flex min-w-0 flex-col">
      <span class="text-sm font-medium text-tone-neutral-700">{{ label }}</span>
      <span v-if="description" class="text-sm text-tone-neutral-500">{{ description }}</span>
    </div>
    <Switch
      :label="label"
      :checked="checked"
      :disabled="disabled"
      @update:checked="(v) => $emit('update:checked', v)"
    />
  </div>
</template>
