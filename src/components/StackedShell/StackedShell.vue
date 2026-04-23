<script setup lang="ts">
import type { NavItem, User } from '../../internal/nav'

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
                ? 'bg-tone-neutral-50 text-tone-accent-700'
                : 'text-tone-neutral-700 hover:bg-tone-neutral-50',
            ]"
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="flex items-center gap-x-3">
          <img
            :src="user.avatar"
            :alt="user.name"
            class="h-8 w-8 rounded-full bg-tone-neutral-50 object-cover"
          />
        </div>
      </div>
    </header>
    <main class="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>
