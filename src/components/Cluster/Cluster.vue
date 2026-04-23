<script setup lang="ts">
import { computed } from 'vue'
import type { Gap } from '../../tokens'
import { gapClass } from '../../internal/gap'

type Align = 'start' | 'center' | 'end' | 'baseline'
type Justify = 'start' | 'center' | 'end' | 'between' | 'around'

const props = withDefaults(
  defineProps<{
    gap?: Gap
    align?: Align
    justify?: Justify
    wrap?: boolean
    tag?: string
  }>(),
  { gap: 'md', align: 'center', justify: 'start', wrap: true, tag: 'div' },
)

const alignClass: Record<Align, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  baseline: 'items-baseline',
}

const justifyClass: Record<Justify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
}

const classes = computed(() => [
  'flex flex-row',
  props.wrap ? 'flex-wrap' : 'flex-nowrap',
  gapClass[props.gap],
  alignClass[props.align],
  justifyClass[props.justify],
])
</script>

<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>
