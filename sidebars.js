/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

 module.exports = {
  sidebar: {
    // intro.md needs to be included somewhere 
    "Overview": [
      "overview/index",
      "overview/nym-platform",
      "overview/network-privacy",
      "overview/nym-other-systems",
      "overview/private-access-control",
      "overview/links"
    ],
    "Run Nym Nodes": [
      "run-nym-nodes/index",
      "run-nym-nodes/incentives",
      "run-nym-nodes/build-nym",
      "run-nym-nodes/mixnodes",
      "run-nym-nodes/validators",
      "run-nym-nodes/requester",
      "run-nym-nodes/gateways",
      "run-nym-nodes/troubleshooting",
    ],
    "Use Apps": [
      "use-apps/index",
      "use-apps/blockstream-green",
      "use-apps/electrum",
      "use-apps/keybase"
    ],
    "Build Apps": [
      "build-apps/build-apps",
      "build-apps/choose-a-client",
      "build-apps/websocket-client",
      "build-apps/wasm-client",
      "build-apps/demos"
    ],
    "Community": [
      "community/index",
      "community/code-of-conduct",
      "community/licensing"
    ]
  },
};
