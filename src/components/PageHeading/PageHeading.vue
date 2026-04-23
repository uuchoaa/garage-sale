<script setup lang="ts">
import { useSlots } from 'vue'

defineProps<{
  title: string
}>()

const slots = useSlots()
</script>

<template>
  <header class="pt-6 pb-4 sm:pb-6">
    <div
      class="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8"
    >
      <h1 class="text-base/7 font-semibold text-tone-neutral-700">{{ title }}</h1>
      <div
        v-if="slots.nav"
        class="order-last flex w-full sm:order-0 sm:w-auto sm:border-l sm:border-tone-neutral-500/20 sm:pl-6"
      >
        <slot name="nav" />
      </div>
      <div v-if="slots.actions" class="ml-auto flex items-center gap-x-2">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>
