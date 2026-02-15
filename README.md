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
