# ADR（Architecture Decision Record）

> 技術的な意思決定を記録するドキュメント

## 書く内容

### 各 ADR に以下のセクションを記載

#### Status
- Proposed / Accepted / Deprecated / Superseded のいずれか

#### Context
- 何を決める必要があったのか（背景・課題）

#### Decision
- 何を選んだか（結論）

#### Rationale
- なぜその選択をしたか（比較検討した選択肢と判断理由）

#### Consequences
- その決定によるメリット・デメリット・影響

### ADR の例
- ADR-001: モノレポ構成の採用（npm workspaces を選んだ理由）
- ADR-002: レイヤードアーキテクチャの採用
- ADR-003: Prisma ORM の採用
- ADR-004: Tailwind CSS の採用

## 書き方のポイント
- 1 つの意思決定につき 1 ファイル（`ADR-NNN-タイトル.md`）
- 過去の ADR は消さない。変更時は新しい ADR で Superseded にする
- 「なぜ他の選択肢を選ばなかったか」も書くと後から振り返りやすい
