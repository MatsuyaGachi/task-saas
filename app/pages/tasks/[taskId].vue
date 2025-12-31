<template>
  <div class="page page-task-detail">
    <h1>タスク詳細（ID: {{ taskId }}）</h1>

    <section v-if="task">
      <h2>情報</h2>
      <p>タイトル: {{ task.title }}</p>
      <p>説明: {{ task.description }}</p>
      <p>ステータス: {{ task.status }}</p>
      <p>担当者: {{ task.assignee }}</p>
      <p>期限: {{ task.dueDate }}</p>
    </section>
    <div v-else>
      <p>読み込み中...</p>
    </div>

    <section>
      <h2>コメント</h2>
      <ul v-if="comments.length">
        <li v-for="comment in comments" :key="comment.id">
          <strong>{{ comment.author }}</strong>:
          {{ comment.body }}
        </li>
      </ul>
      <p v-else>コメントはまだありません。</p>

      <form @submit.prevent="addComment">
        <textarea v-model="newComment" rows="3" />
        <button type="submit">コメントを追加</button>
      </form>
    </section>

    <section>
      <h2>添付ファイル（TODO）</h2>
      <!-- TODO: 添付ファイル表示 & アップロード -->
    </section>
  </div>
</template>

<script setup lang="ts">
const { apiFetch } = useApi()
const route = useRoute()

const taskId = computed(() => Number(route.params.taskId))

type TaskDetail = {
  id: number
  projectId: number
  title: string
  description: string
  status: 'todo' | 'doing' | 'done'
  assignee: string
  dueDate: string
}

type Comment = {
  id: number
  author: string
  body: string
}

const allTaskDetails = ref<TaskDetail[]>([
  {
    id: 1,
    title: '仕様書を書く',
    description: 'プロジェクトAの仕様書を作成する',
    status: 'todo',
    assignee: '山田 太郎',
    dueDate: '2025-11-30',
    projectId: 0
  },
  {
    id: 2,
    title: 'API設計をする',
    description: '認証とタスク管理用APIを設計する',
    status: 'doing',
    assignee: '佐藤 花子',
    dueDate: '2025-12-05',
    projectId: 0
  },
  {
    id: 3,
    title: 'デプロイ設定',
    description: '本番環境へのデプロイフローを整える',
    status: 'done',
    assignee: '鈴木 次郎',
    dueDate: '2025-12-10',
    projectId: 0
  }
])

const task = ref<TaskDetail | null>(null)

onMounted(async () => {
  task.value = await apiFetch<TaskDetail>(`/tasks/${taskId.value}`)
})

const comments = ref<Comment[]>([
  // TODO: API から取得
  { id: 1, author: '佐藤', body: '確認しました！' }
])

const newComment = ref('')

const addComment = () => {
  if (!newComment.value.trim()) return

  comments.value.push({
    id: Date.now(),
    author: '自分（仮）',
    body: newComment.value
  })

  newComment.value = ''
}
</script>
