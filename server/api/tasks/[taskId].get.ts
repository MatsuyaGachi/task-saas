export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization')
  if (!auth || !auth.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const taskId  = Number(getRouterParam(event, 'taskId'))
  if (!Number.isFinite(taskId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid task id' })
  }

  const tasks = [
    {
      id: 1,
      projectId: 1,
      title: '仕様書を書く',
      description: 'プロジェクトAの仕様書を作成する',
      status: 'todo',
      assignee: '山田 太郎',
      dueDate: '2025-11-30',
    },
    {
      id: 2,
      projectId: 1,
      title: 'API設計をする',
      description: '認証とタスク管理用APIを設計する',
      status: 'doing',
      assignee: '佐藤 花子',
      dueDate: '2025-12-05',
    },
    {
      id: 3,
      projectId: 2,
      title: 'デプロイ設定',
      description: '本番環境へのデプロイフローを整える',
      status: 'done',
      assignee: '鈴木 次郎',
      dueDate: '2025-12-10',
    },
  ] as const

  const task = tasks.find(t => t.id === taskId)
  if (!task) {
    throw createError({ statusCode: 404, statusMessage: 'Task not found' })
  }

  return task
})