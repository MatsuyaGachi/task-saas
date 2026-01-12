import { type Task } from '~~/server/utils/taskStore'
import { listTasksByProject } from '~~/server/utils/taskStore'

export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization')
  if (!auth || !auth.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const tasks: Task[] = [
    ...listTasksByProject(1),
    ...listTasksByProject(2),
  ]

  return tasks
})
