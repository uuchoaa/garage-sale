<script setup lang="ts">
import { computed } from 'vue'
import type { Size } from '../../tokens'
import { mediaBox } from '../../internal/size'

const props = withDefaults(
  defineProps<{
    src?: string
    alt: string
    size?: Size
    fallback?: string
  }>(),
  { size: 'md' },
)

const boxClass = computed(() => [
  'inline-flex items-center justify-center rounded-full bg-tone-neutral-50 object-cover text-tone-neutral-700',
  mediaBox[props.size],
])
</script>

<template>
  <img v-if="src" :src="src" :alt="alt" :class="boxClass" />
  <span v-else :class="boxClass" :aria-label="alt" role="img">
    <span class="text-sm font-medium">{{ fallback }}</span>
  </span>
</template>
