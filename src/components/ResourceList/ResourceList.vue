<script setup lang="ts" generic="T extends Record<string, any>">
withDefaults(
  defineProps<{
    items: T[]
    itemHref?: string
  }>(),
  {},
)

defineSlots<{
  leading?(props: { item: T }): unknown
  title(props: { item: T }): unknown
  meta?(props: { item: T }): unknown
  trailing?(props: { item: T }): unknown
}>()

function resolve(item: T, path?: string): string | undefined {
  if (!path) return undefined
  const value = path.split('.').reduce<any>((acc, key) => (acc == null ? acc : acc[key]), item)
  return typeof value === 'string' ? value : undefined
}
</script>

<template>
  <ul role="list" class="divide-y divide-tone-neutral-500/10">
    <li v-for="(item, i) in items" :key="i">
      <component
        :is="itemHref ? 'a' : 'div'"
        :href="resolve(item, itemHref)"
        class="flex items-center gap-x-4 px-4 py-4 hover:bg-tone-neutral-50/70"
      >
        <div v-if="$slots.leading" class="shrink-0">
          <slot name="leading" :item="item" />
        </div>
        <div class="min-w-0 flex-1">
          <div class="truncate text-sm text-tone-neutral-700">
            <slot name="title" :item="item" />
          </div>
          <div v-if="$slots.meta" class="mt-1 truncate text-xs text-tone-neutral-500">
            <slot name="meta" :item="item" />
          </div>
        </div>
        <div v-if="$slots.trailing" class="shrink-0">
          <slot name="trailing" :item="item" />
        </div>
      </component>
    </li>
  </ul>
</template>
