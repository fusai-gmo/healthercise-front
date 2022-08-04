import { AxiosInstance } from 'axios'

const useAxios = () => {
  const { $axios: axios } = useNuxtApp()
  return axios as AxiosInstance
}

export default useAxios
