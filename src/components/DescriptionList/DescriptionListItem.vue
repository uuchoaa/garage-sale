<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <div class="flex items-baseline justify-between gap-3 py-3 text-sm">
    <dt class="text-tone-neutral-500">{{ label }}</dt>
    <dd class="text-tone-neutral-700">
      <slot />
    </dd>
  </div>
</template>
