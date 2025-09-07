// レスポンシブなHTMLテンプレートシステム

export const baseLayout = (content, meta = {}) => `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${meta.title ? `${meta.title} | ` : ''}Hono Blog 🔥</title>
    <meta name="description" content="${meta.description || 'Honoで作った超高速ブログ'}">
    ${meta.ogTags || ''}
    <style>
        /* 🎨 Modern Blog Color System - WCAG AA Compliant */
        :root {
            /* Primary Colors */
            --primary-50: #fef2f2;
            --primary-100: #fee2e2;
            --primary-500: #ef4444;
            --primary-600: #dc2626;
            --primary-700: #b91c1c;
            
            /* Neutral Colors - High Contrast */
            --neutral-50: #fafafa;
            --neutral-100: #f5f5f5;
            --neutral-200: #e5e5e5;
            --neutral-300: #d4d4d4;
            --neutral-400: #a3a3a3;
            --neutral-500: #737373;
            --neutral-600: #525252;
            --neutral-700: #404040;
            --neutral-800: #262626;
            --neutral-900: #171717;
            --neutral-950: #0a0a0a;
            
            /* Orange Accent (Hono Brand) */
            --orange-50: #fff7ed;
            --orange-100: #ffedd5;
            --orange-500: #f97316;
            --orange-600: #ea580c;
            --orange-700: #c2410c;
            
            /* Success/Info Colors */
            --emerald-50: #ecfdf5;
            --emerald-100: #d1fae5;
            --emerald-600: #059669;
            --emerald-700: #047857;
            
            --blue-50: #eff6ff;
            --blue-100: #dbeafe;
            --blue-200: #bfdbfe;
            --blue-600: #2563eb;
            --blue-700: #1d4ed8;
            
            /* Semantic Colors */
            --text-primary: var(--neutral-900);
            --text-secondary: var(--neutral-700);
            --text-tertiary: var(--neutral-600);
            --text-muted: var(--neutral-500);
            
            --bg-primary: #ffffff;
            --bg-secondary: var(--neutral-50);
            --bg-tertiary: var(--neutral-100);
            
            --border-light: var(--neutral-200);
            --border-medium: var(--neutral-300);
            
            --accent-primary: var(--orange-600);
            --accent-hover: var(--orange-700);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: var(--text-primary);
            background: var(--bg-primary);
            font-size: 16px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        header {
            background: var(--bg-primary);
            border-bottom: 1px solid var(--border-light);
            position: relative;
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 0;
            min-height: 70px;
        }
        
        .logo {
            font-size: 1.6rem;
            font-weight: 700;
            text-decoration: none;
            color: var(--accent-primary);
            flex-shrink: 0;
            letter-spacing: -0.025em;
        }
        
        .nav-links {
            display: flex;
            gap: 2.5rem;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        
        .nav-links a {
            text-decoration: none;
            color: var(--text-secondary);
            font-weight: 500;
            font-size: 1rem;
            padding: 0.5rem 0;
            transition: color 0.2s ease;
            white-space: nowrap;
            position: relative;
        }
        
        .nav-links a:hover {
            color: var(--accent-primary);
        }
        
        .nav-links a:after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--accent-primary);
            transform: scaleX(0);
            transition: transform 0.2s ease;
        }
        
        .nav-links a:hover:after {
            transform: scaleX(1);
        }
        
        /* モバイルメニューボタン（必要に応じて表示） */
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--text-muted);
            cursor: pointer;
        }
        
        main {
            padding: 2rem 0;
            min-height: 80vh;
        }
        
        footer {
            background: var(--neutral-900);
            color: var(--neutral-100);
            text-align: center;
            padding: 3rem 0;
            margin-top: 4rem;
            border-top: 1px solid var(--border-light);
        }
        
        footer p {
            margin-bottom: 0.5rem;
            color: var(--neutral-300);
        }
        
        .hero {
            text-align: center;
            padding: 4rem 0;
            background: linear-gradient(135deg, var(--blue-600) 0%, var(--accent-primary) 100%);
            color: white;
            margin-bottom: 2rem;
            position: relative;
            overflow: hidden;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.1);
            pointer-events: none;
        }
        
        .hero * {
            position: relative;
            z-index: 1;
        }
        
        .hero h1 {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1rem;
            letter-spacing: -0.025em;
        }
        
        .hero p {
            font-size: 1.25rem;
            opacity: 0.9;
            font-weight: 400;
        }
        
        /* デスクトップファーストデザイン - 大画面向け最適化 */
        @media (min-width: 1200px) {
            .container {
                max-width: 1000px;
                padding: 0 30px;
            }
            
            nav {
                padding: 1.5rem 0;
            }
            
            .logo {
                font-size: 1.8rem;
            }
            
            .nav-links {
                gap: 3rem;
            }
            
            .nav-links a {
                font-size: 1.1rem;
            }
            
            .hero h1 {
                font-size: 3.5rem;
            }
            
            .hero p {
                font-size: 1.3rem;
            }
        }
        
        /* タブレット対応 */
        @media (max-width: 1024px) {
            .container {
                padding: 0 20px;
            }
            
            .nav-links {
                gap: 2rem;
            }
            
            .nav-links a {
                font-size: 0.95rem;
            }
        }
        
        /* 小さなタブレット・大きなモバイル */
        @media (max-width: 768px) {
            .container {
                padding: 0 15px;
            }
            
            /* ナビゲーションを縦並びに変更 */
            nav {
                flex-direction: column;
                gap: 1.2rem;
                padding: 1rem 0;
                text-align: center;
            }
            
            .logo {
                font-size: 1.4rem;
            }
            
            .nav-links {
                gap: 1.8rem;
                flex-wrap: wrap;
                justify-content: center;
                width: 100%;
            }
            
            .nav-links a {
                font-size: 0.9rem;
                padding: 0.4rem 0.8rem;
                border-radius: 20px;
                background: rgba(255, 107, 53, 0.1);
                transition: all 0.3s ease;
            }
            
            .nav-links a:hover {
                background: #ff6b35;
                color: white;
            }
            
            .hero {
                padding: 2rem 0;
                margin-bottom: 1.5rem;
            }
            
            .hero h1 {
                font-size: 2.2rem;
                line-height: 1.2;
                margin-bottom: 0.8rem;
            }
            
            .hero p {
                font-size: 1rem;
            }
            
            main {
                padding: 1.5rem 0;
            }
            
            footer {
                padding: 1.5rem 0;
                font-size: 0.9rem;
            }
        }
        
        /* モバイル縦向き */
        @media (max-width: 480px) {
            .container {
                padding: 0 12px;
            }
            
            nav {
                padding: 0.8rem 0;
                gap: 1rem;
            }
            
            .logo {
                font-size: 1.3rem;
            }
            
            .nav-links {
                gap: 1rem;
                flex-direction: column;
                width: 100%;
            }
            
            .nav-links a {
                font-size: 0.9rem;
                padding: 0.6rem 1rem;
                display: block;
                text-align: center;
                margin: 0.2rem 0;
            }
            
            .hero {
                padding: 1.5rem 0;
            }
            
            .hero h1 {
                font-size: 1.8rem;
            }
            
            .hero p {
                font-size: 0.9rem;
            }
            
            main {
                padding: 1rem 0;
            }
        }
    </style>
</head>
<body>
    <header>
        <nav class="container">
            <a href="/" class="logo">🔥 Hono Blog</a>
            <ul class="nav-links">
                <li><a href="/">ホーム</a></li>
                <li><a href="/blog">ブログ</a></li>
                <li><a href="/categories">カテゴリ</a></li>
                <li><a href="/tags">タグ</a></li>
                <li><a href="/search">検索</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        ${content}
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; 2025 Hono Blog. Built with ❤️ and 🔥</p>
            <p>Powered by <strong>Hono</strong> - Ultra Fast Web Framework</p>
        </div>
    </footer>
    
    <script>
        // シンプルなダークモード切り替え
        const toggleDarkMode = () => {
            document.body.style.background = 
                document.body.style.background === 'rgb(34, 34, 34)' ? '#f9f9f9' : '#222';
            document.body.style.color = 
                document.body.style.color === 'rgb(255, 255, 255)' ? '#333' : '#fff';
        };
        
        // Enterキーでの検索機能
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && e.target.tagName !== 'INPUT') {
                e.preventDefault();
                const searchInput = document.querySelector('input[type="search"]');
                if (searchInput) searchInput.focus();
            }
        });
    </script>
</body>
</html>
`

