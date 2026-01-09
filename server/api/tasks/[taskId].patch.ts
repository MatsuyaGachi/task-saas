import { updateTaskStatus , type Status } from '~~/server/utils/taskStore'

export default defineEventHandler(async (event) => {
  const auth = getHeader(event, 'authorization')
  if (!auth || !auth.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const taskId = Number(getRouterParam(event, 'id'))
  if (!Number.isFinite(taskId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid task id' })
  }

  const body = await readBody<{ status?: unknown }>(event)
  const status = body?.status

  const allowed: Status[] = ['todo', 'doing', 'done']
  if (typeof status !== 'string' || !allowed.includes(status as Status)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid status' })
  }

  const updated = updateTaskStatus(taskId, status as Status)
  if (!updated) {
    throw createError({ statusCode: 404, statusMessage: 'Task not found' })
  }

  return updated

})
