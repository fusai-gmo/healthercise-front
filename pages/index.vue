<script setup lang="ts">
  import Heading from '../components/typography/Heading.vue'
  import { RiFireLine, RiArrowRightLine } from 'vue-remix-icons'
  import Paper from '../components/fundamentals/Paper.vue'
  // @ts-ignore
  import { VueFinalModal } from 'vue-final-modal'
  import TextButton from '~~/components/fundamentals/TextButton.vue'
  import axios from 'axios'

  const todos = [
    {
      id: '1',
      event: 'ジョギング',
      from: new Date('2022-08-03T09:00:00.000+09:00'),
      to: new Date('2022-08-03T11:00:00.000+09:00'),
      duration: 1.5,
      status: true,
      calorie: 1400,
    },
    {
      id: '2',
      event: 'ランニング',
      from: new Date('2022-08-03T14:00:00.000+09:00'),
      to: new Date('2022-08-03T15:00:00.000+09:00'),
      duration: 1.5,
      status: true,
      calorie: 830,
    },
    {
      id: '3',
      event: 'ウォーキング',
      from: new Date('2022-08-03T17:00:00.000+09:00'),
      to: new Date('2022-08-03T18:00:00.000+09:00'),
      duration: 1.5,
      status: false,
      calorie: 120,
    },
  ]

  const doneTodos = todos.filter((todo) => todo.status)

  // const todaysExercise = [
  //   {
  //     type: 'jogging',
  //     label: 'ジョギング',
  //     cal: 1400,
  //     percentage: 35,
  //   },
  //   {
  //     type: 'running',
  //     label: 'ランニング',
  //     cal: 830,
  //     percentage: 17,
  //   },
  //   {
  //     type: 'others',
  //     label: '残り',
  //     cal: 0,
  //     percentage: 48,
  //   },
  // ]

  const totalCalorie = 2700

  const nextTodoIndex = 0 // TODO: 現在の時刻から算出
  const selectedTodoIndex = ref(nextTodoIndex)

  const calTodayRate = todos
    .map((todo) => (todo.calorie / totalCalorie) * 100)
    .reduce((total, caloriePercentage) => total + caloriePercentage, 0)

  const modalOpen = ref(false)
  onMounted(() => {
    axios
      .get('http://localhost:4010/users/1', {
        headers: { Authorization: useAuthorization()['value'] },
      })
      .then((response) => {
        console.log(response)
      })
  })

  definePageMeta({
    layout: false,
  })
</script>

