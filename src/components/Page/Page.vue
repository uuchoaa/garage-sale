<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots()
</script>

<template>
  <div class="flex flex-col gap-6 lg:flex-row lg:gap-8">
    <aside v-if="slots.sidenav" class="lg:w-56 lg:shrink-0">
      <slot name="sidenav" />
    </aside>
    <div class="flex min-w-0 flex-1 flex-col gap-6">
      <slot />
    </div>
    <aside v-if="slots.rail" class="lg:w-72 lg:shrink-0">
      <slot name="rail" />
    </aside>
  </div>
</template>
