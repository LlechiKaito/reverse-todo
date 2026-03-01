# 逆Todo - デザイントークン & カラーパレット

## カラーパレット全体像

```
┌──────────────────────────────────────────────────────────────────┐
│  背景レイヤー (暗 → 明)                                          │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐               │
│  │#07080F │  │#0B0D17 │  │#111827 │  │#1F2937 │               │
│  │ deep   │  │primary │  │ card   │  │ input  │               │
│  └────────┘  └────────┘  └────────┘  └────────┘               │
│                                                                  │
│  テキスト (明 → 暗)                                              │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐               │
│  │#FFFFFF │  │#F9FAFB │  │#D1D5DB │  │#9CA3AF │               │
│  │ white  │  │heading │  │  body  │  │ muted  │               │
│  └────────┘  └────────┘  └────────┘  └────────┘               │
│                                                                  │
│  アクセント                                                      │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐               │
│  │#6366F1 │  │#10B981 │  │#F59E0B │  │#F43F5E │               │
│  │indigo  │  │emerald │  │ amber  │  │  rose  │               │
│  │ 意志   │  │ 成長   │  │ 注意   │  │ 挫折   │               │
│  └────────┘  └────────┘  └────────┘  └────────┘               │
└──────────────────────────────────────────────────────────────────┘
```

---

## 1. 背景色 (Backgrounds)

暗い空間に浮かぶカード、という階層構造を作る。

| トークン | HEX | 用途 | Tailwind クラス |
|---------|-----|------|----------------|
| `--bg-deep` | `#07080F` | ページ最背面、オーバーレイ下 | `bg-deep` |
| `--bg-primary` | `#0B0D17` | ページ背景 | `bg-primary` |
| `--bg-secondary` | `#111827` | カード背景の下地、サイドバー | `bg-secondary` |
| `--bg-tertiary` | `#1F2937` | 入力フィールド、ホバー背景 | `bg-tertiary` |
| `--bg-elevated` | `#374151` | アクティブ状態、選択中の要素 | `bg-elevated` |

### Glass 背景

| トークン | 値 | 用途 |
|---------|-----|------|
| `--glass-bg` | `rgba(255, 255, 255, 0.05)` | グラスカード通常 |
| `--glass-bg-hover` | `rgba(255, 255, 255, 0.08)` | グラスカードホバー |
| `--glass-bg-active` | `rgba(255, 255, 255, 0.12)` | グラスカード押下/アクティブ |
| `--glass-border` | `rgba(255, 255, 255, 0.10)` | グラスカードボーダー |
| `--glass-border-strong` | `rgba(255, 255, 255, 0.15)` | 強調ボーダー |

### 背景の使い分け

```
Page (#0B0D17)
  └─ Card glass (white/5 + blur)
       └─ Input (#1F2937)
            └─ Dropdown (#374151)
```

---

## 2. テキスト色 (Text)

### ソリッド背景上

