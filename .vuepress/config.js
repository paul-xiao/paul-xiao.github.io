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