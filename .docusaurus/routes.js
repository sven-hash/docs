
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug','3d6'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config','914'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content','c28'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData','3cf'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata','31b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry','0da'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes','244'),
    exact: true
  },
  {
    path: '/docs/next',
    component: ComponentCreator('/docs/next','55d'),
    routes: [
      {
        path: '/docs/next/build-apps/build-apps',
        component: ComponentCreator('/docs/next/build-apps/build-apps','924'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/build-apps/choose-a-client',
        component: ComponentCreator('/docs/next/build-apps/choose-a-client','b39'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/build-apps/demos',
        component: ComponentCreator('/docs/next/build-apps/demos','352'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/build-apps/wasm-client',
        component: ComponentCreator('/docs/next/build-apps/wasm-client','c24'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/build-apps/websocket-client',
        component: ComponentCreator('/docs/next/build-apps/websocket-client','620'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/community/code-of-conduct',
        component: ComponentCreator('/docs/next/community/code-of-conduct','5a2'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/community/index',
        component: ComponentCreator('/docs/next/community/index','80c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/community/licensing',
        component: ComponentCreator('/docs/next/community/licensing','615'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/intro',
        component: ComponentCreator('/docs/next/intro','e88'),
        exact: true
      },
      {
        path: '/docs/next/overview/index',
        component: ComponentCreator('/docs/next/overview/index','f60'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/overview/links',
        component: ComponentCreator('/docs/next/overview/links','3c0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/overview/network-privacy',
        component: ComponentCreator('/docs/next/overview/network-privacy','3fb'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/overview/nym-other-systems',
        component: ComponentCreator('/docs/next/overview/nym-other-systems','b52'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/overview/nym-platform',
        component: ComponentCreator('/docs/next/overview/nym-platform','bb8'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/overview/private-access-control',
        component: ComponentCreator('/docs/next/overview/private-access-control','913'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/run-nym-nodes/build-nym',
        component: ComponentCreator('/docs/next/run-nym-nodes/build-nym','65e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/run-nym-nodes/gateways',
        component: ComponentCreator('/docs/next/run-nym-nodes/gateways','2d0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/run-nym-nodes/incentives',
        component: ComponentCreator('/docs/next/run-nym-nodes/incentives','e3b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/run-nym-nodes/index',
        component: ComponentCreator('/docs/next/run-nym-nodes/index','5ff'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/run-nym-nodes/mixnodes',
        component: ComponentCreator('/docs/next/run-nym-nodes/mixnodes','cd7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/run-nym-nodes/requester',
        component: ComponentCreator('/docs/next/run-nym-nodes/requester','b4f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/run-nym-nodes/troubleshooting',
        component: ComponentCreator('/docs/next/run-nym-nodes/troubleshooting','1c5'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/run-nym-nodes/validators',
        component: ComponentCreator('/docs/next/run-nym-nodes/validators','c7e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/use-apps/blockstream-green',
        component: ComponentCreator('/docs/next/use-apps/blockstream-green','2af'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/use-apps/electrum',
        component: ComponentCreator('/docs/next/use-apps/electrum','599'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/use-apps/index',
        component: ComponentCreator('/docs/next/use-apps/index','b68'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/next/use-apps/keybase',
        component: ComponentCreator('/docs/next/use-apps/keybase','53f'),
        exact: true,
        'sidebar': "sidebar"
      }
    ]
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs','d6d'),
    routes: [
      {
        path: '/docs/build-apps/build-apps',
        component: ComponentCreator('/docs/build-apps/build-apps','507'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/build-apps/choose-a-client',
        component: ComponentCreator('/docs/build-apps/choose-a-client','13e'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/build-apps/demos',
        component: ComponentCreator('/docs/build-apps/demos','189'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/build-apps/wasm-client',
        component: ComponentCreator('/docs/build-apps/wasm-client','4ff'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/build-apps/websocket-client',
        component: ComponentCreator('/docs/build-apps/websocket-client','506'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/community/code-of-conduct',
        component: ComponentCreator('/docs/community/code-of-conduct','91b'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/community/index',
        component: ComponentCreator('/docs/community/index','54f'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/community/licensing',
        component: ComponentCreator('/docs/community/licensing','95f'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/intro',
        component: ComponentCreator('/docs/intro','42a'),
        exact: true
      },
      {
        path: '/docs/overview/index',
        component: ComponentCreator('/docs/overview/index','7b1'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/overview/links',
        component: ComponentCreator('/docs/overview/links','f15'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/overview/network-privacy',
        component: ComponentCreator('/docs/overview/network-privacy','6eb'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/overview/nym-other-systems',
        component: ComponentCreator('/docs/overview/nym-other-systems','921'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/overview/nym-platform',
        component: ComponentCreator('/docs/overview/nym-platform','062'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/overview/private-access-control',
        component: ComponentCreator('/docs/overview/private-access-control','6a1'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/run-nym-nodes/build-nym',
        component: ComponentCreator('/docs/run-nym-nodes/build-nym','344'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/run-nym-nodes/gateways',
        component: ComponentCreator('/docs/run-nym-nodes/gateways','2f4'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/run-nym-nodes/incentives',
        component: ComponentCreator('/docs/run-nym-nodes/incentives','5c7'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/run-nym-nodes/index',
        component: ComponentCreator('/docs/run-nym-nodes/index','2d1'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/run-nym-nodes/mixnodes',
        component: ComponentCreator('/docs/run-nym-nodes/mixnodes','8c4'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/run-nym-nodes/requester',
        component: ComponentCreator('/docs/run-nym-nodes/requester','ff9'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/run-nym-nodes/troubleshooting',
        component: ComponentCreator('/docs/run-nym-nodes/troubleshooting','d5b'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/run-nym-nodes/validators',
        component: ComponentCreator('/docs/run-nym-nodes/validators','046'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/use-apps/blockstream-green',
        component: ComponentCreator('/docs/use-apps/blockstream-green','621'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/use-apps/electrum',
        component: ComponentCreator('/docs/use-apps/electrum','629'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/use-apps/index',
        component: ComponentCreator('/docs/use-apps/index','db5'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/use-apps/keybase',
        component: ComponentCreator('/docs/use-apps/keybase','027'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
