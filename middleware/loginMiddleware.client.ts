import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = getAuth()

  const isLoggedIn =
    useAuthorization()['value'] !== '' ||
    (await new Promise<boolean>((resolve) =>
      onAuthStateChanged(auth, (user) => resolve(user != null))
    ))

  if (!isLoggedIn && to.path !== '/login') {
    return navigateTo('/login')
  }

  const isRegistered = await new Promise<boolean>((resolve) => resolve(true)) // TODO: APIから取得

  if (!isRegistered && to.path !== '/profile') {
    return navigateTo('/profile')
  }
})
