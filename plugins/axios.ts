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

export const getAxios = (baseURL: string) =>
  axiosBase.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  })

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const router = useRouter()

  const axios = getAxios(runtimeConfig.public.apiBase ?? 'http://localhost')

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
