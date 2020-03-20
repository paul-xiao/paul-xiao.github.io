module.exports = {
  title: `Paul's Blog`,
  description: 'Just playing around',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    // logo: '/assets/img/logo.png',
    nav: [
      { text: 'Archives', link: '/archives' },
      { text: 'Tags', link: '/tags' },
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
    }]
  ],
  globalUIComponents: []
}