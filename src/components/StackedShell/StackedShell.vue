<script setup lang="ts">
import { BellIcon } from '@heroicons/vue/24/outline'
import type { NavItem, User } from '../../internal/nav'
import Avatar from '../Avatar/Avatar.vue'
import Icon from '../Icon/Icon.vue'
import VisuallyHidden from '../VisuallyHidden/VisuallyHidden.vue'

defineProps<{
  nav: NavItem[]
  user: User
}>()
</script>

<template>
  <div class="min-h-screen bg-white">
    <header class="border-b border-tone-neutral-500/20 bg-white">
      <div class="mx-auto flex h-16 max-w-7xl items-center gap-x-6 px-4 sm:px-6 lg:px-8">
        <div class="flex shrink-0 items-center">
          <slot name="brand" />
        </div>
        <nav class="flex flex-1 items-center gap-x-4">
          <a
            v-for="item in nav"
            :key="item.to"
            :href="item.to"
            :class="[
              'rounded-md px-3 py-2 text-sm font-medium',
              item.current
                ? 'bg-tone-neutral-50 text-tone-neutral-700'
                : 'text-tone-neutral-500 hover:bg-tone-neutral-50 hover:text-tone-neutral-700',
            ]"
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="flex items-center gap-x-4">
          <button
            type="button"
            class="rounded-full p-1 text-tone-neutral-500 hover:text-tone-neutral-700"
          >
            <VisuallyHidden>View notifications</VisuallyHidden>
            <Icon :src="BellIcon" size="md" aria-hidden="true" />
          </button>
          <Avatar :src="user.avatar" :alt="user.name" size="md" />
        </div>
      </div>
    </header>
    <main class="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>
