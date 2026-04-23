<script setup lang="ts">
defineProps<{
  for?: string
  required?: boolean
}>()
</script>

<template>
  <label :for="$props.for" class="block text-sm font-medium text-tone-neutral-700">
    <slot />
    <span v-if="required" class="text-tone-negative-700" aria-hidden="true"> *</span>
  </label>
</template>
