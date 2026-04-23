<script setup lang="ts">
import type { NavGroupItem } from '../../internal/nav'

type Variant = 'icons' | 'initials'

withDefaults(
  defineProps<{
    title?: string
    items: NavGroupItem[]
    variant?: Variant
  }>(),
  { variant: 'icons' },
)
</script>

<template>
  <div>
    <div
      v-if="title"
      class="px-2 text-xs font-semibold uppercase tracking-wider text-tone-neutral-500"
    >
      {{ title }}
    </div>
    <ul role="list" class="mt-2 space-y-1">
      <li v-for="item in items" :key="item.to">
        <a
          :href="item.to"
          :class="[
            'group flex items-center gap-x-3 rounded-md px-2 py-2 text-sm font-medium',
            item.current
              ? 'bg-tone-neutral-50 text-tone-accent-700'
              : 'text-tone-neutral-700 hover:bg-tone-neutral-50',
          ]"
        >
          <component
            v-if="variant === 'icons' && item.icon"
            :is="item.icon"
            class="h-5 w-5 shrink-0 text-tone-neutral-500 group-hover:text-tone-neutral-700"
            aria-hidden="true"
          />
          <span
            v-else-if="variant === 'initials'"
            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-tone-neutral-500/20 bg-white text-[0.625rem] font-medium text-tone-neutral-500 group-hover:text-tone-neutral-700"
            aria-hidden="true"
          >
            {{ item.initial }}
          </span>
          <span class="truncate">{{ item.label }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>
