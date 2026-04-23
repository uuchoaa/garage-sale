<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon?: Component
  label: string
}>()
</script>

<template>
  <div class="flex items-center gap-3 py-3 text-sm">
    <component
      v-if="icon"
      :is="icon"
      class="h-5 w-5 shrink-0 text-tone-neutral-500"
      aria-hidden="true"
    />
    <dt class="text-tone-neutral-500">{{ label }}</dt>
    <dd class="ml-auto text-right text-tone-neutral-700">
      <slot />
    </dd>
  </div>
</template>
