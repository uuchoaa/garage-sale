<script setup lang="ts">
defineProps<{
  summary: string
  hasPrev: boolean
  hasNext: boolean
}>()

defineEmits<{
  (e: 'prev'): void
  (e: 'next'): void
}>()

const buttonBase =
  'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium ring-1 ring-inset ring-tone-neutral-500/20 text-tone-neutral-700 hover:bg-tone-neutral-50 disabled:cursor-not-allowed disabled:opacity-50'
</script>

<template>
  <nav class="flex items-center justify-between gap-3">
    <p class="text-sm text-tone-neutral-500">{{ summary }}</p>
    <div class="flex items-center gap-2">
      <button type="button" :class="buttonBase" :disabled="!hasPrev" @click="$emit('prev')">
        Anterior
      </button>
      <button type="button" :class="buttonBase" :disabled="!hasNext" @click="$emit('next')">
        Próximo
      </button>
    </div>
  </nav>
</template>
