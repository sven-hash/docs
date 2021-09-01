
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
    path: '/docs/0.11.0',
    component: ComponentCreator('/docs/0.11.0','c55'),
    routes: [
      {
        path: '/docs/0.11.0/build-apps/build-apps',
        component: ComponentCreator('/docs/0.11.0/build-apps/build-apps','f07'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/build-apps/choose-a-client',
        component: ComponentCreator('/docs/0.11.0/build-apps/choose-a-client','653'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/build-apps/demos',
        component: ComponentCreator('/docs/0.11.0/build-apps/demos','b2a'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/build-apps/wasm-client',
        component: ComponentCreator('/docs/0.11.0/build-apps/wasm-client','267'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/build-apps/websocket-client',
        component: ComponentCreator('/docs/0.11.0/build-apps/websocket-client','946'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/community/code-of-conduct',
        component: ComponentCreator('/docs/0.11.0/community/code-of-conduct','87c'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/community/index',
        component: ComponentCreator('/docs/0.11.0/community/index','42e'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/community/licensing',
        component: ComponentCreator('/docs/0.11.0/community/licensing','77d'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/intro',
        component: ComponentCreator('/docs/0.11.0/intro','ac9'),
        exact: true
      },
      {
        path: '/docs/0.11.0/overview/index',
        component: ComponentCreator('/docs/0.11.0/overview/index','8ff'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/overview/links',
        component: ComponentCreator('/docs/0.11.0/overview/links','56c'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/overview/network-privacy',
        component: ComponentCreator('/docs/0.11.0/overview/network-privacy','921'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/overview/nym-other-systems',
        component: ComponentCreator('/docs/0.11.0/overview/nym-other-systems','34d'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/overview/nym-platform',
        component: ComponentCreator('/docs/0.11.0/overview/nym-platform','9f1'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/overview/private-access-control',
        component: ComponentCreator('/docs/0.11.0/overview/private-access-control','d91'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/run-nym-nodes/build-nym',
        component: ComponentCreator('/docs/0.11.0/run-nym-nodes/build-nym','165'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/run-nym-nodes/gateways',
        component: ComponentCreator('/docs/0.11.0/run-nym-nodes/gateways','f31'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/run-nym-nodes/incentives',
        component: ComponentCreator('/docs/0.11.0/run-nym-nodes/incentives','5d6'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/run-nym-nodes/index',
        component: ComponentCreator('/docs/0.11.0/run-nym-nodes/index','2a3'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/run-nym-nodes/mixnodes',
        component: ComponentCreator('/docs/0.11.0/run-nym-nodes/mixnodes','188'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/run-nym-nodes/requester',
        component: ComponentCreator('/docs/0.11.0/run-nym-nodes/requester','6e9'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/run-nym-nodes/troubleshooting',
        component: ComponentCreator('/docs/0.11.0/run-nym-nodes/troubleshooting','1e7'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/run-nym-nodes/validators',
        component: ComponentCreator('/docs/0.11.0/run-nym-nodes/validators','c22'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/use-apps/blockstream-green',
        component: ComponentCreator('/docs/0.11.0/use-apps/blockstream-green','e02'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/use-apps/electrum',
        component: ComponentCreator('/docs/0.11.0/use-apps/electrum','58c'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/use-apps/index',
        component: ComponentCreator('/docs/0.11.0/use-apps/index','65c'),
        exact: true,
        'sidebar': "version-0.11.0/sidebar"
      },
      {
        path: '/docs/0.11.0/use-apps/keybase',
        component: ComponentCreator('/docs/0.11.0/use-apps/keybase','460'),
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
