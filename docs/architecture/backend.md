# Backend Architecture

> バックエンドのレイヤードアーキテクチャを説明するドキュメント

## 書く内容

### 1. レイヤー構成図
- Presentation → Application → Domain → Infrastructure の依存方向を図示
- 各レイヤーの責務を1〜2行で説明

### 2. 各レイヤーの詳細

#### Presentation 層（`src/presentation/`）
- 責務: HTTPリクエスト/レスポンス処理、バリデーション、エラー変換
- ルール: ビジネスロジックを書かない。Application 層を呼ぶだけ
- サブフォルダ:
  - `controllers/` — ルーティングとリクエスト処理。エンドポイントごとに1ファイル（例: `todos.controller.ts`）。受け取った DTO を Application 層に渡してレスポンスを返すだけ
  - `dto/` — リクエスト/レスポンスのデータ形状定義。class-validator デコレータでバリデーションルールを宣言する（例: `create-todo.dto.ts`, `update-todo.dto.ts`）
  - `filters/` — 例外フィルター。Application 層以下から投げられた例外を HTTP レスポンスに変換する（例: `http-exception.filter.ts`）
  - `interceptors/` — リクエスト/レスポンスの横断的処理。ログ出力やレスポンス変換等（例: `logging.interceptor.ts`）

#### Application 層（`src/application/`）
- 何を置くか: Service
- 責務: ビジネスロジック、トランザクション制御、複数エンティティの連携
- ルール: HTTP や DB の詳細を知らない

#### Domain 層（`src/domain/`）
- 何を置くか: Entity
- 責務: ビジネスルールの表現、ドメインモデルの定義
- ルール: 外部ライブラリに依存しない

#### Infrastructure 層（`src/infrastructure/`）
- 何を置くか: Prisma Service, Repository 実装, 外部API連携, 設定
- 責務: DB アクセス、外部サービスとの通信
- ルール: Prisma 等の具体的な技術をここに閉じ込める

### 3. NestJS モジュール構成
- Module / Provider / Controller の関係
- DI（依存性注入）の使い方

### 4. エラーハンドリング方針
- 各レイヤーでどう例外を扱うか
- HttpExceptionFilter の役割

## 書き方のポイント
- 「このファイルはどのレイヤーに置くべきか」が判断できるようにする
- 実際のコード例は実装後に追記する
