<script setup lang="ts">
import { computed } from 'vue'
import { nextFieldId } from '../../internal/fieldId'

const props = withDefaults(
  defineProps<{
    label?: string
    value?: string
    rows?: number
    description?: string
    error?: boolean
    errorMessage?: string
    disabled?: boolean
    required?: boolean
    placeholder?: string
  }>(),
  { rows: 3, error: false, disabled: false, required: false },
)

defineEmits<{
  (e: 'update:value', value: string): void
  (e: 'blur'): void
}>()

const id = nextFieldId('textarea')
const hasError = computed(() => props.error || !!props.errorMessage)
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="block text-sm font-medium text-tone-neutral-700">
      {{ label }}
      <span v-if="required" class="text-tone-negative-700" aria-hidden="true"> *</span>
    </label>
    <textarea
      :id="id"
      :value="value"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :aria-invalid="hasError || undefined"
      :class="[
        'block w-full rounded-md bg-white px-3 py-2 text-sm text-tone-neutral-700 ring-1 ring-inset placeholder:text-tone-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset',
        hasError
          ? 'ring-tone-negative-500 focus:ring-tone-negative-700'
          : 'ring-tone-neutral-500/20 focus:ring-tone-accent-700',
        disabled ? 'opacity-50' : '',
      ]"
      @input="$emit('update:value', ($event.target as HTMLTextAreaElement).value)"
      @blur="$emit('blur')"
    />
    <p v-if="errorMessage" class="text-xs text-tone-negative-700">{{ errorMessage }}</p>
    <p v-else-if="description" class="text-xs text-tone-neutral-500">{{ description }}</p>
  </div>
</template>
