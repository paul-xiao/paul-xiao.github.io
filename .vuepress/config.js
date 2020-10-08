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
    ],
    [
      "script",
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?1aa269616ba669c5073e38f431ecbfe4";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
        `
    ],
    //不蒜子
    [
      "script",
      {
        async: true,
        src: "//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"
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
    footNav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog' },
      { text: 'Gallery', link: '/gallery' },
      { text: 'About', link: '/about' }
    ],
    displayAllHeaders: true,
    sidebar: 'auto',
    companyName: 'Company name'
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
    ['@vuepress/blog', {
      directories: [
        {
          id: 'post',
          dirname: '_posts',
          path: '/',
          pagination: {
            perPagePosts: 2,
          },
          frontmatter:{ //Front matter for entry page.
            comment: false
          },
          layout: 'Home',
          itemLayout: 'Layout',
        },
      ],
    }],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }],
    // [
    //   'vuepress-plugin-comment',
    //   {
    //     choosen: 'valine', 
    //     // options选项中的所有参数，会传给Valine的配置
    //     options: {
    //       el: '#valine-vuepress-comment',
    //       appId: 'DL6xLRPiyl7jbfePYNNM2mFv-gzGzoHsz',
    //       appKey: 'tJQrcE9KKCzYS8NFr4NokDzN',
    //       path: '<%- frontmatter.to.path %>',
    //       visitor: true // 阅读量统计
    //     }
    //   }
    // ]
  ],
  globalUIComponents: []
}