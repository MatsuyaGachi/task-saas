## Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```



## ディレクトリ構成
pages/
  index.vue                # ルート。ログイン or /projects にリダイレクト想定

  login.vue                # /login
  signup.vue               # /signup

  teams/
    index.vue              # /teams         （チーム選択）
    [id]/
      index.vue            # /teams/:id     （チーム詳細・メンバー管理）

  projects/
    index.vue              # /projects      （プロジェクト一覧）
    [id]/
      index.vue            # /projects/:id  （プロジェクト詳細・Kanban）

  tasks/
    [taskId].vue           # /tasks/:taskId （タスク詳細）

  me.vue                   # /me            （プロフィール）
  settings/
    index.vue              # /settings      （設定）
