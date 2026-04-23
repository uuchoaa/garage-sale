<script setup lang="ts">
import { computed } from 'vue'
import type { Size, Tone, Weight } from '../../tokens'
import { textSize } from '../../internal/size'

type TextTone = Tone | 'muted'
type TextTag = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'code'

const props = withDefaults(
  defineProps<{
    size?: Size
    weight?: Weight
    tone?: TextTone
    tag?: TextTag
  }>(),
  { weight: 'regular', tag: 'span' },
)

const weightClass: Record<Weight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const toneClass: Record<TextTone, string> = {
  positive: 'text-tone-positive-700',
  negative: 'text-tone-negative-700',
  warning: 'text-tone-warning-700',
  neutral: 'text-tone-neutral-700',
  accent: 'text-tone-accent-700',
  muted: 'text-tone-neutral-500',
}

const classes = computed(() => [
  props.size ? textSize[props.size] : '',
  weightClass[props.weight],
  props.tone ? toneClass[props.tone] : '',
])
</script>

<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>
