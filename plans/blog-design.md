# GitHub Pages 博客设计方案

## 📋 项目概述

**项目名称**：jichangtuijian.github.io  
**项目类型**：GitHub Pages 博客  
**设计风格**：现代卡片式布局 + Glassmorphism（玻璃拟态）  
**技术栈**：纯 HTML + Tailwind CSS（CDN） + JavaScript

---

## 🎨 设计系统

### 配色方案

#### 浅色模式
```css
--bg-primary: #ffffff
--bg-secondary: #f8fafc
--bg-card: #ffffff
--text-primary: #0f172a
--text-secondary: #475569
--border-color: #e2e8f0
--accent-color: #3b82f6
```

#### 深色模式
```css
--bg-primary: #0f172a
--bg-secondary: #1e293b
--bg-card: rgba(30, 41, 59, 0.8)
--text-primary: #f1f5f9
--text-secondary: #94a3b8
--border-color: #334155
--accent-color: #60a5fa
```

### 字体
- 标题：Inter（现代、清晰）
- 正文：Inter（统一、易读）

---

## 📐 页面结构

### 整体布局
```
┌─────────────────────────────────────────┐
│  Header: Logo + 导航 + 深色模式切换        │
├─────────────────────────────────────────┤
│  Hero: 标题 + 简短描述 + CTA按钮         │
├─────────────────────────────────────────┤
│  🏆 最优推荐区域（两个重点机场）          │
│  ┌─────────────┐  ┌─────────────┐       │
│  │ 红杏云卡片   │  │ overwall卡片 │       │
│  └─────────────┘  └─────────────┘       │
├─────────────────────────────────────────┤
│  筛选/分类标签：全部 | 入门级 | 性价比 | 高端│
├─────────────────────────────────────────┤
│  所有机场卡片网格（点击标签切换显示）     │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐           │
│  │卡片│ │卡片│ │卡片│ │卡片│ ...        │
│  └────┘ └────┘ └────┘ └────┘           │
├─────────────────────────────────────────┤
│  快速对比表格（价格、流量、速度）        │
├─────────────────────────────────────────┤
│  Footer: 版权声明 + 链接                 │
└─────────────────────────────────────────┘
```

### 响应式断点
| 断点 | 屏幕宽度 | 卡片列数 | 目录导航 |
|------|----------|----------|----------|
| 移动端 | < 768px | 1列 | 抽屉式菜单 |
| 平板 | ≥ 768px | 2列 | 侧边栏 |
| 桌面 | ≥ 1024px | 3列 | 固定侧边栏 |
| 大屏 | ≥ 1280px | 4列（最优推荐区） | 固定侧边栏 |

---

## 🃏 卡片组件设计

### 卡片结构
```html
<div class="card">
  <!-- 卡片头部 -->
  <div class="card-header">
    <h3>机场名称</h3>
    <div class="rating">⭐⭐⭐⭐⭐</div>
  </div>
  
  <!-- 官网链接 -->
  <a class="btn-primary">👉 官网入口</a>
  
  <!-- 优惠码（如有） -->
  <div class="coupon">优惠码：HX2026</div>
  
  <!-- 核心优势 -->
  <ul class="features">
    <li>✅ Trojan协议+TLS 1.3加密</li>
    <li>✅ 60+全球优质节点</li>
    <li>✅ 完美解锁Netflix/Disney+</li>
  </ul>
  
  <!-- 推荐套餐 -->
  <div class="plans">
    <div class="plan">
      <span class="price">¥14.9/月</span>
      <span class="details">200GB · 300Mbps</span>
    </div>
  </div>
</div>
```

### 卡片样式
- 浅色模式：白色背景、浅灰边框、深色文字
- 深色模式：半透明玻璃背景、白色文字
- 悬停效果：阴影加深、向上移动 4px、过渡动画 200ms

---

## 🌓 深色/浅色模式切换

### 切换按钮设计
- 位置：右上角 Header 中
- 图标：☀️（浅色）/ 🌙（深色）
- 状态保存：localStorage
- 系统偏好：首次加载时检测系统主题

