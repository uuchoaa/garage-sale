<script setup lang="ts" generic="T extends { id: string }">
defineProps<{
  items: T[]
}>()

defineSlots<{
  header(props: { item: T }): unknown
  body(props: { item: T }): unknown
}>()
</script>

<template>
  <ul role="list" class="flex flex-col gap-4">
    <li v-for="item in items" :key="item.id" class="flex flex-col gap-1">
      <div class="flex flex-wrap items-center gap-x-2 text-xs text-tone-neutral-500">
        <slot name="header" :item="item" />
      </div>
      <div class="text-sm text-tone-neutral-700">
        <slot name="body" :item="item" />
      </div>
    </li>
  </ul>
</template>
