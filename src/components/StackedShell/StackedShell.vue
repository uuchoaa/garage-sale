<script setup lang="ts">
import { useSlots } from 'vue'
import { BellIcon } from '@heroicons/vue/24/outline'
import type { NavItem, User } from '../../internal/nav'
import Icon from '../Icon/Icon.vue'
import VisuallyHidden from '../VisuallyHidden/VisuallyHidden.vue'

defineProps<{
  nav: NavItem[]
  user: User
}>()

const slots = useSlots()
</script>

<template>
  <header class="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-tone-neutral-500/15">
    <div class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <div class="flex flex-1 items-center gap-x-6">
        <slot name="brand" />
      </div>
      <nav class="hidden md:flex md:gap-x-11 md:text-sm/6 md:font-semibold md:text-tone-neutral-700">
        <a v-for="item in nav" :key="item.to" :href="item.to">{{ item.label }}</a>
      </nav>
      <div class="flex flex-1 items-center justify-end gap-x-8">
        <button
          type="button"
          class="-m-2.5 p-2.5 text-tone-neutral-500 hover:text-tone-neutral-700"
        >
          <VisuallyHidden>View notifications</VisuallyHidden>
          <Icon :src="BellIcon" size="md" aria-hidden="true" />
        </button>
        <a href="#" class="-m-1.5 p-1.5">
          <VisuallyHidden>Your profile</VisuallyHidden>
          <img
            v-if="user.avatar"
            :src="user.avatar"
            :alt="user.name"
            class="size-8 rounded-full bg-tone-neutral-50 outline -outline-offset-1 outline-black/5 object-cover"
          />
          <span
            v-else
            :aria-label="user.name"
            class="inline-flex size-8 items-center justify-center rounded-full bg-tone-neutral-50 outline -outline-offset-1 outline-black/5 text-xs font-medium text-tone-neutral-700"
          >
            {{ user.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase() }}
          </span>
        </a>
      </div>
    </div>
  </header>

  <main>
    <slot />
  </main>
</template>