| トークン | HEX | コントラスト比 (on #0B0D17) | 用途 | Tailwind |
|---------|-----|---------------------------|------|---------|
| `--text-primary` | `#F9FAFB` | 16.5:1 | 見出し、重要テキスト | `text-heading` |
| `--text-secondary` | `#D1D5DB` | 11.3:1 | 本文テキスト | `text-body` |
| `--text-muted` | `#9CA3AF` | 6.0:1 | 補足、ラベル (>=14px) | `text-muted` |
| `--text-faint` | `#6B7280` | 3.5:1 | プレースホルダーのみ (>=18px bold) | `text-faint` |

### Glass Card 内

| 記法 | コントラスト比 (想定) | 用途 |
|------|---------------------|------|
| `text-white` | 安全 | 見出し |
| `text-white/90` | 安全 | 重要テキスト |
| `text-white/80` | 安全 | 本文 |
| `text-white/70` | 境界線 | disabled テキストの下限 |
| `text-white/60` 以下 | **禁止** | コントラスト不足 |

---

## 3. アクセントカラー (Accents)

### インディゴ - 意志・決意・信頼

アプリのブランドカラー。CTAボタン、フォーカス、リンクに使用。

| トークン | HEX | 用途 |
|---------|-----|------|
| `--accent-50` | `#EEF2FF` | テキスト on ダーク (badge 内テキスト) |
| `--accent-100` | `#E0E7FF` | - |
| `--accent-200` | `#C7D2FE` | - |
| `--accent-300` | `#A5B4FC` | ホバー時テキスト、リンク |
| `--accent-400` | `#818CF8` | セカンダリアクセント |
| `--accent-500` | `#6366F1` | **メインアクセント** |
| `--accent-600` | `#4F46E5` | ボタンホバー |
| `--accent-700` | `#4338CA` | ボタン押下 |
| `--accent-900/20` | `rgba(49,46,129,0.2)` | badge/chip 背景 |

```tsx
// プライマリボタン
<button className="bg-accent hover:bg-accent-hover active:bg-accent-pressed
  text-white font-medium px-6 py-3 rounded-[--radius-md]
  transition-colors cursor-pointer">
  挑戦を始める
</button>

// テキストリンク
<a className="text-accent-light hover:text-accent-50 transition-colors">
  詳細を見る
</a>

// badge
<span className="bg-accent/20 text-accent-light text-sm px-3 py-1 rounded-[--radius-full]">
  挑戦中
</span>
```

### エメラルド - 成長・健康・継続

ストリーク表示、成功状態、達成に使用。**このアプリで最も「良い意味」を持つ色**。

| トークン | HEX | 用途 |
|---------|-----|------|
| `--success-50` | `#ECFDF5` | - |
| `--success-300` | `#6EE7B7` | ストリーク数字の glow |
| `--success-400` | `#34D399` | ストリーク数字、成功テキスト |
| `--success-500` | `#10B981` | **成功アクセント** |
| `--success-600` | `#059669` | 成功ボタンホバー |
| `--success-900/20` | `rgba(6,78,59,0.2)` | 成功 badge 背景 |

```tsx
// ストリーク数字（アプリの主役）
<div className="text-center">
  <span className="text-7xl md:text-8xl font-bold text-success tabular-nums tracking-tight">
    42
  </span>
  <span className="text-lg text-muted ml-2">日</span>
</div>

// 成功 badge
<span className="bg-success/20 text-success-light text-sm px-3 py-1 rounded-[--radius-full]">
  継続中
</span>
```

### アンバー - 注意・警告

マイルストーン接近、注意事項に使用。温かみのある警告色。

| トークン | HEX | 用途 |
|---------|-----|------|
| `--warning-300` | `#FCD34D` | 警告テキスト (on dark) |
| `--warning-400` | `#FBBF24` | アイコン、強調 |
| `--warning-500` | `#F59E0B` | **警告アクセント** |
| `--warning-900/20` | `rgba(120,53,15,0.2)` | 警告 badge 背景 |

```tsx
// 警告 badge
<span className="bg-warning/20 text-warning-light text-sm px-3 py-1 rounded-[--radius-full]">
  もうすぐ7日
</span>
```

### ローズ - 挫折・リセット

挫折の記録に**控えめに**使用。責める色ではなく「記録の色」。

| トークン | HEX | 用途 |
|---------|-----|------|
| `--danger-300` | `#FDA4AF` | 挫折テキスト (on dark) |
| `--danger-400` | `#FB7185` | アイコン |
| `--danger-500` | `#F43F5E` | **挫折アクセント** |
| `--danger-600` | `#E11D48` | ホバー |
| `--danger-900/20` | `rgba(136,19,55,0.2)` | 挫折 badge 背景 |

```tsx
// 挫折ボタン（控えめ、責めない）
<button className="bg-glass border border-glass-border
  hover:bg-danger/10 hover:border-danger/30
  text-body px-5 py-3 rounded-[--radius-md]
  transition-colors cursor-pointer">
  <RotateCcw className="w-4 h-4 mr-2 inline" />
  今日は負けた
</button>

// 挫折 badge（目立たせすぎない）
<span className="bg-danger/15 text-danger-light text-sm px-3 py-1 rounded-[--radius-full]">
  リセット
</span>
```

---

## 4. セマンティックトークン（用途別マッピング）

具体的な UI 要素から逆引きできるように。

### ボタン

| 種類 | 背景 | 背景 hover | テキスト |
|------|------|-----------|---------|
| Primary | `--accent-500` | `--accent-600` | `#FFFFFF` |
| Secondary | `--glass-bg` | `--glass-bg-hover` | `--text-primary` |
| Danger (挫折) | `transparent` | `--danger-500/10` | `--text-secondary` |
| Ghost | `transparent` | `--glass-bg` | `--text-secondary` |
| Disabled | `rgba(255,255,255,0.05)` | - | `rgba(255,255,255,0.5)` |

### ステータスインジケータ

| 状態 | ドット色 | badge 背景 | badge テキスト |
|------|---------|-----------|--------------|
| 挑戦中 | `--accent-500` | `--accent-500/20` | `--accent-300` |
| 継続中 (streak有) | `--success-500` | `--success-500/20` | `--success-300` |
| 一時停止 | `--warning-500` | `--warning-500/20` | `--warning-300` |
| 挫折 (リセット直後) | `--danger-500` | `--danger-500/15` | `--danger-300` |
| 達成 (卒業) | `--success-400` | `--success-500/20` | `--success-300` |

### フォーム要素

| 要素 | 背景 | ボーダー | フォーカスリング |
|------|------|---------|---------------|
| Input 通常 | `--bg-tertiary` | `rgba(255,255,255,0.10)` | `--accent-500` |
| Input フォーカス | `--bg-tertiary` | `--accent-500` | `--accent-500/50` (ring) |
| Input エラー | `--bg-tertiary` | `--danger-500` | `--danger-500/50` (ring) |

---

## 5. 角丸 (Border Radius)

| トークン | 値 | 用途 |
|---------|-----|------|
| `--radius-sm` | `8px` | badge, tag, chip |
| `--radius-md` | `12px` | ボタン, input, 小カード |
| `--radius-lg` | `16px` | カード, モーダル |
| `--radius-xl` | `24px` | 大きなカード, ボトムシート |
| `--radius-full` | `999px` | ピル型 badge, アバター |

---

## 6. シャドウ (Shadows)

ダークモードでは shadow の効果が薄い。代わりにボーダーと背景の明度差で奥行きを表現。

| トークン | 値 | 用途 |
|---------|-----|------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | 軽い浮き上がり |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.4)` | カード、ドロップダウン |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.5)` | モーダル、フローティング |
| `--shadow-glow-success` | `0 0 20px rgba(16,185,129,0.15)` | ストリーク達成時の glow |
| `--shadow-glow-accent` | `0 0 20px rgba(99,102,241,0.15)` | フォーカス時の glow |

