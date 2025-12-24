export const useApi = () => {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('token')

  const apiFetch = $fetch.create({
    baseURL: '/api',
    onRequest({ options }) {
      // tokenがあれば Authorization を自動付与
      if (token.value) {
        const headers = new Headers(options.headers)
        headers.set('Authorization', `Bearer ${token.value}`)
        options.headers = headers
      }
    },
  })

  return { apiFetch }
}
