module.exports = {
  sidebar: [
    "overview",
    {
      type: "category",
      label: "Architecture",
      collapsed: true,
      items: [
        "architecture/network-overview",
        "architecture/traffic-flow",
        "architecture/loopix",
        "architecture/nym-other-systems"
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
        "integrations/payment-integration-overview" 
      ],
    },
    {
      type: "category",
      label: "Run Nodes",
      collapsed: true,
      items: [
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
            "run-nym-nodes/nodes/rpc-node",
            "run-nym-nodes/nodes/network-explorer"
          ],
        },
      "run-nym-nodes/network-rewards",
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
    "glossary",
    "links"
  ],
};
