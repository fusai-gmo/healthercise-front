const useAxios = () => {
  const { $axios: axios } = useNuxtApp()
  return axios
}

export default useAxios
