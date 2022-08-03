import { getAuth, onAuthStateChanged, User } from 'firebase/auth'

type Auth =
  | {
      isLoading: true
      user: null
    }
  | {
      isLoading: false
      user: User | null
    }

declare module '#app' {
  interface NuxtApp {
    $user: Auth
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $user: Auth
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const auth = getAuth()
  const user = useUser()
  // nuxtApp.provide('user', { isLoading: true, user: null })
  user.value = { isLoading: true, user: null }
  onAuthStateChanged(auth, (u) => {
    // nuxtApp.provide('user', { isLoading: false, user })
    user.value = { isLoading: false, user: u }
  })
})
