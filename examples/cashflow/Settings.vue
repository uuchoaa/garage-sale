<script setup lang="ts">
import { StackedShell, type NavItem } from 'wise-ui'
import {
  BellIcon,
  CreditCardIcon,
  CubeIcon,
  FingerPrintIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/vue/24/outline'
import type { Component } from 'vue'

const nav: NavItem[] = [
  { label: 'Home',     to: '#' },
  { label: 'Invoices', to: '#' },
  { label: 'Clients',  to: '#' },
  { label: 'Expenses', to: '#' },
]

const user = {
  name: 'Tom Cook',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

type SecondaryNav = { name: string; href: string; icon: Component; current?: boolean }

const secondaryNavigation: SecondaryNav[] = [
  { name: 'General',       href: '#', icon: UserCircleIcon,  current: true  },
  { name: 'Security',      href: '#', icon: FingerPrintIcon, current: false },
  { name: 'Notifications', href: '#', icon: BellIcon,        current: false },
  { name: 'Plan',          href: '#', icon: CubeIcon,        current: false },
  { name: 'Billing',       href: '#', icon: CreditCardIcon,  current: false },
  { name: 'Team members',  href: '#', icon: UsersIcon,       current: false },
]
</script>

<template>
  <StackedShell :nav="nav" :user="user">
    <template #brand>
      <img
        class="h-8 w-auto"
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
    </template>

    <div class="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
      <h1 class="sr-only">General Settings</h1>

      <aside
        class="flex overflow-x-auto border-b border-tone-neutral-500/10 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20"
      >
        <nav class="flex-none px-4 sm:px-6 lg:px-0">
          <ul role="list" class="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
            <li v-for="item in secondaryNavigation" :key="item.name">
              <a
                :href="item.href"
                :class="[
                  item.current
                    ? 'bg-tone-neutral-50 text-tone-accent-700'
                    : 'text-tone-neutral-700 hover:bg-tone-neutral-50 hover:text-tone-accent-700',
                  'group flex gap-x-3 rounded-md py-2 pr-3 pl-2 text-sm/6 font-semibold',
                ]"
              >
                <component
                  :is="item.icon"
                  :class="[
                    item.current
                      ? 'text-tone-accent-700'
                      : 'text-tone-neutral-500 group-hover:text-tone-accent-700',
                    'size-6 shrink-0',
                  ]"
                  aria-hidden="true"
                />
                {{ item.name }}
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
        <div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
          <div>
            <h2 class="text-base/7 font-semibold text-tone-neutral-700">Profile</h2>
            <p class="mt-1 text-sm/6 text-tone-neutral-500">
              This information will be displayed publicly so be careful what you share.
            </p>

            <dl
              class="mt-6 divide-y divide-tone-neutral-500/10 border-t border-tone-neutral-500/15 text-sm/6"
            >
              <div class="py-6 sm:flex">
                <dt class="font-medium text-tone-neutral-700 sm:w-64 sm:flex-none sm:pr-6">
                  Full name
                </dt>
                <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div class="text-tone-neutral-700">Tom Cook</div>
                  <button
                    type="button"
                    class="font-semibold text-tone-accent-700 hover:text-tone-accent-500"
                  >
                    Update
                  </button>
                </dd>
              </div>
              <div class="py-6 sm:flex">
                <dt class="font-medium text-tone-neutral-700 sm:w-64 sm:flex-none sm:pr-6">
                  Email address
                </dt>
                <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div class="text-tone-neutral-700">tom.cook@example.com</div>
                  <button
                    type="button"
                    class="font-semibold text-tone-accent-700 hover:text-tone-accent-500"
                  >
                    Update
                  </button>
                </dd>
              </div>
              <div class="py-6 sm:flex">
                <dt class="font-medium text-tone-neutral-700 sm:w-64 sm:flex-none sm:pr-6">
                  Title
                </dt>
                <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div class="text-tone-neutral-700">Human Resources Manager</div>
                  <button
                    type="button"
                    class="font-semibold text-tone-accent-700 hover:text-tone-accent-500"
                  >
                    Update
                  </button>
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 class="text-base/7 font-semibold text-tone-neutral-700">Bank accounts</h2>
            <p class="mt-1 text-sm/6 text-tone-neutral-500">
              Connect bank accounts to your account.
            </p>

            <ul
              role="list"
              class="mt-6 divide-y divide-tone-neutral-500/10 border-t border-tone-neutral-500/15 text-sm/6"
            >
              <li class="flex justify-between gap-x-6 py-6">
                <div class="font-medium text-tone-neutral-700">TD Canada Trust</div>
                <button
                  type="button"
                  class="font-semibold text-tone-accent-700 hover:text-tone-accent-500"
                >
                  Update
                </button>
              </li>
              <li class="flex justify-between gap-x-6 py-6">
                <div class="font-medium text-tone-neutral-700">Royal Bank of Canada</div>
                <button
                  type="button"
                  class="font-semibold text-tone-accent-700 hover:text-tone-accent-500"
                >
                  Update
                </button>
              </li>
            </ul>

            <div class="flex border-t border-tone-neutral-500/10 pt-6">
              <button
                type="button"
                class="text-sm/6 font-semibold text-tone-accent-700 hover:text-tone-accent-500"
              >
                <span aria-hidden="true">+</span> Add another bank
              </button>
            </div>
          </div>

          <div>
            <h2 class="text-base/7 font-semibold text-tone-neutral-700">Integrations</h2>
            <p class="mt-1 text-sm/6 text-tone-neutral-500">
              Connect applications to your account.
            </p>

            <ul
              role="list"
              class="mt-6 divide-y divide-tone-neutral-500/10 border-t border-tone-neutral-500/15 text-sm/6"
            >
              <li class="flex justify-between gap-x-6 py-6">
                <div class="font-medium text-tone-neutral-700">QuickBooks</div>
                <button
                  type="button"
                  class="font-semibold text-tone-accent-700 hover:text-tone-accent-500"
                >
                  Update
                </button>
              </li>
            </ul>

            <div class="flex border-t border-tone-neutral-500/10 pt-6">
              <button
                type="button"
                class="text-sm/6 font-semibold text-tone-accent-700 hover:text-tone-accent-500"
              >
                <span aria-hidden="true">+</span> Add another application
              </button>
            </div>
          </div>

          <div>
            <h2 class="text-base/7 font-semibold text-tone-neutral-700">Language and dates</h2>
            <p class="mt-1 text-sm/6 text-tone-neutral-500">
              Choose what language and date format to use throughout your account.
            </p>

            <dl
              class="mt-6 divide-y divide-tone-neutral-500/10 border-t border-tone-neutral-500/15 text-sm/6"
            >
              <div class="py-6 sm:flex">
                <dt class="font-medium text-tone-neutral-700 sm:w-64 sm:flex-none sm:pr-6">
                  Language
                </dt>
                <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div class="text-tone-neutral-700">English</div>
                  <button
                    type="button"
                    class="font-semibold text-tone-accent-700 hover:text-tone-accent-500"
                  >
                    Update
                  </button>
                </dd>
              </div>
              <div class="py-6 sm:flex">
                <dt class="font-medium text-tone-neutral-700 sm:w-64 sm:flex-none sm:pr-6">
                  Date format
                </dt>
                <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div class="text-tone-neutral-700">DD-MM-YYYY</div>
                  <button
                    type="button"
                    class="font-semibold text-tone-accent-700 hover:text-tone-accent-500"
                  >
                    Update
                  </button>
                </dd>
              </div>
              <div class="flex pt-6">
                <dt class="font-medium text-tone-neutral-700 sm:w-64 sm:flex-none sm:pr-6">
                  Automatic timezone
                </dt>
                <dd class="flex flex-auto items-center justify-end">
                  <div
                    class="group relative inline-flex w-8 shrink-0 rounded-full bg-tone-neutral-500/15 p-px inset-ring inset-ring-tone-neutral-500/10 outline-offset-2 outline-tone-accent-700 transition-colors duration-200 ease-in-out has-checked:bg-tone-accent-700 has-focus-visible:outline-2"
                  >
                    <span
                      class="size-4 rounded-full bg-white shadow-xs ring-1 ring-tone-neutral-500/15 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5"
                    />
                    <input
                      type="checkbox"
                      class="absolute inset-0 size-full appearance-none focus:outline-hidden"
                      aria-label="Automatic timezone"
                      name="automatic-timezone"
                      :checked="true"
                    />
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  </StackedShell>
</template>
