<script setup lang="ts">
import { MenuItem as HMenuItem } from '@headlessui/vue'

const props = defineProps<{
  to?: string
  value?: string
  disabled?: boolean
}>()

defineEmits<{
  (e: 'select', value: string | undefined): void
}>()

function classes(active: boolean): string {
  return [
    'block w-full px-3 py-2 text-left text-sm',
    active ? 'bg-tone-neutral-50 text-tone-neutral-700' : 'text-tone-neutral-700',
    props.disabled ? 'cursor-not-allowed opacity-50' : '',
  ]
    .filter(Boolean)
    .join(' ')
}
</script>

<template>
  <HMenuItem v-slot="{ active, disabled: hDisabled }" :disabled="disabled">
    <a v-if="to" :href="to" :class="classes(active)" :aria-disabled="hDisabled">
      <slot />
    </a>
    <button
      v-else
      type="button"
      :class="classes(active)"
      :disabled="hDisabled"
      @click="$emit('select', value)"
    >
      <slot />
    </button>
  </HMenuItem>
</template>
