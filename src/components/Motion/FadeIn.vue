<script setup lang="ts">
import { computed } from 'vue'
import type { Duration, Easing } from '../../tokens'

const props = withDefaults(
  defineProps<{
    duration?: Duration
    easing?: Easing
    delay?: Duration
    appear?: boolean
  }>(),
  { duration: 'normal', easing: 'enter', appear: true },
)

const style = computed(() => ({
  transitionDuration: `var(--duration-${props.duration})`,
  transitionTimingFunction: `var(--ease-${props.easing})`,
  transitionDelay: props.delay ? `var(--duration-${props.delay})` : undefined,
}))
</script>

<template>
  <transition
    :appear="appear"
    enter-active-class="transition-opacity"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div :style="style"><slot /></div>
  </transition>
</template>
