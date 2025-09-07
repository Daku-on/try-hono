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
    
    // _routes.jsonを生成（Cloudflare Pages用）
    const routes = {
      version: 1,
      include: ["/*"],
      exclude: ["/static/*"]
    }
    
    await fs.writeFile('dist/_routes.json', JSON.stringify(routes, null, 2))
    
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