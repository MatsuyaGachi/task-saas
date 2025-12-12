import { useAuthStore } from "~/stores/auth"

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  auth.hydrateFromCookie()

  const publicPages = ['/login', '/signup']
  if (!auth.user && !publicPages.includes(to.path)) {
    return navigateTo('/login')
  }
})
