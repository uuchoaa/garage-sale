import type { Component } from 'vue'

export type NavItem = {
  label: string
  to: string
  icon?: Component
  current?: boolean
}

export type NavTabItem = {
  label: string
  value: string
  current?: boolean
}

export type NavGroupItem = {
  label: string
  to: string
  icon?: Component
  initial?: string
  current?: boolean
}

export type User = {
  name: string
  avatar: string
}
