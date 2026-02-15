# Architecture Overview

## システム構成

```
Client (Browser)
  │
  ├── Next.js (SSR/CSR) ──── S3 + CloudFront
  │
  └── REST API ──── NestJS (ECS Fargate)
                      │
                      └── PostgreSQL (RDS)
```

## モノレポ構成

npm workspacesを使用したモノレポ構成。

- `apps/web` - フロントエンド
- `apps/api` - バックエンド
- `packages/` - 共有パッケージ
- `infra/` - インフラ（AWS CDK）

## デザインパターン

### Frontend: Container/Presentational
- **containers/**: データ取得・状態管理
- **components/**: 純粋なUIコンポーネント
- **hooks/**: ロジックのカプセル化

### Backend: レイヤードアーキテクチャ
- **Controller層**: HTTPリクエスト処理
- **Service層**: ビジネスロジック
- **Repository層**: データアクセス