<template>
  <NuxtLayout name="default">
    <template #title>ダッシュボード</template>
    <vue-final-modal
      v-model="modalOpen"
      classes="flex justify-center items-center"
      content-class="relative flex flex-col max-h-full mx-4 border dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900"
    >
      <ExerciseCard
        :title="todos[selectedTodoIndex].event"
        :cal="todos[selectedTodoIndex].calorie"
        :start-time="todos[selectedTodoIndex].from"
        :end-time="todos[selectedTodoIndex].to"
        :hint="null"
      ></ExerciseCard>
      <div class="flex justify-end space-x-1 px-4 pt-2 pb-4">
        <button
          @click="modalOpen = false"
          class="rounded-2xl px-4 py-2 font-bold text-gray-400 transition hover:bg-gray-400/10 focus:bg-gray-400/10"
        >
          キャンセル
        </button>
        <button
          @click="modalOpen = false"
          class="rounded-2xl border-[3px] border-accent px-4 py-2 font-bold text-accent transition hover:bg-accent/10 focus:bg-accent/10"
        >
          完了する
        </button>
      </div>
    </vue-final-modal>
    <div class="flex flex-col space-y-12">
      <!-- 今日の予定 -->
      <section class="w-full">
        <Heading class="mb-4">今日の予定</Heading>
        <div class="relative mb-1 flex h-[64px] w-full">
          <template v-for="(todo, index) in todos" :key="index">
            <div
              v-if="0 < index"
              :style="{
                width: `calc(${
                  ((todo.from.getTime() - todos[index - 1].to.getTime()) /
                    (1000 * 60 * 60) /
                    9) *
                  100
                }% - 4px)`,
                left: `calc(${
                  ((todos[index - 1].to.getHours() - 9) / 9) * 100
                }% + 2px)`,
              }"
              class="absolute inset-y-0 mx-0.5 rounded bg-gray-300"
            ></div>
            <button
              :style="{
                width: `calc(${
                  ((todo.to.getTime() - todo.from.getTime()) /
                    (1000 * 60 * 60) /
                    9) *
                  100
                }% - 4px)`,
                left: `calc(${((todo.from.getHours() - 9) / 9) * 100}% + 2px)`,
              }"
              class="absolute inset-y-0 mx-0.5 rounded"
              :class="
                true
                  ? index === selectedTodoIndex
                    ? 'bg-primary outline outline-2 outline-offset-2 outline-primary'
                    : 'bg-primary'
                  : 'bg-gray-300'
              "
              :aria-label="todo.event"
              @click="selectedTodoIndex = index"
            ></button>
          </template>
        </div>
        <div class="relative flex h-[16px] w-full justify-between px-0.5">
          <div v-for="hour in [9, 12, 15, 18]">
            <p class="text-xs font-bold">{{ hour }}</p>
          </div>
        </div>
      </section>
      <!-- 次の予定 -->
      <section class="w-full space-y-4">
        <Heading :size="'h2'" v-if="selectedTodoIndex === nextTodoIndex"
          >次の予定</Heading
        >
        <ExerciseCard
          :title="todos[selectedTodoIndex].event"
          :cal="todos[selectedTodoIndex].calorie"
          :start-time="todos[selectedTodoIndex].from"
          :end-time="todos[selectedTodoIndex].to"
          :hint="`${todos[selectedTodoIndex].event}はゆっくりと走ることが大切です。タイムは気にせず行いましょう。`"
        >
        </ExerciseCard>
        <div class="flex w-full flex-col items-center py-1">
          <TextButton
            @click="modalOpen = true"
            class="flex items-center space-x-2"
          >
            <span> 運動の完了を登録 </span>
            <RiArrowRightLine class="h-6 w-6"></RiArrowRightLine>
          </TextButton>
        </div>
      </section>
      <section class="w-full space-y-4">
        <Heading>今日の消費カロリー</Heading>
        <div class="relative w-full">
          <div class="flex pb-1 font-bold">
            <div :style="{ width: `${calTodayRate}%` }"></div>
            <p class="-translate-x-1/2">
              <span class="text-2xl">{{ calTodayRate.toFixed(0) }}</span
              ><span class="text-sm">%</span>
            </p>
          </div>
          <div
            class="flex h-[32px] flex-row overflow-hidden rounded-full bg-gray-300"
          >
            <div
              v-for="(exercise, index) in doneTodos"
              :key="index"
              class="h-full"
              :style="{
                width: `${(exercise.calorie / totalCalorie) * 100}%`,
                background: 'rgb(249 128 128)',
                opacity: `${100 - (100 / doneTodos.length) * index}%`,
              }"
            ></div>
          </div>
        </div>
        <ul class="flex flex-col space-y-2">
          <li v-for="(todo, index) in doneTodos">
            <Paper class="flex items-center space-x-2">
              <div
                class="h-5 w-5 rounded-full"
                :style="{
                  background: 'rgb(249 128 128)',
                  opacity: `${100 - (100 / doneTodos.length) * index}%`,
                }"
              ></div>
              <p class="!mr-auto font-bold">{{ todo.event }}</p>
              <div class="flex shrink-0 items-center space-x-3">
                <div class="flex items-center">
                  <RiFireLine class="h-6 w-6 fill-accent"></RiFireLine>
                  <p class="shrink-0 font-bold">
                    <span>
                      {{ todo.calorie.toLocaleString() }}
                    </span>
                    <span class="ml-1 text-sm">kcal</span>
                  </p>
                </div>
                <p class="shrink-0 font-bold">
                  <span class="text-2xl tabular-nums">
                    {{ ((todo.calorie / totalCalorie) * 100).toFixed(0) }}
                  </span>
                  <span>%</span>
                </p>
              </div>
            </Paper>
          </li>
          <li>
            <Paper class="flex items-center space-x-2">
              <div
                class="h-5 w-5 rounded-full"
                :style="{
                  background: 'rgb(249 128 128)',
                  opacity: 0,
                }"
              ></div>
              <p class="!mr-auto font-bold">残り</p>
              <div class="flex shrink-0 items-center space-x-3">
                <div class="flex items-center">
                  <RiFireLine class="h-6 w-6 fill-accent"></RiFireLine>
                  <p class="shrink-0 font-bold">
                    <span>
                      {{ (totalCalorie * (1 - calTodayRate / 100)).toFixed(0) }}
                    </span>
                    <span class="ml-1 text-sm">kcal</span>
                  </p>
                </div>
                <p class="shrink-0 font-bold">
                  <span class="text-2xl tabular-nums">
                    {{ (100 - calTodayRate).toFixed(0) }}
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
