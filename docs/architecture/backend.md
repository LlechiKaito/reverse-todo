# Backend Architecture

## 技術

- NestJS 10
- TypeScript
- Prisma ORM
- PostgreSQL

## レイヤードアーキテクチャ

```
HTTP Request
  │
  ▼
Controller (DTO validation)
  │
  ▼
Service (Business logic)
  │
  ▼
Repository (Data access via Prisma)
  │
  ▼
PostgreSQL
```

### Controller層
- HTTPリクエスト/レスポンス処理
- DTOによるバリデーション（class-validator）
- ルーティング

### Service層
- ビジネスロジック
- エラーハンドリング
- 複数リポジトリの連携

### Repository層
- Prismaクエリのカプセル化
- Entity変換
- ページネーション

## 共通機能

- `HttpExceptionFilter`: 統一的なエラーレスポンス
- `LoggingInterceptor`: リクエストログ
- `ValidationPipe`: グローバルバリデーション
