<script setup lang="ts">
import { computed, type Component } from 'vue'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    icon?: Component
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  { variant: 'secondary', disabled: false, type: 'button' },
)

const base =
  'inline-flex items-center justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

const variantClass: Record<Variant, string> = {
  primary:
    'bg-tone-accent-700 text-white hover:bg-tone-accent-500 focus-visible:outline-tone-accent-700',
  secondary:
    'bg-white text-tone-neutral-700 ring-1 ring-inset ring-tone-neutral-500/20 hover:bg-tone-neutral-50 focus-visible:outline-tone-accent-700',
  ghost:
    'bg-transparent text-tone-neutral-700 hover:bg-tone-neutral-50 shadow-none focus-visible:outline-tone-accent-700',
  danger:
    'bg-tone-negative-700 text-white hover:bg-tone-negative-500 focus-visible:outline-tone-negative-700',
}

const classes = computed(() => [base, variantClass[props.variant]])
</script>

<template>
  <button :type="type" :disabled="disabled" :class="classes">
    <component :is="icon" v-if="icon" class="h-5 w-5" aria-hidden="true" />
    <slot />
  </button>
</template>
