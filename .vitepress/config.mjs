import { defineConfig } from 'vitepress'
import { set_sidebar } from "./utils/auto_sidebar.mjs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "羊鱼串的文档站",
  description: "羊鱼串的文档站",
  base: "/yyz-knowledge/",
  head: [["link", { rel: "icon", href: "/yyz-knowledge/logo.jpg" }]],
  markdown:{
    math:true,
    lineNumbers: true
  },
  themeConfig: {
    outlineTitle: "文章目录",
    outline: [2, 6],
    logo: "logo.jpg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '示例页', link: '/markdown-examples' },
      { text: '点云', link: '/point-cloud/' },
      { text: '深度学习', link: '/deep-learning/' },
      { text: 'Python', items: [
        { text: '基础', link: '/python/base/' },
        { text: '进阶', link: '/python/advanced/' },
      ] },
    ],
    sidebar: { 
      '/point-cloud/': set_sidebar('/point-cloud'),
      '/python/base/': set_sidebar('/python/base/'),
      '/python/advanced/': set_sidebar('/python/advanced/'),
      '/deep-learning/': set_sidebar('/deep-learning/'),
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    footer: {
      copyright: "Copyright@ 2024 羊鱼串"
    },
    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
  }
})
