module.exports = {
  siteTitle: 'よしかわーるど',
  siteDescription: '情報系大学生が新しい世界を作る',
  authorName: 'Yoshikawa Taiki',
  twitterUsername: 'yoshikawataiki',
  authorAvatar: 'avatar.jpeg', // file in content/images
  defaultLang: 'ja', // show flag if lang is not default. Leave empty to enable flags in post lists
  authorDescription: `
  For the last decade, Maxence Poutord has worked with a variety of web technologies. He is currently focused on front-end development.
  On his day to day job, he is working as a senior front-end engineer at VSware. He is also an occasional tech speaker and a mentor.
  As a digital nomad, he is living where the WiFi and sun are 😎 <br>
  Do you want to know more? <a href="https://www.maxpou.fr/about" target="_blank">Visit my website!</a>
  `,
  siteUrl: 'https://yoshikawa.dev/',
  disqusSiteUrl: 'https://yoshikawa.dev/',
  // Prefixes all links. For cases when deployed to maxpou.fr/gatsby-starter-morning-dew/
  pathPrefix: '', // Note: it must *not* have a trailing slash.
  siteCover: 'cover-baymax.jpeg', // file in content/images
  googleAnalyticsId: 'UA-87746836-1',
  background_color: '#ffffff',
  theme_color: '#222222',
  display: 'standalone',
  icon: 'content/images/baymax.png',
  postsPerPage: 6,
  disqusShortname: 'yoshikawataiki',
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
          url: 'https://www.youtube.com/channel/UCyh8xiVW6ck473ht6Dav2VA?sub_confirmation=1',
        },
        {
          label: 'Twitter',
          url: 'https://twitter.com/yoshikawataiki',
        },
      ],
    },
  ],
}
