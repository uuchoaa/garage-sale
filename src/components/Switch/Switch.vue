<script setup lang="ts">
import { Switch as HSwitch } from '@headlessui/vue'

withDefaults(
  defineProps<{
    label?: string
    checked: boolean
    size?: 'sm' | 'md'
    disabled?: boolean
  }>(),
  { size: 'md', disabled: false },
)

defineEmits<{
  (e: 'update:checked', value: boolean): void
}>()
</script>

<template>
  <HSwitch
    :model-value="checked"
    :disabled="disabled"
    :class="[
      'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus:outline-none focus-visible:ring-2 focus-visible:ring-tone-accent-700',
      size === 'sm' ? 'h-5 w-9' : 'h-6 w-11',
      checked ? 'bg-tone-accent-700' : 'bg-tone-neutral-500/30',
      disabled ? 'cursor-not-allowed opacity-50' : '',
    ]"
    @update:model-value="(v) => $emit('update:checked', v)"
  >
    <span class="sr-only">{{ label }}</span>
    <span
      aria-hidden="true"
      :class="[
        'pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-[var(--duration-fast)] ease-[var(--ease-standard)]',
        size === 'sm' ? 'h-4 w-4' : 'h-5 w-5',
        checked ? (size === 'sm' ? 'translate-x-4' : 'translate-x-5') : 'translate-x-0',
      ]"
    />
  </HSwitch>
</template>
