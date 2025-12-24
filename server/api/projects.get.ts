export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization')
  if (!auth || !auth.startsWith('Bearer ')) {
    setResponseStatus(event, 401)
    return { message: 'Unauthorized' }
  }

  return[
    { id:1 , name: 'プロジェクトA' },
    { id:2 , name: 'プロジェクトB' }
  ]
})