<script setup lang="ts">
import { computed } from 'vue'
import type { Size } from '../../tokens'
import { mediaBox } from '../../internal/size'

const props = withDefaults(
  defineProps<{
    src: string
    alt: string
    size?: Size
  }>(),
  { size: 'md' },
)

const classes = computed(() => ['inline-block rounded-md object-cover', mediaBox[props.size]])
</script>

<template>
  <img :src="src" :alt="alt" :class="classes" />
</template>
