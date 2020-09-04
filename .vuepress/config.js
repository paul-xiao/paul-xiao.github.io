module.exports = {
  title: `Paul's Blog`,
  description: 'Just playing around',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],//chrome状态栏颜色
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],//删除默认的苹果工具栏和菜单栏。
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }], //作用是控制状态栏显示样式
    ['link', { rel: 'apple-touch-icon', href: '/logo.png' }],//ios桌面图标
    ['link', { rel: 'mask-icon', href: '/logo.png', color: '#3eaf7c' }], //safari-pinned-tab
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }], //win8磁贴图像
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],//Windows 8 磁贴颜色
    ["script",
    {
      "data-ad-client": "ca-pub-2300280771526991",
      async: true,
      src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    }
  ]
  ],
  themeConfig: {
    // logo: '/assets/img/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog' },
      { text: 'Gallery', link: '/gallery' },
      { text: 'About', link: '/about' }
    ],
    displayAllHeaders: true,
    sidebar: 'auto'
  },
  plugins: [
    '@vuepress/last-updated',
    '@vuepress/nprogress',
    '@vuepress/back-to-top',
    ['@vuepress/medium-zoom', {
      selector: '.theme-content :not(a) > img',
      // medium-zoom options here
      // See: https://github.com/francoischalifour/medium-zoom#options
      options: {
        margin: 16,
        background: '#000',
      }
    }],
    ['@vuepress/blog',{
      directories: [
        {
          id: 'post',
          dirname: '_posts',
          path: '/',
          pagination: {
            perPagePosts: 2,
          },
          layout: 'Home',
          itemLayout: 'Layout',
        },
      ],
    }],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
  }]
  ],
  globalUIComponents: []
}