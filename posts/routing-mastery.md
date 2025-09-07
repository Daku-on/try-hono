---
title: "Honoのルーティングマスタリー"
slug: "routing-mastery"
date: "2025-01-16"
category: "技術解説"
tags: ["hono", "ルーティング", "javascript", "上級者向け"]
excerpt: "Honoの強力なルーティング機能を深掘りし、複雑なWebアプリケーションのURL構造を効率的に管理する方法を解説します。"
---

# Honoのルーティングマスタリー 🛣️

Honoの最も強力な機能の1つは、その優れたルーティングシステムです。RegExpRouterベースの高速マッチングと柔軟なパターンマッチングにより、複雑なWebアプリケーションでも高パフォーマンスを維持できます。

## 基本的なルーティング

### シンプルなパス
```javascript
app.get('/', (c) => c.text('ホーム'))
app.get('/about', (c) => c.text('アバウト'))
app.get('/contact', (c) => c.text('お問い合わせ'))
```

### HTTPメソッドの対応
```javascript
app.get('/users', getAllUsers)
app.post('/users', createUser)
app.put('/users/:id', updateUser)
app.delete('/users/:id', deleteUser)
```

## 動的ルーティング

### パラメータキャプチャ
```javascript
app.get('/blog/:slug', (c) => {
  const slug = c.req.param('slug')
  return c.text(`記事: ${slug}`)
})

app.get('/user/:id/posts/:postId', (c) => {
  const { id, postId } = c.req.param()
  return c.json({ userId: id, postId })
})
```

### オプショナルパラメータ
```javascript
app.get('/archive/:year/:month?', (c) => {
  const year = c.req.param('year')
  const month = c.req.param('month') || '全て'
  return c.text(`${year}年${month}のアーカイブ`)
})
```

## ワイルドカードと正規表現

### ワイルドカード
```javascript
app.get('/files/*', (c) => {
  const path = c.req.param('*')
  return c.text(`ファイルパス: ${path}`)
})
```

### 正規表現パターン
```javascript
app.get('/id/:id{[0-9]+}', (c) => {
  const id = c.req.param('id')
  return c.text(`数字のID: ${id}`)
})
```

## ルートグループ化

### ベースパスの設定
```javascript
const api = new Hono().basePath('/api/v1')

api.get('/users', getAllUsers)
api.get('/posts', getAllPosts)

app.route('/api/v1', api)
```

### ネストしたルート
```javascript
const blog = new Hono()
blog.get('/', listPosts)
blog.get('/:slug', getPost)
blog.get('/category/:category', getPostsByCategory)

app.route('/blog', blog)
```

## ミドルウェアとルーティング

### 特定のルートにミドルウェア適用
```javascript
import { jwt } from 'hono/jwt'

app.use('/admin/*', jwt({ secret: 'admin-secret' }))
app.get('/admin/dashboard', adminDashboard)
```

### ルートレベルのミドルウェア
```javascript
app.get('/protected', 
  async (c, next) => {
    // 認証チェック
    const token = c.req.header('Authorization')
    if (!token) {
      return c.text('Unauthorized', 401)
    }
    await next()
  },
  (c) => {
    return c.text('保護されたコンテンツ')
  }
)
```

## 高度なルーティングパターン

### クエリパラメータの処理
```javascript
app.get('/search', (c) => {
  const query = c.req.query('q')
  const page = c.req.query('page') || '1'
  const limit = c.req.query('limit') || '10'
  
  return c.json({ 
    query, 
    page: parseInt(page), 
    limit: parseInt(limit) 
  })
})
```

### ヘッダーベースのルーティング
```javascript
app.get('/api/data', (c) => {
  const acceptLanguage = c.req.header('Accept-Language')
  
  if (acceptLanguage?.includes('ja')) {
    return c.json({ message: 'こんにちは' })
  }
  return c.json({ message: 'Hello' })
})
```

## パフォーマンス最適化

### ルート順序の最適化
```javascript
// 静的ルートを動的ルートより先に定義
app.get('/blog/new', createPostForm)
app.get('/blog/popular', popularPosts)
app.get('/blog/:slug', getPost)  // これは最後に
```

### RegExpRouterの活用
Honoは自動的にRegExpRouterを使用しますが、複雑なパターンでも高速にマッチングします：

```javascript
app.get('/complex/:param1{[a-zA-Z]+}/:param2{[0-9]+}/:param3?', handler)
```

## 実践的なブログルーティング例

```javascript
// ホーム
app.get('/', homepage)

// ブログ関連
app.get('/blog', listAllPosts)
app.get('/blog/page/:page{[0-9]+}', paginatedPosts)
app.get('/blog/:year{[0-9]{4}}/:month{[0-9]{1,2}}', archivePosts)
app.get('/blog/category/:category', categoryPosts)
app.get('/blog/tag/:tag', taggedPosts)
app.get('/blog/:slug', getPostBySlug)

// API
const api = new Hono().basePath('/api')
api.get('/posts', getPostsAPI)
api.get('/posts/:id{[0-9]+}', getPostAPI)

app.route('/', api)
```

Honoのルーティングシステムをマスターすることで、どんなに複雑なWebアプリケーションでも、高速かつ保守性の高いURL構造を構築できます！