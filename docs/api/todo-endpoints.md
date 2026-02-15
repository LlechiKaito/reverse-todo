# Todo API Endpoints

> API エンドポイントの仕様書

## 書く内容

### 各エンドポイントごとに以下を記載
- HTTP メソッド + パス
- 概要（何をするエンドポイントか）
- リクエスト
  - Path Parameters（あれば）
  - Query Parameters（あれば）
  - Request Body（JSON の各フィールド、型、必須/任意）
- レスポンス
  - ステータスコード
  - Response Body（JSON 例）
- エラーケース（400, 404, 500 等のレスポンス例）

### 想定エンドポイント
- `GET /api/todos` — 一覧取得（フィルタ・ページネーション対応）
- `GET /api/todos/:id` — 詳細取得
- `POST /api/todos` — 新規作成
- `PUT /api/todos/:id` — 更新
- `DELETE /api/todos/:id` — 削除
- `GET /api/health` — ヘルスチェック

## 書き方のポイント
- リクエスト/レスポンスは JSON 例をそのまま貼る
- フロントエンド開発者がこのドキュメントだけで API を叩けるようにする
- エンドポイントが増えたらファイルを分割する（例: `user-endpoints.md`）
