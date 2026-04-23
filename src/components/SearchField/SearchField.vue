<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

withDefaults(
  defineProps<{
    placeholder?: string
    value?: string
    variant?: 'standalone' | 'bare'
  }>(),
  { variant: 'standalone' },
)

defineEmits<{
  (e: 'update:value', value: string): void
}>()
</script>

<template>
  <form
    v-if="variant === 'bare'"
    class="grid flex-1 grid-cols-1"
    action="#"
    method="GET"
  >
    <input
      type="search"
      name="search"
      :value="value"
      :placeholder="placeholder ?? 'Search'"
      :aria-label="placeholder ?? 'Search'"
      class="col-start-1 row-start-1 block size-full bg-transparent pl-8 text-base text-tone-neutral-700 outline-hidden placeholder:text-tone-neutral-500 sm:text-sm/6"
      @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
    />
    <MagnifyingGlassIcon
      class="pointer-events-none col-start-1 row-start-1 size-5 self-center text-tone-neutral-500"
      aria-hidden="true"
    />
  </form>
  <div v-else class="relative w-full">
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
