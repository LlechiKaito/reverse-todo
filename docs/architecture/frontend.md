# Frontend Architecture

> フロントエンドの設計方針とディレクトリ構成を説明するドキュメント

## 書く内容

### 1. ディレクトリ構成と各フォルダの役割
- `app/` — App Router のルート定義。ページコンポーネントのみ置く
- `components/ui/` — 汎用 UI コンポーネント（Button, Input, Card 等）
- `components/layout/` — レイアウト（Header, Footer, Sidebar）
- `features/<機能名>/` — 機能単位のモジュール
  - `components/` — Presentational コンポーネント
  - `containers/` — Container コンポーネント（データ取得・状態管理）
  - `hooks/` — カスタムフック
  - `services/` — API 通信
  - `types/` — 型定義
- `hooks/` — グローバルフック（useDebounce 等）
- `lib/` — ユーティリティ、定数、API クライアント
- `config/` — 環境変数の型付きアクセス
- `contexts/` — React Context
- `types/` — グローバル型定義

### 2. Container / Presentational パターン
- Container の責務: データ取得、状態管理、イベントハンドリング
- Presentational の責務: props を受け取り UI をレンダリングするだけ
- どちらに書くか迷ったときの判断基準

### 3. Feature-based Organization
- 機能を追加するときのフォルダ作成手順
- 機能間で共有したくなったときの `components/ui/` や `hooks/` への切り出し基準

### 4. データフェッチ方針
- Server Components vs Client Components の使い分け
- カスタムフックでの fetch パターン

## 書き方のポイント
- 新しい機能を追加するとき「どこに何を作ればいいか」が分かるようにする
