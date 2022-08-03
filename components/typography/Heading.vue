<script setup lang="ts">
  type Props = {
    size?: 'h1' | 'h2'
    class?: string
  }

  const props = withDefaults(defineProps<Props>(), { size: 'h1' })
</script>

<template>
  <h2
    :class="[
      props.size === 'h1' ? 'text-xl font-bold' : 'text-lg font-bold',
      props.class,
    ]"
  >
    <slot></slot>
  </h2>
</template>
