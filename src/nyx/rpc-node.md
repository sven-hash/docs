# RPC Nodes

RPC Nodes (which might otherwise be referred to as 'Lite Nodes' or just 'Full Nodes') differ from Validators in that they hold a copy of the Nyx blockchain, but do **not** participate in consensus / block-production. 

You may want to set up an RPC Node for querying the blockchain, or in order to have an endpoint that your app can use to send transactions. 

In order to set up an RPC Node, simply follow the instructions to set up a [Validator](../nodes/validator-setup.md), but **exclude the `nyxd tx staking create-validator` command**. 