### 实现逻辑
```javascript
// 检测系统偏好
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// 从 localStorage 读取或使用系统偏好
const savedTheme = localStorage.getItem('theme');
const theme = savedTheme || (prefersDark.matches ? 'dark' : 'light');

// 应用主题
document.documentElement.classList.toggle('dark', theme === 'dark');
```

---

## 📋 导航设计

### Header 导航
- Logo（左）
- 首页链接
- About 链接
- 深色模式切换按钮（右）

### 目录导航
- **桌面端**：左侧固定侧边栏，240px 宽度
- **移动端**：抽屉式菜单，从右侧滑入

---

## 🔍 SEO 优化方案（基于 seo-review）

### Title Tag 优化

**首页 Title**：
```
机场推荐合集：21家优质机场节点评测与优惠码 | 机场推荐
```
- 长度：32 字符（符合 50-60 字符标准）
- 包含关键词：机场推荐、机场节点、优惠码
- 价值主张：21家优质、评测

**About 页面 Title**：
```
关于我们 | 机场推荐 - 优质机场节点评测平台
```

### Meta Description 优化

**首页 Meta Description**：
```
发现2026年最新机场推荐合集，深度评测21家优质机场节点服务。涵盖低价入门、性价比首选、高端专线等不同价位，包含Netflix解锁、ChatGPT支持、IEPL专线等特色功能，提供最新优惠码和购买建议。
```
- 长度：138 字符（符合 150-160 字符标准）
- 行动词：发现
- 包含关键词：机场推荐、机场节点、Netflix解锁、ChatGPT、IEPL专线、优惠码

**About 页面 Meta Description**：
```
机场推荐是一个专注于机场节点评测的独立平台，提供客观、真实的机场服务评测和购买建议。我们的使命是帮助用户选择最适合自己的机场服务。
```

### 结构化数据（JSON-LD）

#### BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "首页",
      "item": "https://jichangtuijian.github.io/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "关于我们",
      "item": "https://jichangtuijian.github.io/about.html"
    }
  ]
}
```

#### WebSite
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "机场推荐",
  "url": "https://jichangtuijian.github.io/",
  "description": "21家优质机场节点评测与优惠码汇总",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://jichangtuijian.github.io/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

#### Article（首页）
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "最新机场推荐合集｜21家机场节点订阅服务深度评测与优惠码汇总",
  "datePublished": "2026-01-26",
  "dateModified": "2026-01-26",
  "author": {
    "@type": "Person",
    "name": "机场推荐"
  },
  "publisher": {
    "@type": "Organization",
    "name": "机场推荐",
    "logo": {
      "@type": "ImageObject",
      "url": "https://jichangtuijian.github.io/logo.png"
    }
  }
}
```

### 语义化 HTML
- 使用 `<header>`、`<nav>`、`<main>`、`<article>`、`<section>`、`<footer>` 等语义化标签
- 每个页面只有一个 `<h1>` 标签
- 图片添加 `alt` 属性
- 链接使用描述性锚文本

---

## 📄 文件结构

```
jichangtuijian.github.io/
├── index.html              # 首页
├── about.html              # 关于页面
├── css/
│   └── style.css           # 样式文件
├── js/
│   ├── main.js             # 主逻辑
│   ├── theme.js            # 主题切换
│   └── navigation.js       # 导航逻辑
├── assets/
│   └── icons/              # SVG 图标
├── data/
│   └── airports.json       # 机场数据（JSON）
├── sitemap.xml             # 站点地图
├── robots.txt              # 爬虫规则
├── llms.txt                # AI 模型指令
├── .gitignore
└── README.md
```

---

## 🗺️ sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://jichangtuijian.github.io/</loc>
    <lastmod>2026-01-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://jichangtuijian.github.io/about.html</loc>
    <lastmod>2026-01-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## 🤖 robots.txt

```txt
User-agent: *
Allow: /

# Sitemap
Sitemap: https://jichangtuijian.github.io/sitemap.xml

# Disallow common paths
Disallow: /assets/
Disallow: /js/
Disallow: /css/
Disallow: /data/

# Crawl-delay (optional)
Crawl-delay: 1
```

---

## 🧠 llms.txt

