<script setup lang="ts">
import {
  SidebarShell,
  Page,
  PageHeading,
  DetailHeading,
  NavGroup,
  NavTabs,
  SearchField,
  StatGrid,
  StatusDot,
  StatusBadge,
  ResourceTable,
  Avatar,
  Logo,
  Text,
  Cluster,
  type NavItem,
  type NavGroupItem,
  type NavTabItem,
  type Tone,
} from 'wise-ui'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
} from '@heroicons/vue/24/outline'

type TeamItem = NavGroupItem
type NavTab = NavTabItem

type Environment = 'preview' | 'production'
type DeployStatus = 'completed' | 'error'

type Stat = { label: string; value: string; delta: string; tone: Tone }

type Deploy = {
  id: string
  user: { name: string; avatar: string }
  commit: string
  branch: string
  status: DeployStatus
  duration: string
  date: string
  datetime: string
}

type Column = { key: string; label: string; align?: 'start' | 'end' }

const nav: NavItem[] = [
  { label: 'Projetos',      to: '/projects',    icon: FolderIcon },
  { label: 'Deploys',       to: '/deployments', icon: ServerIcon, current: true },
  { label: 'Atividade',     to: '/activity',    icon: SignalIcon },
  { label: 'Domínios',      to: '/domains',     icon: GlobeAltIcon },
  { label: 'Uso',           to: '/usage',       icon: ChartBarSquareIcon },
  { label: 'Configurações', to: '/settings',    icon: Cog6ToothIcon },
]

const teams: TeamItem[] = [
  { label: 'Planetaria',    to: '/teams/planetaria',    initial: 'P' },
  { label: 'Protocol',      to: '/teams/protocol',      initial: 'P' },
  { label: 'Tailwind Labs', to: '/teams/tailwind-labs', initial: 'T' },
]

const user = { name: 'Tom Cook', avatar: '/avatars/tom.jpg' }

const detailTabs: NavTab[] = [
  { label: 'Visão geral',   value: 'overview',      current: true },
  { label: 'Atividade',     value: 'activity' },
  { label: 'Configurações', value: 'settings' },
  { label: 'Colaboradores', value: 'collaborators' },
  { label: 'Notificações',  value: 'notifications' },
]

const project = {
  team: 'Planetaria',
  name: 'mobile-api',
  description: 'Deploys do GitHub via branch main',
  environment: 'production' as Environment,
  status: 'online' as 'online' | 'offline' | 'error',
}

const environmentLabel: Record<Environment, string> = {
  preview:    'Preview',
  production: 'Produção',
}

const environmentTone: Record<Environment, Tone> = {
  preview:    'neutral',
  production: 'accent',
}

const projectTone: Record<'online' | 'offline' | 'error', Tone> = {
  online:  'positive',
  offline: 'neutral',
  error:   'negative',
}

const stats: Stat[] = [
  { label: 'Número de deploys',     value: '405',    delta: '',        tone: 'neutral' },
  { label: 'Tempo médio de deploy', value: '3,65 min', delta: '',      tone: 'neutral' },
  { label: 'Número de servidores',  value: '3',      delta: '',        tone: 'neutral' },
  { label: 'Taxa de sucesso',       value: '98,5%',  delta: '',        tone: 'positive' },
]

const columns: Column[] = [
  { key: 'user',     label: 'Usuário' },
  { key: 'commit',   label: 'Commit' },
  { key: 'status',   label: 'Status' },
  { key: 'duration', label: 'Duração' },
  { key: 'date',     label: 'Publicado em', align: 'end' },
]

const deploys: Deploy[] = [
  { id: '1', user: { name: 'Michael Foster', avatar: '/avatars/foster.jpg' }, commit: '2d89f0c8', branch: 'main', status: 'completed', duration: '25s',     date: 'há 45 minutos', datetime: '2026-04-23T10:15' },
  { id: '2', user: { name: 'Lindsay Walton', avatar: '/avatars/walton.jpg' }, commit: '249df660', branch: 'main', status: 'completed', duration: '1m 32s', date: 'há 3 horas',    datetime: '2026-04-23T08:00' },
  { id: '3', user: { name: 'Courtney Henry', avatar: '/avatars/henry.jpg' },  commit: '11464223', branch: 'main', status: 'error',     duration: '1m 4s',  date: 'há 12 horas',   datetime: '2026-04-22T23:00' },
  { id: '4', user: { name: 'Courtney Henry', avatar: '/avatars/henry.jpg' },  commit: 'dad28e95', branch: 'main', status: 'completed', duration: '2m 15s', date: 'há 2 dias',     datetime: '2026-04-21T12:00' },
  { id: '5', user: { name: 'Michael Foster', avatar: '/avatars/foster.jpg' }, commit: '624bc94c', branch: 'main', status: 'completed', duration: '1m 12s', date: 'há 5 dias',     datetime: '2026-04-18T11:34' },
]

const deployStatusTone: Record<DeployStatus, Tone> = {
  completed: 'positive',
  error:     'negative',
}

const deployStatusLabel: Record<DeployStatus, string> = {
  completed: 'Concluído',
  error:     'Erro',
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
      <PageHeading :title="project.name">
        <template #nav>
          <NavTabs :items="detailTabs" />
        </template>
      </PageHeading>

      <DetailHeading :description="project.description">
        <template #leading>
          <StatusDot :tone="projectTone[project.status]" />
        </template>
        <template #title>
          <Text weight="semibold">{{ project.team }}</Text>
          <Text tone="muted"> / </Text>
          <Text weight="semibold">{{ project.name }}</Text>
        </template>
        <template #actions>
          <StatusBadge
            :tone="environmentTone[project.environment]"
            :label="environmentLabel[project.environment]"
          />
        </template>
      </DetailHeading>

      <StatGrid :items="stats" />

      <ResourceTable title="Atividade recente" :columns="columns" :items="deploys">
        <template #user="{ item }">
          <Cluster gap="sm" align="center">
            <Avatar :src="item.user.avatar" :alt="item.user.name" size="sm" />
            <Text weight="medium">{{ item.user.name }}</Text>
          </Cluster>
        </template>

        <template #commit="{ item }">
          <Cluster gap="sm" align="center">
            <code>{{ item.commit }}</code>
            <StatusBadge tone="neutral" :label="item.branch" />
          </Cluster>
        </template>

        <template #status="{ item }">
          <Cluster gap="sm" align="center">
            <StatusDot :tone="deployStatusTone[item.status]" />
            <Text>{{ deployStatusLabel[item.status] }}</Text>
          </Cluster>
        </template>

        <template #duration="{ item }">{{ item.duration }}</template>

        <template #date="{ item }">
          <time :datetime="item.datetime">{{ item.date }}</time>
        </template>
      </ResourceTable>
    </Page>
  </SidebarShell>
</template>
