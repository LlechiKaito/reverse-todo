# Database Schema Design

> DB スキーマの設計ドキュメント

## 書く内容

### 1. ER 図
- テーブル間のリレーション（1対多、多対多）を図示
- Mermaid の erDiagram またはテキストで記述

### 2. テーブル定義
- テーブルごとにカラム一覧を表で記載
  - カラム名、型、制約（PK / FK / UNIQUE / NOT NULL / DEFAULT）
- 対象テーブル: users, todos, tags, todo_tags

### 3. Enum 定義
- TodoStatus 等の Enum の値と意味

### 4. インデックス
- どのカラムにインデックスを張っているか、理由も添える

### 5. マイグレーション方針
- Prisma Migrate の運用ルール
- 本番適用時の手順

## 書き方のポイント
- `prisma/schema.prisma` が正とし、このドキュメントは人間向けの補足説明
- スキーマ変更時はこのドキュメントも更新する