---

## 7. 間隔 (Spacing)

Tailwind デフォルトの 4px 基準を踏襲。追加のセマンティックトークンのみ定義。

| トークン | 値 | 用途 |
|---------|-----|------|
| `--space-card-padding` | `24px` (モバイル: `16px`) | カード内パディング |
| `--space-section-gap` | `32px` (モバイル: `24px`) | セクション間 |
| `--space-page-x` | `16px` (デスクトップ: `24px`) | ページ左右余白 |

---

## 8. globals.css 実装例

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* === Backgrounds === */
    --bg-deep: #07080F;
    --bg-primary: #0B0D17;
    --bg-secondary: #111827;
    --bg-tertiary: #1F2937;
    --bg-elevated: #374151;

    /* === Glass === */
    --glass-bg: rgba(255, 255, 255, 0.05);
    --glass-bg-hover: rgba(255, 255, 255, 0.08);
    --glass-bg-active: rgba(255, 255, 255, 0.12);
    --glass-border: rgba(255, 255, 255, 0.10);
    --glass-border-strong: rgba(255, 255, 255, 0.15);

    /* === Text === */
    --text-primary: #F9FAFB;
    --text-secondary: #D1D5DB;
    --text-muted: #9CA3AF;
    --text-faint: #6B7280;

    /* === Accent (Indigo) === */
    --accent-50: #EEF2FF;
    --accent-300: #A5B4FC;
    --accent-400: #818CF8;
    --accent-500: #6366F1;
    --accent-600: #4F46E5;
    --accent-700: #4338CA;

    /* === Success (Emerald) === */
    --success-300: #6EE7B7;
    --success-400: #34D399;
    --success-500: #10B981;
    --success-600: #059669;

    /* === Warning (Amber) === */
    --warning-300: #FCD34D;
    --warning-400: #FBBF24;
    --warning-500: #F59E0B;

    /* === Danger (Rose) === */
    --danger-300: #FDA4AF;
    --danger-400: #FB7185;
    --danger-500: #F43F5E;
    --danger-600: #E11D48;

    /* === Radius === */
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 24px;
    --radius-full: 999px;

    /* === Shadows === */
    --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
    --shadow-md: 0 4px 12px rgba(0,0,0,0.4);
    --shadow-lg: 0 8px 24px rgba(0,0,0,0.5);
    --shadow-glow-success: 0 0 20px rgba(16,185,129,0.15);
    --shadow-glow-accent: 0 0 20px rgba(99,102,241,0.15);

    /* === Spacing (semantic) === */
    --space-card-padding: 24px;
    --space-section-gap: 32px;
    --space-page-x: 16px;
  }

  body {
    background-color: var(--bg-primary);
    color: var(--text-secondary);
    font-family: "Inter", "Noto Sans JP", system-ui, sans-serif;
  }
}
```

---

## 9. tailwind.config.ts 実装例

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        deep: 'var(--bg-deep)',
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        tertiary: 'var(--bg-tertiary)',
        elevated: 'var(--bg-elevated)',

        // Glass
        glass: {
          DEFAULT: 'var(--glass-bg)',
          hover: 'var(--glass-bg-hover)',
          active: 'var(--glass-bg-active)',
          border: 'var(--glass-border)',
        },

        // Accent (Indigo)
        accent: {
          DEFAULT: 'var(--accent-500)',
          light: 'var(--accent-300)',
          hover: 'var(--accent-600)',
          pressed: 'var(--accent-700)',
        },

        // Success (Emerald)
        success: {
          DEFAULT: 'var(--success-500)',
          light: 'var(--success-300)',
          hover: 'var(--success-600)',
        },

        // Warning (Amber)
        warning: {
          DEFAULT: 'var(--warning-500)',
          light: 'var(--warning-300)',
        },

        // Danger (Rose)
        danger: {
          DEFAULT: 'var(--danger-500)',
          light: 'var(--danger-300)',
          hover: 'var(--danger-600)',
        },
      },
      textColor: {
        heading: 'var(--text-primary)',
        body: 'var(--text-secondary)',
        muted: 'var(--text-muted)',
        faint: 'var(--text-faint)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        'glow-success': 'var(--shadow-glow-success)',
        'glow-accent': 'var(--shadow-glow-accent)',
      },
      fontFamily: {
        sans: ['"Inter"', '"Noto Sans JP"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 10. 色の組み合わせ禁止リスト

| 禁止パターン | 理由 | 代替 |
|-------------|------|------|
| `text-white/50` 以下 on any bg | コントラスト不足 | `text-white/70` 以上 |
| `text-muted` on glass | 背景が不確定 | `text-white/80` |
| `bg-danger` をボタン主色に | 挫折を強調しすぎ | `bg-glass` + hover で danger |
| `text-danger` を大面積に | 責める印象 | badge 内や小テキストのみ |
| Tailwind デフォルト色の直接使用 | トークン体系が崩れる | 上記トークン経由で使用 |
| `#000000` 背景 | 目に厳しい | `--bg-deep` (#07080F) |
| 同系色 badge (例: `bg-indigo/20 text-indigo-400`) | コントラスト不足の可能性 | `*-300` テキスト + `*/20` 背景 |
