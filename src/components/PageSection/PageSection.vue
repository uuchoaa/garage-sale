<script setup lang="ts">
defineProps<{
  title?: string
  actionLabel?: string
  actionHref?: string
}>()
</script>

<template>
  <section class="flex flex-col gap-4">
    <div v-if="title || actionLabel" class="flex items-baseline justify-between">
      <h2 v-if="title" class="text-base font-semibold text-tone-neutral-700">{{ title }}</h2>
      <a
        v-if="actionLabel && actionHref"
        :href="actionHref"
        class="text-sm font-medium text-tone-accent-700 hover:text-tone-accent-500"
      >
        {{ actionLabel }}<span aria-hidden="true"> →</span>
      </a>
    </div>
    <slot />
  </section>
</template>
