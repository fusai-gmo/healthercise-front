export default defineNuxtRouteMiddleware(async (to, from) => {
  const userPromiseRef = usePromiseUser()
  const user = await userPromiseRef.value

  if (user == null || !user.isLoggedIn) {
    return navigateTo('/login')
  } else if (!user.isRegistered) {
    return navigateTo('/profile')
  }

  console.log(to.path)
  if (to.path === '/login') {
    return navigateTo('/')
  }
})