export const postTemplate = (post) => `
<div class="container">
    <article class="post-detail">
        <header class="post-header">
            <h1 class="post-title">${post.title}</h1>
            <div class="post-meta">
                <time datetime="${post.date.toISOString()}">${post.getFormattedDate()}</time>
                <span class="category">📁 ${post.category}</span>
                <span class="reading-time">⏱️ ${post.readingTime}分で読める</span>
            </div>
            <div class="post-tags">
                ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
            </div>
        </header>
        
        <div class="post-content">
            ${post.content}
        </div>
        
        <footer class="post-footer">
            <a href="/blog" class="back-link">← ブログ一覧に戻る</a>
        </footer>
    </article>
</div>

<style>
    .post-detail {
        background: white;
        border-radius: 8px;
        padding: 2rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        margin-bottom: 2rem;
    }
    
    .post-title {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: #222;
        line-height: 1.2;
    }
    
    .post-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        font-size: 0.9rem;
        color: #666;
        flex-wrap: wrap;
    }
    
    .post-tags {
        margin-bottom: 2rem;
    }
    
    .tag {
        display: inline-block;
        background: var(--blue-100);
        color: var(--blue-700);
        padding: 0.3rem 0.8rem;
        border-radius: 16px;
        font-size: 0.8rem;
        font-weight: 500;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        transition: all 0.2s ease;
        border: 1px solid var(--blue-200);
    }
    
    .tag:hover {
        background: var(--blue-700);
        color: white;
    }
    
    .post-content {
        font-size: 1.1rem;
        line-height: 1.8;
        margin-bottom: 2rem;
    }
    
    .post-content h2 {
        margin: 2rem 0 1rem;
        color: #ff6b35;
        border-bottom: 2px solid #ff6b35;
        padding-bottom: 0.5rem;
    }
    
    .post-content h3 {
        margin: 1.5rem 0 1rem;
        color: #555;
    }
    
    .post-content p {
        margin-bottom: 1rem;
    }
    
    .post-content pre {
        background: #f5f5f5;
        padding: 1rem;
        border-radius: 4px;
        overflow-x: auto;
        margin: 1rem 0;
    }
    
    .post-content code {
        background: #f0f0f0;
        padding: 0.2rem 0.4rem;
        border-radius: 3px;
        font-size: 0.9rem;
    }
    
    .back-link {
        display: inline-block;
        color: #ff6b35;
        text-decoration: none;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border: 2px solid #ff6b35;
        border-radius: 4px;
        transition: all 0.3s;
    }
    
    .back-link:hover {
        background: #ff6b35;
        color: white;
    }
    
    /* デスクトップ向け記事ページ最適化 */
    @media (min-width: 1200px) {
        .post-detail {
            padding: 3rem;
            max-width: 900px;
            margin: 0 auto 2rem;
        }
        
        .post-title {
            font-size: 2.8rem;
            margin-bottom: 1.5rem;
            line-height: 1.1;
        }
        
        .post-content {
            font-size: 1.2rem;
            line-height: 1.8;
        }
        
        .post-content h2 {
            font-size: 1.8rem;
            margin: 2.5rem 0 1.25rem;
        }
        
        .post-content h3 {
            font-size: 1.4rem;
            margin: 2rem 0 1rem;
        }
    }
    
    @media (max-width: 1024px) {
        .post-detail {
            padding: 2rem;
            margin: 0 auto 1.5rem;
        }
        
        .post-title {
            font-size: 2.4rem;
        }
        
        .post-content {
            font-size: 1.1rem;
        }
    }
    
    @media (max-width: 768px) {
        .post-detail {
            padding: 1.5rem;
            margin: 0 0.5rem 1.5rem;
        }
        
        .post-title {
            font-size: 1.9rem;
            line-height: 1.2;
            margin-bottom: 1.25rem;
        }
        
        .post-meta {
            flex-direction: column;
            gap: 0.5rem;
            font-size: 0.9rem;
        }
        
        .post-tags {
            margin-bottom: 1.5rem;
        }
        
        .post-content {
            font-size: 1rem;
            line-height: 1.7;
        }
        
        .post-content h2 {
            font-size: 1.5rem;
            margin: 1.8rem 0 0.8rem;
        }
        
        .post-content h3 {
            font-size: 1.25rem;
            margin: 1.5rem 0 0.75rem;
        }
        
        .post-content pre {
            font-size: 0.9rem;
            padding: 1rem;
            overflow-x: auto;
            border-radius: 6px;
        }
        
        .back-link {
            font-size: 0.9rem;
            padding: 0.7rem 1.2rem;
        }
    }
    
    @media (max-width: 480px) {
        .post-detail {
            padding: 1.25rem;
            margin: 0 0.25rem 1rem;
        }
        
        .post-title {
            font-size: 1.6rem;
            line-height: 1.3;
        }
        
        .post-content {
            font-size: 0.95rem;
            line-height: 1.6;
        }
        
        .post-content h2 {
            font-size: 1.3rem;
        }
        
        .post-content h3 {
            font-size: 1.15rem;
        }
        
        .post-content pre {
            font-size: 0.85rem;
            padding: 0.8rem;
        }
        
        .tag {
            font-size: 0.75rem;
            padding: 0.25rem 0.7rem;
            margin-right: 0.4rem;
            margin-bottom: 0.4rem;
        }
        
        .back-link {
            font-size: 0.85rem;
            padding: 0.6rem 1rem;
        }
    }
</style>
`

