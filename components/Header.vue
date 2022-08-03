<script lang="ts" setup>
  import Popper from 'vue3-popper'
  import { signOut } from '@firebase/auth';
  const router = useRouter()
  const { $auth } = useNuxtApp()
  const googleLogout = () => {
  signOut($auth)
    .then((response) => {
      let Authorization = useAuthorization()
      Authorization.value = ''
      router.push('/login')
    })
    .catch((error) => {
      alert(error)
    })
  }
</script>

<template>
  <header class="flex w-full items-center justify-between bg-bg px-4 py-3">
    <div class="flex w-max items-center space-x-2">
      <Logo class="fill-accent"></Logo>
      <h1 class="text-xl font-bold">
        <slot></slot>
      </h1>
    </div>
    <Popper placement="bottom-start">
      <template #content>
        <ul class="rounded-2xl bg-white p-1 shadow-lg">
          <NuxtLink to="/profile?mode=edit">
            <li class="rounded-2xl px-6 py-4 hover:bg-gray-100">
              登録情報の変更・確認
            </li>
          </NuxtLink>
          <button class="w-full text-start" @click="googleLogout()">
            <li class="rounded-2xl px-6 py-4 hover:bg-gray-100">ログアウト</li>
          </button>
        </ul>
      </template>
      <button
        class="rounded-full ring-accent ring-offset-2 focus:outline-none focus:ring-2"
      >
        <img
          src="https://img.benesse-cms.jp/pet-cat/item/image/normal/77061d41-6774-4eed-8a01-187aad5e5b45.jpg?w=1200&h=1090&resize_type=cover&resize_mode=force"
          alt=""
          class="h-8 w-8 rounded-full"
        />
      </button>
    </Popper>
  </header>
</template>
