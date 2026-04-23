<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots()
</script>

<template>
  <fieldset class="flex flex-col gap-3">
    <legend v-if="slots.legend" class="text-sm font-medium text-tone-neutral-700">
      <slot name="legend" />
    </legend>
    <slot />
  </fieldset>
</template>
