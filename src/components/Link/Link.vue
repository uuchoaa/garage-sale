<script setup lang="ts">
import { computed } from 'vue'
import type { Tone } from '../../tokens'

type LinkTone = Tone | 'muted'

const props = withDefaults(
  defineProps<{
    to: string
    tone?: LinkTone
    external?: boolean
  }>(),
  { tone: 'accent', external: false },
)

const toneClass: Record<LinkTone, string> = {
  positive: 'text-tone-positive-700 hover:text-tone-positive-500',
  negative: 'text-tone-negative-700 hover:text-tone-negative-500',
  warning: 'text-tone-warning-700 hover:text-tone-warning-500',
  neutral: 'text-tone-neutral-700 hover:text-tone-neutral-500',
  accent: 'text-tone-accent-700 hover:text-tone-accent-500',
  muted: 'text-tone-neutral-500 hover:text-tone-neutral-700',
}

const classes = computed(() => ['font-medium underline-offset-2 hover:underline', toneClass[props.tone]])

const rel = computed(() => (props.external ? 'noopener noreferrer' : undefined))
const target = computed(() => (props.external ? '_blank' : undefined))
</script>

<template>
  <a :href="to" :rel="rel" :target="target" :class="classes">
    <slot />
  </a>
</template>
