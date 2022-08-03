<script setup lang="ts">
  type Props = {
    class?: string
  }
  const props = defineProps<Props>()
</script>

<template>
  <section :class="['rounded-2xl bg-white p-5', props.class]">
    <slot></slot>
  </section>
</template>
