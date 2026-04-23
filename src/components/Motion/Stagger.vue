<script setup lang="ts">
import { cloneVNode, computed, useSlots } from 'vue'
import type { Duration } from '../../tokens'

const props = withDefaults(
  defineProps<{
    childrenDelay?: Duration
  }>(),
  { childrenDelay: 'fast' },
)

const slots = useSlots()

const staggered = computed(() => {
  const nodes = slots.default?.() ?? []
  const perChild = props.childrenDelay === 'slow' ? 320 : props.childrenDelay === 'normal' ? 200 : 120
  return nodes.map((node, i) =>
    cloneVNode(node, {
      style: { ...(node.props?.style as object | undefined), transitionDelay: `${i * (perChild / 4)}ms` },
    }),
  )
})
</script>

<template>
  <component :is="'div'">
    <component :is="node" v-for="(node, i) in staggered" :key="i" />
  </component>
</template>
