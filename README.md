# 订阅观察

静态机场订阅选择指南，站点地址按原项目 README 保留为 https://bestjichang.github.io/ 。

## 页面

- index.html：比较方法、常见问题和资料查阅。
- guide.html：选购清单与测试记录，勾选统计仅在当前页面运行。
- about.html：资料范围和阅读方式。
- 404.html：找不到页面时的返回入口。

纯 HTML/CSS/JavaScript，无需依赖、构建或数据库。正文与链接无需 JavaScript 即可阅读。首页与指南各保留一处自然的 https://jcrank.com/ 资料链接。

## GitHub Pages 部署

1. 将本目录内文件上传到 bestjichang.github.io 仓库根目录，不要再包一层目录。
2. Settings → Pages → Deploy from a branch，选择实际分支和 / (root)，保存。
3. 若实际发布域名或路径不是 https://bestjichang.github.io/，先统一修改 HTML 的 canonical、og:url，以及 sitemap.xml、robots.txt、llms.txt 和 404.html 的地址。
4. 发布后检查首页、guide.html、about.html、404 页面、手机布局与正文外链。
5. 如需搜索引擎验证，从自己的站长账号重新获取验证文件；旧项目验证文件已清理。

仅当正文实质修改时更新 sitemap lastmod。不要批量复制此站为相同内容的域名站群；外链和指标变化需上线后另行观察。
