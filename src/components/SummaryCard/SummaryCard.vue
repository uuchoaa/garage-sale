<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots()
</script>

<template>
  <aside class="flex flex-col rounded-lg bg-white ring-1 ring-inset ring-tone-neutral-500/10">
    <div v-if="slots.title" class="border-b border-tone-neutral-500/10 px-5 py-4">
      <slot name="title" />
    </div>
    <dl class="flex flex-col divide-y divide-tone-neutral-500/10 px-5">
      <slot />
    </dl>
    <div
      v-if="slots.footer"
      class="border-t border-tone-neutral-500/10 px-5 py-4 text-sm"
    >
      <slot name="footer" />
    </div>
  </aside>
</template>
