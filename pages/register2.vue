<script lang="ts" setup>
  import Input from '@/components/fundamentals/Input.vue'
  import Button from '~~/components/fundamentals/Button.vue'
  import { RiInformationLine } from 'vue-remix-icons'

  const gender = ref('')

  definePageMeta({
    layout: false,
  })
</script>

<template>
  <NuxtLayout name="default">
    <template #title>ユーザー登録</template>
    <div class="flex flex-col space-y-10">
      <fieldset class="flex flex-col items-start space-y-6">
        <legend for="username" class="text-lg font-bold leading-none">
          運動できる時間帯
        </legend>
        <div>
          <Input
            id="start-time"
            placeholder="開始時刻"
            class="w-[120px]"
            type="time"
          ></Input>
          〜
          <Input
            id="end-time"
            placeholder="終了時刻"
            class="w-[120px]"
            type="time"
          ></Input>
        </div>
        <div class="flex space-x-1 fill-gray-400 text-gray-400">
          <RiInformationLine
            class="m-1 h-5 w-5 shrink-0 text-sm"
          ></RiInformationLine>
          <p>ここで指定した時間帯の中で、運動をサジェストします</p>
        </div>
      </fieldset>
      <div class="flex flex-col items-start space-y-6">
        <p for="username" class="text-lg font-bold leading-none">通勤時間</p>
        <fieldset class="flex w-full items-center space-x-2">
          <div>
            <legend class="w-8 font-bold">行き</legend>
          </div>
          <Input
            id="commute-go-start-time"
            placeholder="開始時刻"
            class="w-[120px]"
            type="time"
          ></Input>
          <span>〜</span>
          <Input
            id="commute-go-end-time"
            placeholder="終了時刻"
            class="w-[120px]"
            type="time"
          ></Input>
        </fieldset>
        <fieldset class="flex w-full items-center space-x-2">
          <div>
            <legend class="w-8 font-bold">帰り</legend>
          </div>
          <Input
            id="commute-return-start-time"
            placeholder="開始時刻"
            class="w-[120px]"
            type="time"
          ></Input>
          <span>〜</span>
          <Input
            id="commute-return-end-time"
            placeholder="終了時刻"
            class="w-[120px]"
            type="time"
          ></Input>
        </fieldset>
        <div class="!mt-4 pl-10">
          <label class="flex space-x-2">
            <input
              type="checkbox"
              class="h-max rounded-lg ring-primary focus:outline-none focus:ring"
            />
            <div>通勤時間を運動時間に含める</div>
          </label>
        </div>
      </div>

      <fieldset class="flex flex-col items-start space-y-2">
        <div for="username" class="text-lg font-bold">身体活動レベル</div>
        <div class="flex w-full flex-col space-y-2">
          <label
            v-for="option in [
              { label: '生活の大部分が座位で、静的な活動が中心の場合', id: 1 },
              {
                label:
                  '座位中心の仕事だが、職場内での移動や立位での作業・接客等、あるいは通勤・買い物・家事、軽いスポーツ等のいずれかを含む場合',
                id: 2,
              },
              {
                label:
                  '移動や立位の多い仕事への従事者、あるいは、スポーツ等余暇における活発な運動習慣を持っている場合',
                id: 3,
              },
            ]"
            class="flex flex-1 space-x-2 rounded-xl border border-gray-300 bg-white p-3"
          >
            <input
              type="radio"
              class="accent-primary"
              :value="option.id"
              v-model="gender"
            />
            <div>
              <p class="font-bold">レベル{{ option.id }}</p>
              <p class="text-sm">
                {{ option.label }}
              </p>
            </div>
          </label>
        </div>
      </fieldset>

      <Button to="/" class="w-full">登録する</Button>
    </div>
  </NuxtLayout>
</template>
