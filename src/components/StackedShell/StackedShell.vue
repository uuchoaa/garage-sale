<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { Bars3Icon } from '@heroicons/vue/20/solid'
import type { NavItem, User } from '../../internal/nav'
import Avatar from '../Avatar/Avatar.vue'
import Icon from '../Icon/Icon.vue'
import VisuallyHidden from '../VisuallyHidden/VisuallyHidden.vue'

defineProps<{
  nav: NavItem[]
  user: User
}>()

const mobileMenuOpen = ref(false)
</script>

<template>
  <header class="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-tone-neutral-500/15">
    <div class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <div class="flex flex-1 items-center gap-x-6">
        <button
          type="button"
          class="-m-3 p-3 md:hidden"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="size-5 text-tone-neutral-700" aria-hidden="true" />
        </button>
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
          <Avatar v-else :alt="user.name" size="md" />
        </a>
      </div>
    </div>

    <Dialog class="md:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-50" />
      <DialogPanel
        class="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-tone-neutral-500/15"
      >
        <div class="-ml-0.5 flex h-16 items-center gap-x-6">
          <button
            type="button"
            class="-m-2.5 p-2.5 text-tone-neutral-700"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="size-6" aria-hidden="true" />
          </button>
          <div class="-ml-0.5">
            <slot name="brand" />
          </div>
        </div>
        <div class="mt-2 space-y-2">
          <a
            v-for="item in nav"
            :key="item.to"
            :href="item.to"
            :class="[
              item.current
                ? 'bg-tone-neutral-50 text-tone-accent-700'
                : 'text-tone-neutral-700 hover:bg-tone-neutral-50',
              '-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold',
            ]"
            @click="mobileMenuOpen = false"
          >
            {{ item.label }}
          </a>
        </div>
      </DialogPanel>
    </Dialog>
  </header>

  <main>
    <slot />
  </main>
</template>
