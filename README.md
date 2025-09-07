# 🔥 Hono Blog - Ultra Fast Web Framework Demo

> 超高速WebフレームワークHonoで作った本格的なブログシステム

## 🌍 ライブデモ
**https://try-hono.pages.dev/**

## ✨ 特徴

### 🚀 パフォーマンス
- **Ultra Fast**: Honoの高速ルーティングシステム
- **軽量**: 14kB未満のフレームワークサイズ
- **Edge Computing**: Cloudflare Pages完全対応

### 🎨 モダンデザイン
- **WCAG AA準拠**: アクセシブルなカラーシステム
- **完全レスポンシブ**: PC/タブレット/モバイル最適化
- **プロフェッショナル**: Tailwind色空間準拠デザイン

### 📝 ブログ機能
- **Markdownサポート**: frontmatter対応
- **動的ルーティング**: `/blog/:slug`, `/category/:name`, `/tag/:name`
- **全文検索**: タイトル・本文・タグ検索
- **カテゴリ・タグ**: 自動分類システム
- **ページネーション**: 記事一覧の分割表示

### 🛠️ 技術スタック
- **Framework**: [Hono](https://hono.dev/) v4.9.6
- **Runtime**: Node.js / Cloudflare Workers
- **Markdown**: marked v16.2.1
- **Styling**: CSS Custom Properties + Modern Design System
- **Deployment**: Cloudflare Pages (自動デプロイ)

## 🏃‍♂️ クイックスタート

```bash
# クローン
git clone https://github.com/Daku-on/try-hono.git
cd try-hono

# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
# → http://localhost:3000

# 本番ビルド
npm run build
```

## 🚀 デプロイ（Cloudflare Pages）

- Build command: `npm run build`
- Output directory: `dist`
- 生成物: `dist/index.html`, `dist/blog/**`, `dist/posts/**`, `dist/templates/**`, `_redirects`, `_routes.json`, `_headers`
- HTMLキャッシュ無効化: `_headers` とアプリのミドルウェア（`index.js`）で `Cache-Control: no-store` を付与。変更が即時反映されます。
- 反映が遅い場合: Pagesの「Purge cache」を実行、またはURLに `?v=now` 等のクエリを付与して確認。

## 🔧 実装メモ

### スタイリング
- ホーム/一覧カードの見た目はテンプレート共通スタイル（`templates/layout.js`）で定義。
- 「続きを読む」ボタンやタグチップの余白は `.read-more`, `.post-tags .tag` で調整可能。

### デザインシステム（2025年実装）
- **フォント**: Inter Variable Font（Google Fonts）
- **タイポグラフィ**: 1.25比率の数学的スケール（Perfect Fourth）
- **色彩**: WCAG AA準拠の高コントラスト設計（4.5:1以上）
- **デザイントークン**: CSS カスタムプロパティで一元管理
- **スペーシング**: 0.25rem基準の8の倍数システム

### 本番・開発環境の差異対応
- **重要**: `build.js` のHTMLクラス名と `templates/layout.js` のCSSセレクタを一致させる必要があります
- タグ: `class="tag"` と `.tag { ... }` で統一
- カテゴリ: `class="category-badge"` と `.category-badge { ... }` で統一
- `build.js` にはインラインCSSも含めて本番ビルド時のスタイル適用を保証

## 📊 プロジェクト構成

```
try-hono/
├── posts/           # Markdownブログ記事
│   ├── hono-hajimari.md
│   ├── routing-mastery.md
│   └── blog-system-architecture.md
├── templates/       # HTMLテンプレート
│   └── layout.js
├── utils/          # ブログシステム
│   └── blog.js
├── index.js        # メインアプリケーション
└── build.js        # 静的サイト生成
```

## 🔗 主要ページ

- **[ホーム](https://try-hono.pages.dev/)** - 最新記事とサイト概要
- **[ブログ一覧](https://try-hono.pages.dev/blog)** - 全記事リスト（ページネーション）
- **[カテゴリ](https://try-hono.pages.dev/categories)** - カテゴリ別記事分類
- **[タグ](https://try-hono.pages.dev/tags)** - タグクラウド
- **[検索](https://try-hono.pages.dev/search)** - 全文検索機能

## 💡 学べること

1. **Honoの基本** - ルーティング、ミドルウェア、レスポンス生成
2. **静的サイト生成** - Cloudflare Pages向けビルドシステム
3. **Markdownブログ** - frontmatter + 動的ルーティング
4. **レスポンシブデザイン** - モダンCSS設計パターン
5. **パフォーマンス最適化** - キャッシュとCDN活用

## 🎯 Honoの強み実証

- **高速ルーティング**: RegExpRouterベースの超高速マッチング
- **軽量フレームワーク**: 最小構成でフル機能
- **マルチランタイム**: Node.js, Cloudflare Workers, Deno, Bun対応
- **Web標準準拠**: 標準的なWeb APIのみ使用

---

**Built with ❤️ and 🔥 Hono Framework**
