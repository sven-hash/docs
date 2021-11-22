module.exports = {
  sidebar: [
    'intro', 
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
        "run-nym-nodes/index",
        "run-nym-nodes/incentives",
        "run-nym-nodes/build-nym",
        "run-nym-nodes/mixnodes",
        "run-nym-nodes/validators",
        "run-nym-nodes/requester",
        "run-nym-nodes/gateways",
        "run-nym-nodes/troubleshooting",
      ],
    },
    'nym-apps/wallet', 
    // 'nym-apps/network-explorer', // TODO fix build instructions 
    {
      type: 'category',
      label: 'Build Nym Apps',
      collapsed: true,
      items: [
        "build-apps/build-apps",
        "build-apps/choose-a-client",
        "build-apps/websocket-client",
        // "build-apps/wasm-client", // temporarily commented out awaiting update 
        "build-apps/demos"
      ],
    },
    {
      type: 'category',
      label: 'Use External Apps',
      collapsed: true,
      items: [
        "use-apps/index",
        "use-apps/blockstream-green",
        "use-apps/keybase"
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

