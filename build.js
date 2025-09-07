import { Hono } from 'hono'
import fs from 'fs/promises'
import path from 'path'
import { 
  getAllPosts, 
  getPostBySlug, 
  getPostsByCategory, 
  getPostsByTag,
  getAllCategories,
  getAllTags
} from './utils/blog.js'

// Cloudflare Pages向けの静的サイト生成
const app = new Hono()

// 同じルーティングを定義（実際のアプリケーションから）
// ... ルーティング定義は省略（実際はindex.jsと同じ）

const buildStaticSite = async () => {
  console.log('🔥 Building Hono Blog for Cloudflare Pages...')
  
  try {
    // distディレクトリを作成
    await fs.mkdir('dist', { recursive: true })
    await fs.mkdir('dist/blog', { recursive: true })
    await fs.mkdir('dist/category', { recursive: true })
    await fs.mkdir('dist/tag', { recursive: true })
    
    // 全記事とメタデータを取得
    const posts = await getAllPosts()
    const categories = await getAllCategories()
    const tags = await getAllTags()
    
    console.log(`📝 Found ${posts.length} posts, ${categories.length} categories, ${tags.length} tags`)
    
    // 🎯 重要：dist/index.html を生成（トップページ）
    const { baseLayout } = await import('./templates/layout.js')
    
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
          <div class="posts-grid">
            ${posts.slice(0, 5).map(post => `
              <article class="post-card">
                <header>
                  <h2><a href="/blog/${post.slug}">${post.title}</a></h2>
                  <div class="post-meta">
                    <time>${post.getFormattedDate()}</time>
                    <span class="category">📁 ${post.category}</span>
                  </div>
                </header>
                <div class="post-excerpt">${post.excerpt}</div>
                <div class="post-tags">
                  ${post.tags.slice(0, 3).map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
                <footer>
                  <a href="/blog/${post.slug}" class="read-more">続きを読む →</a>
                  <span class="reading-time">⏱️ ${post.readingTime}分</span>
                </footer>
              </article>
            `).join('')}
          </div>
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
      
      <!-- Inline critical styles for homepage cards and tags (ensures Pages static HTML matches app styles) -->
      <style>
        .posts-grid { display: grid; gap: 2rem; margin-bottom: 3rem; }
        .post-card { background: #fff; border: 1px solid var(--color-border-muted); border-radius: var(--radius-2xl); padding: 1.5rem; box-shadow: var(--shadow-sm); }
        .post-card h2 { margin-bottom: 0.75rem; }
        .post-card h2 a { color: var(--color-text-primary); text-decoration: none; font-weight: 700; }
        .post-meta { display: flex; gap: 1rem; margin-bottom: 1rem; color: var(--color-text-tertiary); font-size: 0.9rem; }
        .post-excerpt { margin-bottom: 1rem; color: var(--color-text-secondary); }
        .post-card footer { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--color-border-muted); }
        .read-more { color: var(--color-accent-primary); background: var(--color-accent-subtle); text-decoration: none; font-weight: 600; padding: 0.4rem 0.8rem; border: 1px solid var(--color-accent-primary); border-radius: 0.5rem; }
        .read-more:hover { background: var(--color-accent-primary); color: #fff; }
        .reading-time { font-size: 0.8rem; color: var(--color-text-muted); }
        .post-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
        .tag { display: inline-block; background: var(--blue-50); color: var(--blue-700); padding: 0.25rem 0.5rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; border: 1px solid var(--blue-200); letter-spacing: 0.025em; }
      </style>
    `
    
    const homeHtml = baseLayout(homeContent, {
      title: 'ホーム',
      description: 'Honoで作った超高速ブログ - 最新の技術記事をお届けします'
    })
    
    // トップページのindex.htmlを出力
    await fs.writeFile('dist/index.html', homeHtml)
    console.log('✅ Generated dist/index.html (homepage)')
    
    // 各記事の個別ページを生成
    for (const post of posts) {
      await fs.mkdir(`dist/blog/${post.slug}`, { recursive: true })
      
      const { postTemplate } = await import('./templates/layout.js')
      const postHtml = baseLayout(postTemplate(post), {
        title: post.title,
        description: post.excerpt
      })
      
      await fs.writeFile(`dist/blog/${post.slug}/index.html`, postHtml)
    }
    console.log(`✅ Generated ${posts.length} post pages`)
    
    // ブログ一覧ページ
    const { postListTemplate } = await import('./templates/layout.js')
    const blogListHtml = baseLayout(postListTemplate(posts))
    await fs.writeFile('dist/blog/index.html', blogListHtml)
    console.log('✅ Generated dist/blog/index.html')
    
    // SPAルーティング用の_redirects
    const redirects = `/* /index.html 200`
    await fs.writeFile('dist/_redirects', redirects)
    
    // _routes.jsonを生成（Cloudflare Pages用）
    const routes = {
      version: 1,
      include: ["/*"],
      exclude: ["/static/*", "*.html", "*.css", "*.js", "*.png", "*.jpg", "*.gif"]
    }
    
    await fs.writeFile('dist/_routes.json', JSON.stringify(routes, null, 2))
    
    // Custom headers (Cloudflare Pages) - disable caching for HTML pages
    const headers = `
/*
  X-Content-Type-Options: nosniff

/*.html
  Cache-Control: no-store, max-age=0, must-revalidate

/blog
  Cache-Control: no-store, max-age=0, must-revalidate

/blog/*
  Cache-Control: no-store, max-age=0, must-revalidate

/category/*
  Cache-Control: no-store, max-age=0, must-revalidate

/tag/*
  Cache-Control: no-store, max-age=0, must-revalidate

/search
  Cache-Control: no-store, max-age=0, must-revalidate

/categories
  Cache-Control: no-store, max-age=0, must-revalidate

/tags
  Cache-Control: no-store, max-age=0, must-revalidate
`
    await fs.writeFile('dist/_headers', headers)
    
    // Cloudflare Pages Functions用のエントリーポイント
    const functionsCode = `
import app from '../index.js'

export default {
  async fetch(request, env, ctx) {
    return app.fetch(request, env, ctx)
  }
}
`
    
    await fs.mkdir('dist/functions', { recursive: true })
    await fs.writeFile('dist/functions/_middleware.js', functionsCode)
    
    // package.jsonをコピー
    await fs.copyFile('package.json', 'dist/package.json')
    
    // 必要なファイルをコピー
    await copyDirectory('utils', 'dist/utils')
    await copyDirectory('templates', 'dist/templates') 
    await copyDirectory('posts', 'dist/posts')
    
    // index.jsをコピー
    await fs.copyFile('index.js', 'dist/index.js')
    
    console.log('✅ Build completed! Ready for Cloudflare Pages deployment')
    console.log(`📁 Generated files:`)
    console.log(`   - dist/index.html (homepage)`)
    console.log(`   - dist/blog/index.html (blog list)`) 
    console.log(`   - dist/blog/{slug}/index.html (${posts.length} posts)`)
    console.log(`   - dist/_redirects (SPA routing)`)
    
  } catch (error) {
    console.error('❌ Build failed:', error)
    process.exit(1)
  }
}

// ディレクトリをコピーするヘルパー関数
async function copyDirectory(src, dest) {
  await fs.mkdir(dest, { recursive: true })
  const files = await fs.readdir(src)
  
  for (const file of files) {
    const srcPath = path.join(src, file)
    const destPath = path.join(dest, file)
    const stat = await fs.stat(srcPath)
    
    if (stat.isDirectory()) {
      await copyDirectory(srcPath, destPath)
    } else {
      await fs.copyFile(srcPath, destPath)
    }
  }
}

// ビルド実行
buildStaticSite()
