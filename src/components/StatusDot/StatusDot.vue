<script setup lang="ts">
import { computed } from 'vue'
import type { Tone } from '../../tokens'
import { dotClass } from '../../internal/tone'

const props = defineProps<{
  tone: Tone
}>()

const classes = computed(() => [
  'inline-block h-2 w-2 rounded-full ring-2 ring-white',
  dotClass[props.tone],
])
</script>

<template>
  <span :class="classes" aria-hidden="true" />
</template>
