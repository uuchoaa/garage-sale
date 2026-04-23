<script setup lang="ts">
import { computed } from 'vue'
import type { Breakpoint, Gap } from '../../tokens'
import { gapClass } from '../../internal/gap'

type Cols = number | Partial<Record<Breakpoint, number>>

const props = withDefaults(
  defineProps<{
    cols?: Cols
    gap?: Gap
    tag?: string
  }>(),
  { cols: 1, gap: 'md', tag: 'div' },
)

// Static lookup — Tailwind's JIT must see the full class strings to emit them.
const colsClass: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
}

const responsivePrefix: Record<Breakpoint, string> = {
  base: '',
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
  xl: 'xl:',
}

const responsiveColsClass: Record<Breakpoint, Record<number, string>> = {
  base: colsClass,
  sm: Object.fromEntries(Object.entries(colsClass).map(([k, v]) => [k, `sm:${v}`])) as Record<number, string>,
  md: Object.fromEntries(Object.entries(colsClass).map(([k, v]) => [k, `md:${v}`])) as Record<number, string>,
  lg: Object.fromEntries(Object.entries(colsClass).map(([k, v]) => [k, `lg:${v}`])) as Record<number, string>,
  xl: Object.fromEntries(Object.entries(colsClass).map(([k, v]) => [k, `xl:${v}`])) as Record<number, string>,
}

const colClasses = computed<string[]>(() => {
  if (typeof props.cols === 'number') return [colsClass[props.cols] ?? 'grid-cols-1']
  return (Object.entries(props.cols) as [Breakpoint, number][]).map(
    ([bp, n]) => responsiveColsClass[bp][n] ?? `${responsivePrefix[bp]}grid-cols-1`,
  )
})

const classes = computed(() => ['grid', ...colClasses.value, gapClass[props.gap]])
</script>

<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>
