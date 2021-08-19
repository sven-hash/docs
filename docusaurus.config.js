const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Nym Docs',
  tagline: '',
  url: 'https://nymtech.net',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/docs/FAVICON.png',
  organizationName: 'nymtech', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  themeConfig: {
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
          dropdownItemsAfter: [{to: '/versions', label: 'All versions'}],
          dropdownActiveClassDisabled: true,
        },
        {to: '/docs/overview/index', label: 'Docs', position: 'left'},
        {
          href: 'https://github.com/nymtech',
          label: 'GitHub',
          position: 'right',
        },
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
      // copyright: `© ${new Date().getFullYear()} Nym Technologies SA, all rights reserved`,
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
          // homePageId: "/"
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
