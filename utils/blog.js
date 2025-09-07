import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { format, parseISO } from 'date-fns'
import { ja } from 'date-fns/locale'

// キャッシュシステム
class PostCache {
  constructor() {
    this.cache = new Map()
    this.listCache = null
    this.lastUpdate = null
  }
  
  set(key, value) {
    this.cache.set(key, value)
  }
  
  get(key) {
    return this.cache.get(key)
  }
  
  clear() {
    this.cache.clear()
    this.listCache = null
    this.lastUpdate = null
  }
}

const cache = new PostCache()

// Markdownの設定
marked.setOptions({
  gfm: true,
  breaks: true
})

// 記事メタデータクラス
class Post {
  constructor(data, content, filename) {
    this.title = data.title
    this.slug = data.slug
    this.date = parseISO(data.date)
    this.category = data.category
    this.tags = data.tags || []
    this.excerpt = data.excerpt
    this.content = marked(content)
    this.rawContent = content
    this.filename = filename
    this.readingTime = this.calculateReadingTime(content)
  }
  
  calculateReadingTime(content) {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }
  
  getFormattedDate(formatString = 'yyyy年M月d日') {
    return format(this.date, formatString, { locale: ja })
  }
  
  getUrl() {
    return `/blog/${this.slug}`
  }
}

// 全記事を取得
export async function getAllPosts() {
  if (cache.listCache) {
    return cache.listCache
  }
  
  try {
    const postsDir = path.join(process.cwd(), 'posts')
    const filenames = await fs.readdir(postsDir)
    const markdownFiles = filenames.filter(name => name.endsWith('.md'))
    
    const posts = await Promise.all(
      markdownFiles.map(async (filename) => {
        const filePath = path.join(postsDir, filename)
        const fileContent = await fs.readFile(filePath, 'utf-8')
        const { data, content } = matter(fileContent)
        
        return new Post(data, content, filename)
      })
    )
    
    // 日付順でソート（新しい順）
    const sortedPosts = posts.sort((a, b) => b.date - a.date)
    
    cache.listCache = sortedPosts
    cache.lastUpdate = Date.now()
    
    return sortedPosts
  } catch (error) {
    console.error('記事の取得に失敗:', error)
    return []
  }
}

// スラグで記事を取得
export async function getPostBySlug(slug) {
  const cached = cache.get(slug)
  if (cached) {
    return cached
  }
  
  try {
    const posts = await getAllPosts()
    const post = posts.find(p => p.slug === slug)
    
    if (post) {
      cache.set(slug, post)
      return post
    }
    
    return null
  } catch (error) {
    console.error('記事の取得に失敗:', error)
    return null
  }
}

// カテゴリ別記事取得
export async function getPostsByCategory(category) {
  try {
    const posts = await getAllPosts()
    return posts.filter(post => post.category === category)
  } catch (error) {
    console.error('カテゴリ記事の取得に失敗:', error)
    return []
  }
}

// タグ別記事取得
export async function getPostsByTag(tag) {
  try {
    const posts = await getAllPosts()
    return posts.filter(post => post.tags.includes(tag))
  } catch (error) {
    console.error('タグ記事の取得に失敗:', error)
    return []
  }
}

// 全カテゴリ取得
export async function getAllCategories() {
  try {
    const posts = await getAllPosts()
    const categories = new Set(posts.map(post => post.category).filter(Boolean))
    return Array.from(categories)
  } catch (error) {
    console.error('カテゴリの取得に失敗:', error)
    return []
  }
}

// 全タグ取得
export async function getAllTags() {
  try {
    const posts = await getAllPosts()
    const tags = new Set(posts.flatMap(post => post.tags))
    return Array.from(tags)
  } catch (error) {
    console.error('タグの取得に失敗:', error)
    return []
  }
}

// ページネーション
export function paginatePosts(posts, page = 1, limit = 5) {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  
  return {
    posts: posts.slice(startIndex, endIndex),
    totalPages: Math.ceil(posts.length / limit),
    currentPage: page,
    hasNext: endIndex < posts.length,
    hasPrev: page > 1
  }
}

// 検索機能
export async function searchPosts(query) {
  try {
    const posts = await getAllPosts()
    const searchTerm = query.toLowerCase()
    
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.rawContent.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  } catch (error) {
    console.error('検索に失敗:', error)
    return []
  }
}

export { Post }