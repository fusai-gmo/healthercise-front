<script lang="ts" setup>
  import Input from '@/components/fundamentals/Input.vue'
  import Button from '~~/components/fundamentals/Button.vue'

  const gender = ref('')

  definePageMeta({
    layout: false,
  })
</script>

<template>
  <NuxtLayout name="default">
    <template #title>ユーザー登録</template>
    <div class="flex flex-col space-y-8">
      <div class="flex flex-col items-start space-y-2">
        <label for="username" class="text-lg font-bold">ユーザー名</label>
        <Input
          id="username"
          placeholder="ユーザー名を入力"
          type="text"
          class="w-full"
        ></Input>
      </div>
      <fieldset class="flex flex-col items-start space-y-2">
        <div for="username" class="text-lg font-bold">性別</div>
        <div class="flex w-full space-x-2">
          <label
            v-for="option in [
              { label: '男性', id: 0 },
              { label: '女性', id: 1 },
              { label: 'その他', id: 2 },
            ]"
            class="flex flex-1 space-x-2 rounded-xl border border-gray-300 bg-white p-3 ring-primary focus-within:border-transparent focus-within:ring"
          >
            <input
              type="radio"
              class="accent-primary focus:outline-none"
              :value="option.id"
              v-model="gender"
            />
            <span class="text-lg font-bold">{{ option.label }}</span>
          </label>
        </div>
      </fieldset>
      <div class="flex flex-col items-start space-y-2">
        <label for="age" class="text-lg font-bold">年齢</label>
        <div class="space-x-2">
          <Input id="age" type="number" class="w-32"></Input>
          <span class="text-lg font-bold">歳</span>
        </div>
      </div>
      <div class="flex space-x-4">
        <div class="flex w-full flex-1 flex-col items-start space-y-2">
          <label for="height" class="text-lg font-bold">身長</label>
          <div class="space-x-2">
            <Input id="height" type="number" class="w-32"></Input>
            <span class="text-lg font-bold">cm</span>
          </div>
        </div>
        <div class="flex w-full flex-1 flex-col items-start space-y-2">
          <label for="weight" class="text-lg font-bold">体重</label>
          <div class="space-x-2">
            <Input id="weight" type="number" class="w-32"></Input>
            <span class="text-lg font-bold">kg</span>
          </div>
        </div>
      </div>
      <Button to="/register2" class="!mt-24 w-full">次へ</Button>
    </div>
  </NuxtLayout>
</template>
