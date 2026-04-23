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
  <li>
    <div v-if="title" class="text-xs/6 font-semibold text-tone-neutral-500">
      {{ title }}
    </div>
    <ul role="list" class="-mx-2 mt-2 space-y-1">
      <li v-for="item in items" :key="item.to">
        <a
          :href="item.to"
          :class="[
            item.current
              ? 'bg-tone-neutral-100 text-tone-accent-700'
              : 'text-tone-neutral-700 hover:bg-tone-neutral-100 hover:text-tone-accent-700',
            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
          ]"
        >
          <component
            v-if="variant === 'icons' && item.icon"
            :is="item.icon"
            :class="[
              item.current
                ? 'text-tone-accent-700'
                : 'text-tone-neutral-500 group-hover:text-tone-accent-700',
              'size-6 shrink-0',
            ]"
            aria-hidden="true"
          />
          <span
            v-else-if="variant === 'initials'"
            :class="[
              item.current
                ? 'border-tone-accent-700 text-tone-accent-700'
                : 'border-tone-neutral-500/20 text-tone-neutral-500 group-hover:border-tone-accent-700 group-hover:text-tone-accent-700',
              'flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
            ]"
            aria-hidden="true"
          >
            {{ item.initial }}
          </span>
          <span class="truncate">{{ item.label }}</span>
        </a>
      </li>
    </ul>
  </li>
</template>
