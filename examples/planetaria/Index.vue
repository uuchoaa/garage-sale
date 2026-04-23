<script setup lang="ts">
import {
  SidebarShell,
  Page,
  PageHeading,
  NavGroup,
  NavTabs,
  SearchField,
  ResourceTable,
  Pagination,
  Button,
  StatusDot,
  StatusBadge,
  Logo,
  Link,
  Text,
  Stack,
  Cluster,
} from 'wise-ui'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
} from '@heroicons/vue/24/outline'
import { PlusSmallIcon } from '@heroicons/vue/20/solid'

type Tone = 'positive' | 'negative' | 'neutral' | 'accent'
type NavItem = { label: string; to: string; icon?: unknown; current?: boolean }
type TeamItem = { label: string; to: string; initial: string; current?: boolean }
type EnvironmentTab = { label: string; value: string; current?: boolean }
type Column = { key: string; label: string; align?: 'start' | 'end' }

type Environment = 'preview' | 'production'
type ProjectStatus = 'online' | 'offline' | 'error'
type Project = {
  id: string
  name: string
  team: string
  href: string
  status: ProjectStatus
  environment: Environment
  lastDeploy: { date: string; datetime: string; by: string }
}

const nav: NavItem[] = [
  { label: 'Projetos',      to: '/projects',    icon: FolderIcon, current: true },
  { label: 'Deploys',       to: '/deployments', icon: ServerIcon },
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

const environmentTabs: EnvironmentTab[] = [
  { label: 'Todos',    value: 'all', current: true },
  { label: 'Produção', value: 'production' },
  { label: 'Preview',  value: 'preview' },
]

const columns: Column[] = [
  { key: 'project',     label: 'Projeto' },
  { key: 'status',      label: 'Status' },
  { key: 'environment', label: 'Ambiente' },
  { key: 'lastDeploy',  label: 'Último deploy' },
  { key: 'team',        label: 'Equipe' },
  { key: 'actions',     label: '',              align: 'end' },
]

const projects: Project[] = [
  { id: '1', name: 'mobile-api',    team: 'Planetaria',    href: '/projects/mobile-api',    status: 'online',  environment: 'production', lastDeploy: { date: 'há 45 minutos', datetime: '2026-04-23T10:15', by: 'Michael Foster'  } },
  { id: '2', name: 'web-app',       team: 'Planetaria',    href: '/projects/web-app',       status: 'online',  environment: 'production', lastDeploy: { date: 'há 3 horas',    datetime: '2026-04-23T08:00', by: 'Lindsay Walton'  } },
  { id: '3', name: 'docs',          team: 'Planetaria',    href: '/projects/docs',          status: 'online',  environment: 'preview',    lastDeploy: { date: 'há 1 dia',      datetime: '2026-04-22T12:00', by: 'Courtney Henry'  } },
  { id: '4', name: 'design-system', team: 'Tailwind Labs', href: '/projects/design-system', status: 'error',   environment: 'preview',    lastDeploy: { date: 'há 2 dias',     datetime: '2026-04-21T09:00', by: 'Tom Cook'        } },
  { id: '5', name: 'marketing',     team: 'Protocol',      href: '/projects/marketing',     status: 'offline', environment: 'production', lastDeploy: { date: 'há 5 dias',     datetime: '2026-04-18T14:00', by: 'Whitney Francis' } },
]

const environmentLabel: Record<Environment, string> = {
  preview:    'Preview',
  production: 'Produção',
}

const environmentTone: Record<Environment, Tone> = {
  preview:    'neutral',
  production: 'accent',
}

const projectTone: Record<ProjectStatus, Tone> = {
  online:  'positive',
  offline: 'neutral',
  error:   'negative',
}

const projectStatusLabel: Record<ProjectStatus, string> = {
  online:  'Online',
  offline: 'Offline',
  error:   'Erro',
}

const pagination = {
  summary: '1 – 5 de 28',
  hasPrev: false,
  hasNext: true,
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
      <PageHeading title="Projetos">
        <template #nav>
          <NavTabs :items="environmentTabs" />
        </template>
        <template #actions>
          <Button variant="primary" :icon="PlusSmallIcon">Novo projeto</Button>
        </template>
      </PageHeading>

      <ResourceTable :columns="columns" :items="projects">
        <template #project="{ item }">
          <Link :to="item.href">{{ item.name }}</Link>
        </template>

        <template #status="{ item }">
          <Cluster gap="sm" align="center">
            <StatusDot :tone="projectTone[item.status]" />
            <Text>{{ projectStatusLabel[item.status] }}</Text>
          </Cluster>
        </template>

        <template #environment="{ item }">
          <StatusBadge
            :tone="environmentTone[item.environment]"
            :label="environmentLabel[item.environment]"
          />
        </template>

        <template #lastDeploy="{ item }">
          <Stack gap="xs">
            <time :datetime="item.lastDeploy.datetime">{{ item.lastDeploy.date }}</time>
            <Text tone="muted" size="xs">por {{ item.lastDeploy.by }}</Text>
          </Stack>
        </template>

        <template #team="{ item }">
          <Text>{{ item.team }}</Text>
        </template>

        <template #actions="{ item }">
          <Link :to="item.href">Ver</Link>
        </template>
      </ResourceTable>

      <Pagination
        :summary="pagination.summary"
        :has-prev="pagination.hasPrev"
        :has-next="pagination.hasNext"
      />
    </Page>
  </SidebarShell>
</template>
