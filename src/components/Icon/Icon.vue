<script setup lang="ts">
import { computed, type Component } from 'vue'
import type { Size } from '../../tokens'
import { iconBox } from '../../internal/size'

const props = withDefaults(
  defineProps<{
    src: Component
    size?: Size
  }>(),
  { size: 'md' },
)

const classes = computed(() => ['inline-block shrink-0', iconBox[props.size]])
</script>

<template>
  <component :is="src" :class="classes" aria-hidden="true" />
</template>
