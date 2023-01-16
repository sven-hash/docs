# Nym-CLI

This is a CLI tool for interacting with:

* the Nyx blockchain (account management, querying the chain state, etc)
* the smart contracts deployed on Nyx (bonding and unbonding mixnodes, collecting rewards, etc)

It provides a convenient wrapper around the `nymd` client, and has similar functionality to the `nyxd` binary for querying the chain or executing smart contract methods.

## Building 
The `nym-cli` binary can be built by running `cargo build --release` in the `nym/tools/nym-cli` directory. 

### Useage 
You can see all available commands with: 

```
./nym-cli --help      
```

~~~admonish example collapsible=true title="Console output"
```

nym-cli 
A client for interacting with Nym smart contracts and the Nyx blockchain

USAGE:
    nym-cli [OPTIONS] <subcommand>

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

subcommandS:
    account             Query and manage Nyx blockchain accounts
    block               Query chain blocks
    cosmwasm            Manage and execute WASM smart contracts
    generate-fig        Generates shell completion
    help                Print this message or the help of the given subcommand(s)
    mixnet              Manage your mixnet infrastructure, delegate stake or query the directory
    signature           Sign and verify messages
    tx                  Query for transactions
    vesting-schedule    Create and query for a vesting schedule
```
~~~

## Features 
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

## Example Usage 
Below we have listed some example commands for some of the features listed above. 

If ever in doubt what you need to type, or if you want to see alternative parameters for a command, use the `nym-cli <subcommand_name> --help` to view all available options.

Example:
```
./nym-cli account create --help     
```

~~~admonish example collapsible=true title="Console output"
```

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
```
~~~

#### Create account

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
> NEVER share your mnemonic with anyone. Keep it stored in a safe and secure location.

### Check the current balance of an account

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
./nym-cli account balance --mnemonic <mnemonic>  
```

### Send tokens to an account

Sends tokens to an account using an address.

```
./nym-cli account send <ADDRESS> <AMOUNT>
```

### Get the current height of a block

Queries the current height balance of an block.

```
./nym-cli block current-height --mnemonic <mnemonic>
```

*Result:*
```
Current block height:
<BLOCK_HEIGHT>
```

### Query for a mixnode

Query a mixnode on the mixnet.

```
./nym-cli mixnet query mixnodes --mnemonic <mnemonic>
```


### Bond a mix node

Bond a mix node.

```
nym-cli mixnet operators mixnode bond --mnemonic <mnemonic> --host <HOST> --signature <SIGNATURE> --sphinx-key <SPHINX_KEY> --identity-key <IDENTITY_KEY> --version <VERSION> --amount <AMOUNT>
```

> The same command can be applied with a gateway. Just replace `mixnode` with `gateway`.

### Unbond a gateway

Unbond from a gateway. 

```
./nym-cli mixnet operators gateway unbound --mnemonic <mnemonic>
```

> The same command can be applied with a mixnode. Just replace `gateway` with `mixnode`.

### Claim a vesting reward for a mixnode

Claim rewards for a mixnode bonded with locked tokens.

```
./nym-cli mixnet operators mixnode rewards vesting-claim --mnemonic <mnemonic>
```

### Claim rewards

```
./nym-cli mixnet operators mixnode rewards --mnemonic <mnemonic>
```

### Manage Mix node Settings

Manage your mix node settings stored in the directory.

```
./nym-cli mixnet operators mixnode settings update-config --version <VERSION_NUMBER>
```

### Delegate Stake

Delegate to a mix node.

```
./nym-cli mixnet delegators delegate --amount <AMOUNT> –mix-id <MIX_ID> --mnemonic <mnemonic>
```

### Undelegate Stake

Remove stake from a mix node.

```
./nym-cli mixnet delegators undelegate --mix-id <MIX-ID> --mnemonic <mnemonic>
```

### Query a reward for a delegator

Claim rewards accumulated during the delegation of unlocked tokens.

```
./nym-cli mixnet delegators rewards claim --mix-id <MIX-ID> --mnemonic <mnemonic>
```


### Signature Generation : Sign a message

Sign a message.

```
./nym-cli signature sign --mnemonic <mnemonic> <MESSAGE>
```

*Result:*
```
{"account_id":<ACCOUNT_ID>,"public_key":{"@type":"/cosmos.crypto.secp256k1.PubKey","key":<PUBLIC_KEY>},"signature":"<OUTPUT_SIGNATURE>"}
```
**Signature Generation : Verify a signature**

Verify a signature.

```
./nym-cli signature verify  --mnemonic <mnemonic> <PUBLIC_KEY_OR_ADDRESS> <SIGNATURE_AS_HEX> <MESSAGE> 
```

### Create a Vesting Schedule

Creates a vesting schedule.

```
./nym-cli vesting-schedule create --mnemonic <mnemonic> --address <ADDRESS> --amount <AMOUNT>
```

### Query a Vesting Schedule

Query for vesting schedule.

```
./nym-cli vesting-schedule query --mnemonic <mnemonic>
```


## Staking on someone's behalf (for custodians)


There is a limitation the the staking address can only perform the following actions (and are visible via the Nym Wallet:

- Bond on the gaƒteway's or mix node's behalf.
- Delegate or Undelegate (to a mix node in order to begin receiving rewards)
- Claiming the rewards on the account

:::note
The staking address has no ability to withdraw any coins from the parent's account.
:::

The staking address must maintain the same level of security as the parent mnemonic; while the parent mnemonic's delegations and bonding events will be visible to the parent owner, the staking address will be the only account capable of undoing the bonding and delegating from the mix nodes or gateway.

Query for staking on behlaf of someone else
```
./nym-cli --config-env-file 'path/to/env/file' --mnemonic <staking address mnemonic>  mixnet delegators delegate --mix-id <input> --identity-key <input> --amount <input>
```









