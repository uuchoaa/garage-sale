<script setup lang="ts"></script>

<template>
  <div class="relative isolate overflow-hidden pt-16">
    <slot />
    <div
      aria-hidden="true"
      class="absolute top-full left-0 -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-mt-10 sm:-ml-96 sm:translate-y-0 sm:rotate-0 sm:opacity-50"
    >
      <div
        class="aspect-[1154/678] w-[288.5rem]"
        style="
          background-image: linear-gradient(to bottom right, #ff80b5, #9089fc);
          clip-path: polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%);
        "
      />
    </div>
  </div>
</template>
