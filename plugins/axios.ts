import axiosBase, { AxiosInstance } from 'axios'

declare module '#app' {
  interface NuxtApp {
    $axios: AxiosInstance
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

export const axios = axiosBase.create({
  baseURL: 'http://localhost',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response?.status === 401) {
        router.push('/login')
      }
      throw error
    }
  )

  nuxtApp.provide('axios', axios)
})
