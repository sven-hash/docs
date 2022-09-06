module.exports = {
  sidebar: [
    "introduction",
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
      label: "Mixnet Architecture",
      collapsed: true,
      items: [
        "mixnet-architecture/network-overview",
        "mixnet-architecture/data-flow",
        "mixnet-architecture/loopix",
        "mixnet-architecture/nym-other-systems",
        "mixnet-architecture/links",
      ],
    },
    "coconut",
    {
      type: "category",
      label: "Integrations",
      collapsed: true,
      items: [
        "integrations/getting-started",
        {
          type: "category",
          label: "Nym Mixnet",
          collapsed: true,
          items: [
            "integrations/understanding-nym-apps",
            "integrations/anatomy-of-nym-apps",
            "integrations/choose-a-client",
            {
              type: "category",
              label: "Clients",
              collapsed: true,
              items: [
                "integrations/websocket-client",
                "integrations/socks5-client",
                "integrations/wasm-client",
              ],
            },
            "integrations/addresses-in-nym",
            "integrations/demos",
            "integrations/integrating-for-payments"
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Mixnet Nodes",
      collapsed: true,
      items: [
        "mixnet-infrastructure/incentives",
        "mixnet-infrastructure/pre-built-binaries",
        "mixnet-infrastructure/build-nym",
        {
          type: "category",
          label: "Nodes",
          collapsed: true,
          items: [
            "mixnet-infrastructure/nodes/mixnodes",
            "mixnet-infrastructure/nodes/troubleshooting",
            "mixnet-infrastructure/nodes/gateways",
            "mixnet-infrastructure/nodes/requester",
            "mixnet-infrastructure/nodes/file-storage",
            "mixnet-infrastructure/nodes/validators",
          ],
        },
        {
          type: "category", 
          label: "Nym Apps", 
          collapsed: true, 
          items: [
            "mixnet-infrastructure/nym-apps/network-explorer", 
            "mixnet-infrastructure/nym-apps/wallet"
          ]
        }
      ],
    },
    {
      type: "category",
      label: "Applications",
      collapsed: "true",
      items: [
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
