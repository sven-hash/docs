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
        "run-nym-nodes/pre-built-binaries",
        "run-nym-nodes/incentives",
        "run-nym-nodes/build-nym",
        "run-nym-nodes/mixnodes",
        "run-nym-nodes/troubleshooting",
        "run-nym-nodes/requester",
        "run-nym-nodes/gateways",
        "run-nym-nodes/validators",
      ],
    },
    'network-rewards',
    {
      type: 'category',
      label: 'Use Nym apps',
      collapsed: true,
      items: [
        'nym-apps/wallet', 
        'nym-apps/network-explorer',  
      ],
    },
    {
      type: 'category',
      label: 'Build Nym Apps',
      collapsed: true,
      items: [
        "build-apps/build-apps",
        "build-apps/choose-a-client",
        "build-apps/websocket-client",
        // "build-apps/wasm-client",
        "build-apps/demos"
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

