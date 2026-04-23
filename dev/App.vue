<script setup lang="ts">
import { shallowRef, type Component } from 'vue'
import CashflowHome from '../examples/cashflow/Home.vue'
import CashflowIndex from '../examples/cashflow/Index.vue'
import CashflowDetail from '../examples/cashflow/Detail.vue'
import CashflowSettings from '../examples/cashflow/Settings.vue'
import PlanetariaHome from '../examples/planetaria/Home.vue'
import PlanetariaIndex from '../examples/planetaria/Index.vue'
import PlanetariaDetail from '../examples/planetaria/Detail.vue'
import PlanetariaSettings from '../examples/planetaria/Settings.vue'

type Route = { id: string; label: string; component: Component }

const routes: Route[] = [
  { id: 'cashflow-home', label: 'Cashflow · Home', component: CashflowHome },
  { id: 'cashflow-index', label: 'Cashflow · Index', component: CashflowIndex },
  { id: 'cashflow-detail', label: 'Cashflow · Detail', component: CashflowDetail },
  { id: 'cashflow-settings', label: 'Cashflow · Settings', component: CashflowSettings },
  { id: 'planetaria-home', label: 'Planetaria · Home', component: PlanetariaHome },
  { id: 'planetaria-index', label: 'Planetaria · Index', component: PlanetariaIndex },
  { id: 'planetaria-detail', label: 'Planetaria · Detail', component: PlanetariaDetail },
  { id: 'planetaria-settings', label: 'Planetaria · Settings', component: PlanetariaSettings },
]

const current = shallowRef<Route>(routes[0])
</script>

<template>
  <div>
    <nav
      class="fixed bottom-2 right-2 z-50 flex max-w-[90vw] flex-wrap gap-1 rounded-md bg-white p-2 ring-1 ring-black/10"
    >
      <button
        v-for="route in routes"
        :key="route.id"
        :class="[
          'rounded px-2 py-1 text-xs font-medium',
          current.id === route.id
            ? 'bg-tone-accent-700 text-white'
            : 'text-tone-neutral-700 hover:bg-tone-neutral-50',
        ]"
        @click="current = route"
      >
        {{ route.label }}
      </button>
    </nav>
    <component :is="current.component" />
  </div>
</template>
