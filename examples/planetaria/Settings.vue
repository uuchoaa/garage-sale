<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import {
  SidebarShell,
  Page,
  PageHeading,
  NavGroup,
  NavTabs,
  SearchField,
  SettingsFormSection,
  TextField,
  Select,
  AvatarField,
  Button,
  Text,
  Logo,
} from 'wise-ui'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
} from '@heroicons/vue/24/outline'
import {
  personalInfoSchema,
  changePasswordSchema,
  logoutOthersSchema,
} from './Settings.schema'

type NavItem = { label: string; to: string; icon?: unknown; current?: boolean }
type TeamItem = { label: string; to: string; initial: string; current?: boolean }
type NavTab = { label: string; value: string; current?: boolean }
type SelectOption = { value: string; label: string }

const nav: NavItem[] = [
  { label: 'Projetos',      to: '/projects',    icon: FolderIcon },
  { label: 'Deploys',       to: '/deployments', icon: ServerIcon },
  { label: 'Atividade',     to: '/activity',    icon: SignalIcon },
  { label: 'Domínios',      to: '/domains',     icon: GlobeAltIcon },
  { label: 'Uso',           to: '/usage',       icon: ChartBarSquareIcon },
  { label: 'Configurações', to: '/settings',    icon: Cog6ToothIcon, current: true },
]

const teams: TeamItem[] = [
  { label: 'Planetaria',    to: '/teams/planetaria',    initial: 'P' },
  { label: 'Protocol',      to: '/teams/protocol',      initial: 'P' },
  { label: 'Tailwind Labs', to: '/teams/tailwind-labs', initial: 'T' },
]

const user = { name: 'Tom Cook', avatar: '/avatars/tom.jpg' }

const settingsTabs: NavTab[] = [
  { label: 'Conta',         value: 'account',       current: true },
  { label: 'Notificações',  value: 'notifications' },
  { label: 'Faturamento',   value: 'billing' },
  { label: 'Equipes',       value: 'teams' },
  { label: 'Integrações',   value: 'integrations' },
]

const timezones: SelectOption[] = [
  { value: 'America/Sao_Paulo', label: 'São Paulo (BRT)' },
  { value: 'America/New_York',  label: 'Nova York (EST)' },
  { value: 'Europe/London',     label: 'Londres (GMT)' },
]

const personal = useForm({
  validationSchema: toTypedSchema(personalInfoSchema),
  initialValues: {
    firstName: 'Tom',
    lastName: 'Cook',
    email: 'tom.cook@planetaria.io',
    username: 'tomcook',
    timezone: 'America/Sao_Paulo',
  },
})
const [firstName] = personal.defineField('firstName')
const [lastName] = personal.defineField('lastName')
const [email] = personal.defineField('email')
const [username] = personal.defineField('username')
const [timezone] = personal.defineField('timezone')
const savePersonal = personal.handleSubmit(() => {})

const password = useForm({ validationSchema: toTypedSchema(changePasswordSchema) })
const [currentPassword] = password.defineField('currentPassword')
const [newPassword] = password.defineField('newPassword')
const [confirmPassword] = password.defineField('confirmPassword')
const savePassword = password.handleSubmit(() => {})

const logoutOthers = useForm({ validationSchema: toTypedSchema(logoutOthersSchema) })
const [logoutPassword] = logoutOthers.defineField('password')
const submitLogoutOthers = logoutOthers.handleSubmit(() => {})

const deleteAccount = () => {}
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
      <PageHeading title="Configurações da conta">
        <template #nav>
          <NavTabs :items="settingsTabs" />
        </template>
      </PageHeading>

      <SettingsFormSection
        title="Informações pessoais"
        description="Use um endereço de e-mail onde você possa receber mensagens."
        submit-label="Salvar"
        @submit="savePersonal"
      >
        <AvatarField
          :src="user.avatar"
          :alt="user.name"
          hint="JPG, GIF ou PNG. Máximo 1 MB."
          action-label="Alterar avatar"
          @change="() => {}"
        />
        <TextField
          v-model:value="firstName"
          label="Nome"
          autocomplete="given-name"
          :error-message="personal.errors.value.firstName"
          required
        />
        <TextField
          v-model:value="lastName"
          label="Sobrenome"
          autocomplete="family-name"
          :error-message="personal.errors.value.lastName"
          required
        />
        <TextField
          v-model:value="email"
          type="email"
          label="E-mail"
          autocomplete="email"
          :error-message="personal.errors.value.email"
          required
        />
        <TextField
          v-model:value="username"
          label="Nome de usuário"
          :error-message="personal.errors.value.username"
          required
        >
          <template #prefix>
            <Text tone="muted">planetaria.io/</Text>
          </template>
        </TextField>
        <Select
          v-model:value="timezone"
          label="Fuso horário"
          :options="timezones"
          :error-message="personal.errors.value.timezone"
        />
      </SettingsFormSection>

      <SettingsFormSection
        title="Alterar senha"
        description="Atualize a senha associada à sua conta."
        submit-label="Salvar"
        @submit="savePassword"
      >
        <TextField
          v-model:value="currentPassword"
          type="password"
          label="Senha atual"
          autocomplete="current-password"
          :error-message="password.errors.value.currentPassword"
          required
        />
        <TextField
          v-model:value="newPassword"
          type="password"
          label="Nova senha"
          autocomplete="new-password"
          :error-message="password.errors.value.newPassword"
          required
        />
        <TextField
          v-model:value="confirmPassword"
          type="password"
          label="Confirmar nova senha"
          autocomplete="new-password"
          :error-message="password.errors.value.confirmPassword"
          required
        />
      </SettingsFormSection>

      <SettingsFormSection
        title="Encerrar outras sessões"
        description="Digite sua senha para encerrar outras sessões em todos os seus dispositivos."
        submit-label="Encerrar sessões"
        @submit="submitLogoutOthers"
      >
        <TextField
          v-model:value="logoutPassword"
          type="password"
          label="Sua senha"
          autocomplete="current-password"
          :error-message="logoutOthers.errors.value.password"
          required
        />
      </SettingsFormSection>

      <SettingsFormSection
        title="Excluir conta"
        description="Não deseja mais usar o serviço? Você pode excluir sua conta aqui. Esta ação é irreversível e apaga permanentemente todos os dados associados."
      >
        <Button variant="danger" @click="deleteAccount">Sim, excluir minha conta</Button>
      </SettingsFormSection>
    </Page>
  </SidebarShell>
</template>
