# Contributing Guide

## 開発フロー

1. featureブランチを作成
2. 実装
3. lint / format チェック
4. PRを作成
5. レビュー後マージ

## コーディング規約

- TypeScript strict mode
- ESLint + Prettier
- コミットメッセージ: conventional commits 推奨

## ディレクトリ規約

### Frontend
- UIコンポーネント → `components/ui/`
- 機能単位 → `features/<feature>/`
- Container/Presentational パターン

### Backend
- Controller → Service → Repository の3層
- DTOでバリデーション
- Entityでドメインモデルを表現
