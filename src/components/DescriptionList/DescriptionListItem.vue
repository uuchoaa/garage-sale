<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <div class="flex justify-between gap-x-4 py-3">
    <dt class="text-tone-neutral-500">{{ label }}</dt>
    <dd class="text-tone-neutral-700">
      <slot />
    </dd>
  </div>
</template>
