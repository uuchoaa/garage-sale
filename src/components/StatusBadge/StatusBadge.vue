<script setup lang="ts">
import { computed } from 'vue'
import type { Tone } from '../../tokens'
import { badgeClass } from '../../internal/tone'

const props = defineProps<{
  tone: Tone
  label: string
}>()

const classes = computed(() => [
  'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
  badgeClass[props.tone],
])
</script>

<template>
  <span :class="classes">{{ label }}</span>
</template>
