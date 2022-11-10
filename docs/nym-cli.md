---
sidebar_label: "Nym CLI"
description: "Common questions you might have when integrating with Nym"
hide_title:  false
title: Nym CLI
---

This is a CLI tool for interacting with:

* the Nyx blockchain
* the smart contracts for the Mixnet

It provides a convenient wrapper around the nymd client with similar functionality to thenyxd binary for querying the chain or executing smart contract methods.


### Building 
The `nym-cli` binary can be built by running `cargo build --release` in the [/tools/nym-cli](https://github.com/nymtech/nym/tree/develop/tools/nym-cli) directory. 

### Useage 
You can see all available commands with: 

```
./nym-cli --help      
```

<details>
  <summary>console output</summary>

        nym-cli 
        A client for interacting with Nym smart contracts and the Nyx blockchain

        USAGE:
            nym-cli [OPTIONS] <SUBCOMMAND>

        OPTIONS:
                --config-env-file <CONFIG_ENV_FILE>
                    Overrides configuration as a file of environment variables. Note: individual env vars
                    take precedence over this file.

            -h, --help
                    Print help information

                --mixnet-contract-address <MIXNET_CONTRACT_ADDRESS>
                    Overrides the mixnet contract address provided either as an environment variable or in a
                    config file

                --mnemonic <MNEMONIC>
                    Provide the mnemonic for your account. You can also provide this is an env var called
                    MNEMONIC.

                --nymd-url <NYMD_URL>
                    Overrides the nymd URL provided either as an environment variable NYMD_VALIDATOR or in a
                    config file

                --validator-api-url <VALIDATOR_API_URL>
                    Overrides the validator API URL provided either as an environment variable API_VALIDATOR
                    or in a config file

                --vesting-contract-address <VESTING_CONTRACT_ADDRESS>
                    Overrides the vesting contract address provided either as an environment variable or in
                    a config file

        SUBCOMMANDS:
            account             Query and manage Nyx blockchain accounts
            block               Query chain blocks
            cosmwasm            Manage and execute WASM smart contracts
            generate-fig        Generates shell completion
            help                Print this message or the help of the given subcommand(s)
            mixnet              Manage your mixnet infrastructure, delegate stake or query the directory
            signature           Sign and verify messages
            tx                  Query for transactions
            vesting-schedule    Create and query for a vesting schedule
    
</details>

### Features 
You can use this binary for account management, querying and sending transactions to the mixnet [smart contracts](https://github.com/nymtech/nym/tree/develop/contracts). 

Currently supported features include: 

* **Account Management**
    * create a new account with a random mnemonic
    * query the account balance
    * query the account public key (needed to verify signatures)
    * query for transactions originating from the account
    * send tokens to another account
* **Blockchain Queries**
    * query for the current block height
    * query for a block at a height
    * query for a block at a timestamp
* **Smart Contract Interaction**
    * upload a smart contract
    * instantiate a smart contract
    * upgrade a smart contract
    * execute a smart contract method
* **Mixnet Interaction**
    * ledger Directory
    * query for mixnodes
    * query for gateways
* **Operators**
    * bond/unbond a mixnode or gateway
    * query for waiting rewards
    * withdraw rewards
    * manage mixnode settings
* **Delegators**
    * delegate/undelegate to a mixnode
    * query for waiting rewards
    * withdraw rewards
* **Signature Generation and Verification**
    * create a signature for string data (UTF-8)
    * verify a signature for an account
* **Vesting**
    * create a vesting schedule
    * query for a vesting schedule
* **Coconut (coming soon)**
    * issue credentials
    * verify credentials


### Example Usage 
Below we have listed some example commands for some of the features listed above. 

If ever in doubt what you need to type, or if you want to see alternative parameters for a command, use the `nym-cli <SUBCOMMAND_NAME> --help` to view all available options.

Example:
```
./nym-cli account create --help     
```

<details>
  <summary>console output</summary>

    Create a new mnemonic - note, this account does not appear on the chain until the account id is used in a transaction

    USAGE:
        nym-cli account create [OPTIONS]

    OPTIONS:
        --config-env-file <CONFIG_ENV_FILE>
            Overrides configuration as a file of environment variables. Note: individual env vars take precedence over this file.

    -h, --help
            Print help information

        --mixnet-contract-address <MIXNET_CONTRACT_ADDRESS>
            Overrides the mixnet contract address provided either as an environment variable or in a
            config file

        --mnemonic <MNEMONIC>
            Provide the mnemonic for your account. You can also provide this is an env var called
            MNEMONIC.

        --nymd-url <NYMD_URL>
            Overrides the nymd URL provided either as an environment variable NYMD_VALIDATOR or in a
            config file

        --validator-api-url <VALIDATOR_API_URL>
            Overrides the validator API URL provided either as an environment variable API_VALIDATOR
            or in a config file

        --vesting-contract-address <VESTING_CONTRACT_ADDRESS>
            Overrides the vesting contract address provided either as an environment variable or in
            a config file

        --word-count <WORD_COUNT>
    
</details>

**Create account**

Creates an account with a random Mnemonic and a new address.

```
./nym-cli account create     
```
*Result:*

```
# Mnemonic
assist jungle spoil domain saddle energy box carpet toy resist castle faith talent note outdoor inform cage lecture syrup trigger dress oppose slender museum
# Address
n132tpw4kkfas7ah0vmq78dwurhxljf2f869tlf5
```
Note : NEVER share your mnemonic with anyone. Keep it stored in a safe and secure location.

**Check the current balance of an account**

Queries the existing balance of an account.

```
# Using adddress below for example purposes.
./nym-cli account balance n1hzn28p2c6pzr98r85jp3h53fy8mju5w7ndd5vh     
```
*Result:*

```
2022-11-10T10:28:54.009Z INFO  nym_cli_commands::validator::account::balance > Getting balance for n1hzn28p2c6pzr98r85jp3h53fy8mju5w7ndd5vh...

# Balance for each token will be listed here
0.264 nym
1921.995 nyx
```

You can also query an accounts balance by using its mnemonic:

```
./nym-cli account balance --mnemonic <YOUR_MNEMONIC>  
```

**Check the current balance of an account**

Queries the existing balance of an account.

```
./nym-cli account send <ADDRESS> <AMOUNT>
```

**Get the current height of a block**

Queries the current height balance of an block.

```
./nym-cli block current-height --mnemonic <YOUR_MNEMONIC>
```

*Result:*
```
Current block height:
<BLOCK_HEIGHT>
```

**Query for a mixnode**

Query a mixnode on the mixnet.

```
./nym-cli mixnet query mixnodes --mnemonic <YOUR_MNEMONIC>
```

*Result:*
```
TODO
```

**Bond to a mixnode**

Bond a mixnode on the mixnet.

```
nym-cli mixnet operators mixnode bond --mnemonic <YOUR_MNEMONIC> --host <HOST> --signature <SIGNATURE> --sphinx-key <SPHINX_KEY> --identity-key <IDENTITY_KEY> --version <VERSION> --amount <AMOUNT>
```

*Result:*
```
TODO
```
NOTE : The same command can be applied with a gateway.Just replace `mixnode` with `gateway`.

**Claim a vesting reward for a mixnode**

Claim rewards for a mixnode bonded with locked tokens.

```
./nym-cli mixnet operators mixnode rewards vesting-claim --mnemonic <YOUR_MNEMONIC>
```

*Result:*
```
TODO
```

**Claim a reward for a mixnode**

Claim rewards for a mixnode.

```
./nym-cli mixnet operators mixnode rewards --mnemonic <YOUR_MNEMONIC>
```

*Result:*
```
TODO
```

**Manage Mixnode Settings**

Manage your mixnode settings stored in the directory.

```
./nym-cli mixnet operators mixnode settings update-config --version <VERSION_NUMBER>
```

**Delegate Stake**

Delegate stake to a mixnode.

```
./nym-cli mixnet delegators delegate --amount <AMOUNT> –mix-id <MIX_ID> --mnemonic <YOUR_MNEMONIC>
```

*Result:*
```
nym_cli_commands::validator::mixnet::delegators::delegate_to_mixnode > Starting delegation to mixnode
TODO
```

**Undelegate Stake**

Remove stake from a mixnode.

```
./nym-cli mixnet delegators undelegate --mix-id <MIX-ID> --mnemonic <YOUR_MNEMONIC>
```

*Result:*
```
nym_cli_commands::validator::mixnet::delegators::undelegate_from_mixnode > removing stake from mix-node
TODO
```

**Query a reward for a delegator**

Claim rewards accumulated during the delegation of unlocked tokens.

```
./nym-cli mixnet delegators rewards claim --mix-id <MIX-ID> --mnemonic <YOUR_MNEMONIC>
```

*Result:*
```
2022-11-09T16:19:54.270Z INFO  nym_cli_commands::validator::mixnet::delegators::rewards::claim_delegator_reward > Claim delegator reward
TODO
```

**Signature Generation : Send a message**

Sign a message.

```
./nym-cli signature sign --mnemonic <YOUR_MNEMONIC> <MESSAGE>
```

*Result:*
```
{"account_id":<ACCOUNT_ID>,"public_key":{"@type":"/cosmos.crypto.secp256k1.PubKey","key":<PUBLIC_KEY>},"signature":"<OUTPUT_SIGNATURE>"}
```
**Signature Generation : Verify a signature**

Signature verify.

```
./nym-cli signature verify  --mnemonic <YOUR_MNEMONIC> <PUBLIC_KEY_OR_ADDRESS> <SIGNATURE_AS_HEX> <MESSAGE> 
```

*Result:*
```
TODO
```