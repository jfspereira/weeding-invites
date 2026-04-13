// Client-side Nuxt route middleware guarding the admin dashboard
export default defineNuxtRouteMiddleware(() => {
  // useCookie is available in both server and client context in Nuxt
  const session = useCookie('admin_session')
  if (!session.value) {
    return navigateTo('/secreto-admin-login')
  }
})

