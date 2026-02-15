# Todo API Endpoints

Base URL: `http://localhost:3001/api`

## GET /todos

Todo一覧を取得する。

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | フィルタ: PENDING, IN_PROGRESS, COMPLETED |
| page | number | ページ番号（デフォルト: 1） |
| limit | number | 1ページあたりの件数（デフォルト: 20, 最大: 100） |

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "description": "string | null",
      "status": "PENDING | IN_PROGRESS | COMPLETED",
      "dueDate": "ISO8601 | null",
      "userId": "uuid",
      "tags": [{ "id": "uuid", "name": "string" }],
      "createdAt": "ISO8601",
      "updatedAt": "ISO8601"
    }
  ],
  "meta": {
    "total": 10,
    "page": 1,
    "limit": 20,
    "totalPages": 1
  }
}
```

## GET /todos/:id

Todo詳細を取得する。

## POST /todos

Todoを作成する。

**Request Body:**
```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "status": "PENDING (optional)",
  "dueDate": "ISO8601 (optional)",
  "tagIds": ["uuid"] (optional)
}
```

## PUT /todos/:id

Todoを更新する。

**Request Body:** POST と同じフィールド（すべてoptional）

## DELETE /todos/:id

Todoを削除する。レスポンス: 204 No Content
