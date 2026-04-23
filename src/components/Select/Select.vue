<script setup lang="ts">
import { computed } from 'vue'
import { nextFieldId } from '../../internal/fieldId'

type SelectOption = { value: string; label: string }

const props = withDefaults(
  defineProps<{
    label?: string
    value?: string
    options: SelectOption[]
    description?: string
    error?: boolean
    errorMessage?: string
    disabled?: boolean
    required?: boolean
  }>(),
  { error: false, disabled: false, required: false },
)

defineEmits<{
  (e: 'update:value', value: string): void
  (e: 'blur'): void
}>()

const id = nextFieldId('select')
const hasError = computed(() => props.error || !!props.errorMessage)
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="block text-sm font-medium text-tone-neutral-700">
      {{ label }}
      <span v-if="required" class="text-tone-negative-700" aria-hidden="true"> *</span>
    </label>
    <select
      :id="id"
      :value="value"
      :disabled="disabled"
      :required="required"
      :aria-invalid="hasError || undefined"
      :class="[
        'block w-full rounded-md bg-white px-3 py-2 text-sm text-tone-neutral-700 ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-inset',
        hasError
          ? 'ring-tone-negative-500 focus:ring-tone-negative-700'
          : 'ring-tone-neutral-500/20 focus:ring-tone-accent-700',
        disabled ? 'opacity-50' : '',
      ]"
      @change="$emit('update:value', ($event.target as HTMLSelectElement).value)"
      @blur="$emit('blur')"
    >
      <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>
    <p v-if="errorMessage" class="text-xs text-tone-negative-700">{{ errorMessage }}</p>
    <p v-else-if="description" class="text-xs text-tone-neutral-500">{{ description }}</p>
  </div>
</template>
