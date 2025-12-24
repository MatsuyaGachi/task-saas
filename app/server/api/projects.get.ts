export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization')
  if(!auth || !auth.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  return[
    { id:1 , name: 'プロジェクトA' },
    { id:2 , name: 'プロジェクトB' }
  ]
})