# ADR-001: モノレポ構成の採用

## Status

Accepted

## Context

Frontend, Backend, Infrastructure のコードを管理する方法を決定する必要がある。

## Decision

npm workspacesを使用したモノレポ構成を採用する。

## Rationale

- 共有型定義の一元管理
- 統一されたlint/format設定
- 依存関係の一元管理
- 開発者体験の向上（単一リポジトリでの操作）

## Consequences

- npm workspacesの仕組みの理解が必要
- CIの設定がやや複雑になる
- パッケージ間の依存関係管理が必要
