import axiosBase from 'axios'

declare module '#app' {
  interface NuxtApp {
    $axios: typeof axiosBase
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: typeof axiosBase
  }
}

const axios = axiosBase.create({
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
      console.log('ERRORRRRR')
      console.log(error)
      console.log({ ...error })
      if (error.response?.status === 401) {
        router.push('/login')
      }
      throw error
    }
  )

  nuxtApp.provide('axios', axios)
})
