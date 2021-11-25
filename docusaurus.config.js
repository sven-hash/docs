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
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X',
      crossorigin: 'anonymous',
    }
  ],
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en', 'es'],
  // },
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
      switchConfig: {
        darkIcon: '☽',
        darkIconStyle: {
          marginLeft: '1px',
        },
        lightIcon: '☼',
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
        href: 'https://nymtech.net'
      },
      items: [
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
        },
        {to: '/docs/0.11.0/intro', label: 'Docs', position: 'left'},
        {
          href: 'https://github.com/nymtech',
          label: 'GitHub',
          position: 'right',
        },
        // temporarily commenting this out: awaiting translation update 
        // { 
        //   type: 'localeDropdown',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          items: [
            {
              label: 'Website',
              href: 'https://nymtech.net/'
            },
            {
              label: 'Keybase',
              href: 'https://keybase.io/team/nymtech.friends',
            },
            
          ],
        },
        {
          items: [
            {
              href: 'https://github.com/nymtech',
              label: 'GitHub',
              position: 'right',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/nymchan',
            },
          ],
        },
        {
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/nymproject/',
            },
            {
              label: 'Blog',
              href: 'https://medium.com/nymtech',
            },
          ]
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
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs',
          showLastUpdateTime: true,
          disableVersioning: false,
          includeCurrentVersion: true,
          lastVersion: undefined,
          versions: {
            current: {
              label: '🚧 current 🚧',
              path: 'current',
              banner: 'unreleased',
            },
            '0.11.0': {
              label: 'v0.11.0',
              path: '0.11.0',
              banner: 'none',
            },
          },
          remarkPlugins: [import('remark-math')],
          rehypePlugins: [import('rehype-katex')],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
