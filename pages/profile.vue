<script lang="ts" setup>
  import Input from '@/components/fundamentals/Input.vue'
  import Button from '~~/components/fundamentals/Button.vue'
  import TextButton from '~~/components/fundamentals/TextButton.vue'
  import { RiArrowLeftLine, RiInformationLine } from 'vue-remix-icons'

  const router = useRouter()
  const user = useUser()
  const axios = useAxios()

  const isEdit = user.value.isRegistered
  const slackId = localStorage.getItem('slackid')

  const page = ref<0 | 1>(0)

  const userProfileState = useState('user_profile_input', () => ({}))

  const userInput = reactive({
    userName: user.value.user?.name ?? '',
    gender: null as number | null, // TODO: set
    age: user.value.user?.age?.toString() ?? '',
    height: user.value.user?.height?.toString() ?? '',
    weight: user.value.user?.weight?.toString() ?? '',
    activeTime: {
      start: user.value.user?.notify_start_time,
      finish: user.value.user?.notify_finish_time,
    },
    includeCommutingTime: false, // TODO: set
    goWorkTime: {
      start: '', // TODO: set
      finish: '', // TODO: set
    },
    leaveWorkTime: {
      start: '', // TODO: set
      finish: '', // TODO: set
    },
    activeLevel: null as number | null, // TODO: set
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
    try {
      if (true) {
        const userId =
          user.value.user?.id ??
          ((await axios.get(`/auth/me`).then((res) => res.data.id)) as string)
        await axios.patch(`/users/${userId}`, payload)
        window.location.href = '/'
      } else {
        await axios.post('/user', payload)
        user.value = {
          user: user.value.user!,
          isRegistered: true,
          isLoggedIn: true,
          isLoading: false,
        }
      }
      router.push('/')
    } catch (e) {
      console.error(e)
      window.alert('??????????????????????????????')
    }
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
        <span> ?????? </span>
      </TextButton>
    </template>
    <template #title>{{
      isEdit ? '???????????????????????????' : '??????????????????'
    }}</template>

    <div v-if="page === 0" class="flex flex-col space-y-8">
      <div class="flex flex-col items-start space-y-2">
        <label for="username" class="text-lg font-bold">???????????????</label>
        <Input
          id="username"
          v-model="userInput.userName"
          placeholder="????????????????????????"
          type="text"
          class="w-full"
        ></Input>
      </div>
      <fieldset class="flex flex-col items-start space-y-2">
        <div for="username" class="text-lg font-bold">??????</div>
        <div class="flex w-full space-x-2">
          <label
            v-for="option in [
              { label: '??????', id: 'male' },
              { label: '??????', id: 'female' },
              { label: '?????????', id: 'other' },
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
        <label for="age" class="text-lg font-bold">??????</label>
        <div class="space-x-2">
          <Input
            id="age"
            type="number"
            class="w-32"
            v-model="userInput.age"
          ></Input>
          <span class="text-lg font-bold">???</span>
        </div>
      </div>
      <div class="flex space-x-4">
        <div class="flex w-full flex-1 flex-col items-start space-y-2">
          <label for="height" class="text-lg font-bold">??????</label>
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
          <label for="weight" class="text-lg font-bold">??????</label>
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
      <button
        class="!mt-24 w-full cursor-pointer rounded-2xl border border-gray-300 bg-white px-5 py-3 text-center font-bold outline-4 ring-primary transition hover:border-transparent hover:outline-none hover:ring-2 focus:border-transparent focus:outline-none focus:ring-2"
        :disabled="!isFirstPageValid"
        @click="() => (page = 1)"
      >
        ??????
      </button>
    </div>
    <div class="flex flex-col space-y-10 pb-32" v-else>
      <fieldset class="!mt-4 flex flex-col items-start space-y-6">
        <legend for="username" class="text-lg font-bold leading-none">
          ????????????????????????
        </legend>
        <div>
          <Input
            id="start-time"
            placeholder="????????????"
            class="w-[120px]"
            type="time"
            v-model="userInput.activeTime.start"
          ></Input>
          ???
          <Input
            id="end-time"
            placeholder="????????????"
            class="w-[120px]"
            type="time"
            v-model="userInput.activeTime.finish"
          ></Input>
        </div>
        <div class="flex space-x-1 fill-gray-400 text-gray-400">
          <RiInformationLine
            class="m-1 h-5 w-5 shrink-0 text-sm"
          ></RiInformationLine>
          <p>???????????????????????????????????????????????????????????????????????????</p>
        </div>
      </fieldset>

      <div class="flex flex-col items-start space-y-6">
        <p for="username" class="text-lg font-bold leading-none">????????????</p>
        <fieldset class="flex w-full items-center space-x-2">
          <div>
            <legend class="w-8 font-bold">??????</legend>
          </div>
          <Input
            id="commute-go-start-time"
            placeholder="????????????"
            class="w-[120px]"
            type="time"
            v-model="userInput.goWorkTime.start"
          ></Input>
          <span>???</span>
          <Input
            id="commute-go-end-time"
            placeholder="????????????"
            class="w-[120px]"
            type="time"
            v-model="userInput.goWorkTime.finish"
          ></Input>
        </fieldset>
        <fieldset class="flex w-full items-center space-x-2">
          <div>
            <legend class="w-8 font-bold">??????</legend>
          </div>
          <Input
            id="commute-return-start-time"
            placeholder="????????????"
            class="w-[120px]"
            type="time"
            v-model="userInput.leaveWorkTime.start"
          ></Input>
          <span>???</span>
          <Input
            id="commute-return-end-time"
            placeholder="????????????"
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
            <div>???????????????????????????????????????</div>
          </label>
        </div>
      </div>

      <fieldset class="flex flex-col items-start space-y-2">
        <div for="username" class="text-lg font-bold">?????????????????????</div>
        <div class="flex w-full flex-col space-y-2">
          <label
            v-for="option in [
              { label: '??????????????????????????????????????????????????????????????????', id: 1 },
              {
                label:
                  '????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
                id: 2,
              },
              {
                label:
                  '?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
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
              <p class="font-bold">?????????{{ option.id }}</p>
              <p class="text-sm">
                {{ option.label }}
              </p>
            </div>
          </label>
        </div>
      </fieldset>

      <button
        class="!mt-24 w-full cursor-pointer rounded-2xl border border-gray-300 bg-white px-5 py-3 text-center font-bold outline-4 ring-primary transition hover:border-transparent hover:outline-none hover:ring-2 focus:border-transparent focus:outline-none focus:ring-2"
        @click="handleSend"
        :disabled="!isValid"
      >
        {{ isEdit ? '????????????' : '????????????' }}
      </button>
    </div>
  </NuxtLayout>
</template>
