<script setup lang="ts">
import {
  StackedShell,
  Page,
  NavGroup,
  SettingsSection,
  SettingsFieldRow,
  SettingsItemRow,
  SettingsToggleRow,
  Button,
  Logo,
  type NavItem,
  type NavGroupItem,
} from 'wise-ui'
import {
  BellIcon,
  BuildingLibraryIcon,
  CreditCardIcon,
  CubeIcon,
  FingerPrintIcon,
  PuzzlePieceIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/vue/24/outline'
import { PlusSmallIcon } from '@heroicons/vue/20/solid'

const nav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Faturas', to: '/invoices' },
  { label: 'Clientes', to: '/clients' },
  { label: 'Despesas', to: '/expenses' },
]

const user = { name: 'Tom Cook', avatar: '/avatars/tom.jpg' }

const sections: NavGroupItem[] = [
  { label: 'Geral',          to: '/settings',               icon: UserCircleIcon,     current: true },
  { label: 'Segurança',      to: '/settings/security',      icon: FingerPrintIcon },
  { label: 'Notificações',   to: '/settings/notifications', icon: BellIcon },
  { label: 'Plano',          to: '/settings/plan',          icon: CubeIcon },
  { label: 'Faturamento',    to: '/settings/billing',       icon: CreditCardIcon },
  { label: 'Membros',        to: '/settings/team',          icon: UsersIcon },
]

const profile = {
  name: 'Tom Cook',
  email: 'tom.cook@example.com',
  title: 'Gerente de Recursos Humanos',
}

type BankAccount = { id: string; label: string }
const bankAccounts: BankAccount[] = [
  { id: '1', label: 'Itaú' },
  { id: '2', label: 'Bradesco' },
]

type Integration = { id: string; label: string }
const integrations: Integration[] = [
  { id: '1', label: 'QuickBooks' },
]

const locale = { language: 'Português (Brasil)', dateFormat: 'DD/MM/AAAA' }
</script>

<template>
  <StackedShell :nav="nav" :user="user">
    <template #brand>
      <Logo src="/logo.svg" alt="Cashflow" size="lg" />
    </template>

    <Page>
      <template #sidenav>
        <NavGroup :items="sections" variant="icons" />
      </template>

      <SettingsSection title="Perfil" description="Estas informações são exibidas publicamente no seu perfil.">
        <SettingsFieldRow label="Nome completo" :value="profile.name" action-label="Atualizar" @action="() => {}" />
        <SettingsFieldRow label="E-mail" :value="profile.email" action-label="Atualizar" @action="() => {}" />
        <SettingsFieldRow label="Cargo" :value="profile.title" action-label="Atualizar" @action="() => {}" />
      </SettingsSection>

      <SettingsSection title="Contas bancárias" description="Conecte contas bancárias ao seu perfil.">
        <SettingsItemRow
          v-for="account in bankAccounts"
          :key="account.id"
          :icon="BuildingLibraryIcon"
          :title="account.label"
          action-label="Atualizar"
          @action="() => {}"
        />
        <template #actions>
          <Button variant="ghost" :icon="PlusSmallIcon">Adicionar outro banco</Button>
        </template>
      </SettingsSection>

      <SettingsSection title="Integrações" description="Conecte aplicações ao seu perfil.">
        <SettingsItemRow
          v-for="integration in integrations"
          :key="integration.id"
          :icon="PuzzlePieceIcon"
          :title="integration.label"
          action-label="Atualizar"
          @action="() => {}"
        />
        <template #actions>
          <Button variant="ghost" :icon="PlusSmallIcon">Adicionar outra aplicação</Button>
        </template>
      </SettingsSection>

      <SettingsSection title="Idioma e formato" description="Escolha o idioma e o formato de data utilizados na plataforma.">
        <SettingsFieldRow label="Idioma" :value="locale.language" action-label="Atualizar" @action="() => {}" />
        <SettingsFieldRow label="Formato de data" :value="locale.dateFormat" action-label="Atualizar" @action="() => {}" />
        <SettingsToggleRow
          label="Fuso horário automático"
          description="Usar o fuso detectado pelo navegador."
          :checked="true"
          @update:checked="() => {}"
        />
      </SettingsSection>
    </Page>
  </StackedShell>
</template>
