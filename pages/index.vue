<script setup lang="ts">
  import Heading from '../components/typography/Heading.vue'
  import Paper from '../components/fundamentals/Paper.vue'
  import { RiFireLine, RiArrowRightLine } from 'vue-remix-icons'
  import axios from 'axios';

  const plans = ref([
    {
      start: 9,
      end: 10.5,
      isExercise: false,
    },
    {
      start: 10.5,
      end: 13,
      isExercise: true,
    },
    {
      start: 14,
      end: 15.3,
      isExercise: false,
    },
    {
      start: 15.3,
      end: 16,
      isExercise: true,
    },
    {
      start: 16,
      end: 18,
      isExercise: false,
    },
  ])

  const todaysExercise = [
    {
      type: 'jogging',
      label: 'ジョギング',
      cal: 1400,
      percentage: 35,
    },
    {
      type: 'running',
      label: 'ランニング',
      cal: 830,
      percentage: 17,
    },
    {
      type: 'others',
      label: '残り',
      cal: 0,
      percentage: 48,
    },
  ]

  const calTodayRate = todaysExercise
    .filter(({ type }) => type !== 'others')
    .reduce((total, excercise) => total + excercise.percentage, 0)

  onMounted(() => {
    axios
      .get('http://localhost:4010/users/1',{headers: { Authorization : useAuthorization()['value'] } } )
      .then(response =>{
        console.log(response);
      })
  })

  definePageMeta({
    layout: false,
  })
</script>

<template>
  <NuxtLayout name="default">
    <template #title>ダッシュボード</template>
    <div class="flex flex-col space-y-12">
      <!-- 今日の予定 -->
      <section class="w-full">
        <Heading class="mb-4">今日の予定</Heading>
        <div class="relative mb-1 flex h-[64px] w-full">
          <div
            v-for="(plan, index) in plans"
            :key="index"
            :style="{
              width: `calc(${((plan.end - plan.start) / 9) * 100}% - 4px)`,
              left: `calc(${((plan.start - 9) / 9) * 100}% + 2px)`,
            }"
            class="absolute inset-y-0 mx-0.5 rounded"
            :class="plan.isExercise ? 'bg-primary' : 'bg-gray-300'"
          ></div>
        </div>
        <div class="relative flex h-[16px] w-full justify-between px-0.5">
          <div v-for="hour in [9, 12, 15, 18]">
            <p class="text-xs font-bold">{{ hour }}</p>
          </div>
        </div>
      </section>
      <!-- 次の予定 -->
      <section class="w-full space-y-4">
        <Heading :size="'h2'">次の予定</Heading>
        <Paper class="flex flex-col space-y-4">
          <div class="flex items-start justify-between">
            <div class="flex flex-col">
              <h3 class="text-xl font-bold">ジョギング</h3>
              <p class="text-lg font-bold text-gray-400">
                2.5<span class="ml-0.5 text-sm">時間 （10:30 - 14:00）</span>
              </p>
            </div>
            <div class="flex shrink-0 items-center">
              <RiFireLine class="h-6 w-6 fill-accent"></RiFireLine>
              <p>
                <span class="mr-0.5 font-bold tabular-nums">1,400</span>
                <span class="text-sm">kcal</span>
              </p>
            </div>
          </div>
          <div class="flex space-x-2 text-sm">
            <p class="shrink-0 font-bold text-primary/80">ヒント</p>
            <p class="text-gray-500">
              ジョギングはゆっくりと走ることが大切です。タイムは気にせず行いましょう。
            </p>
          </div>
        </Paper>
        <div class="flex w-full flex-col items-center py-1">
          <button
            class="flex items-center space-x-2 rounded-2xl fill-blue-400 px-8 py-2 text-blue-400 hover:bg-blue-400/10 focus:bg-blue-400/10 focus:outline-blue-400"
          >
            <span> 運動の完了を登録 </span>
            <RiArrowRightLine class="h-6 w-6"></RiArrowRightLine>
          </button>
        </div>
      </section>
      <section class="w-full space-y-4">
        <Heading>今日の消費カロリー</Heading>
        <div class="relative w-full">
          <div class="flex pb-1 font-bold">
            <div :style="{ width: `${calTodayRate}%` }"></div>
            <p class="-translate-x-1/2">
              <span class="text-2xl">{{ calTodayRate }}</span
              ><span class="text-sm">%</span>
            </p>
          </div>
          <div
            class="flex h-[32px] flex-row overflow-hidden rounded-full bg-gray-300"
          >
            <div
              v-for="(exercise, index) in todaysExercise"
              :key="index"
              class="h-full"
              :style="{
                width: `${exercise.percentage}%`,
                background: 'rgb(249 128 128)',
                opacity:
                  exercise.type === 'others'
                    ? 0
                    : `${100 - (100 / todaysExercise.length) * index}%`,
              }"
            ></div>
          </div>
        </div>
        <ul class="flex flex-col space-y-2">
          <li v-for="(exercise, index) in todaysExercise">
            <Paper class="flex items-center space-x-2">
              <div
                class="h-5 w-5 rounded-full"
                :style="{
                  background: 'rgb(249 128 128)',
                  opacity:
                    exercise.type === 'others'
                      ? 0
                      : `${100 - (100 / todaysExercise.length) * index}%`,
                }"
              ></div>
              <p class="!mr-auto font-bold">{{ exercise.label }}</p>
              <div class="flex shrink-0 items-center space-x-3">
                <div
                  class="flex items-center"
                  v-if="exercise.type !== 'others'"
                >
                  <RiFireLine class="h-6 w-6 fill-accent"></RiFireLine>
                  <p class="shrink-0 font-bold">
                    <span>
                      {{ exercise.cal.toLocaleString() }}
                    </span>
                    <span class="ml-1 text-sm">kcal</span>
                  </p>
                </div>
                <p class="shrink-0 font-bold">
                  <span class="text-2xl tabular-nums">
                    {{ exercise.percentage }}
                  </span>
                  <span>%</span>
                </p>
              </div>
            </Paper>
          </li>
        </ul>
      </section>
      <section class="w-full space-y-4">
        <Heading>活動履歴</Heading>
        <div class="relative -ml-4">
          <div class="w-full overflow-x-scroll pl-4">
            <div class="grid grid-flow-col grid-rows-[repeat(7,minmax(0,1fr))]">
              <div
                v-for="i in 368"
                :key="i"
                class="m-0.5 h-4 w-4 rounded bg-primary"
                :style="{
                  opacity: (i % 5) / 5,
                }"
              ></div>
            </div>
          </div>
          <div
            class="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-bg to-transparent"
          ></div>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>
