<script setup lang="ts" generic="T extends { id: string; kind?: string }">
defineProps<{
  items: T[]
}>()

defineSlots<{
  event(props: { item: T }): unknown
  comment(props: { item: T }): unknown
}>()
</script>

<template>
  <ol role="list" class="relative flex flex-col gap-4 border-l border-tone-neutral-500/20 pl-6">
    <li
      v-for="item in items"
      :key="item.id"
      class="relative"
    >
      <span
        class="absolute -left-[calc(1.5rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-tone-neutral-500/60 ring-4 ring-white"
        aria-hidden="true"
      />
      <template v-if="item.kind === 'commented'">
        <div class="flex gap-3 rounded-md bg-tone-neutral-50/60 p-3">
          <slot name="comment" :item="item" />
        </div>
      </template>
      <template v-else>
        <div class="flex flex-wrap items-baseline gap-x-2 text-sm">
          <slot name="event" :item="item" />
        </div>
      </template>
    </li>
  </ol>
</template>
