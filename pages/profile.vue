<script lang="ts" setup>
  import Input from '@/components/fundamentals/Input.vue'
  import Button from '~~/components/fundamentals/Button.vue'
  import TextButton from '~~/components/fundamentals/TextButton.vue'
  import { RiArrowLeftLine } from 'vue-remix-icons'
  import axios from 'axios'

  const route = useRoute()
  const router = useRouter()
  const isEdit = route.query.mode === 'edit'
  const slackId = route.query.userid
  const user = useUser()

  const page = ref<0 | 1>(0)

  const userProfileState = useState('user_profile_input', () => ({}))

  const userInput = reactive({
    userName: '',
    gender: null as number | null,
    age: '',
    height: '',
    weight: '',
    activeTime: {
      start: '',
      finish: '',
    },
    includeCommutingTime: false,
    goWorkTime: {
      start: '',
      finish: '',
    },
    leaveWorkTime: {
      start: '',
      finish: '',
    },
    activeLevel: null as number | null,
  })

  const isFirstPageValid = computed(() => {
    userProfileState.value = userInput
    return (
      0 < userInput.userName.length &&
      userInput.gender != null &&
      userInput.age != '' &&
      userInput.height != '' &&
      userInput.weight != ''
    )
  })

  const isSecondPageValid = computed(() => {
    userProfileState.value = userInput
    return (
      userInput.activeTime.start != '' &&
      userInput.activeTime.finish != '' &&
      userInput.goWorkTime.start != '' &&
      userInput.goWorkTime.finish != '' &&
      userInput.leaveWorkTime.start != '' &&
      userInput.leaveWorkTime.finish != '' &&
      userInput.activeLevel != null
    )
  })

  const isValid = computed(
    () => isFirstPageValid.value && isSecondPageValid.value
  )

  const handleSend = async () => {
    const payload = {
      ...userInput,
      slackId,
      email: user.value.user?.email ?? '',
    }
    await axios
      .post('http://localhost/user', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(JSON.stringify(error))
      })
    router.push('/')
  }

  definePageMeta({
    layout: false,
  })
</script>

<template>
  <NuxtLayout name="default">
    <template #back v-if="page === 1">
      <TextButton
        class="flex w-max items-center space-x-1 px-2"
        @click="() => (page = 0)"
      >
        <RiArrowLeftLine class="h-6 w-6"></RiArrowLeftLine>
        <span> 戻る </span>
      </TextButton>
    </template>
    <template #title>{{
      isEdit ? 'ユーザー情報の編集' : 'ユーザー登録'
    }}</template>

    <div v-if="page === 0" class="flex flex-col space-y-8">
      <div class="flex flex-col items-start space-y-2">
        <label for="username" class="text-lg font-bold">ユーザー名</label>
        <Input
          id="username"
          v-model="userInput.userName"
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
              { label: '男性', id: 'male' },
              { label: '女性', id: 'female' },
              { label: 'その他', id: 'other' },
            ]"
            class="flex flex-1 cursor-pointer space-x-2 rounded-xl border border-gray-300 bg-white p-3 ring-primary focus-within:border-transparent focus-within:ring"
          >
            <input
              type="radio"
              class="accent-primary focus:outline-none"
              :value="option.id"
              v-model="userInput.gender"
            />
            <span class="text-lg font-bold">{{ option.label }}</span>
          </label>
        </div>
      </fieldset>
      <div class="flex flex-col items-start space-y-2">
        <label for="age" class="text-lg font-bold">年齢</label>
        <div class="space-x-2">
          <Input
            id="age"
            type="number"
            class="w-32"
            v-model="userInput.age"
          ></Input>
          <span class="text-lg font-bold">歳</span>
        </div>
      </div>
      <div class="flex space-x-4">
        <div class="flex w-full flex-1 flex-col items-start space-y-2">
          <label for="height" class="text-lg font-bold">身長</label>
          <div class="space-x-2">
            <Input
              id="height"
              type="number"
              class="w-32"
              v-model="userInput.height"
            ></Input>
            <span class="text-lg font-bold">cm</span>
          </div>
        </div>
        <div class="flex w-full flex-1 flex-col items-start space-y-2">
          <label for="weight" class="text-lg font-bold">体重</label>
          <div class="space-x-2">
            <Input
              id="weight"
              type="number"
              class="w-32"
              v-model="userInput.weight"
            ></Input>
            <span class="text-lg font-bold">kg</span>
          </div>
        </div>
      </div>
      <Button
        is="button"
        class="!mt-24 w-full cursor-pointer"
        :disabled="!isFirstPageValid"
        @click="() => (page = 1)"
        >次へ</Button
      >
    </div>
    <div class="flex flex-col space-y-10 pb-32" v-else>
      <fieldset class="!mt-4 flex flex-col items-start space-y-6">
        <legend for="username" class="text-lg font-bold leading-none">
          運動できる時間帯
        </legend>
        <div>
          <Input
            id="start-time"
            placeholder="開始時刻"
            class="w-[120px]"
            type="time"
            v-model="userInput.activeTime.start"
          ></Input>
          〜
          <Input
            id="end-time"
            placeholder="終了時刻"
            class="w-[120px]"
            type="time"
            v-model="userInput.activeTime.finish"
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
            v-model="userInput.goWorkTime.start"
          ></Input>
          <span>〜</span>
          <Input
            id="commute-go-end-time"
            placeholder="終了時刻"
            class="w-[120px]"
            type="time"
            v-model="userInput.goWorkTime.finish"
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
            v-model="userInput.leaveWorkTime.start"
          ></Input>
          <span>〜</span>
          <Input
            id="commute-return-end-time"
            placeholder="終了時刻"
            class="w-[120px]"
            type="time"
            v-model="userInput.leaveWorkTime.finish"
          ></Input>
        </fieldset>
        <div class="!mt-4 pl-10">
          <label
            class="flex cursor-pointer items-center space-x-2 accent-primary"
          >
            <input
              type="checkbox"
              class="m-1 h-max rounded-lg ring-primary focus:outline-none focus:ring"
              v-model="userInput.includeCommutingTime"
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
            class="flex flex-1 cursor-pointer space-x-2 rounded-xl border border-gray-300 bg-white p-3 ring-primary focus-within:border-transparent focus-within:ring"
          >
            <input
              type="radio"
              class="accent-primary focus:outline-none"
              :value="option.id"
              v-model="userInput.activeLevel"
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

      <Button
        is="button"
        @click="handleSend"
        :disabled="!isValid"
        class="w-full"
        >登録する</Button
      >
    </div>
  </NuxtLayout>
</template>
