# Reverse Todo

フルスタックモノレポ Todo アプリケーション

## 技術スタック

| 領域 | 技術 |
|------|------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS |
| Backend | NestJS 10, TypeScript |
| Database | PostgreSQL 16, Prisma ORM |
| Monorepo | npm workspaces |

## 環境構築

### 前提条件

- Node.js 20+
- Docker / Docker Compose

### セットアップ

```bash
# 依存関係インストール
npm install

# 環境変数ファイルコピー
cp .env.example .env

# PostgreSQL起動
docker compose up -d

# Prismaクライアント生成
npm run db:generate

# マイグレーション実行
npm run db:migrate

# シードデータ投入
npm run db:seed
```

### 開発サーバー起動

```bash
# バックエンド（http://localhost:3001）
npm run dev:api

# フロントエンド（http://localhost:3000）
npm run dev:web
```

### その他のコマンド

```bash
npm run lint          # ESLint実行
npm run format        # Prettier チェック
npm run format:fix    # Prettier 自動修正
npm run typecheck     # TypeScript型チェック
npm run db:studio     # Prisma Studio（DB GUI）
```

## Docker

### コンテナ構成

| サービス | コンテナ名 | ポート | 説明 |
|----------|-----------|--------|------|
| postgres | reverse-todo-db | 5432 | PostgreSQL 16 |
| api | reverse-todo-api | 3001 | NestJS バックエンド |
| web | reverse-todo-web | 3000 | Next.js フロントエンド |

### 起動・停止

```bash
# 全サービス起動（バックグラウンド）
docker compose up -d

# PostgreSQLだけ起動（ローカル開発時）
docker compose up -d postgres

# ログを見ながら起動（フォアグラウンド）
docker compose up

# 特定サービスのログを確認
docker compose logs -f api
docker compose logs -f web
docker compose logs -f postgres

# 全サービス停止
docker compose down

# 停止 + データボリューム削除（DBリセット）
docker compose down -v
```

### コンテナに入る

```bash
# PostgreSQLに接続
docker compose exec postgres psql -U postgres -d reverse_todo

# APIコンテナに入る
docker compose exec api sh

# Webコンテナに入る
docker compose exec web sh
```

### ビルド・再ビルド

```bash
# イメージをビルドして起動
docker compose up -d --build

# 特定サービスだけ再ビルド
docker compose build api
docker compose build web

# キャッシュなしで再ビルド
docker compose build --no-cache
```

### 状態確認

```bash
# 実行中のコンテナ一覧
docker compose ps

# コンテナのリソース使用状況
docker compose top
```

## プロジェクト構成

```
apps/
  web/    - Next.js フロントエンド
  api/    - NestJS バックエンド
packages/
  shared-types/   - 共有型定義
  eslint-config/  - ESLint設定
  tsconfig/       - TypeScript設定
prisma/           - DBスキーマ・マイグレーション
```

## API エンドポイント

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/health | ヘルスチェック |
| GET | /api/todos | Todo一覧取得 |
| GET | /api/todos/:id | Todo詳細取得 |
| POST | /api/todos | Todo作成 |
| PUT | /api/todos/:id | Todo更新 |
| DELETE | /api/todos/:id | Todo削除 |
