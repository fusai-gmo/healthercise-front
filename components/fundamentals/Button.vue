<script lang="ts" setup>
  type Props = {
    disabled?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    disabled: false,
  })
</script>

<template>
  <NuxtLink
    v-if="!props.disabled"
    class="rounded-2xl border border-gray-300 bg-white px-5 py-3 text-center font-bold outline-4 ring-primary transition hover:border-transparent hover:outline-none hover:ring-2 focus:border-transparent focus:outline-none focus:ring"
  >
    <slot></slot>
  </NuxtLink>
  <div
    v-else
    class="cursor-not-allowed rounded-2xl border border-gray-300 bg-gray-50 px-5 py-3 text-center font-bold text-gray-400 outline-4 ring-primary transition"
  >
    <slot></slot>
  </div>
</template>
