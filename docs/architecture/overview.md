# Architecture Overview

> システム全体の構成を俯瞰するドキュメント

## 書く内容

### 1. システム構成図
- Browser → Next.js(3000) → NestJS(3001) → PostgreSQL(5432) の通信フロー図
- Mermaid またはテキストベースの図で記述

### 2. モノレポ構成
- `apps/web`, `apps/api`, `packages/`, `prisma/` それぞれの役割
- パッケージ間の依存関係

### 3. 技術スタック一覧表
- 各領域（Frontend / Backend / DB / Monorepo）の技術とバージョン

### 4. アーキテクチャパターン概要
- Frontend: Feature-based + Container/Presentational（詳細は frontend.md）
- Backend: レイヤードアーキテクチャ（詳細は backend.md）
- ここでは概要だけ。詳細は各ドキュメントに委ねる

## 書き方のポイント
- 新メンバーが最初に読む前提で、全体像をつかめるようにする
- 技術選定の「なぜ」は `decisions/` の ADR に書き、ここでは「何を使っているか」に留める