```txt
# AI 模型指令文件

## 网站信息
- 网站名称: 机场推荐
- 网站URL: https://jichangtuijian.github.io/
- 网站类型: 机场节点评测与推荐平台
- 最后更新: 2026-01-26

## 内容说明
本网站提供21家优质机场服务的深度评测和推荐，包括：
- 低价入门级机场（8-15元/月）
- 性价比首选机场（15-30元/月）
- 大流量高端机场（30元以上/月）
- 特色功能机场（游戏专线、新疆可用等）
- 不限时流量包机场

## 数据来源
所有机场信息均来自各机场官方公开信息，经过实际使用验证后整理。

## 使用建议
- 首次使用建议选择月付低价套餐测试
- 长期使用建议使用年付+优惠码
- 新疆用户请选择支持新疆的机场
- 影音爱好者可选择提供EMBY服务的机场

## 免责声明
本内容仅供信息分享和入口指南，请合理使用网络服务，遵守相关法律法规。
```

---

## 📝 about.html 页面设计

### 页面结构
```html
<header>
  Logo + 导航 + 深色模式切换
</header>

<main>
  <section class="hero">
    <h1>关于我们</h1>
    <p>专注于机场节点评测的独立平台</p>
  </section>

  <section class="mission">
    <h2>我们的使命</h2>
    <p>提供客观、真实的机场服务评测和购买建议，帮助用户选择最适合自己的机场服务。</p>
  </section>

  <section class="values">
    <h2>我们的价值观</h2>
    <div class="value-cards">
      <div class="card">
        <h3>客观公正</h3>
        <p>所有评测基于实际使用体验，不收受任何形式的推广费用。</p>
      </div>
      <div class="card">
        <h3>持续更新</h3>
        <p>定期更新机场信息，确保推荐内容的时效性和准确性。</p>
      </div>
      <div class="card">
        <h3>用户至上</h3>
        <p>以用户需求为导向，提供实用的购买建议和使用技巧。</p>
      </div>
    </div>
  </section>

  <section class="contact">
    <h2>联系我们</h2>
    <p>如有任何问题或建议，欢迎通过以下方式联系我们：</p>
    <ul>
      <li>GitHub: https://github.com/jichangtuijian</li>
      <li>Email: contact@jichangtuijian.github.io</li>
    </ul>
  </section>
</main>

<footer>
  版权声明 + 链接
</footer>
```

---

## ✅ 实现检查清单

### 视觉质量
- [ ] 无表情符号作为图标（使用 SVG）
- [ ] 所有图标来自一致的图标集（Heroicons/Lucide）
- [ ] 悬停状态不会导致布局偏移
- [ ] 使用主题颜色直接（bg-primary）而非 var() 包装

### 交互
- [ ] 所有可点击元素都有 cursor-pointer
- [ ] 悬停状态提供清晰的视觉反馈
- [ ] 过渡动画流畅（150-300ms）
- [ ] 键盘导航可见焦点状态

### 深色/浅色模式
- [ ] 浅色模式文本对比度足够（4.5:1 最小值）
- [ ] 玻璃/透明元素在浅色模式下可见
- [ ] 边框在两种模式下都可见
- [ ] 交付前测试两种模式

### 布局
- [ ] 浮动元素有适当的边缘间距
- [ ] 内容不会隐藏在固定导航栏后面
- [ ] 在 375px、768px、1024px、1440px 下响应式
- [ ] 移动端无水平滚动

### 可访问性
- [ ] 所有图片都有 alt 文本
- [ ] 表单输入有标签
- [ ] 颜色不是唯一的指示器
- [ ] 尊重 prefers-reduced-motion

### SEO
- [ ] Title 标签 50-60 字符，包含关键词和钩子
- [ ] Meta 描述 150-160 字符，包含行动词
- [ ] 主关键词在标题、描述、前 100 词、H2 中
- [ ] 每页单个 H1（仅标题）
- [ ] URL slug 包含主关键词
- [ ] 结构化数据（JSON-LD）
- [ ] sitemap.xml
- [ ] robots.txt
- [ ] 内部链接优化

---

## 🚀 部署说明

1. 创建 GitHub 仓库：jichangtuijian.github.io
2. 推送代码到仓库
3. GitHub Pages 自动从 main 分支部署
4. 访问 https://jichangtuijian.github.io/

---

**设计完成时间**：2026-01-27
