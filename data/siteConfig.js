module.exports = {
  siteTitle: 'よしかわーるど',
  siteDescription: '2022年卒の情報系大学生がIT分野で奮闘するブログです。GoやRust, Reactなどを書いているので、OSS活動や研究に関することをまとめます。',
  authorName: 'Yoshikawa Taiki',
  twitterUsername: 'yoshikawataiki',
  authorAvatar: 'avatar.jpg', // file in content/images
  defaultLang: 'ja', // show flag if lang is not default. Leave empty to enable flags in post lists
  authorDescription: `
  モバイルネットワークについて研究をしている。現在、ネットワークが抱えている問題を解決するための技術を研究室独自で開発中。
  高校からの親友と2021年に起業することを決めている。また、2021年に自身の会社を立ち上げる予定である。
  `,
  siteUrl: 'https://yoshikawa.dev',
  siteCover: 'cover.jpg', // file in content/images
  background_color: '#00232a',
  theme_color: '#222222',
  display: 'standalone',
  icon: 'content/images/icon.png',
  postsPerPage: 6,
  headerTitle: 'よしかわーるど',
  headerLinksIcon: '', //  (leave empty to disable: '')
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
          rel: 'external',
        },
        {
          label: 'Twitter',
          url: 'https://twitter.com/yoshikawataiki',
          rel: 'external',
        },
      ],
    },
  ],
}
