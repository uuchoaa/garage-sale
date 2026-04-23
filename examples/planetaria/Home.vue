<script setup lang="ts">
import {
  SidebarShell,
  NavGroup,
  SearchField,
  type NavItem,
  type NavGroupItem,
} from 'wise-ui'
import { Menu as HuiMenu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
} from '@heroicons/vue/24/outline'
import { ChevronRightIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

type DeploymentStatus = 'offline' | 'online' | 'error'
type Environment = 'Preview' | 'Production'

type Deployment = {
  id: string
  href: string
  teamName: string
  projectName: string
  status: DeploymentStatus
  statusText: string
  description: string
  environment: Environment
}

type ActivityItem = {
  id: string
  user: { name: string; imageUrl: string }
  projectName: string
  commit: string
  branch: string
  date: string
  datetime: string
}

const nav: NavItem[] = [
  { label: 'Projects',    to: '#', icon: FolderIcon },
  { label: 'Deployments', to: '#', icon: ServerIcon, current: true },
  { label: 'Activity',    to: '#', icon: SignalIcon },
  { label: 'Domains',     to: '#', icon: GlobeAltIcon },
  { label: 'Usage',       to: '#', icon: ChartBarSquareIcon },
  { label: 'Settings',    to: '#', icon: Cog6ToothIcon },
]

const teams: NavGroupItem[] = [
  { label: 'Planetaria',    to: '#', initial: 'P' },
  { label: 'Protocol',      to: '#', initial: 'P' },
  { label: 'Tailwind Labs', to: '#', initial: 'T' },
]

const user = {
  name: 'Tom Cook',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const statusPill: Record<DeploymentStatus, string> = {
  offline: 'text-tone-neutral-500 bg-tone-neutral-500/10',
  online:  'text-tone-positive-500 bg-tone-positive-500/10',
  error:   'text-tone-negative-500 bg-tone-negative-500/10',
}

const envPill: Record<Environment, string> = {
  Preview:    'text-tone-neutral-500 bg-tone-neutral-50 ring-tone-neutral-500/15',
  Production: 'text-tone-accent-700 bg-tone-accent-50 ring-tone-accent-700/20',
}

const deployments: Deployment[] = [
  { id: '1', href: '#', projectName: 'ios-app',           teamName: 'Planetaria',    status: 'offline', statusText: 'Initiated 1m 32s ago', description: 'Deploys from GitHub', environment: 'Preview' },
  { id: '2', href: '#', projectName: 'mobile-api',        teamName: 'Planetaria',    status: 'online',  statusText: 'Deployed 3m ago',      description: 'Deploys from GitHub', environment: 'Production' },
  { id: '3', href: '#', projectName: 'tailwindcss.com',   teamName: 'Tailwind Labs', status: 'offline', statusText: 'Deployed 3h ago',      description: 'Deploys from GitHub', environment: 'Preview' },
  { id: '4', href: '#', projectName: 'company-website',   teamName: 'Tailwind Labs', status: 'online',  statusText: 'Deployed 1d ago',      description: 'Deploys from GitHub', environment: 'Preview' },
  { id: '5', href: '#', projectName: 'relay-service',     teamName: 'Protocol',      status: 'online',  statusText: 'Deployed 1d ago',      description: 'Deploys from GitHub', environment: 'Production' },
  { id: '6', href: '#', projectName: 'android-app',       teamName: 'Planetaria',    status: 'online',  statusText: 'Deployed 5d ago',      description: 'Deploys from GitHub', environment: 'Preview' },
  { id: '7', href: '#', projectName: 'api.protocol.chat', teamName: 'Protocol',      status: 'error',   statusText: 'Failed to deploy 6d ago', description: 'Deploys from GitHub', environment: 'Preview' },
  { id: '8', href: '#', projectName: 'planetaria.tech',   teamName: 'Planetaria',    status: 'online',  statusText: 'Deployed 6d ago',      description: 'Deploys from GitHub', environment: 'Preview' },
]

const activityItems: ActivityItem[] = [
  { id: '1', user: { name: 'Michael Foster', imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, projectName: 'ios-app',           commit: '2d89f0c8', branch: 'main', date: '1h', datetime: '2023-01-23T11:00' },
  { id: '2', user: { name: 'Lindsay Walton', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, projectName: 'mobile-api',        commit: '249df660', branch: 'main', date: '3h', datetime: '2023-01-23T09:00' },
  { id: '3', user: { name: 'Courtney Henry', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, projectName: 'ios-app',           commit: '11464223', branch: 'main', date: '12h', datetime: '2023-01-23T00:00' },
  { id: '4', user: { name: 'Courtney Henry', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, projectName: 'company-website',   commit: 'dad28e95', branch: 'main', date: '2d', datetime: '2023-01-21T13:00' },
  { id: '5', user: { name: 'Michael Foster', imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, projectName: 'relay-service',     commit: '624bc94c', branch: 'main', date: '5d', datetime: '2023-01-18T12:34' },
]
</script>

<template>
  <SidebarShell :nav="nav" :user="user">
    <template #brand>
      <img
        class="h-8 w-auto"
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
    </template>

    <template #nav-extra>
      <NavGroup title="Your teams" :items="teams" variant="initials" />
    </template>

    <template #topbar>
      <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <SearchField placeholder="Search" variant="bare" />
      </div>
    </template>

    <header
      class="flex items-center justify-between border-b border-tone-neutral-500/15 px-4 py-4 sm:px-6 sm:py-6 lg:px-8"
    >
      <h1 class="text-base/7 font-semibold text-tone-neutral-700">Deployments</h1>
      <HuiMenu as="div" class="relative">
        <MenuButton
          class="flex items-center gap-x-1 text-sm/6 font-medium text-tone-neutral-700"
        >
          Sort by
          <ChevronUpDownIcon class="size-5 text-tone-neutral-500" aria-hidden="true" />
        </MenuButton>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg outline-1 outline-tone-neutral-500/15"
          >
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                :class="[
                  active ? 'bg-tone-neutral-50 outline-hidden' : '',
                  'block px-3 py-1 text-sm/6 text-tone-neutral-700',
                ]"
                >Name</a
              >
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                :class="[
                  active ? 'bg-tone-neutral-50 outline-hidden' : '',
                  'block px-3 py-1 text-sm/6 text-tone-neutral-700',
                ]"
                >Date updated</a
              >
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                :class="[
                  active ? 'bg-tone-neutral-50 outline-hidden' : '',
                  'block px-3 py-1 text-sm/6 text-tone-neutral-700',
                ]"
                >Environment</a
              >
            </MenuItem>
          </MenuItems>
        </transition>
      </HuiMenu>
    </header>

    <ul role="list" class="divide-y divide-tone-neutral-500/10">
      <li
        v-for="deployment in deployments"
        :key="deployment.id"
        class="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
      >
        <div class="min-w-0 flex-auto">
          <div class="flex items-center gap-x-3">
            <div :class="[statusPill[deployment.status], 'flex-none rounded-full p-1']">
              <div class="size-2 rounded-full bg-current" />
            </div>
            <h2 class="min-w-0 text-sm/6 font-semibold text-tone-neutral-700">
              <a :href="deployment.href" class="flex gap-x-2">
                <span class="truncate">{{ deployment.teamName }}</span>
                <span class="text-tone-neutral-500">/</span>
                <span class="whitespace-nowrap">{{ deployment.projectName }}</span>
                <span class="absolute inset-0" />
              </a>
            </h2>
          </div>
          <div class="mt-3 flex items-center gap-x-2.5 text-xs/5 text-tone-neutral-500">
            <p class="truncate">{{ deployment.description }}</p>
            <svg viewBox="0 0 2 2" class="size-0.5 flex-none fill-tone-neutral-500">
              <circle cx="1" cy="1" r="1" />
            </svg>
            <p class="whitespace-nowrap">{{ deployment.statusText }}</p>
          </div>
        </div>
        <div
          :class="[
            envPill[deployment.environment],
            'flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset',
          ]"
        >
          {{ deployment.environment }}
        </div>
        <ChevronRightIcon class="size-5 flex-none text-tone-neutral-500" aria-hidden="true" />
      </li>
    </ul>

    <template #rail>
      <header
        class="flex items-center justify-between border-b border-tone-neutral-500/15 px-4 py-4 sm:px-6 sm:py-6 lg:px-8"
      >
        <h2 class="text-base/7 font-semibold text-tone-neutral-700">Activity feed</h2>
        <a href="#" class="text-sm/6 font-semibold text-tone-accent-700">View all</a>
      </header>
      <ul role="list" class="divide-y divide-tone-neutral-500/10">
        <li
          v-for="item in activityItems"
          :key="item.id"
          class="px-4 py-4 sm:px-6 lg:px-8"
        >
          <div class="flex items-center gap-x-3">
            <img
              :src="item.user.imageUrl"
              alt=""
              class="size-6 flex-none rounded-full bg-tone-neutral-50 outline -outline-offset-1 outline-black/5"
            />
            <h3 class="flex-auto truncate text-sm/6 font-semibold text-tone-neutral-700">
              {{ item.user.name }}
            </h3>
            <time :datetime="item.datetime" class="flex-none text-xs text-tone-neutral-500">
              {{ item.date }}
            </time>
          </div>
          <p class="mt-3 truncate text-sm text-tone-neutral-500">
            Pushed to
            <span class="text-tone-neutral-700">{{ item.projectName }}</span>
            (<span class="font-mono text-tone-neutral-700">{{ item.commit }}</span>
            on <span class="text-tone-neutral-700">{{ item.branch }}</span
            >)
          </p>
        </li>
      </ul>
    </template>
  </SidebarShell>
</template>
