<script setup lang="ts">
import { useSlots } from 'vue'
import Button from '../Button/Button.vue'

withDefaults(
  defineProps<{
    title?: string
    description?: string
    submitLabel?: string
    submitVariant?: 'primary' | 'danger'
  }>(),
  { submitVariant: 'primary' },
)

defineEmits<{
  (e: 'submit'): void
}>()

const slots = useSlots()

function hasDefaultContent(): boolean {
  const nodes = slots.default?.() ?? []
  return nodes.some((n) => n.type !== Comment && !(typeof n.children === 'string' && !n.children.trim()))
}
</script>

<template>
  <form
    class="grid grid-cols-1 gap-6 border-b border-tone-neutral-500/10 pb-8 lg:grid-cols-3"
    @submit.prevent="$emit('submit')"
  >
    <header class="flex flex-col gap-1">
      <h3 v-if="title" class="text-base font-semibold text-tone-neutral-700">{{ title }}</h3>
      <p v-if="description" class="text-sm text-tone-neutral-500">{{ description }}</p>
    </header>
    <div class="flex flex-col gap-4 lg:col-span-2">
      <slot />
      <div v-if="submitLabel && hasDefaultContent()" class="pt-2">
        <Button :variant="submitVariant" type="submit">{{ submitLabel }}</Button>
      </div>
    </div>
  </form>
</template>
