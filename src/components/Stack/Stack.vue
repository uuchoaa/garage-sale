<script setup lang="ts">
import { computed } from 'vue'
import type { Gap } from '../../tokens'
import { gapClass } from '../../internal/gap'

type Align = 'start' | 'center' | 'end' | 'stretch'

const props = withDefaults(
  defineProps<{
    gap?: Gap
    align?: Align
    tag?: string
  }>(),
  { gap: 'md', align: 'stretch', tag: 'div' },
)

const alignClass: Record<Align, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
}

const classes = computed(() => ['flex flex-col', gapClass[props.gap], alignClass[props.align]])
</script>

<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>
