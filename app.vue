<script lang="ts" setup>
  import { RiLoader3Line } from 'vue-remix-icons'

  const router = useRouter()
  const user = useUser()
  watch(
    () => user,
    () => {
      if (user.value.isLoading) {
        return
      }
      if (!user.value.isLoggedIn) {
        router.push('/login')
      } else if (!user.value.isRegistered) {
        router.push('/register')
      }
    },
    { deep: true }
  )
</script>

<template>
  <div>
    <p>loading: {{ user.isLoading }}</p>
    <p>login: {{ user.isLoggedIn }}</p>
    <p>register: {{ user.isRegistered }}</p>
  </div>
  <div
    v-if="user.isLoading"
    class="fixed inset-0 flex items-center justify-center bg-gray-50 pb-20"
  >
    <RiLoader3Line class="h-20 w-20 animate-spin-slow"></RiLoader3Line>
  </div>
  <div v-else>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
