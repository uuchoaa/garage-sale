<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

defineProps<{
  placeholder?: string
  value?: string
}>()

defineEmits<{
  (e: 'update:value', value: string): void
}>()
</script>

<template>
  <div class="relative w-full">
    <MagnifyingGlassIcon
      class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-tone-neutral-500"
      aria-hidden="true"
    />
    <input
      type="search"
      :value="value"
      :placeholder="placeholder"
      class="block w-full rounded-md border-0 bg-white py-2 pl-10 pr-3 text-sm text-tone-neutral-700 ring-1 ring-inset ring-tone-neutral-500/20 placeholder:text-tone-neutral-500 focus:ring-2 focus:ring-inset focus:ring-tone-accent-700 focus:outline-none"
      @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
