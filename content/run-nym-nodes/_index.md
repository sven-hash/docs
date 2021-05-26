---
title: "Run Nym Nodes"
weight: 15
description: "How to build the Nym platform. Nym is relatively simple to build and run on Mac OS X, Linux, and Windows."
---
{{< lastmodified >}}

### Installing pre-built binaries

The Nym [release page](https://github.com/nymtech/nym/releases) has pre-built binaries which _should_ work on Ubuntu 20.04 and other Debian-based systems, but at this stage cannot be guaranteed to work everywhere.

Later, when we're focused more on things like packaging, we will ensure that all components get built for all operating systems. There is a third-party install script which can be found [here](https://github.com/gyrusdentatus/nym_autoinstall), although this may not always be up to date with the newest version of the testnet.

If the pre-built binaries don't work or are unavailable for your system, you will need to build the platform yourself.

### Building Nym

The Nym platform has two main codebases:

- the Nym platform ([build instructions](build-nym)), written in Rust. This contains all of our code _except_ for the validators.
- the Nym validators ([build instructions](validators)), written in Go.
