# 逆Todo - UI/UX デザインルール

## デザイン方針

### コンセプト: 「責めない、寄り添う」

やめたいことと向き合うアプリ。ユーザーは失敗（挫折）と隣り合わせ。
UIの役割は**「静かに応援する」**こと。派手に褒めず、失敗を責めず、淡々と記録を続ける安心感を作る。

### 主役は「連続日数（ストリーク）」

- 各画面で最も目立つのはストリークの数字
- 他の要素はストリークを引き立てるための脇役
- **ストリーク以外の要素が目立ちすぎていたら、それは設計ミス**

---

## デザインスタイル

### ダークモード・ファースト

習慣を断つ行為は「夜」に誘惑が多い。夜間利用を前提としたダークモードを基本とする。

### ミニマル + グラスモーフィズム

- 余白を多く取り、認知負荷を下げる
- グラスモーフィズムで奥行きと軽さを両立
- 装飾は最小限。意味のないグラデーション・アニメーション禁止

---

## カラーパレット

### 設計思想

| 色の役割 | 意図 | 注意 |
|---------|------|------|
| 背景（ダーク） | 落ち着き、集中 | 真っ黒(#000)は避ける。ダークネイビー系 |
| アクセント（インディゴ） | 意志の強さ、冷静さ | 赤は「失敗」を連想するため主役にしない |
| 成功（エメラルド） | 成長、健康、希望 | ストリーク表示に使用 |
| 警告（アンバー） | 注意喚起、やさしい警告 | 攻撃的にならない暖色 |
| 挫折（ローズ） | 記録としての失敗 | 責めない。控えめに使用 |

### トークン定義

```css
:root {
  /* === 背景 === */
  --bg-primary: #0B0D17;       /* 最深背景 */
  --bg-secondary: #111827;     /* カード背景の下地 */
  --bg-tertiary: #1F2937;      /* 入力フィールド等 */

  /* === テキスト === */
  --text-primary: #F9FAFB;     /* 白に近いグレー (gray-50) */
  --text-secondary: #D1D5DB;   /* 本文 (gray-300) コントラスト比 7:1+ */
  --text-muted: #9CA3AF;       /* 補足 (gray-400) 大きいテキストのみ */

  /* === アクセント === */
  --accent-primary: #6366F1;   /* インディゴ-500: 意志・決意 */
  --accent-primary-hover: #4F46E5;
  --accent-success: #10B981;   /* エメラルド-500: 成長・継続 */
  --accent-warning: #F59E0B;   /* アンバー-500: 注意 */
  --accent-danger: #F43F5E;    /* ローズ-500: 挫折記録 */

  /* === Glass === */
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.10);
  --glass-bg-hover: rgba(255, 255, 255, 0.10);

  /* === 角丸 === */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 999px;

  /* === 間隔 === */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
}
```

### Tailwind 拡張マッピング

```ts
// tailwind.config.ts で上記トークンを参照
colors: {
  bg: {
    primary: 'var(--bg-primary)',
    secondary: 'var(--bg-secondary)',
    tertiary: 'var(--bg-tertiary)',
  },
  accent: {
    primary: 'var(--accent-primary)',
    success: 'var(--accent-success)',
    warning: 'var(--accent-warning)',
    danger: 'var(--accent-danger)',
  },
  // ... etc
}
```

---

## タイポグラフィ

### フォント

```css
font-family: "Inter", "Noto Sans JP", system-ui, sans-serif;
```

- 英数字: Inter（モダン、可読性高い）
- 日本語: Noto Sans JP（クリーンで統一感）

### サイズスケール

| 用途 | クラス | サイズ | 備考 |
|------|--------|--------|------|
| ストリーク数字 | `text-6xl` / `text-8xl` | 60-96px | **最大・最目立ち** |
| ページタイトル | `text-2xl` | 24px | 控えめ |
| カードタイトル | `text-lg` | 18px | |
| 本文 | `text-base` | 16px | |
| 補足・ラベル | `text-sm` | 14px | |
| 極小ラベル | `text-xs` | 12px | |

### ストリーク数字の特別扱い

```tsx
// ストリークは最も目立つ要素
<span className="text-8xl font-bold text-accent-success tabular-nums tracking-tight">
  42
</span>
<span className="text-sm text-muted ml-1">日</span>
```

- `tabular-nums`: 数字幅を固定し、カウントアップ時のガタつき防止
- `tracking-tight`: 大きい数字は詰めた方が力強い

---

## コンポーネント規約

### ボタン

```tsx
// プライマリ（挑戦を始める、記録する）
<button className="bg-accent-primary hover:bg-accent-primary-hover text-white
  px-6 py-3 rounded-[var(--radius-md)] transition-colors cursor-pointer">
  挑戦を始める
</button>

// 挫折ボタン（控えめだが押しやすい）
<button className="bg-glass-bg border border-glass-border hover:bg-accent-danger/20
  text-white/80 px-6 py-3 rounded-[var(--radius-md)] transition-colors cursor-pointer">
  今日は負けた...
</button>

// 無効状態
<button className="bg-white/5 text-white/70 cursor-not-allowed rounded-[var(--radius-md)]" disabled>
  記録済み
</button>
```

**挫折ボタンのデザイン判断:**
- 赤一色にしない（罪悪感を煽らない）
- ただし識別可能にはする（hover時にローズ系）
- ラベルは責めない言葉「今日は負けた...」「リセットする」

### カード（Glass Card）

```tsx
<div className="bg-white/5 backdrop-blur-xl border border-white/10
  rounded-[var(--radius-lg)] p-6">
  <h3 className="text-white font-semibold">タイトル</h3>
  <p className="text-white/80 mt-2">説明テキスト</p>
</div>
```

### 習慣カード（メイン要素）

```
┌─────────────────────────────────┐
│  🚬 タバコをやめる              │ ← タイトル (text-white)
│                                 │
│        42 日                    │ ← ストリーク (text-8xl, accent-success)
│     連続達成中                   │ ← ステータス (text-white/60)
│                                 │
│  ───────────────────────────    │
│  開始: 2026/01/18   最長: 42日  │ ← メタ情報 (text-sm, text-muted)
└─────────────────────────────────┘
```

- ストリーク数字が**視覚的に最大**
- 他情報は添え物

---

## アイコン

- **使用ライブラリ**: Lucide React
- **絵文字禁止**: アイコンとしての絵文字使用は禁止（Lucideで統一）

```tsx
import { Flame, Trophy, RotateCcw, Plus, Calendar } from 'lucide-react';
```

| 用途 | アイコン | 意味 |
|------|---------|------|
| ストリーク | `Flame` | 継続の炎 |
| 達成 | `Trophy` | マイルストーン |
| 挫折/リセット | `RotateCcw` | やり直し（前向き） |
| 新規追加 | `Plus` | 新しい挑戦 |
| カレンダー | `Calendar` | 履歴・日付 |

---

## レスポンシブ設計

### モバイルファースト

このアプリは**スマホで最も使われる**。モバイルを最優先で設計する。

### ブレークポイント

| 名称 | 幅 | レイアウト |
|------|-----|----------|
| モバイル | < 640px | 1カラム、カード縦並び |
| タブレット | 640-1023px | 2カラムグリッド |
| デスクトップ | 1024px+ | 最大幅 `max-w-2xl` で中央配置 |

### モバイルでの操作性

- タップターゲット: 最小 44x44px
- 親指が届く範囲に主要ボタン配置
- 下部固定のアクションバー検討

---

## アクセシビリティ（WCAG 2.1 準拠）

### コントラスト要件

| テキスト種別 | 最小コントラスト比 | 対応 |
|------------|-------------------|------|
| 通常テキスト (< 18px) | 4.5:1 | `--text-secondary` (#D1D5DB) on `--bg-primary` (#0B0D17) = 11:1+ |
| 大きいテキスト (>= 18px bold) | 3:1 | `--text-muted` (#9CA3AF) on `--bg-primary` = 6:1+ |
| UIコンポーネント | 3:1 | ボーダー、アイコン等 |

### Glass Card 内テキスト

- 見出し: `text-white` (常に安全)
- 本文: `text-white/80` 以上
- **`text-white/50` 以下は禁止**（コントラスト不足）

### その他

- フォーカスリングの可視化 (`focus-visible:ring-2 ring-accent-primary`)
- `aria-label` の適切な付与
- キーボードナビゲーション対応

---

## アニメーション・トランジション

### 原則: 控えめ、意味のあるものだけ

| 対象 | アニメーション | 意図 |
|------|------------|------|
| ストリーク数字更新 | 数字がフェードイン | 日々の変化を感じる |
| マイルストーン達成 | 軽いスケールアップ + glow | 達成感（やりすぎない） |
| 挫折リセット | なし or 静かなフェード | 責めない。派手な演出は不要 |
| ボタン hover | `transition-colors 150ms` | 最小限のフィードバック |
| カード表示 | `transition-opacity` | ページ遷移のスムーズさ |

### 禁止

- 意味のないローディングスピナー
- 過剰なパーティクルエフェクト
- 挫折時のネガティブな演出（画面が赤くなる等）

---

## 感情設計ガイドライン

### ストリーク継続中

- **静かな肯定**: 「42日目。続いてるよ。」
- 数字が大きくなること自体が報酬
- 過度な褒め言葉は不要（「すごい！」「天才！」は避ける）

### マイルストーン達成時

- **控えめな祝福**: 「1週間達成」「30日到達」
- 小さなビジュアル変化（アイコンの色変化、バッジ追加）
- 次の目標を静かに提示

### 挫折時

- **責めない**: 「またここから始めよう」
- 過去のストリークは消さない（履歴として残す）
- 挫折理由の記録は任意（強制しない）
- **最長記録を見せる**: 「前回は14日できた。次はもっといける。」

---

## 禁止事項

1. **Tailwind デフォルト色の直接使用** → トークン経由で使う
2. **絵文字をアイコンとして使用** → Lucide React を使う
3. **真っ黒背景 (#000000)** → ダークネイビー系を使う
4. **挫折時のネガティブ演出** → 静かに処理する
5. **過剰な装飾・アニメーション** → 意味のあるものだけ
6. **`text-white/50` 以下のテキスト** → コントラスト不足
7. **`rounded-lg` 等の Tailwind 直接指定** → `rounded-[var(--radius-*)]` を使う

---

## 検証チェックリスト

- [ ] ストリーク数字が各画面で最も目立つか
- [ ] 挫折UIが攻撃的でないか
- [ ] モバイル (320px幅) で操作可能か
- [ ] Glass card 内テキストが `text-white/80` 以上か
- [ ] Tailwind デフォルト色を直接使っていないか
- [ ] Lighthouse Accessibility Score 100%
- [ ] タップターゲット 44x44px 以上
- [ ] `tabular-nums` がストリーク数字に適用されているか
