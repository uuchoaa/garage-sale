<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { nextFieldId } from '../../internal/fieldId'

type InputType = 'text' | 'email' | 'password' | 'url' | 'tel'

const props = withDefaults(
  defineProps<{
    type?: InputType
    label?: string
    value?: string
    description?: string
    error?: boolean
    errorMessage?: string
    disabled?: boolean
    required?: boolean
    autocomplete?: string
    placeholder?: string
  }>(),
  { type: 'text', required: false, disabled: false, error: false },
)

defineEmits<{
  (e: 'update:value', value: string): void
  (e: 'blur'): void
}>()

const slots = useSlots()
const id = nextFieldId('text')
const hasError = computed(() => props.error || !!props.errorMessage)
</script>

<template>
  <div class="flex flex-col gap-1">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-tone-neutral-700"
    >
      {{ label }}
      <span v-if="required" class="text-tone-negative-700" aria-hidden="true"> *</span>
    </label>
    <div
      :class="[
        'flex items-center rounded-md bg-white ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset',
        hasError
          ? 'ring-tone-negative-500 focus-within:ring-tone-negative-700'
          : 'ring-tone-neutral-500/20 focus-within:ring-tone-accent-700',
        disabled ? 'opacity-50' : '',
      ]"
    >
      <span v-if="slots.prefix" class="pl-3 text-sm text-tone-neutral-500">
        <slot name="prefix" />
      </span>
      <input
        :id="id"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :autocomplete="autocomplete"
        :aria-invalid="hasError || undefined"
        class="block w-full bg-transparent px-3 py-2 text-sm text-tone-neutral-700 placeholder:text-tone-neutral-500 focus:outline-none"
        @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur')"
      />
      <span v-if="slots.suffix" class="pr-3 text-sm text-tone-neutral-500">
        <slot name="suffix" />
      </span>
    </div>
    <p v-if="errorMessage" class="text-xs text-tone-negative-700">{{ errorMessage }}</p>
    <p v-else-if="description" class="text-xs text-tone-neutral-500">{{ description }}</p>
  </div>
</template>
