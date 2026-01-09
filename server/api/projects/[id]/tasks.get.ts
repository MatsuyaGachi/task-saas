import { listTasksByProject } from "~~/server/utils/taskStore"

export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization')
  if (!auth || !auth.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const projectId = Number(getRouterParam(event, 'id'))
  if (!Number.isFinite(projectId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid project id' })
  }

  const allTasks = [
    { id: 1, projectId: 1, title: '仕様書を書く', status: 'todo' },
    { id: 2, projectId: 1, title: 'API設計をする', status: 'doing' },
    { id: 3, projectId: 2, title: 'デプロイ設定', status: 'done' },
  ] as const

  return listTasksByProject(projectId)
})
