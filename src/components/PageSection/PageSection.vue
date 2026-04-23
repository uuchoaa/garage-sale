<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    actionLabel?: string
    actionHref?: string
    bleedDivider?: boolean
  }>(),
  { bleedDivider: false },
)
</script>

<template>
  <section v-if="bleedDivider">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2
        v-if="title"
        class="mx-auto max-w-2xl text-base font-semibold text-tone-neutral-700 lg:mx-0 lg:max-w-none"
      >
        {{ title }}
      </h2>
    </div>
    <div class="mt-6 overflow-hidden border-t border-tone-neutral-500/15">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <slot />
        </div>
      </div>
    </div>
  </section>
  <section v-else class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
      <div v-if="title || actionLabel" class="flex items-center justify-between">
        <h2 v-if="title" class="text-base/7 font-semibold text-tone-neutral-700">
          {{ title }}
        </h2>
        <a
          v-if="actionLabel && actionHref"
          :href="actionHref"
          class="text-sm/6 font-semibold text-tone-accent-700 hover:text-tone-accent-500"
        >
          {{ actionLabel }}
        </a>
      </div>
      <div class="mt-6">
        <slot />
      </div>
    </div>
  </section>
</template>
