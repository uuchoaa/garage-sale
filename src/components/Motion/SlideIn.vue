<script setup lang="ts">
import { computed } from 'vue'
import type { Distance, Duration, Easing } from '../../tokens'

type From = 'up' | 'down' | 'left' | 'right'

const props = withDefaults(
  defineProps<{
    from?: From
    distance?: Distance
    duration?: Duration
    easing?: Easing
  }>(),
  { from: 'up', distance: 'md', duration: 'normal', easing: 'enter' },
)

const distancePx: Record<Distance, number> = { sm: 4, md: 12, lg: 24 }

const offset = computed(() => {
  const d = distancePx[props.distance]
  switch (props.from) {
    case 'up':
      return `translate3d(0, ${d}px, 0)`
    case 'down':
      return `translate3d(0, -${d}px, 0)`
    case 'left':
      return `translate3d(${d}px, 0, 0)`
    case 'right':
      return `translate3d(-${d}px, 0, 0)`
  }
})

const style = computed(() => ({
  '--slide-offset': offset.value,
  transitionDuration: `var(--duration-${props.duration})`,
  transitionTimingFunction: `var(--ease-${props.easing})`,
}))
</script>

<template>
  <transition
    appear
    enter-active-class="transition-[opacity,transform]"
    enter-from-class="opacity-0 translate3d-slide"
    enter-to-class="opacity-100"
    leave-active-class="transition-[opacity,transform]"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0 translate3d-slide"
  >
    <div :style="style"><slot /></div>
  </transition>
</template>

<style scoped>
.translate3d-slide {
  transform: var(--slide-offset);
}
@media (prefers-reduced-motion: reduce) {
  .translate3d-slide {
    transform: none;
  }
}
</style>
