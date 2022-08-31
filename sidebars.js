module.exports = {
  sidebar: [
    {
      type: "category",
      label: "Overview",
      collapsed: true,
      items: [
        "overview/index",
        "overview/nym-platform",
        "overview/network-privacy",
        "overview/nym-other-systems",
        "overview/private-access-control",
        "overview/links",
      ],
    },
    {
      type: "category",
      label: "Quick Start",
      collapsed: true,
      items: [
        "quickstart/introduction",
        "quickstart/nym-connect",
        "quickstart/sock5",
      ],
    },
    {
      type: "category",
      label: "Developers",
      collapsed: true,
      items: [
        "developers/getting-started",
        {
          type: "category",
          label: "Nym Mixnet",
          collapsed: true,
          items: [
            "developers/develop-with-nym/understanding-nym-apps",
            "developers/develop-with-nym/anatomy-of-nym-apps",
            "developers/develop-with-nym/choose-a-client",
            {
              type: "category",
              label: "Clients",
              collapsed: true,
              items: [
                "developers/develop-with-nym/websocket-client",
                "developers/develop-with-nym/socks5-client",
                "developers/develop-with-nym/wasm-client",
              ],
            },
            "developers/develop-with-nym/addresses-in-nym",
            "developers/develop-with-nym/demos",
          ],
        },
        {
          type: "category",
          label: "Nyx Blockchain",
          collapsed: true,
          items: ["developers/develop-with-nyx/overview"],
        },
        "developers/integrations",
      ],
    },
    {
      type: "category",
      label: "Node Operators",
      collapsed: true,
      items: [
        "run-nym-nodes/incentives",
        "run-nym-nodes/pre-built-binaries",
        "run-nym-nodes/build-nym",
        {
          type: "category",
          label: "Nodes",
          collapsed: true,
          items: [
            "run-nym-nodes/nodes/mixnodes",
            "run-nym-nodes/nodes/troubleshooting",
            "run-nym-nodes/nodes/gateways",
            "run-nym-nodes/nodes/requester",
            "run-nym-nodes/nodes/file-storage",
            "run-nym-nodes/nodes/validators",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Applications",
      collapsed: "true",
      items: [
        {
          type: "category",
          label: "Nym apps",
          collapsed: true,
          items: ["nym-apps/wallet", "nym-apps/network-explorer"],
        },
        {
          type: "category",
          label: "Connect Apps",
          collapsed: true,
          items: ["use-external-apps/index", "use-external-apps/examples"],
        },
      ],
    },
    {
      type: "category",
      label: "Community",
      collapsed: true,
      items: [
        "community/index",
        "community/code-of-conduct",
        "community/licensing",
      ],
    },
  ],
};
