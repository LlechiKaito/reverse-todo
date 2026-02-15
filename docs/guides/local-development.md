# Local Development Guide

## 前提条件

- Node.js 20+
- Docker / Docker Compose

## セットアップ

```bash
# リポジトリクローン
git clone <repo-url>
cd reverse-todo

# 依存関係インストール
npm install

# 環境変数
cp .env.example .env

# PostgreSQL起動
docker compose up -d

# DB初期化
npm run db:generate
npm run db:migrate
npm run db:seed
```

## 開発

```bash
# バックエンド
npm run dev:api    # http://localhost:3001

# フロントエンド
npm run dev:web    # http://localhost:3000
```

## DB操作

```bash
npm run db:studio     # Prisma Studio
npm run db:migrate    # マイグレーション実行
npm run db:seed       # シードデータ投入
```

## トラブルシューティング

### ポートが使用中
```bash
lsof -i :3000  # or :3001, :5432
```

### DBリセット
```bash
docker compose down -v
docker compose up -d
npm run db:migrate
npm run db:seed
```
