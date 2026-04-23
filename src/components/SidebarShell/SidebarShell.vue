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
  <div>
    <div class="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
      <div
        class="flex grow flex-col gap-y-5 overflow-y-auto bg-tone-neutral-50 px-6 ring-1 ring-tone-neutral-500/15"
      >
        <div class="flex h-16 shrink-0 items-center">
          <slot name="brand" />
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in nav" :key="item.to">
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
                      v-if="item.icon"
                      :is="item.icon"
                      :class="[
                        item.current
                          ? 'text-tone-accent-700'
                          : 'text-tone-neutral-500 group-hover:text-tone-accent-700',
                        'size-6 shrink-0',
                      ]"
                      aria-hidden="true"
                    />
                    {{ item.label }}
                  </a>
                </li>
              </ul>
            </li>
            <slot name="nav-extra" />
            <li class="-mx-6 mt-auto">
              <a
                href="#"
                class="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-tone-neutral-700 hover:bg-tone-neutral-100"
              >
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
                <span class="sr-only">Your profile</span>
                <span aria-hidden="true">{{ user.name }}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="xl:pl-72">
      <div
        v-if="slots.topbar"
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-tone-neutral-500/15 bg-white px-4 shadow-xs sm:px-6 lg:px-8"
      >
        <slot name="topbar" />
      </div>

      <main :class="slots.rail ? 'lg:pr-96' : ''">
        <slot />
      </main>

      <aside
        v-if="slots.rail"
        class="bg-tone-neutral-50 lg:fixed lg:top-16 lg:right-0 lg:bottom-0 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-tone-neutral-500/15"
      >
        <slot name="rail" />
      </aside>
    </div>
  </div>
</template>
