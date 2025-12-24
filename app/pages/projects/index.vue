<template>
  <div class="page page-projects">
    <h1>プロジェクト一覧</h1>

    <section>
      <h2>参加中のプロジェクト</h2>
      <p>ログイン中: {{ auth.user?.name }}</p>

      <ul v-if="projects.length">
        <li v-for="project in projects" :key="project.id">
          <button @click="goProject(project.id)">
            {{ project.name }}
          </button>
        </li>
      </ul>
      <p v-else>プロジェクトがありません。</p>
    </section>

    <section>
      <h2>自分の担当タスク（サマリ）</h2>
      <!-- TODO: 担当タスクのサマリ表示 -->
      <p>ここに担当タスク一覧を表示します（TODO）。</p>
    </section>

    <button @click="createProject">
      新規プロジェクト作成（TODO）
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useApi } from '~/composables/useApi'

const auth = useAuthStore()
const router = useRouter()
const { apiFetch  } = useApi()

type Project = {
  id: number
  name: string
}

const projects = ref<Project[]>([])

onMounted(async () => {
  projects.value = await apiFetch<Project[]>('/projects')
})

const goProject = (id: number) => {
  router.push(`/projects/${id}`)
}

const createProject = () => {
  // TODO: モーダル or 別ページで作成
  console.log('create project')
}
</script>
