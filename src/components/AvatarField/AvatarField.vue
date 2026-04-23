<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  src?: string
  alt?: string
  hint?: string
  actionLabel: string
}>()

const emit = defineEmits<{
  (e: 'change', file: File): void
}>()

const input = ref<HTMLInputElement | null>(null)

function onChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) emit('change', file)
}
</script>

<template>
  <div class="flex items-center gap-4">
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="h-12 w-12 rounded-full bg-tone-neutral-50 object-cover"
    />
    <div
      v-else
      class="h-12 w-12 rounded-full bg-tone-neutral-50"
      :aria-label="alt"
      role="img"
    />
    <div class="flex flex-col gap-1">
      <button
        type="button"
        class="inline-flex items-center self-start rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-tone-neutral-700 ring-1 ring-inset ring-tone-neutral-500/20 hover:bg-tone-neutral-50"
        @click="input?.click()"
      >
        {{ actionLabel }}
      </button>
      <p v-if="hint" class="text-xs text-tone-neutral-500">{{ hint }}</p>
      <input ref="input" type="file" accept="image/*" class="hidden" @change="onChange" />
    </div>
  </div>
</template>
