<script setup lang="ts">
import { useSlots } from 'vue'
import type { NavItem, User } from '../../internal/nav'

defineProps<{
  nav: NavItem[]
  user: User
}>()

const slots = useSlots()
</script>

<template>
  <div class="min-h-screen bg-white">
    <aside
      class="fixed inset-y-0 left-0 hidden w-64 flex-col gap-6 border-r border-tone-neutral-500/20 bg-white px-4 py-6 lg:flex"
    >
      <div class="flex shrink-0 items-center">
        <slot name="brand" />
      </div>
      <nav class="flex flex-1 flex-col gap-6">
        <ul role="list" class="space-y-1">
          <li v-for="item in nav" :key="item.to">
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
                v-if="item.icon"
                :is="item.icon"
                class="h-5 w-5 shrink-0"
                aria-hidden="true"
              />
              <span>{{ item.label }}</span>
            </a>
          </li>
        </ul>
        <slot name="nav-extra" />
      </nav>
      <div class="flex items-center gap-x-3 border-t border-tone-neutral-500/20 pt-4">
        <img
          :src="user.avatar"
          :alt="user.name"
          class="h-8 w-8 rounded-full bg-tone-neutral-50 object-cover"
        />
        <span class="text-sm font-medium text-tone-neutral-700">{{ user.name }}</span>
      </div>
    </aside>
    <div class="lg:pl-64">
      <div
        v-if="slots.topbar"
        class="sticky top-0 z-10 flex h-16 items-center gap-x-4 border-b border-tone-neutral-500/20 bg-white px-4 sm:px-6 lg:px-8"
      >
        <slot name="topbar" />
      </div>
      <main class="flex flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <slot />
      </main>
    </div>
  </div>
</template>
