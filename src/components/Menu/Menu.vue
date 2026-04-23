<script setup lang="ts">
import { Menu as HMenu, MenuButton, MenuItems } from '@headlessui/vue'
</script>

<template>
  <HMenu as="div" class="relative inline-block text-left">
    <MenuButton
      class="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-tone-neutral-700 hover:bg-tone-neutral-50"
    >
      <slot name="trigger" />
    </MenuButton>
    <transition
      enter-active-class="transition ease-out duration-[var(--duration-fast)]"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-[var(--duration-fast)]"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-tone-neutral-500/20 focus:outline-none"
      >
        <slot />
      </MenuItems>
    </transition>
  </HMenu>
</template>
