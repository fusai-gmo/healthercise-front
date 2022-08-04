import { User } from '~~/type/user'
import { axios } from './axios'

declare module '#app' {
  interface NuxtApp {
    $user: User | null
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $user: User | null
  }
}

export default defineNuxtPlugin(async (nuxtApp) => {
  // const router = useRouter()
  const user = useUser()
  const userPromise = usePromiseUser()
  userPromise.value = new Promise(async (resolve) => {
    try {
      const res1 = await axios.get<User>('http://localhost/auth/me')
      user.value = {
        user: res1.data,
        isLoggedIn: true,
        isRegistered: true,
        isLoading: false,
      }
      resolve(user.value)
    } catch (e: any) {
      if (e.response?.status === 401) {
        user.value = {
          user: null,
          isLoggedIn: false,
          isRegistered: false,
          isLoading: false,
        }
        resolve(user.value)
        // router.push('/login')
      } else if (e.response?.status === 404) {
        user.value = {
          user: null,
          isLoggedIn: true,
          isRegistered: false,
          isLoading: false,
        }
        resolve(user.value)
        // router.push('/login')
      }
    }
  })
})
