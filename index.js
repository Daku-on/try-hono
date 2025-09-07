import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { 
  getAllPosts, 
  getPostBySlug, 
  getPostsByCategory, 
  getPostsByTag,
  getAllCategories,
  getAllTags,
  paginatePosts,
  searchPosts
} from './utils/blog.js'
import { baseLayout, postTemplate, postListTemplate } from './templates/layout.js'

const app = new Hono()

// Disable caching for HTML responses (Pages Functions)
app.use('*', async (c, next) => {
  await next()
  const ct = c.res?.headers?.get('content-type') || ''
  if (ct.includes('text/html')) {
    c.header('Cache-Control', 'no-store, max-age=0, must-revalidate')
    c.header('Pragma', 'no-cache')
    c.header('Expires', '0')
    c.header('Surrogate-Control', 'no-store')
  }
})

// 静的ファイル配信
app.use('/static/*', serveStatic({ root: './' }))

// ホームページ
app.get('/', async (c) => {
  try {
    const posts = await getAllPosts()
    const recentPosts = posts.slice(0, 5)
    const categories = await getAllCategories()
    const tags = await getAllTags()
    
    const homeContent = `
      <div class="container">
        <div class="hero">
          <h1>🔥 Hono Blog へようこそ</h1>
          <p>超高速WebフレームワークHonoで作ったブログです</p>
          <div class="hero-stats">
            <span>${posts.length}記事</span>
            <span>${categories.length}カテゴリ</span>
            <span>${tags.length}タグ</span>
          </div>
        </div>
        
        <section class="recent-posts">
          <h2>📝 最新記事</h2>
          ${postListTemplate(recentPosts, null, '')}
          <div class="view-all">
            <a href="/blog" class="btn-primary">全ての記事を見る →</a>
          </div>
        </section>
        
        <section class="categories-tags">
          <div class="categories">
            <h3>📁 カテゴリ</h3>
            <div class="category-list">
              ${categories.map(cat => `<a href="/category/${encodeURIComponent(cat)}" class="category-link">${cat}</a>`).join('')}
            </div>
          </div>
          
          <div class="tags">
            <h3>🏷️ タグ</h3>
            <div class="tag-cloud">
              ${tags.slice(0, 10).map(tag => `<a href="/tag/${encodeURIComponent(tag)}" class="tag-link">#${tag}</a>`).join('')}
            </div>
          </div>
        </section>
      </div>
      
      <style>
        .hero-stats {
          display: flex;
          gap: 2rem;
          justify-content: center;
          margin-top: 1rem;
          font-weight: bold;
        }
        
        .recent-posts {
          margin: 3rem 0;
        }
        
        .recent-posts h2 {
          margin-bottom: 2rem;
          color: #ff6b35;
          text-align: center;
        }
        
        .view-all {
          text-align: center;
          margin-top: 2rem;
        }
        
        .btn-primary {
          display: inline-block;
          background: #ff6b35;
          color: white;
          padding: 1rem 2rem;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
          transition: background 0.3s;
        }
        
        .btn-primary:hover {
          background: #e55a2e;
        }
        
        .categories-tags {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin: 3rem 0;
        }
        
        .categories h3, .tags h3 {
          margin-bottom: 1rem;
          color: #555;
        }
        
        .category-list, .tag-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .category-link, .tag-link {
          display: inline-block;
          background: #f0f0f0;
          color: #555;
          padding: 0.5rem 1rem;
          text-decoration: none;
          border-radius: 4px;
          transition: all 0.3s;
        }
        
        .category-link:hover, .tag-link:hover {
          background: #ff6b35;
          color: white;
        }
        
        @media (max-width: 1024px) {
          .categories-tags {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .btn-primary {
            padding: 0.8rem 1.5rem;
          }
        }
        
        @media (max-width: 768px) {
          .hero-stats {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
            font-size: 0.9rem;
          }
          
          .hero-stats span {
            background: rgba(255,255,255,0.2);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            min-width: 80px;
            text-align: center;
          }
          
          .recent-posts {
            margin: 2rem 0;
          }
          
          .recent-posts h2 {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
          }
          
          .categories-tags {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            margin: 2rem 0;
          }
          
          .category-list, .tag-cloud {
            gap: 0.4rem;
          }
          
          .category-link, .tag-link {
            font-size: 0.85rem;
            padding: 0.4rem 0.8rem;
          }
        }
        
        @media (max-width: 480px) {
          .hero-stats {
            gap: 0.75rem;
            font-size: 0.8rem;
          }
          
          .hero-stats span {
            padding: 0.4rem 0.8rem;
            min-width: 70px;
            font-size: 0.8rem;
          }
          
          .recent-posts h2 {
            font-size: 1.3rem;
          }
          
          .btn-primary {
            padding: 0.7rem 1.25rem;
            font-size: 0.9rem;
          }
          
          .categories h3, .tags h3 {
            font-size: 1rem;
            margin-bottom: 0.75rem;
          }
          
          .category-link, .tag-link {
            font-size: 0.8rem;
            padding: 0.35rem 0.7rem;
          }
        }
      </style>
    `
    
    return c.html(baseLayout(homeContent, {
      title: 'ホーム',
      description: 'Honoで作った超高速ブログ - 最新の技術記事をお届けします'
    }))
  } catch (error) {
    console.error('ホームページエラー:', error)
    return c.text('エラーが発生しました', 500)
  }
})

// ブログ一覧
app.get('/blog', async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1')
    const posts = await getAllPosts()
    const pagination = paginatePosts(posts, page, 5)
    
    const content = postListTemplate(pagination.posts, pagination)
    
    return c.html(baseLayout(content, {
      title: 'ブログ一覧',
      description: 'Hono、JavaScript、Webフレームワークについての技術記事'
    }))
  } catch (error) {
    console.error('ブログ一覧エラー:', error)
    return c.text('エラーが発生しました', 500)
  }
})

// 個別記事
app.get('/blog/:slug', async (c) => {
  try {
    const slug = c.req.param('slug')
    const post = await getPostBySlug(slug)
    
    if (!post) {
      return c.html(baseLayout('<div class="container"><h1>404 - 記事が見つかりません</h1><p><a href="/blog">ブログ一覧に戻る</a></p></div>'), 404)
    }
    
    const content = postTemplate(post)
    
    return c.html(baseLayout(content, {
      title: post.title,
      description: post.excerpt,
      ogTags: `
        <meta property="og:title" content="${post.title}">
        <meta property="og:description" content="${post.excerpt}">
        <meta property="og:type" content="article">
        <meta name="twitter:card" content="summary">
      `
    }))
  } catch (error) {
    console.error('記事取得エラー:', error)
    return c.text('エラーが発生しました', 500)
  }
})

// カテゴリ別記事
app.get('/category/:category', async (c) => {
  try {
    const category = decodeURIComponent(c.req.param('category'))
    const posts = await getPostsByCategory(category)
    const content = postListTemplate(posts, null, `カテゴリ: ${category}`)
    
    return c.html(baseLayout(content, {
      title: `カテゴリ: ${category}`,
      description: `${category}に関する記事一覧`
    }))
  } catch (error) {
    console.error('カテゴリ記事エラー:', error)
    return c.text('エラーが発生しました', 500)
  }
})

// タグ別記事
app.get('/tag/:tag', async (c) => {
  try {
    const tag = decodeURIComponent(c.req.param('tag'))
    const posts = await getPostsByTag(tag)
    const content = postListTemplate(posts, null, `タグ: #${tag}`)
    
    return c.html(baseLayout(content, {
      title: `タグ: ${tag}`,
      description: `${tag}タグの記事一覧`
    }))
  } catch (error) {
    console.error('タグ記事エラー:', error)
    return c.text('エラーが発生しました', 500)
  }
})

// 検索
app.get('/search', async (c) => {
  try {
    const query = c.req.query('q') || ''
    let posts = []
    
    if (query) {
      posts = await searchPosts(query)
    }
    
    const searchForm = `
      <div class="container">
        <div class="search-header">
          <h1>🔍 記事検索</h1>
          <form method="GET" class="search-form">
            <input type="search" name="q" value="${query}" placeholder="記事を検索..." class="search-input">
            <button type="submit" class="search-btn">検索</button>
          </form>
        </div>
        
        ${query ? `
          <div class="search-results">
            <h2>「${query}」の検索結果: ${posts.length}件</h2>
            ${postListTemplate(posts, null, '')}
          </div>
        ` : `
          <div class="search-tips">
            <h3>検索のヒント</h3>
            <ul>
              <li>記事タイトル、内容、タグから検索できます</li>
              <li>複数のキーワードをスペースで区切って検索</li>
              <li>大文字小文字は区別しません</li>
            </ul>
          </div>
        `}
      </div>
      
      <style>
        .search-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .search-form {
          display: flex;
          max-width: 500px;
          margin: 2rem auto;
          gap: 0.5rem;
        }
        
        .search-input {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #ff6b35;
        }
        
        .search-btn {
          padding: 0.75rem 1.5rem;
          background: #ff6b35;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: bold;
        }
        
        .search-btn:hover {
          background: #e55a2e;
        }
        
        .search-results h2 {
          margin-bottom: 2rem;
          color: #555;
        }
        
        .search-tips {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .search-tips h3 {
          margin-bottom: 1rem;
          color: #ff6b35;
        }
        
        .search-tips ul {
          list-style-type: none;
        }
        
        .search-tips li {
          padding: 0.5rem 0;
          border-bottom: 1px solid #eee;
        }
        
        .search-tips li:before {
          content: '💡 ';
        }
        
        @media (max-width: 768px) {
          .search-form {
            flex-direction: column;
            max-width: 100%;
            margin: 1.5rem auto;
          }
          
          .search-input {
            font-size: 1rem;
            padding: 0.8rem;
          }
          
          .search-btn {
            padding: 0.8rem 1rem;
            font-size: 1rem;
          }
          
          .search-tips {
            padding: 1.5rem;
            margin: 1rem;
          }
          
          .search-results h2 {
            font-size: 1.3rem;
            margin-bottom: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .search-header h1 {
            font-size: 1.8rem;
          }
          
          .search-input,
          .search-btn {
            font-size: 0.9rem;
          }
          
          .search-tips {
            padding: 1.25rem;
          }
          
          .search-tips h3 {
            font-size: 1.1rem;
          }
          
          .search-tips li {
            font-size: 0.9rem;
          }
        }
      </style>
    `
    
    return c.html(baseLayout(searchForm, {
      title: query ? `検索: ${query}` : '記事検索',
      description: 'ブログ記事を検索'
    }))
  } catch (error) {
    console.error('検索エラー:', error)
    return c.text('エラーが発生しました', 500)
  }
})

// カテゴリ一覧
app.get('/categories', async (c) => {
  try {
    const categories = await getAllCategories()
    const posts = await getAllPosts()
    
    const content = `
      <div class="container">
        <div class="hero">
          <h1>📁 カテゴリ一覧</h1>
          <p>記事をカテゴリ別に整理しました</p>
        </div>
        
        <div class="categories-grid">
          ${categories.map(category => {
            const categoryPosts = posts.filter(p => p.category === category)
            return `
              <div class="category-card">
                <h3><a href="/category/${encodeURIComponent(category)}">${category}</a></h3>
                <p>${categoryPosts.length}記事</p>
                <div class="category-preview">
                  ${categoryPosts.slice(0, 3).map(post => `
                    <a href="${post.getUrl()}" class="preview-link">${post.title}</a>
                  `).join('')}
                </div>
              </div>
            `
          }).join('')}
        </div>
      </div>
      
      <style>
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .category-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .category-card h3 a {
          color: #ff6b35;
          text-decoration: none;
          font-size: 1.2rem;
        }
        
        .category-card h3 a:hover {
          text-decoration: underline;
        }
        
        .category-preview {
          margin-top: 1rem;
        }
        
        .preview-link {
          display: block;
          color: #666;
          text-decoration: none;
          padding: 0.25rem 0;
          border-bottom: 1px solid #eee;
          font-size: 0.9rem;
        }
        
        .preview-link:hover {
          color: #ff6b35;
        }
        
        @media (max-width: 768px) {
          .categories-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .category-card {
            padding: 1.25rem;
          }
          
          .category-card h3 a {
            font-size: 1.1rem;
          }
          
          .preview-link {
            font-size: 0.85rem;
          }
        }
        
        @media (max-width: 480px) {
          .category-card {
            padding: 1rem;
          }
          
          .category-card h3 a {
            font-size: 1rem;
          }
          
          .preview-link {
            font-size: 0.8rem;
          }
        }
      </style>
    `
    
    return c.html(baseLayout(content, {
      title: 'カテゴリ一覧',
      description: 'ブログのカテゴリ別記事一覧'
    }))
  } catch (error) {
    console.error('カテゴリ一覧エラー:', error)
    return c.text('エラーが発生しました', 500)
  }
})

// タグ一覧
app.get('/tags', async (c) => {
  try {
    const tags = await getAllTags()
    const posts = await getAllPosts()
    
    const content = `
      <div class="container">
        <div class="hero">
          <h1>🏷️ タグ一覧</h1>
          <p>記事に付けられたタグ</p>
        </div>
        
        <div class="tags-cloud">
          ${tags.map(tag => {
            const tagPosts = posts.filter(p => p.tags.includes(tag))
            const size = Math.min(2, Math.max(0.8, tagPosts.length / 3))
            return `
              <a href="/tag/${encodeURIComponent(tag)}" 
                 class="tag-item" 
                 style="font-size: ${size}rem;"
                 title="${tagPosts.length}記事">
                #${tag}
              </a>
            `
          }).join('')}
        </div>
      </div>
      
      <style>
        .tags-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          margin: 2rem 0;
        }
        
        .tag-item {
          color: #ff6b35;
          text-decoration: none;
          padding: 0.5rem 1rem;
          background: white;
          border-radius: 20px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          transition: all 0.3s;
          font-weight: 500;
        }
        
        .tag-item:hover {
          background: #ff6b35;
          color: white;
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .tags-cloud {
            gap: 0.75rem;
            margin: 1.5rem 0;
          }
          
          .tag-item {
            font-size: 0.9rem !important;
            padding: 0.4rem 0.8rem;
          }
        }
        
        @media (max-width: 480px) {
          .tags-cloud {
            gap: 0.5rem;
          }
          
          .tag-item {
            font-size: 0.8rem !important;
            padding: 0.35rem 0.7rem;
          }
        }
      </style>
    `
    
    return c.html(baseLayout(content, {
      title: 'タグ一覧',
      description: 'ブログ記事のタグクラウド'
    }))
  } catch (error) {
    console.error('タグ一覧エラー:', error)
    return c.text('エラーが発生しました', 500)
  }
})

// API エンドポイント
app.get('/api/posts', async (c) => {
  try {
    const posts = await getAllPosts()
    return c.json({
      posts: posts.map(post => ({
        title: post.title,
        slug: post.slug,
        date: post.date,
        category: post.category,
        tags: post.tags,
        excerpt: post.excerpt,
        readingTime: post.readingTime,
        url: post.getUrl()
      }))
    })
  } catch (error) {
    return c.json({ error: 'Failed to fetch posts' }, 500)
  }
})

const port = 3000
console.log(`🔥 Hono Blog Server is running on port ${port}`)
console.log(`📝 Visit: http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
