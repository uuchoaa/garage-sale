<script setup lang="ts">
import type { Duration } from '../../tokens'

withDefaults(
  defineProps<{
    open: boolean
    duration?: Duration
  }>(),
  { duration: 'fast' },
)

function beforeEnter(el: Element) {
  const e = el as HTMLElement
  e.style.height = '0'
  e.style.opacity = '0'
}
function enter(el: Element, done: () => void) {
  const e = el as HTMLElement
  requestAnimationFrame(() => {
    e.style.height = `${e.scrollHeight}px`
    e.style.opacity = '1'
    const onEnd = () => {
      e.style.height = 'auto'
      e.removeEventListener('transitionend', onEnd)
      done()
    }
    e.addEventListener('transitionend', onEnd)
  })
}
function leave(el: Element, done: () => void) {
  const e = el as HTMLElement
  e.style.height = `${e.scrollHeight}px`
  requestAnimationFrame(() => {
    e.style.height = '0'
    e.style.opacity = '0'
    const onEnd = () => {
      e.removeEventListener('transitionend', onEnd)
      done()
    }
    e.addEventListener('transitionend', onEnd)
  })
}
</script>

<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <div
      v-if="open"
      class="overflow-hidden transition-[height,opacity]"
      :style="{ transitionDuration: `var(--duration-${duration})`, transitionTimingFunction: 'var(--ease-standard)' }"
    >
      <slot />
    </div>
  </transition>
</template>
