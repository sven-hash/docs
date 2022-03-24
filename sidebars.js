module.exports = {
  sidebar: [
    {
      type: 'category',
      label: 'Overview',
      collapsed: true,
      items: [
        "overview/index",
        "overview/nym-platform",
        "overview/network-privacy",
        "overview/nym-other-systems",
        "overview/private-access-control",
        "overview/links"
      ],
    }, 
    {
      type: 'category',
      label: 'Run Nym Nodes',
      collapsed: true,
      items: [
        "run-nym-nodes/incentives",
        // "run-nym-nodes/network-rewards",
        "run-nym-nodes/pre-built-binaries",
        "run-nym-nodes/build-nym",
        {
          type: 'category',
          label: 'Nodes',
          collapsed: true,
          items: [
            "run-nym-nodes/nodes/mixnodes",
            "run-nym-nodes/nodes/troubleshooting",
            "run-nym-nodes/nodes/gateways",
            "run-nym-nodes/nodes/validators",
            "run-nym-nodes/nodes/requester",
            "run-nym-nodes/nodes/file-storage"
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Use Nym apps',
      collapsed: true,
      items: [
        'nym-apps/wallet', 
        'nym-apps/network-explorer'
      ],
    },
    {
      type: 'category',
      label: 'Develop Nym Apps',
      collapsed: true,
      items: [
        "develop-with-nym/overview",
        "develop-with-nym/choose-a-client",
        "develop-with-nym/websocket-client",
        "develop-with-nym/socks5-client",
        "develop-with-nym/wasm-client", 
        "develop-with-nym/addresses-in-nym",
        // "develop-with-nym/demos"
      ],
    },
    {
      type: 'category',
      label: 'Use External Apps',
      collapsed: true,
      items: [
        "use-external-apps/index",
        "use-external-apps/blockstream-green",
        "use-external-apps/keybase"
      ],
    },
    {
      type: 'category',
      label: 'Community',
      collapsed: true,
      items: [
        "community/index",
        "community/code-of-conduct",
        "community/licensing"
      ],
    },
  ]
};

