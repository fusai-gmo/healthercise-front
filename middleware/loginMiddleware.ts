export default defineNuxtRouteMiddleware(async (to, from) => {
    if(useAuthorization()['value'] == '') {
      return navigateTo('/login')
    }
  })