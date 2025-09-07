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
    <!-- Google Fonts - Inter Variable Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
    
    <style>
        /* 🎨 2025 Modern Design System - Research-Based */
        :root {
            /* Typography Scale (1.25 ratio - Perfect Fourth) */
            --text-xs: 0.75rem;     /* 12px */
            --text-sm: 0.875rem;    /* 14px */
            --text-base: 1rem;      /* 16px */
            --text-lg: 1.125rem;    /* 18px */
            --text-xl: 1.25rem;     /* 20px */
            --text-2xl: 1.5rem;     /* 24px */
            --text-3xl: 1.875rem;   /* 30px */
            --text-4xl: 2.25rem;    /* 36px */
            --text-5xl: 3rem;       /* 48px */
            --text-6xl: 3.75rem;    /* 60px */
            
            /* Line Heights */
            --leading-tight: 1.25;
            --leading-snug: 1.375;
            --leading-normal: 1.5;
            --leading-relaxed: 1.625;
            --leading-loose: 2;
            
            /* Spacing Scale (0.25rem base unit) */
            --space-1: 0.25rem;     /* 4px */
            --space-2: 0.5rem;      /* 8px */
            --space-3: 0.75rem;     /* 12px */
            --space-4: 1rem;        /* 16px */
            --space-5: 1.25rem;     /* 20px */
            --space-6: 1.5rem;      /* 24px */
            --space-8: 2rem;        /* 32px */
            --space-10: 2.5rem;     /* 40px */
            --space-12: 3rem;       /* 48px */
            --space-16: 4rem;       /* 64px */
            
            /* Neutral Colors - Enhanced Contrast */
            --neutral-0: #ffffff;
            --neutral-50: #fafafa;
            --neutral-100: #f4f4f5;
            --neutral-200: #e4e4e7;
            --neutral-300: #d4d4d8;
            --neutral-400: #a1a1aa;
            --neutral-500: #71717a;
            --neutral-600: #52525b;
            --neutral-700: #3f3f46;
            --neutral-800: #27272a;
            --neutral-900: #18181b;
            --neutral-950: #09090b;
            
            /* Orange Accent (Hono Brand) - OKLCH Based */
            --orange-50: #fefaf7;
            --orange-100: #fef3e2;
            --orange-200: #fed7aa;
            --orange-300: #fdba74;
            --orange-400: #fb923c;
            --orange-500: #f97316;
            --orange-600: #ea580c;
            --orange-700: #c2410c;
            --orange-800: #9a3412;
            --orange-900: #7c2d12;
            --orange-950: #431407;
            
            /* Blue System Colors */
            --blue-50: #eff6ff;
            --blue-100: #dbeafe;
            --blue-200: #bfdbfe;
            --blue-300: #93c5fd;
            --blue-400: #60a5fa;
            --blue-500: #3b82f6;
            --blue-600: #2563eb;
            --blue-700: #1d4ed8;
            --blue-800: #1e40af;
            --blue-900: #1e3a8a;
            --blue-950: #172554;
            
            /* Success Colors */
            --green-50: #f0fdf4;
            --green-100: #dcfce7;
            --green-600: #16a34a;
            --green-700: #15803d;
            
            /* Error Colors */
            --red-50: #fef2f2;
            --red-100: #fee2e2;
            --red-600: #dc2626;
            --red-700: #b91c1c;
            
            /* Semantic Design Tokens */
            --color-text-primary: var(--neutral-950);
            --color-text-secondary: var(--neutral-700);
            --color-text-tertiary: var(--neutral-600);
            --color-text-muted: var(--neutral-500);
            --color-text-inverse: var(--neutral-0);
            
            --color-bg-primary: var(--neutral-0);
            --color-bg-secondary: var(--neutral-50);
            --color-bg-tertiary: var(--neutral-100);
            --color-bg-elevated: var(--neutral-0);
            
            --color-border-default: var(--neutral-200);
            --color-border-muted: var(--neutral-100);
            --color-border-strong: var(--neutral-300);
            
            --color-accent-primary: var(--orange-600);
            --color-accent-hover: var(--orange-700);
            --color-accent-active: var(--orange-800);
            --color-accent-subtle: var(--orange-50);
            
            --color-link-default: var(--blue-600);
            --color-link-hover: var(--blue-700);
            
            /* Shadows */
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            
            /* Border Radius */
            --radius-sm: 0.125rem;
            --radius-md: 0.375rem;
            --radius-lg: 0.5rem;
            --radius-xl: 0.75rem;
            --radius-2xl: 1rem;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
            font-optical-sizing: auto;
            font-variation-settings: 'slnt' 0;
            line-height: var(--leading-normal);
            color: var(--color-text-primary);
            background: var(--color-bg-primary);
            font-size: var(--text-base);
            font-weight: 400;
            letter-spacing: -0.011em; /* Improved readability */
        }
        
        .container {
            max-width: 65rem; /* 1040px */
            margin: 0 auto;
            padding: 0 var(--space-5);
        }
        
        header {
            background: var(--color-bg-primary);
            border-bottom: 1px solid var(--color-border-default);
            position: relative;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--space-6) 0;
            min-height: 4.5rem;
        }
        
        .logo {
            font-size: var(--text-2xl);
            font-weight: 700;
            text-decoration: none;
            color: var(--color-accent-primary);
            flex-shrink: 0;
            letter-spacing: -0.025em;
            font-feature-settings: 'kern' 1, 'liga' 1;
        }
        
        .nav-links {
            display: flex;
            gap: var(--space-10);
            list-style: none;
            margin: 0;
            padding: 0;
        }
        
        .nav-links a {
            text-decoration: none;
            color: var(--color-text-secondary);
            font-weight: 500;
            font-size: var(--text-base);
            padding: var(--space-2) 0;
            transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            white-space: nowrap;
            position: relative;
            letter-spacing: -0.006em;
        }
        
        .nav-links a:hover {
            color: var(--color-accent-primary);
        }
        
        .nav-links a:after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--color-accent-primary);
            transform: scaleX(0);
            transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-links a:hover:after {
            transform: scaleX(1);
        }
        
        /* モバイルメニューボタン（必要に応じて表示） */
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            font-size: var(--text-2xl);
            color: var(--color-text-muted);
            cursor: pointer;
        }
        
        main {
            padding: var(--space-8) 0;
            min-height: 80vh;
        }
        
        /* Page-level footer only */
        body > footer {
            background: var(--neutral-900);
            color: var(--neutral-100);
            text-align: center;
            padding: var(--space-12) 0;
            margin-top: var(--space-16);
            border-top: 1px solid var(--color-border-default);
        }
        
        body > footer p {
            margin-bottom: var(--space-2);
            color: var(--neutral-300);
            font-size: var(--text-sm);
            line-height: var(--leading-relaxed);
        }
        
        .hero {
            text-align: center;
            padding: var(--space-16) 0;
            background: linear-gradient(135deg, var(--blue-600) 0%, var(--color-accent-primary) 100%);
            color: var(--color-text-inverse);
            margin-bottom: var(--space-8);
            position: relative;
            overflow: hidden;
            border-radius: var(--radius-2xl);
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.08);
            pointer-events: none;
        }
        
        .hero * {
            position: relative;
            z-index: 1;
        }
        
        .hero h1 {
            font-size: var(--text-5xl);
            font-weight: 800;
            margin-bottom: var(--space-4);
            letter-spacing: -0.025em;
            line-height: var(--leading-tight);
            font-feature-settings: 'kern' 1, 'liga' 1;
        }
        
        .hero p {
            font-size: var(--text-xl);
            opacity: 0.9;
            font-weight: 400;
            line-height: var(--leading-relaxed);
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
        background: var(--color-bg-elevated);
        border-radius: var(--radius-2xl);
        padding: var(--space-8);
        box-shadow: var(--shadow-lg);
        margin-bottom: var(--space-8);
        border: 1px solid var(--color-border-muted);
    }
    
    .post-title {
        font-size: var(--text-4xl);
        margin-bottom: var(--space-4);
        color: var(--color-text-primary);
        line-height: var(--leading-tight);
        font-weight: 800;
        letter-spacing: -0.025em;
        font-feature-settings: 'kern' 1, 'liga' 1;
    }
    
    .post-meta {
        display: flex;
        gap: var(--space-4);
        margin-bottom: var(--space-4);
        font-size: var(--text-sm);
        color: var(--color-text-tertiary);
        flex-wrap: wrap;
        font-weight: 500;
    }
    
    .post-tags {
        margin-bottom: var(--space-8);
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
    }
    
    .tag {
        display: inline-block;
        background: var(--blue-50);
        color: var(--blue-700);
        padding: var(--space-2) var(--space-3);
        border-radius: var(--radius-xl);
        font-size: var(--text-xs);
        font-weight: 600;
        margin-right: 0; /* spacing handled by .post-tags gap */
        margin-bottom: 0; /* spacing handled by .post-tags gap */
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid var(--blue-200);
        letter-spacing: 0.025em;
        text-transform: uppercase;
    }
    
    .tag:hover {
        background: var(--blue-600);
        color: var(--color-text-inverse);
        border-color: var(--blue-600);
        transform: translateY(-1px);
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
        gap: var(--space-8);
        margin-bottom: var(--space-12);
    }
    
    .post-card {
        background: var(--color-bg-elevated);
        border: 1px solid var(--color-border-muted);
        border-radius: var(--radius-2xl);
        padding: var(--space-6);
        box-shadow: var(--shadow-sm);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .post-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-xl);
        border-color: var(--color-border-strong);
    }
    
    .post-card h2 {
        margin-bottom: var(--space-3);
    }
    
    .post-card h2 a {
        color: var(--color-text-primary);
        text-decoration: none;
        font-size: var(--text-xl);
        font-weight: 700;
        line-height: var(--leading-snug);
        transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        letter-spacing: -0.025em;
    }
    
    .post-card h2 a:hover {
        color: var(--color-accent-primary);
    }
    
    .post-meta {
        display: flex;
        gap: var(--space-4);
        margin-bottom: var(--space-4);
        font-size: var(--text-sm);
        color: var(--color-text-tertiary);
        flex-wrap: wrap;
        font-weight: 500;
    }
    
    .post-excerpt {
        margin-bottom: var(--space-4);
        color: var(--color-text-secondary);
        line-height: var(--leading-normal);
        font-size: var(--text-base);
    }
    
    /* Tags under excerpt */
    .post-tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
        margin-bottom: var(--space-4);
    }
    
    .tag {
        display: inline-block;
        background: var(--blue-50);
        color: var(--blue-700);
        padding: var(--space-2) var(--space-3);
        border-radius: var(--radius-xl);
        font-size: var(--text-xs);
        font-weight: 600;
        border: 1px solid var(--blue-200);
        letter-spacing: 0.025em;
        text-transform: uppercase;
    }
    
    .post-card footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: var(--space-4);
        padding-top: var(--space-4);
        border-top: 1px solid var(--color-border-muted);
    }
    
    .read-more {
        color: var(--color-accent-primary);
        background: var(--color-accent-subtle);
        text-decoration: none;
        font-weight: 600;
        font-size: var(--text-sm);
        padding: var(--space-2) var(--space-4);
        border: 1px solid var(--color-accent-primary);
        border-radius: var(--radius-lg);
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        letter-spacing: 0.025em;
    }
    
    .read-more:hover {
        background: var(--color-accent-primary);
        color: var(--color-text-inverse);
        text-decoration: none;
        transform: translateY(-1px);
        box-shadow: var(--shadow-md);
    }
    
    .reading-time {
        font-size: var(--text-xs);
        color: var(--color-text-muted);
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
