module.exports = {
  sidebar: [
    "introduction",
    {
      type: "category",
      label: "Architecture",
      collapsed: true,
      items: [
        "architecture/network-overview",
        "architecture/traffic-flow",
        "architecture/loopix",
        "architecture/nym-other-systems",
        // "architecture/incentives",
        // "architecture/network-rewards"
        // "architecture/links",
      ],
    },
    {
      type: "category",
      label: "Quick Start",
      collapsed: true,
      items: [
        "quickstart/overview",
        "quickstart/socks5",
        "quickstart/nym-connect",
      ],
    },
    {
      type: "category",
      label: "Integrations",
      collapsed: true,
      items: [
        "integrations/overview",
        "integrations/mixnet-integration-overview",
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
        "integrations/payment-integration-overview" // this needs a rework, excluding for the moment 
      ],
    },
    {
      type: "category",
      label: "Run Nodes",
      collapsed: true,
      items: [
        // "mixnet-infrastructure/incentives", //moved to architecture 
        "run-nodes/pre-built-binaries",
        "run-nodes/build-nym",
        {
          type: "category",
          label: "Nodes",
          collapsed: true,
          items: [
            "run-nodes/nodes/mixnodes",
            "run-nodes/nodes/troubleshooting",
            "run-nodes/nodes/gateways",
            "run-nodes/nodes/requester",
            "run-nodes/nodes/file-storage",
            "run-nodes/nodes/validators",
            "run-nodes/nodes/rpc-node",
            "run-nodes/nodes/network-explorer"
          ],
        },
      "run-nodes/network-rewards",
      ],
    },
    "wallet",
    "nym-cli",
    "coconut",
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
