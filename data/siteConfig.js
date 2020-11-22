module.exports = {
  siteTitle: 'よしかわーるど',
  siteDescription: '情報系大学生が新しい世界を作る',
  authorName: 'Yoshikawa Taiki',
  twitterUsername: 'yoshikawataiki',
  authorAvatar: 'avatar.jpeg', // file in content/images
  defaultLang: 'ja', // show flag if lang is not default. Leave empty to enable flags in post lists
  authorDescription: `
  モバイルネットワークについて研究をしている。現在、ネットワークが抱えている問題を解決するための技術を研究室独自で開発中。
  高校からの親友と2020年に起業することを決めている。また、2020年に自身の会社を立ち上げる予定である。
  `,
  siteUrl: 'https://yoshikawa.dev/',
  disqusSiteUrl: 'https://yoshikawa.dev/',
  // Prefixes all links. For cases when deployed to maxpou.fr/gatsby-starter-morning-dew/
  siteCover: 'cover-baymax.jpeg', // file in content/images
  googleAnalyticsId: 'UA-87746836-1',
  background_color: '#ffffff',
  theme_color: '#222222',
  display: 'standalone',
  icon: 'content/images/baymax.png',
  postsPerPage: 6,
  disqusShortname: 'yoshikawa',
  headerTitle: 'よしかわーるど',
  headerLinksIcon: 'baymax.png', //  (leave empty to disable: '')
  headerLinks: [
    {
      label: 'Blog',
      url: '/',
    },
    {
      label: 'About',
      url: '/about',
    },
    {
      label: 'Works',
      url: '/works',
    },
  ],
  // Footer information (ex: Github, Netlify...)
  websiteHost: {
    name: 'GitHub',
    url: 'https://github.com',
  },
  footerLinks: [
    {
      sectionName: 'Explore',
      links: [
        {
          label: 'Blog',
          url: '/',
        },
        {
          label: 'About',
          url: '/about',
        },
        {
          label: 'Works',
          url: '/works',
        },
      ],
    },
    {
      sectionName: 'Follow the author',
      links: [
        {
          label: 'GitHub',
          url: 'https://github.com/yoshikawa',
        },
        {
          label: 'YouTube',
          url:
            'https://www.youtube.com/channel/UCyh8xiVW6ck473ht6Dav2VA?sub_confirmation=1',
        },
        {
          label: 'Twitter',
          url: 'https://twitter.com/yoshikawataiki',
        },
      ],
    },
  ],
}
