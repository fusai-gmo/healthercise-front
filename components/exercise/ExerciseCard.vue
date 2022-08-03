<script setup lang="ts">
  import Paper from '../fundamentals/Paper.vue'
  import { RiFireLine } from 'vue-remix-icons'

  type Props = {
    title: string
    startTime: Date
    endTime: Date
    cal: number
    hint: string | null
  }
  const props = defineProps<Props>()
</script>

<template>
  <Paper class="flex flex-col space-y-4">
    <div class="flex items-start justify-between">
      <div class="flex flex-col">
        <h3 class="text-xl font-bold">{{ props.title }}</h3>
        <p class="text-lg font-bold text-gray-400">
          {{ (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)
          }}<span class="ml-0.5 text-sm"
            >時間 （{{
              startTime.toLocaleTimeString().split(':').slice(0, 2).join(':')
            }}
            -
            {{
              endTime.toLocaleTimeString().split(':').slice(0, 2).join(':')
            }}）</span
          >
        </p>
      </div>
      <div class="flex shrink-0 items-center">
        <RiFireLine class="h-6 w-6 fill-accent"></RiFireLine>
        <p>
          <span class="mr-0.5 font-bold tabular-nums">{{
            props.cal.toLocaleString()
          }}</span>
          <span class="text-sm">kcal</span>
        </p>
      </div>
    </div>
    <div class="flex space-x-2 text-sm" v-show="props.hint != null">
      <p class="shrink-0 font-bold text-primary/80">ヒント</p>
      <p class="text-gray-500">{{ props.hint }}</p>
    </div>
  </Paper>
</template>
