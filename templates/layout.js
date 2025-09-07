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
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f9f9f9;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        header {
            background: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            text-decoration: none;
            color: #ff6b35;
        }
        
        .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
        }
        
        .nav-links a {
            text-decoration: none;
            color: #666;
            font-weight: 500;
            transition: color 0.3s;
        }
        
        .nav-links a:hover {
            color: #ff6b35;
        }
        
        main {
            padding: 2rem 0;
            min-height: 80vh;
        }
        
        footer {
            background: #333;
            color: #fff;
            text-align: center;
            padding: 2rem 0;
            margin-top: 4rem;
        }
        
        .hero {
            text-align: center;
            padding: 3rem 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            margin-bottom: 2rem;
        }
        
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .hero p {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        /* モバイル対応の改善 */
        @media (max-width: 1024px) {
            .container {
                padding: 0 15px;
            }
        }
        
        @media (max-width: 768px) {
            nav {
                flex-direction: column;
                gap: 1rem;
                padding: 1rem 0;
            }
            
            .logo {
                font-size: 1.3rem;
            }
            
            .nav-links {
                gap: 1.5rem;
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .nav-links a {
                font-size: 0.9rem;
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
                padding: 1rem 0;
            }
            
            footer {
                padding: 1.5rem 0;
                font-size: 0.9rem;
            }
        }
        
        @media (max-width: 480px) {
            nav {
                padding: 0.8rem 0;
            }
            
            .logo {
                font-size: 1.2rem;
            }
            
            .nav-links {
                gap: 1rem;
                font-size: 0.85rem;
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
            
            .container {
                padding: 0 10px;
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
        background: #e1f5fe;
        color: #0277bd;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
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
    
    @media (max-width: 1024px) {
        .post-detail {
            padding: 1.75rem;
        }
        
        .post-title {
            font-size: 2.2rem;
        }
    }
    
    @media (max-width: 768px) {
        .post-detail {
            padding: 1.25rem;
            margin: 0 0.5rem 1.5rem;
        }
        
        .post-title {
            font-size: 1.8rem;
            line-height: 1.2;
            margin-bottom: 1.25rem;
        }
        
        .post-meta {
            flex-direction: column;
            gap: 0.5rem;
            font-size: 0.85rem;
        }
        
        .post-tags {
            margin-bottom: 1.5rem;
        }
        
        .post-content {
            font-size: 1rem;
            line-height: 1.7;
        }
        
        .post-content h2 {
            font-size: 1.4rem;
            margin: 1.5rem 0 0.75rem;
        }
        
        .post-content h3 {
            font-size: 1.2rem;
            margin: 1.25rem 0 0.75rem;
        }
        
        .post-content pre {
            font-size: 0.85rem;
            padding: 0.75rem;
            overflow-x: auto;
        }
        
        .back-link {
            font-size: 0.9rem;
            padding: 0.6rem 1rem;
        }
    }
    
    @media (max-width: 480px) {
        .post-detail {
            padding: 1rem;
            margin: 0 0.25rem 1rem;
        }
        
        .post-title {
            font-size: 1.5rem;
        }
        
        .post-content {
            font-size: 0.95rem;
        }
        
        .post-content h2 {
            font-size: 1.3rem;
        }
        
        .post-content h3 {
            font-size: 1.1rem;
        }
        
        .tag {
            font-size: 0.75rem;
            padding: 0.2rem 0.6rem;
            margin-right: 0.4rem;
            margin-bottom: 0.4rem;
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
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .post-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    }
    
    .post-card h2 {
        margin-bottom: 0.5rem;
    }
    
    .post-card h2 a {
        color: #222;
        text-decoration: none;
        font-size: 1.4rem;
    }
    
    .post-card h2 a:hover {
        color: #ff6b35;
    }
    
    .post-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        font-size: 0.9rem;
        color: #666;
        flex-wrap: wrap;
    }
    
    .post-excerpt {
        margin-bottom: 1rem;
        color: #555;
        line-height: 1.6;
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
        color: #ff6b35;
        text-decoration: none;
        font-weight: 500;
    }
    
    .read-more:hover {
        text-decoration: underline;
    }
    
    .reading-time {
        font-size: 0.8rem;
        color: #888;
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
    
    @media (max-width: 1024px) {
        .post-card {
            padding: 1.25rem;
        }
    }
    
    @media (max-width: 768px) {
        .posts-grid {
            gap: 1.5rem;
        }
        
        .post-card {
            padding: 1rem;
            margin: 0;
        }
        
        .post-card h2 a {
            font-size: 1.2rem;
            line-height: 1.3;
        }
        
        .post-meta {
            flex-direction: column;
            gap: 0.5rem;
            font-size: 0.85rem;
        }
        
        .post-card footer {
            flex-direction: column;
            gap: 0.75rem;
            align-items: flex-start;
        }
        
        .pagination {
            flex-direction: column;
            gap: 1rem;
        }
        
        .pagination a,
        .pagination .disabled {
            width: 100%;
            text-align: center;
            max-width: 200px;
        }
    }
    
    @media (max-width: 480px) {
        .post-card {
            padding: 0.75rem;
        }
        
        .post-card h2 a {
            font-size: 1.1rem;
        }
        
        .post-excerpt {
            font-size: 0.9rem;
            line-height: 1.5;
        }
        
        .tag {
            font-size: 0.75rem;
            padding: 0.2rem 0.6rem;
        }
    }
</style>
`