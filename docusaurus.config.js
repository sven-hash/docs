const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Nym Docs',
  tagline: '',
  url: 'https://nymtech.net',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/docs/FAVICON.png',
  organizationName: 'nymtech',
  projectName: 'docs',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'], 
  },
  themeConfig: {
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 5,
    },
    algolia: {
      appId: 'MNH5MI8L6O',
      apiKey: '7b2a5d8b8ade99dd41c95a9537dd3fbf',
      indexName: 'nymtech',
      contextualSearch: true,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
      switchConfig: {
        darkIcon: '🌙',
        darkIconStyle: {
          marginLeft: '1px',
        },
        lightIcon: '☀️',
        lightIconStyle: {
          marginLeft: '1px',
        },
      },
    },
    navbar: {
      title: 'Nym',
      logo: {
        alt: 'Nym Logo',
        src: 'img/docs/FAVICON.png',
        href: 'https://nymtech.net', 
        srcDark: 'img/docs/FAVICON_DARK.png'
      },
      items: [
        { 
          to: '/docs/stable/overview/', // this obviously needs to be created
          label: 'Docs', 
          position: 'left' 
        },
        // {
        //   to: 'https://developers.nymtech.net', 
        //   label: 'Developer Portal', 
        //   position: 'left'
        // },
        { 
          href: 'https://shipyard.nymtech.net', 
          label: 'Shipyard (Grants)', 
          position: 'left'
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
        },
        { 
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/nymtech',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs',
          showLastUpdateTime: true,
          disableVersioning: false,
          includeCurrentVersion: true,
          lastVersion: undefined,
          versions: {
            current: {
              label: 'Next (unreleased)',
              path: 'next',
              banner: 'unreleased',
            },
            'stable': {
              label: 'v1.1.0 (stable)',
              path: 'stable',
              banner: 'none',
            },
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
