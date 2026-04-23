<script setup lang="ts">
import { useSlots } from 'vue'

withDefaults(
  defineProps<{
    tag?: string
  }>(),
  { tag: 'div' },
)

const slots = useSlots()
</script>

<template>
  <component
    :is="tag"
    class="flex flex-col gap-4 rounded-lg bg-white p-5 ring-1 ring-inset ring-tone-neutral-500/10"
  >
    <div
      v-if="slots.header || slots['header-trailing']"
      class="flex items-center justify-between gap-3"
    >
      <div class="min-w-0 flex-1">
        <slot name="header" />
      </div>
      <div v-if="slots['header-trailing']" class="shrink-0">
        <slot name="header-trailing" />
      </div>
    </div>
    <slot />
  </component>
</template>
