<script setup lang="ts">
import {
  SidebarShell,
  Page, PageHeading, PageSection,
  NavGroup,
  SearchField,
  Menu, MenuItem,
  ResourceList,
  StatusDot, StatusBadge,
  FeedList,
  Text, Avatar, Logo, Icon,
  type NavItem, type NavGroupItem, type Tone,
} from 'wise-ui'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
} from '@heroicons/vue/24/outline'
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'

type DeploymentStatus = 'offline' | 'online' | 'error'
type Environment = 'preview' | 'production'

type TeamItem = NavGroupItem

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
  user: { name: string; avatar: string }
  projectName: string
  commit: string
  branch: string
  date: string
  datetime: string
}

const nav: NavItem[] = [
  { label: 'Projetos',       to: '/projects',    icon: FolderIcon },
  { label: 'Deploys',        to: '/deployments', icon: ServerIcon, current: true },
  { label: 'Atividade',      to: '/activity',    icon: SignalIcon },
  { label: 'Domínios',       to: '/domains',     icon: GlobeAltIcon },
  { label: 'Uso',            to: '/usage',       icon: ChartBarSquareIcon },
  { label: 'Configurações',  to: '/settings',    icon: Cog6ToothIcon },
]

const teams: TeamItem[] = [
  { label: 'Planetaria',     to: '/teams/planetaria',     initial: 'P' },
  { label: 'Protocol',       to: '/teams/protocol',       initial: 'P' },
  { label: 'Tailwind Labs',  to: '/teams/tailwind-labs',  initial: 'T' },
]

const user = { name: 'Tom Cook', avatar: '/avatars/tom.jpg' }

const deployments: Deployment[] = [
  { id: '1', href: '/deployments/1', teamName: 'Planetaria',    projectName: 'ios-app',           status: 'offline', statusText: 'Iniciado há 1m 32s', description: 'Deploys do GitHub', environment: 'preview' },
  { id: '2', href: '/deployments/2', teamName: 'Planetaria',    projectName: 'mobile-api',        status: 'online',  statusText: 'Publicado há 3m',    description: 'Deploys do GitHub', environment: 'production' },
  { id: '3', href: '/deployments/3', teamName: 'Tailwind Labs', projectName: 'tailwindcss.com',   status: 'offline', statusText: 'Publicado há 3h',    description: 'Deploys do GitHub', environment: 'preview' },
  { id: '4', href: '/deployments/4', teamName: 'Protocol',      projectName: 'api.protocol.chat', status: 'error',   statusText: 'Falhou há 6d',       description: 'Deploys do GitHub', environment: 'preview' },
]

const activityItems: ActivityItem[] = [
  { id: '1', user: { name: 'Michael Foster', avatar: '/avatars/foster.jpg' }, projectName: 'ios-app',     commit: '2d89f0c8', branch: 'main', date: 'há 1h',  datetime: '2026-04-23T11:00' },
  { id: '2', user: { name: 'Lindsay Walton', avatar: '/avatars/walton.jpg' }, projectName: 'mobile-api',  commit: '249df660', branch: 'main', date: 'há 3h',  datetime: '2026-04-23T09:00' },
  { id: '3', user: { name: 'Courtney Henry', avatar: '/avatars/henry.jpg' }, projectName: 'ios-app',     commit: '11464223', branch: 'main', date: 'há 12h', datetime: '2026-04-23T00:00' },
]

const sortOptions = [
  { label: 'Nome',                value: 'name' },
  { label: 'Última atualização',  value: 'updated' },
  { label: 'Ambiente',            value: 'env' },
]

const environmentLabel: Record<Environment, string> = {
  preview:    'Preview',
  production: 'Produção',
}

const environmentTone: Record<Environment, Tone> = {
  preview:    'neutral',
  production: 'accent',
}

const statusTone: Record<DeploymentStatus, Tone> = {
  offline: 'neutral',
  online:  'positive',
  error:   'negative',
}
</script>

<template>
  <SidebarShell :nav="nav" :user="user">
    <template #brand>
      <Logo src="/logo.svg" alt="Planetaria" size="lg" />
    </template>

    <template #nav-extra>
      <NavGroup title="Suas equipes" :items="teams" variant="initials" />
    </template>

    <template #topbar>
      <SearchField placeholder="Buscar" />
    </template>

    <Page>
      <PageHeading title="Deploys">
        <template #actions>
          <Menu>
            <template #trigger>
              Ordenar por
              <Icon :src="ChevronUpDownIcon" size="sm" aria-hidden="true" />
            </template>
            <MenuItem v-for="o in sortOptions" :key="o.value" :value="o.value">
              {{ o.label }}
            </MenuItem>
          </Menu>
        </template>
      </PageHeading>

      <ResourceList :items="deployments" item-href="href">
        <template #leading="{ item }">
          <StatusDot :tone="statusTone[item.status]" />
        </template>

        <template #title="{ item }">
          <Text>{{ item.teamName }}</Text>
          <Text tone="muted"> / </Text>
          <Text>{{ item.projectName }}</Text>
        </template>

        <template #meta="{ item }">
          {{ item.description }} · {{ item.statusText }}
        </template>

        <template #trailing="{ item }">
          <StatusBadge
            :tone="environmentTone[item.environment]"
            :label="environmentLabel[item.environment]"
          />
        </template>
      </ResourceList>

      <template #rail>
        <PageSection
          title="Feed de atividade"
          action-label="Ver tudo"
          action-href="/activity"
        >
          <FeedList :items="activityItems">
            <template #header="{ item }">
              <Avatar :src="item.user.avatar" :alt="item.user.name" size="xs" />
              <Text weight="semibold">{{ item.user.name }}</Text>
              <time :datetime="item.datetime">{{ item.date }}</time>
            </template>

            <template #body="{ item }">
              Push em
              <Text weight="medium">{{ item.projectName }}</Text>
              (<code>{{ item.commit }}</code> em
              <Text weight="medium">{{ item.branch }}</Text>)
            </template>
          </FeedList>
        </PageSection>
      </template>
    </Page>
  </SidebarShell>
</template>
