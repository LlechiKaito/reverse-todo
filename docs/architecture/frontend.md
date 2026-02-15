# Frontend Architecture

## 技術

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS

## ディレクトリ構成

```
src/
├── app/              # App Router ルート
├── components/
│   ├── ui/           # 汎用UIコンポーネント
│   └── layout/       # レイアウトコンポーネント
├── features/todos/   # Todoフィーチャーモジュール
│   ├── components/   # Presentationalコンポーネント
│   ├── containers/   # Containerコンポーネント
│   ├── hooks/        # カスタムフック
│   ├── services/     # API通信
│   └── types/        # 型定義
├── hooks/            # グローバルフック
├── lib/              # ユーティリティ
├── config/           # 環境設定
├── contexts/         # React Context
└── types/            # グローバル型定義
```

## パターン

### Container/Presentational
- Container: データ取得、状態管理、イベントハンドリング
- Presentational: propsを受け取りUIをレンダリング

### Feature-based Organization
機能単位でコードを整理し、関連するコンポーネント、フック、サービスをまとめる。
