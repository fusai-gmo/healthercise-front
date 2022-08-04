<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      modelValue: string | number
    }>(),
    {
      modelValue: '',
    }
  )

  const emit = defineEmits<{
    (e: 'update:modelValue', text: string | number): string | number
  }>()

  const text = computed({
    get: () => props.modelValue,
    set: (value) => {
      // 値に変更があると呼ばれるsetter
      emit('update:modelValue', value)
    },
  })
</script>

<template>
  <input
    v-model="text"
    class="rounded-2xl border border-gray-300 bg-white px-3 py-2 text-lg ring-primary focus:border-transparent focus:outline-none focus:ring"
  />
</template>
