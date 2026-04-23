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
    class="overflow-hidden rounded-xl outline outline-tone-neutral-500/15"
  >
    <div
      v-if="slots.header || slots['header-trailing']"
      class="flex items-center gap-x-4 border-b border-tone-neutral-500/10 bg-tone-neutral-50 p-6"
    >
      <div class="min-w-0 flex-1">
        <slot name="header" />
      </div>
      <div v-if="slots['header-trailing']" class="shrink-0">
        <slot name="header-trailing" />
      </div>
    </div>
    <div class="px-6 py-4">
      <slot />
    </div>
  </component>
</template>