export const postListTemplate = (posts, pagination = null, title = 'ブログ記事') => `
<div class="container">
    <div class="hero">
        <h1>${title}</h1>
        <p>Honoで作った超高速ブログ 🔥</p>
    </div>
    
    <div class="posts-grid">
        ${posts.length > 0 ? 
            posts.map(post => `
                <article class="post-card">
                    <header>
                        <h2><a href="${post.getUrl()}">${post.title}</a></h2>
                        <div class="post-meta">
                            <time>${post.getFormattedDate()}</time>
                            <span class="category">📁 ${post.category}</span>
                        </div>
                    </header>
                    
                    <div class="post-excerpt">
                        ${post.excerpt}
                    </div>
                    
                    <div class="post-tags">
                        ${post.tags.slice(0, 3).map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>
                    
                    <footer>
                        <a href="${post.getUrl()}" class="read-more">続きを読む →</a>
                        <span class="reading-time">⏱️ ${post.readingTime}分</span>
                    </footer>
                </article>
            `).join('') 
            : '<p class="no-posts">記事が見つかりませんでした。</p>'
        }
    </div>
    
    ${pagination ? `
        <nav class="pagination">
            ${pagination.hasPrev ? 
                `<a href="?page=${pagination.currentPage - 1}" class="prev">← 前のページ</a>` : 
                '<span class="prev disabled">← 前のページ</span>'
            }
            
            <span class="page-info">
                ${pagination.currentPage} / ${pagination.totalPages}
            </span>
            
            ${pagination.hasNext ? 
                `<a href="?page=${pagination.currentPage + 1}" class="next">次のページ →</a>` : 
                '<span class="next disabled">次のページ →</span>'
            }
        </nav>
    ` : ''}
</div>

<style>
    .posts-grid {
        display: grid;
        gap: 2rem;
        margin-bottom: 3rem;
    }
    
    .post-card {
        background: var(--bg-primary);
        border: 1px solid var(--border-light);
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        transition: all 0.2s ease;
    }
    
    .post-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        border-color: var(--border-medium);
    }
    
    .post-card h2 {
        margin-bottom: 0.75rem;
    }
    
    .post-card h2 a {
        color: var(--text-primary);
        text-decoration: none;
        font-size: 1.4rem;
        font-weight: 600;
        line-height: 1.3;
        transition: color 0.2s ease;
    }
    
    .post-card h2 a:hover {
        color: var(--accent-primary);
    }
    
    .post-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        font-size: 0.875rem;
        color: var(--text-tertiary);
        flex-wrap: wrap;
        font-weight: 500;
    }
    
    .post-excerpt {
        margin-bottom: 1rem;
        color: var(--text-secondary);
        line-height: 1.6;
        font-size: 1rem;
    }
    
    .post-card footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #eee;
    }
    
    .read-more {
        color: var(--accent-primary);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
        padding: 0.5rem 1rem;
        border: 1px solid var(--accent-primary);
        border-radius: 6px;
        transition: all 0.2s ease;
        display: inline-block;
    }
    
    .read-more:hover {
        background: var(--accent-primary);
        color: white;
        text-decoration: none;
    }
    
    .reading-time {
        font-size: 0.8rem;
        color: var(--text-muted);
        font-weight: 500;
    }
    
    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        margin: 2rem 0;
    }
    
    .pagination a,
    .pagination .disabled {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        text-decoration: none;
        font-weight: 500;
    }
    
    .pagination a {
        background: #ff6b35;
        color: white;
    }
    
    .pagination a:hover {
        background: #e55a2e;
    }
    
    .pagination .disabled {
        background: #ccc;
        color: #666;
        cursor: not-allowed;
    }
    
    .page-info {
        font-weight: 500;
        color: #666;
    }
    
    .no-posts {
        text-align: center;
        color: #666;
        font-size: 1.2rem;
        padding: 3rem;
    }
    
    /* デスクトップ向けブログ一覧最適化 */
    @media (min-width: 1200px) {
        .posts-grid {
            gap: 2.5rem;
        }
        
        .post-card {
            padding: 2.5rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .post-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }
        
        .post-card h2 a {
            font-size: 1.6rem;
            line-height: 1.3;
        }
        
        .post-content {
            font-size: 1.1rem;
        }
        
        .post-meta {
            font-size: 1rem;
            gap: 1.5rem;
        }
        
        .pagination {
            gap: 2.5rem;
            margin: 3rem 0;
        }
        
        .pagination a,
        .pagination .disabled {
            font-size: 1.1rem;
            padding: 0.7rem 1.5rem;
        }
    }
    
    @media (max-width: 1024px) {
        .posts-grid {
            gap: 2rem;
        }
        
        .post-card {
            padding: 1.8rem;
        }
        
        .post-card h2 a {
            font-size: 1.4rem;
        }
        
        .post-meta {
            font-size: 0.95rem;
        }
    }
    
    @media (max-width: 768px) {
        .posts-grid {
            gap: 1.5rem;
        }
        
        .post-card {
            padding: 1.5rem;
            margin: 0;
        }
        
        .post-card h2 a {
            font-size: 1.25rem;
            line-height: 1.3;
        }
        
        .post-meta {
            flex-direction: column;
            gap: 0.6rem;
            font-size: 0.9rem;
        }
        
        .post-excerpt {
            font-size: 0.95rem;
            line-height: 1.6;
        }
        
        .post-card footer {
            flex-direction: column;
            gap: 0.8rem;
            align-items: flex-start;
        }
        
        .pagination {
            flex-direction: column;
            gap: 1.2rem;
            align-items: center;
        }
        
        .pagination a,
        .pagination .disabled {
            min-width: 180px;
            text-align: center;
            padding: 0.8rem 1.2rem;
        }
        
        .tag {
            font-size: 0.8rem;
            padding: 0.3rem 0.8rem;
        }
    }
    
    @media (max-width: 480px) {
        .posts-grid {
            gap: 1.25rem;
        }
        
        .post-card {
            padding: 1.25rem;
        }
        
        .post-card h2 a {
            font-size: 1.15rem;
            line-height: 1.4;
        }
        
        .post-meta {
            font-size: 0.85rem;
        }
        
        .post-excerpt {
            font-size: 0.9rem;
            line-height: 1.5;
        }
        
        .tag {
            font-size: 0.75rem;
            padding: 0.25rem 0.6rem;
            margin-right: 0.3rem;
            margin-bottom: 0.3rem;
        }
        
        .pagination a,
        .pagination .disabled {
            min-width: 150px;
            font-size: 0.9rem;
            padding: 0.7rem 1rem;
        }
        
        .read-more {
            font-size: 0.85rem;
        }
        
        .reading-time {
            font-size: 0.75rem;
        }
    }
</style>
`