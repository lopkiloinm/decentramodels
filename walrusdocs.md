<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Walrus Developer Documentation

Welcome to the developer documentation for Walrus, a decentralized storage and data availability protocol designed specifically for large binary files, or "blobs". Walrus focuses on providing a robust but affordable solution for storing unstructured content on decentralized storage nodes while ensuring high availability and reliability even in the presence of Byzantine faults.

If you are viewing this site at https://docs.wal.app, you are fetching this from Walrus behind the scenes. See the Walrus Sites chapter for further details on how this works.

## Features

**Storage and retrieval**: Walrus supports storage operations to write and read blobs. It also allows anyone to prove that a blob has been stored and is available for retrieval at a later time.

**Cost efficiency**: By utilizing advanced erasure coding, Walrus maintains storage costs at approximately five times the size of the stored blobs, and encoded parts of each blob are stored on each storage node. This is significantly more cost-effective than traditional full-replication methods and much more robust against failures than protocols that only store each blob on a subset of storage nodes.

**Integration with the Sui blockchain**: Walrus leverages Sui for coordination, attesting availability, and payments. Storage space is represented as a resource on Sui, which can be owned, split, merged, and transferred. Stored blobs are also represented by objects on Sui, which means that smart contracts can check whether a blob is available and for how long, extend its lifetime or optionally delete it.

**Epochs, tokenomics, and delegated proof of stake**: Walrus is operated by a committee of storage nodes that evolve between epochs. A native token, WAL (and its subdivision FROST, where 1 WAL is equal to 1 billion FROST), is used to delegate stake to storage nodes, and those with high stake become part of the epoch committee. The WAL token is also used for payments for storage. At the end of each epoch, rewards for selecting storage nodes, storing and serving blobs are distributed to storage nodes and those that stake with them. All these processes are mediated by smart contracts on the Sui platform.

**Flexible access**: Users can interact with Walrus through a command-line interface (CLI), software development kits (SDKs), and web2 HTTP technologies. Walrus is designed to work well with traditional caches and content distribution networks (CDNs), while ensuring all operations can also be run using local tools to maximize decentralization.

> **Warning**: All blobs stored in Walrus are public and discoverable by all. Therefore you must not use Walrus to store anything that contains secrets or private data without additional measures to protect confidentiality. Refer to Data Security for such use cases.

## Architecture and operations

Walrus's architecture ensures that content remains accessible and retrievable even when many storage nodes are unavailable or malicious. Under the hood it uses modern error correction techniques based on fast linear fountain codes, augmented to ensure resilience against Byzantine faults, and a dynamically changing set of storage nodes. The core of Walrus remains simple, and storage node management and blob certification leverages Sui smart contracts.

## Organization

This documentation is split into several parts:

1. **Dev blog** contains announcements and other blog posts.
2. **Usage** provides concrete information for developers. If you want to get started quickly, you can jump directly to the setup chapter.
3. **Sites** describes how you can use Walrus and Sui together to build truly decentralized websites.
4. **Design** describes the objectives, security properties, and architecture of Walrus.

Finally, we provide a glossary that explains the terminology used throughout the documentation.

## Public access

This documentation is built using mdBook from source files in https://github.com/MystenLabs/walrus. Please report or fix any errors you find in this documentation in that GitHub project.

***

# The Walrus Dev Blog

This part of the Walrus documentation is used to publish news and updates about Walrus's development!

> **Warning**: We generally keep older blog posts unchanged besides possibly fixing typos and updating or removing broken links. As a result they may contain information that is no longer accurate.

## Announcing Walrus: A Decentralized Storage and Data Availability Protocol

**Published on: 2024-06-18**

> **Warning**: This blog post is shown in its original form and may contain information that is no longer accurate. Some broken links may have been updated or removed.

Walrus is an innovative decentralized storage network for blockchain apps and autonomous agents. The Walrus storage system is being released today as a developer preview for Sui builders in order to gather feedback. We expect a broad rollout to other web3 communities very soon!

Leveraging innovations in erasure coding, Walrus enables fast and robust encoding of unstructured data blobs into smaller slivers distributed and stored over a network of storage nodes. A subset of slivers can be used to rapidly reconstruct the original blob, even when up to two-thirds of the slivers are missing. This is possible while keeping the replication factor down to a minimal 4x-5x, similar to existing cloud-based services, but with the additional benefits of decentralization and resilience to more widespread faults.

### The Replication Challenge

Sui is the most advanced blockchain system in relation to storage on validators, with innovations such as a storage fund that future-proofs the cost of storing data on-chain. Nevertheless, Sui still requires complete data replication among all validators, resulting in a replication factor of 100x or more in today's Sui Mainnet. While this is necessary for replicated computing and smart contracts acting on the state of the blockchain, it is inefficient for simply storing unstructured data blobs, such as music, video, blockchain history, etc.

### Introducing Walrus: Efficient and Robust Decentralized Storage

To tackle the challenge of high replication costs, Mysten Labs has developed Walrus, a decentralized storage network offering exceptional data availability and robustness with a minimal replication factor of 4x-5x. Walrus provides two key benefits:

1. **Cost-Effective Blob Storage**: Walrus allows for the uploading of gigabytes of data at a time with minimal cost, making it an ideal solution for storing large volumes of data. Walrus can do this because the data blob is transmitted only once over the network, and storage nodes only spend a fraction of resources compared to the blob size. As a result, the more storage nodes the system has, the fewer resources each storage node uses per blob.
2. **High Availability and Robustness**: Data stored on Walrus enjoys enhanced reliability and availability under fault conditions. Data recovery is still possible even if two-thirds of the storage nodes crash or come under adversarial control. Further, availability may be certified efficiently without downloading the full blob.

Decentralized storage can take multiple forms in modern ecosystems. For instance, it offers better guarantees for digital assets traded as NFTs. Unlike current designs that store data off-chain, decentralized storage ensures users own the actual resource, not just metadata, mitigating risks of data being taken down or misrepresented.

Additionally, decentralized storage is not only useful for storing data such as pictures or files with high availability; it can also double as a low-cost data availability layer for rollups. Here, sequencers can upload transactions on Walrus, and the rollup executor only needs to temporarily reconstruct them for execution.

We also believe Walrus will accompany existing disaster recovery strategies for millions of enterprise companies. Not only is Walrus low-cost, it also provides unmatched layers of data availability, integrity, transparency, and resilience that centralized solutions by design cannot offer.

Walrus is powered by the Sui Network and scales horizontally to hundreds or thousands of networked decentralized storage nodes. This should enable Walrus to offer Exabytes of storage at costs competitive with current centralized offerings, given the higher assurance and decentralization.

### The Future of Walrus

By releasing this developer preview we hope to share some of the design decisions with the decentralized app developer community and gather feedback on the approach and the APIs for storing, retrieving, and certifying blobs. In this developer preview, all storage nodes are operated by Mysten Labs to help us understand use cases, fix bugs, and improve the performance of the software.

Future updates to Walrus will allow for dynamically changing the set of decentralized storage nodes, as well as changing the mapping of what slivers are managed by each storage node. The available operations and tools will also be expanded to cover more storage-related use cases. Many of these functions will be designed with the feedback we gather in mind.

Stay tuned for more updates on how Walrus will revolutionize data storage in the web3 ecosystem.

### What can developers build?

As part of this developer preview, we provide a binary client (currently macOS, ubuntu) that can be operated from the command line interface, a JSON API, and an HTTP API. We also offer the community an aggregator and publisher service and a Devnet deployment of 10 storage nodes operated by Mysten Labs.

We hope developers will experiment with building applications that leverage the Walrus Decentralized Store in a variety of ways. As examples, we hope to see the community build:

- **Storage of media for NFT or dapps**: Walrus can directly store and serve media such as images, sounds, sprites, videos, other game assets, etc. This is publicly available media that can be accessed using HTTP requests at caches to create multimedia dapps.
- **AI-related use cases**: Walrus can store clean data sets of training data, datasets with a known and verified provenance, model weights, and proofs of correct training for AI models. Or it may be used to store and ensure the availability and authenticity of an AI model output.
- **Storage of long term archival of blockchain history**: Walrus can be used as a lower-cost decentralized store to store blockchain history. For Sui, this can include sequences of checkpoints with all associated transaction and effects content, as well as historic snapshots of the blockchain state, code, or binaries.
- **Support availability for L2s**: Walrus enables parties to certify the availability of blobs, as required by L2s that need data to be stored and attested as available to all. This may also include the availability of extra audit data such as validity proofs, zero-knowledge proofs of correct execution, or large fraud proofs.
- **Support a full decentralized web experience**: Walrus can host full decentralized web experiences including all resources (such as js, css, html, and media). These can provide content but also host the UX of dapps, enabling fully decentralized front- and back-ends on chain. It brings the full "web" back into "web3".
- **Support subscription models for media**: Creators can store encrypted media on Walrus and only provide access via decryption keys to parties that have paid a subscription fee or have paid for content. (Note that Walrus provides the storage; encryption and decryption must be done off Walrus).

We are excited to see what else the web3 developer community can imagine!

### Getting Started

For this developer preview the public Walrus Devnet is openly available to all developers. Developer documentation is available at https://docs.wal.app.

SUI Testnet token is the main currency for interacting with Walrus. Developers pay for Walrus Devnet storage using SUI Testnet tokens which can be acquired at the Sui Testnet Discord faucet.

### One more thing …

The Walrus Sites website, the Walrus docs, and this very blog are hosted on Walrus. To learn more about Walrus Sites and how you can deploy your own, click here.

## Devnet Update

**Published on: 2024-08-12**

> **Warning**: This blog post is shown in its original form and may contain information that is no longer accurate. Some broken links may have been updated or removed.

We have redeployed the Walrus Devnet to incorporate various improvements to the Walrus storage nodes and clients. In this process, all blobs stored on Walrus were wiped. Note that this may happen again on Devnet and Testnet, but obviously not on the future Mainnet.

### Migration and Re-deployment of Walrus Sites

You can obtain the latest version of the walrus binary and the new configuration as described in the setup chapter.

If you had deployed any Walrus Sites, the site object on Sui and any SuiNS name are still valid. However, you need to re-store all blobs on Walrus. You can achieve this by running the site-builder tool (from the walrus-sites directory) as follows:

```bash
./target/release/site-builder --config site-builder/assets/builder-example.yaml update --force \
    <path to the site> <site object ID>
```


### Changes

Besides many improvements to the storage nodes, the new version of Walrus includes the following user-facing changes:

- **Improved coin management**: The client now better selects coins for gas and storage fees. Users no longer require multiple coins in their wallet.
- **Improved connection management**: The client now limits the number of parallel connections to improve performance for users with low network bandwidth storing large blobs.
- **OpenAPI specification**: Walrus storage nodes, aggregators, and publishers expose their API specifications at the path `/v1/api`.
- **System info in JSON**: The `info` command is now also available in JSON mode.
- **Client version**: The walrus CLI now has a `--version` option.
- **Support for the empty blob**: The empty blob is now supported by Walrus.
- **Default configuration-file paths**: The client now looks for configuration files in `~/.config/walrus` in addition to `~/.walrus` and recognizes the extension `.yml` in addition to `.yaml`.
- **Home directory in paths**: Paths specified in configuration files now expand the `~` symbol at the beginning to the user's home directory.
- **More robust store and status check**: The `store` and `blob-status` commands are now more robust against Sui full nodes that aggressively prune past events and against load-balancers that send transactions to different full nodes.
- **Fix CLI parsing**: The walrus CLI now properly handles hyphens in blob IDs.

This update also increases the number of shards to 1000, which is more representative of the expected value in Testnet and Mainnet.

## Announcing the Official Walrus Whitepaper

**Published on: 2024-09-17**

> **Warning**: This blog post is shown in its original form and may contain information that is no longer accurate. Some broken links may have been updated or removed.

In June, Mysten Labs announced Walrus, a new decentralized secure blob store design, and introduced a developer preview that currently stores over 12TiB of data. Breaking the Ice gathered over 200 developers to build apps leveraging decentralized storage.

It is time to unveil the next stage of the project: Walrus will become an independent decentralized network with its own utility token, WAL, that will play a key role in the operation and governance of the network. Walrus will be operated by storage nodes through a delegated proof-of-stake mechanism using the WAL token. An independent Walrus foundation will encourage the advancement and adoption of Walrus, and support its community of users and developers.

Today, we published the Walrus whitepaper (also on GitHub) that offers additional details, including:

- The encoding scheme and Read / Write operations Walrus uses to ensure both security and efficient scaling to 100s and 1000s of storage nodes, including interactions with the Sui blockchain which serves as a coordination layer for Walrus' operations.
- The reconfiguration of storage nodes across epochs, and how the protocol ensures available blobs on Walrus remain available over long periods of time.
- The tokenomics of Walrus based on the WAL token, including how staking and staking rewards are structured, how pricing and payments for storage are handled and distributed in each epoch, and the governance of key system parameters.
- Forward-looking design options, such as a cheap mechanism to challenge and audit storage nodes, options for ensuring reads with a higher service quality, possibly against a payment, and designs that empower light nodes to meaningfully contribute to the protocol's robustness, serve reads, and be rewarded.

The whitepaper focuses on the steady-state design aspects of Walrus. Further details about the project, such as timelines, opportunities for community participation, how to join the network as a storage node, and plans around light nodes, will be shared in subsequent posts.

To be part of this journey:

- Follow us on Twitter
- Join our Discord
- Build apps on Walrus
- Publish a Walrus Site and share it


## Announcing Testnet

**Published on: 2024-10-17**

> **Warning**: This blog post is mostly shown in its original form and may contain information that is no longer accurate. Some broken links may have been updated or removed.

Today, a community of operators launches the first public Walrus Testnet. This is an important milestone in validating the operation of Walrus as a decentralized blob store, by operating it on a set of independent storage nodes, that change over time through a delegated proof of stake mechanism. The Testnet also brings functionality updates relating to governance, epochs, and blob deletion.

### Blob deletion

The most important user-facing new feature is optional blob deletion. The uploader of a blob can optionally indicate a blob is "deletable". This information is stored in the Sui blob metadata object, and is also included in the event denoting when the blob is certified. Subsequently, the owner of the Sui blob metadata object can "delete" it. As a result storage for the remaining period is reclaimed and can be used by subsequent blob storage operations.

Blob deletion allows more fine-grained storage cost management: smart contracts that wrap blob metadata objects can define logic that stores blobs and delete them to minimize costs, and reclaim storage space before Walrus epochs end.

However, blob deletion is not an effective privacy mechanism in itself: copies of the blob may exist outside Walrus storage nodes on caches and end-user stores or devices. Furthermore, if the identical blob is stored by multiple Walrus users, the blob will still be available on Walrus until no copy exists. Thus deleting your own copy of a blob cannot guarantee that it is deleted from Walrus as a whole.

Find out how to upload and delete deletable blobs through the CLI.
Find out more about how delete operations work.

### Epochs

Walrus Testnet enables multiple epochs. Initially, the epoch duration is set to a single day to ensure the logic of epoch change is thoroughly tested. At Mainnet, epochs will likely be multiple weeks long.

The progress of epochs makes the end epoch of blobs meaningful, and blobs will become unavailable when they reach their end epoch. The store command may be used to extend the end epoch of a blob that is still available. This operation is efficient and only affects payments and metadata, and does not re-upload blob contents.

> **Note**: The previous paragraph was edited on 2025-07-16 for improved clarity.

Find out the current epoch through the CLI.
Find out how to store a blob for multiple epochs.

### The WAL token and the Testnet WAL faucet

Payments for blob storage and extending blob expiry are denominated in Testnet WAL, a Walrus token issued on the Sui Testnet. Testnet WAL has no value, and an unlimited supply; so no need to covet or hoard it, it's just for testing purposes and only issued on Sui Testnet.

WAL also has a smaller unit called FROST, similar to MIST for SUI. 1 WAL is equal to 1 billion (1000000000) FROST.

To make Testnet WAL available to all who want to experiment with the Walrus Testnet we provide a utility and smart contract to convert Testnet SUI (which also has no value) into Testnet WAL using a one-to-one exchange rate. This is chosen arbitrarily, and generally one should not read too much into the actual WAL denominated costs of storage on Testnet. They have been chosen arbitrarily.

Find out how to request Testnet WAL tokens through the CLI.

### Decentralization through staking \& unstaking

The WAL token may also be used to stake with storage operators. Staked WAL can be unstaked and re-staked with other operators or used to purchase storage.

Each epoch storage nodes are selected and allocated storage shards according to their delegated stake. At the end of each epoch payments for storing blobs for the epoch are distributed to storage nodes and those that delegate stake to them. Furthermore, important network parameters (such as total available storage and storage price) are set by the selected storage operators each epoch according to their stake weight.

A staking web dApp is provided to experiment with this functionality. Community members have also created explorers that can be used to view storage nodes when considering who to stake with. Staking ensures that the ultimate governance of Walrus, directly in terms of storage nodes, and indirectly in terms of parameters and software they chose, rests with WAL Token holders.

Under the hood and over the next months we will be testing many aspects of epoch changes and storage node committee changes: better shard allocation mechanisms upon changes or storage node stake; efficient ways to sync state between storage nodes; as well as better ways for storage nodes to follow Sui event streams.

Explore the Walrus staking dApp.
Look at recent activity on the Walrus Explorer.

### New Move contracts \& documentation

As part of the Testnet release of Walrus, the documentation and Move Smart contracts have been updated, and can be found in the walrus-docs repository.

### New Walrus Sites features

With the move to Walrus Testnet, Walrus Sites have also been updated! The new features in this update greatly increase the flexibility, speed, and security of Walrus Sites. Developers can now specify client-side routing rules, and add custom HTTP headers to the portals' responses for their site, expanding the possibilities for what Walrus Sites can do.

Migrate now to take advantage of these new features! The old Walrus Sites, based on Walrus Devnet, will still be available for a short time. However, Devnet will be wiped soon (as described below), so it is recommended to migrate as soon as possible.

### Discontinuation of Walrus Devnet

The previous Walrus Devnet instance is now deprecated and will be shut down after 2024-10-31. All data stored on Walrus Devnet (including Walrus Sites) will no longer be accessible at that point. You need to re-upload all data to Walrus Testnet if you want it to remain accessible. Walrus Sites also need to be migrated.

## Announcing Testnet v2

**Published on: 2025-01-16**

> **Warning**: This blog post is shown in its original form and may contain information that is no longer accurate. Some broken links may have been updated or removed.

We are today redeploying the Walrus Testnet to incorporate various improvements, including some backwards-incompatible changes. Make sure to get the latest binary and configuration as described in the setup section.

Note that all blob data on the previous Testnet instance has been wiped. All blobs need to be re-uploaded to the new Testnet instance, including Walrus Sites. In addition, there is a new version of the WAL token, so your previous WAL tokens will not work anymore. To use the Testnet v2, you need to obtain new WAL tokens.

In the following sections, we describe the notable changes and the actions required for existing Walrus Sites.

### Epoch duration

The epoch duration has been increased from one day to two days to emphasize that this duration is different from Sui epochs (at Mainnet, epochs will likely be multiple weeks long). In addition, the maximum number of epochs a blob can be stored for has been reduced from 200 to 183 (corresponding to one year).

The `walrus store` command now also supports the `--epochs max` flag, which will store the blob for the maximum number of epochs. Note that the `--epochs` flag is now mandatory.

### New features

Besides many improvements to the contracts and the storage-node service, the latest Walrus release also brings several user-facing improvements.

- The `walrus store` command now supports storing multiple files at once. This is faster and more cost-effective compared to storing each file separately as transactions can be batched through PTBs. Notably, this is compatible with glob patterns offered by many shells, so you can for example run a command like `walrus store *.png --epochs 100` to store all PNG files in the current directory.
- The walrus CLI now supports creating, funding, and extending shared blobs using the `walrus share`, `walrus store --share`, and `walrus fund-shared-blob` commands. Shared blobs are an example of collectively managed and funded blobs. See the shared blobs section for more details.


### New WAL token

Along with the redeployment of Walrus, we have also deployed a fresh WAL contract. This means that you cannot use any WAL token from the previous Testnet instance with the new Testnet instance. You need to request new WAL tokens through the Testnet WAL faucet.

### Backwards-incompatible changes

One reason for a full redeployment is to allow us to make some changes that are backwards-incompatible. Many of those are related to the contracts and thus less visible to users. There are, however, some changes that may affect you.

#### Configuration files

The format of the configuration files for storage nodes and clients has been changed. Make sure to use the latest version of the configuration files, see the configuration section.

#### CLI options

Several CLI options of the walrus CLI have been changed. Notably, all "short" variants of options (e.g., `-e` instead of `--epochs`) have been removed to prevent future confusion with new options. Additionally, the `--epochs` flag is now mandatory for the `walrus store` command (this also affects the JSON API).

Please refer to the CLI help (`walrus --help`, or `walrus <command> --help`) for further details.

#### HTTP APIs

The paths, request, and response formats of the HTTP APIs have changed for the storage nodes, and also the aggregator and publisher. Please refer to the section on the HTTP API for further details.

### Effects on and actions required for existing Walrus Sites

The Walrus Sites contracts have not changed, which means that all corresponding objects on Sui are still valid. However, the resources now point to blob IDs that do not yet exist on the new Testnet. The easiest way to fix existing sites is to simply update them with the `--force` flag:

```bash
site-builder update --epochs <number of epochs> --force <path to site> <existing site object>
```


### New Move contracts \& documentation

As part of the new Testnet release of Walrus, the Move smart contracts have been updated; the deployed version can be found in the walrus-docs repository.

## Announcing Mainnet

**Published on: 2025-03-27**

### A decentralized network: Mainnet

The production Walrus Mainnet is now live, and operated by a decentralized network of over 100 storage nodes. Epoch 1 begun on March 25, 2025. The network can now be used to publish and retrieve blobs, upload and browse Walrus Sites, as well as stake and unstake to determine future committees using the live Mainnet WAL token. On Mainnet, the Walrus security properties hold. And Walrus is now ready to satisfy the needs of real applications.

Walrus is open source. The Walrus protocol health is overseen by an independent foundation that is now well resourced to support future development and growth. And, the community is collecting tools, resources and dapps for Walrus under Awesome Walrus!

This is a significant milestone a little over 12 months after an initial small team started designing the Walrus protocol. And a special thanks is due to the community of storage operators that supported the development of Walrus through consecutive Testnet(s), as well as all community members that integrated the protocol early and provided feedback to improve it.

### New features

Besides the promise of stability and security, the Mainnet release of Walrus comes with a few notable new features and changes:

- **Blob attributes**: Each Sui blob objects can have multiple attributes and values attached to it, to encode application meta-data. The aggregator uses this facility for returning common HTTP headers.
- **Burn blob objects on Sui**: The command line walrus tool is extended with commands to "burn" Sui blob objects to reclaim the associated storage fee, making it cheaper to store blobs.
- **CLI expiry time improvements**: Now blob expiry can be expressed more flexibly when storing blobs, through `--epochs max`, an RFC3339 date with `--earliest-expiry-time`, or the concrete end epoch with `--end-epoch`.
- **RedStuff with Reed-Solomon codes**: The erasure code underlying RedStuff was changed from RaptorQ to Reed-Solomon (RS) codes. Intense benchmarking suggests their performance, for our parameter set, is similar, and the use of RS codes provides perfect robustness, in that blobs can always be reconstructed given a threshold of slivers. We thank Joachim Neu for extensive feedback on this topic.
- **TLS handing for storage node**: Storage nodes can now be configured to serve TLS certificates that are publicly trusted, such as those issues by cloud providers and public authorities such as Let's Encrypt. This allows JavaScript clients to directly store and retrieve blobs from Walrus.
- **JWT authentication for publisher**: Now the publisher can be configured to only provide services to authenticated users via consuming JWT tokens that can be distributed through any authentication mechanism.
- **Extensive logging and metrics**: All services, from the storage node to aggregator and publisher export metrics that can be used to build dashboards, and logs at multiple levels to troubleshoot their operation.
- **Health endpoint**: Storage nodes and the CLI include a health command to check the status and basic information of storage nodes. This is useful when allocating stake as well as monitoring the network.
- **Walrus Sites updates**: The Mainnet Walrus Sites public portal will be hosted on the wal.app domain name. Now Walrus Sites support deletable blobs to make their updates more capital efficient. Those operating their own portals may also use their own domain names to serve a Walrus Site. The Staking, Docs, Snowreads, and Flatland Walrus Sites are now on Mainnet.
- **A subsidies contract**: The Mainnet release of Walrus requires WAL for storing blobs, however to enable early adopters to try the system, transition to it, the Walrus foundation operates a smart contract to acquire subsidized storage. The CLI client uses it automatically when storing blobs.


### Testnet future plans

The current Walrus Testnet will soon be wiped and restarted to align the codebase to the Mainnet release. Going forward we will regularly wipe the Testnet, every few months. Developers should use the Walrus Mainnet to get any level of stability. The Walrus Testnet is only there to test new features before they are deployed in production.

We will not be operating a public portal to serve Walrus Sites on Testnet, to reduce costs and incident response associated with free web hosting. Developers can still run a local portal pointed to Testnet to test Walrus Sites.

### Open source Walrus codebase

The Walrus codebase, including all smart contracts in Move, services in Rust, and documentation, is now open sourced under an Apache 2.0 license, and hosted on GitHub. Since the main Walrus repository is now open to all, and contains both documentation and smart contracts, we are retiring the walrus-docs repository.

Developers may find the Rust CLI client, and associated aggregator and publisher services of most interest. These can be extended to specialize services to specific operational needs. They are also a good illustration of how to interface with Walrus using Rust clients. A cleaner and more stable Rust SDK is in the works as well.

### Publisher improvements and plans

Publishing blobs on Mainnet consumes real WAL and SUI. To avoid uncontrolled costs to operations the publisher service was augmented with facilities to authenticate requests and account for costs per user.

### Getting started

You want to get a taste of Walrus? Here are some sites that are built on and/or use Walrus:

- Mint a toy NFT on the flatland application.
- Browse scientific papers.

You can explore blobs that are stored on Walrus through the Walruscan explorer.

***

# Setup

We provide a pre-compiled `walrus` client binary for macOS (Intel and Apple CPUs) and Ubuntu, which supports different usage patterns (see the next chapter). This chapter describes the prerequisites, installation, and configuration of the Walrus client.

Walrus is open-source under an Apache 2 license, and can also be built and installed from the Rust source code via cargo.

> **Note**: This page describes how to connect to Walrus Mainnet. See Available networks for an overview over all Walrus networks.

## Prerequisites: Sui wallet, SUI and WAL

> **Quick wallet setup**: If you just want to set up a new Sui wallet for Walrus, you can generate one using the `walrus generate-sui-wallet --network mainnet` command after installing Walrus. You still need to obtain some SUI and WAL tokens, but you do not have to install the Sui CLI.

Interacting with Walrus requires a valid Sui wallet with some amount of SUI and WAL tokens. The normal way to set this up is via the Sui CLI; see the installation instructions in the Sui documentation.

After installing the Sui CLI, you need to set up a wallet by running `sui client`, which prompts you to set up a new configuration. Make sure to point it to Sui Mainnet, you can use the full node at `https://fullnode.mainnet.sui.io:443` for this. See the Sui documentation for further details.

After this, you should get something like this (everything besides the `mainnet` line is optional):

```
$ sui client envs
╭──────────┬─────────────────────────────────────┬────────╮
│ alias    │ url                                 │ active │
├──────────┼─────────────────────────────────────┼────────┤
│ devnet   │ https://fullnode.devnet.sui.io:443  │        │
│ localnet │ http://127.0.0.1:9000               │        │
│ testnet  │ https://fullnode.testnet.sui.io:443 │        │
│ mainnet  │ https://fullnode.mainnet.sui.io:443 │ *      │
╰──────────┴─────────────────────────────────────┴────────╯

$ sui client gas
╭─────────────────┬────────────────────┬──────────────────╮
│ gasCoinId       │ mistBalance (MIST) │ suiBalance (SUI) │
├─────────────────┼────────────────────┼──────────────────┤
│ 0x65dca966dc... │ 1000000000         │ 1.00             │
╰─────────────────┴────────────────────┴──────────────────╯
```

Make sure you have at least one gas coin with at least 1 SUI.

Finally, to publish blobs on Walrus you will need some Mainnet WAL to pay for storage and upload costs. You can buy WAL through a variety of centralized or decentralized exchanges.

The system-wide wallet will be used by Walrus if no other path is specified. If you want to use a different Sui wallet, you can specify this in the Walrus configuration file or when running the CLI.

## Installation

We currently provide the `walrus` client binary for macOS (Intel and Apple CPUs), Ubuntu, and Windows. The Ubuntu version most likely works on other Linux distributions as well.


| OS | CPU | Architecture |
| :-- | :-- | :-- |
| Ubuntu | Intel 64bit | ubuntu-x86_64 |
| Ubuntu | Intel 64bit (generic) | ubuntu-x86_64-generic |
| Ubuntu | ARM 64bit | ubuntu-aarch64 |
| MacOS | Apple Silicon | macos-arm64 |
| MacOS | Intel 64bit | macos-x86_64 |
| Windows | Intel 64bit | windows-x86_64.exe |

### Install via script

To download and install `walrus` to your `"$HOME"/.local/bin` directory, run one of the following commands in your terminal then follow on-screen instructions. If you are on Windows, see the Windows-specific instructions or the `suiup` installation (experimental)

```bash
# Run a first-time install using the latest Mainnet version.
curl -sSf https://install.wal.app | sh

# Install the latest Testnet version instead.
curl -sSf https://install.wal.app | sh -s -- -n testnet

# Update an existing installation (overwrites prior version of walrus).
curl -sSf https://install.wal.app | sh -s -- -f
```

Make sure that the `"$HOME"/.local/bin` directory is in your `$PATH`.

Once this is done, you should be able to run Walrus by using the `walrus` command in your terminal.

You can see usage instructions as follows (see the next chapter for further details):

```
$ walrus --help
Walrus client

Usage: walrus [OPTIONS] <COMMAND>

Commands:
⋮
```

> **Tip**: Our latest Walrus binaries are also available on Walrus itself, namely on https://bin.wal.app, for example, https://bin.wal.app/walrus-mainnet-latest-ubuntu-x86_64. Note that due to DoS protection, it may not be possible to download the binaries with `curl` or `wget`.

### Install on Windows

To download `walrus` to your Microsoft Windows computer, run the following in a PowerShell.

```powershell
(New-Object System.Net.WebClient).DownloadFile(
  "https://storage.googleapis.com/mysten-walrus-binaries/walrus-testnet-latest-windows-x86_64.exe",
  "walrus.exe"
)
```

From there, you'll need to place `walrus.exe` somewhere in your PATH.

> **Windows**: Note that most of the remaining instructions assume a UNIX-based system for the directory structure, commands, etc. If you use Windows, you may need to adapt most of those.

### Install via suiup (experimental)

`suiup` is a tool to install and manage different versions of CLI tools for working in the Sui ecosystem, including the `walrus` CLI. After installing `suiup` as described in the suiup documentation, you can install specific versions of the `walrus` CLI:

```bash
suiup install walrus@testnet # install the latest testnet release
suiup install walrus@mainnet # install the latest mainnet release
suiup install walrus@testnet-v1.27.1 # install a specific release
```


### GitHub releases

You can find all our releases including release notes on GitHub. Simply download the archive for your system and extract the `walrus` binary.

### Install via Cargo

You can also install Walrus via Cargo. For example, to install the latest Mainnet version:

```bash
cargo install --git https://github.com/MystenLabs/walrus --branch mainnet walrus-service --locked
```

In place of `--branch mainnet`, you can also specify specific tags (e.g., `--tag mainnet-v1.18.2`) or commits (e.g., `--rev b2009ac73388705f379ddad48515e1c1503fc8fc`).

### Build from source

Walrus is open-source software published under the Apache 2 license. The code is developed in a git repository at https://github.com/MystenLabs/walrus.

The latest version of Mainnet and Testnet are available under the branches `mainnet` and `testnet` respectively, and the latest version under the `main` branch. We welcome reports of issues and bug fixes. Follow the instructions in the `README.md` file to build and use Walrus from source.

## Configuration

The Walrus client needs to know about the Sui objects that store the Walrus system and staking information, see the developer guide. These need to be configured in a file `~/.config/walrus/client_config.yaml`.

You can access Testnet and Mainnet via the following configuration. Note that this example Walrus CLI configuration refers to the standard location for Sui configuration (`"~/.sui/sui_config/client.yaml"`).

```yaml
contexts:
  mainnet:
    system_object: 0x2134d52768ea07e8c43570ef975eb3e4c27a39fa6396bef985b5abc58d03ddd2
    staking_object: 0x10b9d30c28448939ce6c4d6c6e0ffce4a7f8a4ada8248bdad09ef8b70e4a3904
    exchange_objects: []
    wallet_config:
      # Optional path to the wallet config file.
      # path: ~/.sui/sui_config/client.yaml
      # Sui environment to use.
      active_env: mainnet
      # Optional override for the Sui address to use.
      # active_address: 0x0000000000000000000000000000000000000000000000000000000000000000
    rpc_urls:
      - https://fullnode.mainnet.sui.io:443
  testnet:
    system_object: 0x6c2547cbbc38025cf3adac45f63cb0a8d12ecf777cdc75a4971612bf97fdf6af
    staking_object: 0xbe46180321c30aab2f8b3501e24048377287fa708018a5b7c2792b35fe339ee3
    exchange_objects:
      - 0xf4d164ea2def5fe07dc573992a029e010dba09b1a8dcbc44c5c2e79567f39073
      - 0x19825121c52080bb1073662231cfea5c0e4d905fd13e95f21e9a018f2ef41862
      - 0x83b454e524c71f30803f4d6c302a86fb6a39e96cdfb873c2d1e93bc1c26a3bc5
      - 0x8d63209cf8589ce7aef8f262437163c67577ed09f3e636a9d8e0813843fb8bf1
    wallet_config:
      # Optional path to the wallet config file.
      # path: ~/.sui/sui_config/client.yaml
      # Sui environment to use.
      active_env: testnet
      # Optional override for the Sui address to use.
      # active_address: 0x0000000000000000000000000000000000000000000000000000000000000000
    rpc_urls:
      - https://fullnode.testnet.sui.io:443
default_context: mainnet
```

> **Tip**: The easiest way to obtain the latest configuration is by downloading it directly from Walrus:
>
> ```bash > curl https://docs.wal.app/setup/client_config.yaml -o ~/.config/walrus/client_config.yaml > ```

### Custom path (optional)

By default, the Walrus client will look for the `client_config.yaml` (or `client_config.yml`) configuration file in the current directory, `$XDG_CONFIG_HOME/walrus/`, `~/.config/walrus/`, or `~/.walrus/`. However, you can place the file anywhere and name it anything you like; in this case you need to use the `--config` option when running the `walrus` binary.

### Advanced configuration (optional)

The configuration file currently supports the following parameters for each of the contexts:

```yaml
# These are the only mandatory fields. These objects are specific for a particular Walrus
# deployment but then do not change over time.
system_object: 0x2134d52768ea07e8c43570ef975eb3e4c27a39fa6396bef985b5abc58d03ddd2
staking_object: 0x10b9d30c28448939ce6c4d6c6e0ffce4a7f8a4ada8248bdad09ef8b70e4a3904

# You can define a custom path to your Sui wallet configuration here. If this is unset or `null`
# (default), the wallet is configured from `./sui_config.yaml` (relative to your current working
# directory), or the system-wide wallet at `~/.sui/sui_config/client.yaml` in this order. Both
# `active_env` and `active_address` can be omitted, in which case the values from the Sui wallet
# are used.
wallet_config:
  # The path to the wallet configuration file.
  path: ~/.sui/sui_config/client.yaml
  # The optional `active_env` to use to override whatever `active_env` is listed in the
  # configuration file.
  active_env: mainnet
  # The optional `active_address` to use to override whatever `active_address` is listed in the
  # configuration file.
  active_address: 0x...

# The following parameters can be used to tune the networking behavior of the client. There is no
# risk in playing around with these values. In the worst case, you may not be able to store/read
# blob due to timeouts or other networking errors.
rpc_urls:
  - https://fullnode.testnet.sui.io:443
communication_config:
  max_concurrent_writes: null
  max_concurrent_sliver_reads: null
  max_concurrent_metadata_reads: 3
  max_concurrent_status_reads: null
  max_data_in_flight: null
  reqwest_config:
    total_timeout_millis: 30000
    pool_idle_timeout_millis: null
    http2_keep_alive_timeout_millis: 5000
    http2_keep_alive_interval_millis: 30000
    http2_keep_alive_while_idle: true
  request_rate_config:
    max_node_connections: 10
    backoff_config:
      min_backoff_millis: 1000
      max_backoff_millis: 30000
      max_retries: 5
  disable_proxy: false
  disable_native_certs: false
  sliver_write_extra_time:
    factor: 0.5
    base_millis: 500
  registration_delay_millis: 200
  max_total_blob_size: 1073741824
  committee_change_backoff:
    min_backoff_millis: 1000
    max_backoff_millis: 5000
    max_retries: 5
  sui_client_request_timeout_millis: null
refresh_config:
  refresh_grace_period_secs: 10
  max_auto_refresh_interval_secs: 30
  min_auto_refresh_interval_secs: 5
  epoch_change_distance_threshold_secs: 300
  refresher_channel_size: 100
quilt_client_config:
  max_retrieve_slivers_attempts: 2
  timeout_secs: 10
```


***

# Available networks

Walrus Mainnet operates a production-quality storage network on the Sui Mainnet. The Walrus Testnet operates on the Sui Testnet and is used to test new features of Walrus before they graduate to the Mainnet. Finally, developers can operate local Walrus and Sui networks for testing.

## Network parameters

Some important fixed system parameters for Mainnet and Testnet are summarized in the following table:


| Parameter | Mainnet | Testnet |
| :-- | :-- | :-- |
| Sui network | Mainnet | Testnet |
| Number of shards | 1000 | 1000 |
| Epoch duration | 2 weeks | 1 day |
| Maximum number of epochs for which storage can be bought | 53 | 53 |

Many other parameters, including the system capacity and prices, are dynamic. Those are stored in the system object (see the documentation about the system and staking objects) and can be viewed with various tools like the Walruscan explorer.

## Mainnet configuration

### Mainnet parameters

The client parameters for the Walrus Mainnet are:

```yaml
system_object: 0x2134d52768ea07e8c43570ef975eb3e4c27a39fa6396bef985b5abc58d03ddd2
staking_object: 0x10b9d30c28448939ce6c4d6c6e0ffce4a7f8a4ada8248bdad09ef8b70e4a3904
rpc_urls:
  - https://fullnode.mainnet.sui.io:443
```

In case you wish to explore the Walrus contracts, their package IDs are the following:

- WAL package: `0x356a26eb9e012a68958082340d4c4116e7f55615cf27affcff209cf0ae544f59`
- Walrus package: `0xfdc88f7d7cf30afab2f82e8380d11ee8f70efb90e863d1de8616fae1bb09ea77`

As these are inferred automatically from the object IDs above, there is no need to manually input them into the Walrus client configuration file. The latest published package IDs can also be found in the `Move.lock` files in the subdirectories of the `contracts` directory on GitHub.

The configuration file described on the setup page includes both Mainnet and Testnet configuration. If you want only the Mainnet configuration, you can download the Mainnet-only configuration file.

## Testnet configuration

> **Disclaimer about the Walrus Testnet**: All transactions are executed on the Sui Testnet and use Testnet WAL and SUI which have no value. The state of the store can and will be wiped at any point and possibly with no warning. Do not rely on this Testnet for any production purposes, it comes with no availability or persistence guarantees.
>
> New features on testnet may break deployed testnet apps, since this is the network in which we test new updates including for compatibility with eco-system applications.
>
> Also see the Testnet terms of service under which this Testnet is made available.

### Prerequisites: Sui wallet and Testnet SUI

Interacting with Walrus requires a valid Sui Testnet wallet with some amount of SUI tokens. The normal way to set this up is via the Sui CLI; see the installation instructions in the Sui documentation. If you do not want to install the Sui CLI, you can also generate a new Sui wallet for Testnet using `walrus generate-sui-wallet --network testnet`.

After installing the Sui CLI, you need to set up a Testnet wallet by running `sui client`, which prompts you to set up a new configuration. Make sure to point it to Sui Testnet, you can use the full node at `https://fullnode.testnet.sui.io:443` for this. See the Sui documentation for further details.

If you already have a Sui wallet configured, you can directly set up the Testnet environment (if you don't have it yet),

```bash
sui client new-env --alias testnet --rpc https://fullnode.testnet.sui.io:443
```

and switch the active environment to it:

```bash
sui client switch --env testnet
```

After this, you should get something like this (everything besides the `testnet` line is optional):

```
$ sui client envs
╭──────────┬─────────────────────────────────────┬────────╮
│ alias    │ url                                 │ active │
├──────────┼─────────────────────────────────────┼────────┤
│ devnet   │ https://fullnode.devnet.sui.io:443  │        │
│ localnet │ http://127.0.0.1:9000               │        │
│ testnet  │ https://fullnode.testnet.sui.io:443 │ *      │
│ mainnet  │ https://fullnode.mainnet.sui.io:443 │        │
╰──────────┴─────────────────────────────────────┴────────╯
```

Finally, make sure you have at least one gas coin with at least 1 SUI. You can obtain one from the Sui Testnet faucet (you can find your address through the `sui client active-address` command).

After some seconds, you should see your new SUI coins:

```
$ sui client gas
╭─────────────────┬────────────────────┬──────────────────╮
│ gasCoinId       │ mistBalance (MIST) │ suiBalance (SUI) │
├─────────────────┼────────────────────┼──────────────────┤
│ 0x65dca966dc... │ 1000000000         │ 1.00             │
╰─────────────────┴────────────────────┴──────────────────╯
```

The system-wide wallet will be used by Walrus if no other path is specified. If you want to use a different Sui wallet, you can specify this in the Walrus configuration file or when running the CLI.

### Testnet parameters

The configuration parameters for the Walrus Testnet are included in the configuration file described on the setup page. If you want only the Testnet configuration, you can get the Testnet-only configuration file. The parameters are:

```yaml
system_object: 0x6c2547cbbc38025cf3adac45f63cb0a8d12ecf777cdc75a4971612bf97fdf6af
staking_object: 0xbe46180321c30aab2f8b3501e24048377287fa708018a5b7c2792b35fe339ee3
exchange_objects:
  - 0xf4d164ea2def5fe07dc573992a029e010dba09b1a8dcbc44c5c2e79567f39073
  - 0x19825121c52080bb1073662231cfea5c0e4d905fd13e95f21e9a018f2ef41862
  - 0x83b454e524c71f30803f4d6c302a86fb6a39e96cdfb873c2d1e93bc1c26a3bc5
  - 0x8d63209cf8589ce7aef8f262437163c67577ed09f3e636a9d8e0813843fb8bf1
rpc_urls:
  - https://fullnode.testnet.sui.io:443
```

The current Testnet package IDs can be found in the `Move.lock` files in the subdirectories of the `testnet-contracts` directory on GitHub.

### Testnet WAL faucet

The Walrus Testnet uses Testnet WAL tokens to buy storage and stake. Testnet WAL tokens have no value and can be exchanged (at a 1:1 rate) for some Testnet SUI tokens, which also have no value, through the following command:

```bash
walrus get-wal
```

You can check that you have received Testnet WAL by checking the Sui balances:

```
$ sui client balance
╭─────────────────────────────────────────╮
│ Balance of coins owned by this address  │
├─────────────────────────────────────────┤
│ ╭─────────────────────────────────────╮ │
│ │ coin  balance (raw)     balance     │ │
│ ├─────────────────────────────────────┤ │
│ │ Sui   8869252670        8.86 SUI    │ │
│ │ WAL   500000000         0.50 WAL    │ │
│ ╰─────────────────────────────────────╯ │
╰─────────────────────────────────────────╯
```

By default, 0.5 SUI are exchanged for 0.5 WAL, but a different amount of SUI may be exchanged using the `--amount` option (the value is in MIST/FROST), and a specific SUI/WAL exchange object may be used through the `--exchange-id` option. The `walrus get-wal --help` command provides more information about those.

## Running a local Walrus network

In addition to publicly deployed Walrus networks, you can deploy a Walrus testbed on your local machine for local testing. All you need to do is run the script `scripts/local-testbed.sh` found in the Walrus git code repository. See `scripts/local-testbed.sh -h` for further usage information.

The script generates configuration that you can use when running the Walrus client and prints the path to that configuration file.

In addition, one can spin up a local grafana instance to visualize the metrics collected by the storage nodes. This can be done via `cd docker/grafana-local; docker compose up`. This should work with the default storage node configuration.

Note that while the Walrus storage nodes of this testbed run on your local machine, the Sui Devnet is used by default to deploy and interact with the contracts. To run the testbed fully locally, simply start a local network with `sui start --with-faucet --force-regenesis` (requires `sui` to be v1.28.0 or higher) and specify `localnet` when starting the Walrus testbed.

***

# Interacting with Walrus

We provide 3 ways to interact directly with the Walrus storage system:

1. Through the Walrus client command line interface (CLI).
2. Through a JSON API of the Walrus CLI.
3. Through an HTTP API exposed by a public or local Walrus client daemon.

Furthermore, users can stake and unstake through the staking dApp or Sui smart contracts.

# Using the Walrus client

The `walrus` binary can be used to interact with Walrus as a client. See the setup chapter for prerequisites, installation, and configuration.

Detailed usage information including a full list of available commands can be viewed with

```bash
walrus --help
```

Each sub-command of `walrus` can also be called with `--help` to print its specific arguments and their meaning.

If you have multiple contexts in your configuration file (as in the default one included on the setup page), you can specify the context for each command through the `--context` option.

You can generate a bash/zsh/fish completion script with `walrus completion` and place it in the appropriate directory like `~/.local/share/bash-completion/completions`.

## Walrus system information

Information about the Walrus system is available through the `walrus info` command. It provides an overview of current system parameters such as the current epoch, the number of storage nodes and shards in the system, the maximum blob size, and the current cost in WAL for storing blobs:

```
$ walrus info
Walrus system information

Epochs and storage duration
Current epoch: 1
Start time: 2025-03-25 15:00:24.408 UTC
End time: 2025-04-08 15:00:24.408 UTC
Epoch duration: 14days

Blobs can be stored for at most 53 epochs in the future.

Storage nodes
Number of storage nodes: 103
Number of shards: 1000

Blob size
Maximum blob size: 13.6 GiB (14,599,533,452 B)
Storage unit: 1.00 MiB

Storage prices per epoch
(Conversion rate: 1 WAL = 1,000,000,000 FROST)
Price per encoded storage unit: 0.0001 WAL
Additional price for each write: 20,000 FROST
...
```


### Epoch duration

The epoch duration on Mainnet is 2 weeks. See here for other parameters on Mainnet and Testnet.

### FROST and WAL

FROST is the smaller unit of WAL, similar to MIST for SUI. The conversion is also the same as for SUI: `1 WAL = 1 000 000 000 FROST`.

Additional information such as encoding parameters and sizes, BFT system information, and information on the storage nodes in the current and (if already selected) the next committee, including their node IDs and stake and shard distribution can be viewed with various subcommands, see `walrus info --help` for details. Note that the previous `--dev` option has been replaced by the `all` subcommand.

The health of storage nodes can be checked with the `walrus health` command. This command takes different options to select the nodes to check (see `walrus health --help` for details). For example, `walrus health --committee` checks the status of all current committee members.

## Storing blobs

> **Public access**: All blobs stored in Walrus are public and discoverable by all. Therefore you must not use Walrus to store anything that contains secrets or private data without additional measures to protect confidentiality.

> **Warning**: It must be ensured that only a single process uses the Sui wallet for write actions (storing or deleting). When using multiple instances of the client simultaneously, each of them must be pointed to a different wallet. Note, it is possible to store multiple blobs with a single `walrus store` command.

Storing one or multiple blobs on Walrus can be achieved through the following command:

```bash
walrus store <FILES> --epochs <EPOCHS>
```

A mandatory CLI argument must be set to specify the lifetime for the blob. There are currently three ways for this:

1. The `--epochs <EPOCHS>` option indicates the number of epochs the blob should be stored for. There is an upper limit on the number of epochs a blob can be stored for, which is 53, corresponding to two years. In addition to a positive integer, you can also use `--epochs max` to store the blob for the maximum number of epochs. Note that the end epoch is defined as the current epoch plus the specified number of epochs.
2. The `--earliest-expiry-time <EARLIEST_EXPIRY_TIME>` option takes a date in RFC3339 format (e.g., "2024-03-20T15:00:00Z") or a more relaxed format (e.g., "2024-03-20 15:00:00") and ensures the blob expires after that date if possible.
3. The `--end-epoch <END_EPOCH>` option takes a specific end epoch for the blob.

### End epoch

A blob expires at the beginning of its end epoch. For example, a blob with end epoch `314` will become unavailable at the beginning of epoch `314`. One consequence of this is that when storing a blob with `--epochs 1` immediately before an epoch change, it will expire and become unavailable almost immediately. Note that blobs can be extended only if they have not expired.

You can store a single file or multiple files, separated by spaces. Notably, this is compatible with glob patterns; for example, `walrus store *.png --epochs <EPOCHS>` will store all PNG files in the current directory.

By default, the command will store the blob as a permanent blob, although this is going to change in the near future. See the section on deletable blobs for more details on deletable blobs. Also, by default an owned `Blob` object is created. It is possible to wrap this into a shared object, which can be funded and extended by anyone, see the shared blobs section.

When storing a blob, the client performs a number of automatic optimizations, including the following:

- If the blob is already stored as a permanent blob on Walrus for a sufficient number of epochs the command does not store it again. This behavior can be overwritten with the `--force` CLI option, which stores the blob again and creates a fresh blob object on Sui belonging to the wallet address.
- If the user's wallet has a storage resource of suitable size and duration, it is (re-)used instead of buying a new one.
- If the blob is already certified on Walrus but as a deletable blob or not for a sufficient number of epochs, the command skips sending encoded blob data to the storage nodes and just collects the availability certificate


### Costs

We have a separate page with some considerations regarding cost.

### Using a Walrus upload relay

> **Minimum CLI version**: The Walrus upload relay functionality is only available in the Walrus CLI version v1.29 or higher.

A Walrus upload relay is a third party service that can help clients with limited bandwidth and networking capabilities (a browser, for example) in storing blobs on Walrus.

The asset management on chain (buying storage, registering and certifying blobs) still happens on the client; the upload relay just takes the unencoded blob, encodes it, and sends the slivers to the storage nodes, finally returning the certificate. See in-depth details in the Walrus upload relay section of these docs.

When storing blobs with the `walrus store` command (and also when storing quilts) you can use the `--upload-relay` flag with a URL to specify an upload relay server be used by the CLI.

#### Tipping

The upload relay is a third party service that may require a fee, or "tip". This tip may be a constant SUI amount per blob stored, or dependent on the size of the blob being stored.

The Walrus CLI will show you how much tip the upload relay requires, and will ask for confirmation before continuing.

The technical details on how the tip is computed and paid are here.

## Querying blob status

The status of a blob can be queried through one of the following commands:

```bash
walrus blob-status --blob-id <BLOB_ID>
walrus blob-status --file <FILE>
```

This returns whether the blob is stored and its availability period. If you specify a file with the `--file` option,the CLI re-encodes the content of the file and derives the blob ID before checking the status.

When the blob is available, the `blob-status` command also returns the `BlobCertified` Sui event ID, which consists of a transaction ID and a sequence number in the events emitted by the transaction. The existence of this event certifies the availability of the blob.

## Reading blobs

Reading blobs from Walrus can be achieved through the following command:

```bash
walrus read <some blob ID>
```

By default the blob data is written to the standard output. The `--out <OUT>` CLI option can be used to specify an output file name. The `--rpc-url <URL>` may be used to specify a Sui RPC node to use instead of the one set in the wallet configuration or the default one.

## Extending the lifetime of a blob

Recall that when you stored your blob, it was necessary to specify its end epoch. By specifying the end epoch you ensured that the blob would be available via `walrus read` (or other SDK access to Walrus) until that end epoch is reached.

Walrus blob lifetimes can be extended as long as the blobs are not expired using the `walrus extend --blob-obj-id <blob object id> ...` command. Both regular single-address owned blobs and shared blobs may be extended. Shared blobs may be extended by anyone, but owned blobs may only be extended by their owner. When extending a shared blob, you will need to supply the `--shared` flag to inform the command that the blob is shared.

Note that the blob's object ID will be needed in order to extend it, the blob ID is not needed. See `walrus extend --help` for more information on blob extension.

## Reclaiming space via deletable blobs

By default `walrus store` uploads a permanent blob available until after its expiry epoch. Not even the uploader may delete it beforehand. However, optionally, the store command may be invoked with the `--deletable` flag, to indicate the blob may be deleted before its expiry by the owner of the Sui blob object representing the blob. Deletable blobs are indicated as such in the Sui events that certify them, and should not be relied upon for availability by others.

A deletable blob may be deleted with the command:

```bash
walrus delete --blob-id <BLOB_ID>
```

Optionally the delete command can be invoked by specifying a `--file <PATH>` option, to derive the blob ID from a file, or `--object-id <SUI_ID>` to delete the blob in the Sui blob object specified.

Before deleting a blob, the `walrus delete` command will ask for confirmation unless the `--yes` option is specified.

The delete command reclaims the storage object associated with the deleted blob, which is re-used to store new blobs. The delete operation provides flexibility around managing storage costs and re-using storage.

### Delete reclaims space only

The delete operation has limited utility for privacy: It only deletes slivers from the current epoch storage nodes, and subsequent epoch storage nodes, if no other user has uploaded a copy of the same blob. If another copy of the same blob exists in Walrus, the delete operation will not make the blob unavailable for download, and `walrus read` invocations will download it. After the deletion is finished, the CLI checks the updated status of the blob to see if it is still accessible in Walrus (unless the `--no-status-check` option is specified). However, even if it isn't, copies of the public blob may be cached or downloaded by users, and these copies are not deleted.

> **Warning**: All blobs stored in Walrus are public and discoverable by all. The delete command will not delete slivers if other copies of the blob are stored on Walrus possibly by other users. It does not delete blobs from caches, slivers from past storage nodes, or copies that could have been made by users before the blob was deleted.

## Shared blobs

Shared blobs are shared Sui objects wrapping "standard" `Blob` objects that can be funded and whose lifetime can be extended by anyone. See the shared blobs contracts for further details.

You can create a shared blob from an existing `Blob` object you own with the `walrus share` command:

```bash
walrus share --blob-obj-id <BLOB_OBJ_ID>
```

The resulting shared blob can be directly funded by adding an `--amount`, or you can fund an existing shared blob with the `walrus fund-shared-blob` command. Additionally, you can immediately share a newly created blob by adding the `--share` option to the `walrus store` command.

Shared blobs can only contain permanent blobs and as such cannot be deleted before their expiry.

See this section for more on blob extension.

## Batch-storing blobs with quilts

> **Note**: The quilt feature is only available in Walrus version v1.29 or higher.

> **Warning**:
> - Blobs within a quilt are retrieved by a `QuiltPatchId`, not their standard `BlobId`. This ID is generated based on all blobs in the quilt, so a blob's `QuiltPatchId` will change if it's moved to a different quilt.
> - Standard blob operations like `delete`, `extend`, or `share` cannot target individual blobs inside a quilt; they must be applied to the entire quilt.

For efficiently storing large numbers of small blobs, Walrus provides the Quilt. It batches multiple blobs into a single storage unit, significantly reducing overhead and cost. You can find a more detailed overview of the feature Quilt.

You can interact with quilts using a dedicated set of `walrus` subcommands.

### Storing Blobs as a Quilt

To batch-store multiple files as a single quilt, use the `store-quilt` command. You can specify the files to include in two ways:

> **Warning**: You must ensure that all the identifiers are unique within a quilt, the operation will fail otherwise. Identifiers are the unique names used to retrieve individual blobs from within a quilt.

#### Using --paths

To store all files from one or more directories recursively. The filename of each file will be used as its unique identifier within the quilt. Regular expressions are supported for uploading from multiple paths, same as the `walrus store` command.

```bash
walrus store-quilt --epochs <EPOCHS> --paths <path-to-directory-1> <path-to-directory-2> <path-to-blob>
```

Like the regular store command, you can specify the storage duration using `--epochs`, `--earliest-expiry-time`, or `--end-epoch`.

#### Using --blobs

To specify a list of blobs as JSON objects. This gives you more control, allowing you to set a custom `identifier` and `tags` for each file. If `identifier` is `null` or omitted, the file's name is used instead.

```bash
walrus store-quilt \
  --blobs '{"path":"<path-to-blob-1>","identifier":"walrus","tags":{"color":"grey","size":"medium"}}' \
          '{"path":"<path-to_blob-2>","identifier":"seal","tags":{"color":"grey","size":"small"}}' \
  --epochs <EPOCHS>
```


### Reading Blobs from a Quilt

You can retrieve individual blobs (formally "patches") from a quilt without downloading the entire quilt. The `read-quilt` command allows you to query for specific blobs by their identifier, tags, or unique patch ID.

To read blobs by their identifiers, use the `--identifiers` flag:

```bash
walrus read-quilt --out <download dir> \
  --quilt-id 057MX9PAaUIQLliItM_khR_cp5jPHzJWf-CuJr1z1ik --identifiers walrus.jpg another-walrus.jpg
```

Blobs within a quilt can be accessed and filtered based on their tags. For instance, if you have a collection of animal images stored in a quilt, each labeled with a species tag such as "species=cat," you can download all images labeled as cats with the following command:

```bash
# Read all blobs with tag "size: medium"
walrus read-quilt --out <download dir> \
  --quilt-id 057MX9PAaUIQLliItM_khR_cp5jPHzJWf-CuJr1z1ik --tag species cat
```

You can also read a blob using its `QuiltPatchId`, which can be retrieved using `list-patches-in-quilt`.

```bash
walrus read-quilt --out <download dir> \
  --quilt-patch-ids GRSuRSQ_hLYR9nyo7mlBlS7MLQVSSXRrfPVOxF6n6XcBuQG8AQ \
  GRSuRSQ_hLYR9nyo7mlBlS7MLQVSSXRrfPVOxF6n6XcBwgHHAQ
```


### List patches in a Quilt

To see all the patches contained within a quilt, along with their identifiers and `QuiltPatchIds`, use the `list-patches-in-quilt` command.

```bash
walrus list-patches-in-quilt 057MX9PAaUIQLliItM_khR_cp5jPHzJWf-CuJr1z1ik
```


## Blob object and blob ID utilities

The command `walrus blob-id <FILE>` may be used to derive the blob ID of any file. The blob ID is a commitment to the file, and any blob with the same ID will decode to the same content.

The blob ID is a 256 bit number and represented on some Sui explorer as a decimal large number. The command `walrus convert-blob-id <BLOB_ID_DECIMAL>` may be used to convert it to a base64 URL safe encoding used by the command line tools and other APIs.

The `walrus list-blobs` command lists all the non expired Sui blob object that the current account owns, including their blob ID, object ID, and metadata about expiry and deletable status. The option `--include-expired` also lists expired blob objects.

The Sui storage cost associated with blob objects may be reclaimed by burning the Sui blob object. This does not lead to the Walrus blob being deleted, but means that operations such as extending its lifetime, deleting it, or modifying attributes are no more available. The `walrus burn-blobs --object-ids <BLOB_OBJ_IDS>` command may be used to burn a specific list of blobs object IDs. The `--all` flag burns all blobs under the user account, and `--all-expired` burns all expired blobs under the user account.

## Blob attributes

Walrus allows a set of key-value attribute pairs to be associated with a blob object. While the key and values may be arbitrary strings to accommodate any needs of dapps, specific keys are converted to HTTP headers when serving blobs through aggregators. Each aggregator can decide which headers it allows through the `--allowed-headers` CLI option; the defaults can be viewed through `walrus aggregator --help`.

The command

```bash
walrus set-blob-attribute <BLOB_OBJ_ID> --attr "key1" "value1" --attr "key2" "value2"
```

sets attributes `key1` and `key2` to values `value1` and `value2`, respectively. The command `walrus get-blob-attribute <BLOB_OBJ_ID>` returns all attributes associated with a blob ID.

Finally,

```bash
walrus remove-blob-attribute-fields <BLOB_OBJ_ID> --keys "key1,key2"
```

deletes the attributes with keys listed (separated by commas or spaces). All attributes of a blob object may be deleted by the command `walrus remove-blob-attribute <BLOB_OBJ_ID>`.

Note that attributes are associated with blob object IDs on Sui, rather than the blob themselves on Walrus. This means that the gas for storage is reclaimed by deleting attributes. And also that the same blob contents may have different attributes for different blob objects for the same blob ID.

## Changing the default configuration

Use the `--config` option to specify a custom path to the configuration location.

The `--wallet <WALLET>` argument may be used to specify a non-standard Sui wallet configuration file. And a `--gas-budget <GAS_BUDGET>` argument may be used to change the maximum amount of Sui (in MIST) that the command is allowed to use.

## Logging and metrics

The `walrus` CLI allows for multiple levels of logging, which can be turned on via an env variable:

```bash
RUST_LOG=walrus=trace walrus info
```

By default `info` level logs are enabled, but `debug` and `trace` can give a more intimate understanding of what a command does, or how it fails.

***

# JSON mode

All Walrus client commands are also available in JSON mode. In this mode, all the command-line flags of the original CLI command can be specified in JSON format. The JSON mode therefore simplifies programmatic access to the CLI.

For example, to store a blob, run:

```bash
walrus json \
    '{
        "config": "path/to/client_config.yaml",
        "command": {
            "store": {
                "files": ["README.md", "LICENSE"],
                "epochs": 100
            }
        }
    }'
```

Or, to read a blob knowing the blob ID:

```bash
walrus json \
    '{
        "config": "path/to/client_config.yaml",
        "command": {
            "read": {
                "blobId": "4BKcDC0Ih5RJ8R0tFMz3MZVNZV8b2goT6_JiEEwNHQo"
            }
        }
    }'
```

All options, default values, and commands are equal to those of the "standard" CLI mode, except that they are written in "camelCase" instead of "kebab-case".

The `json` command also accepts input from stdin.

The output of a `json` command will itself be JSON-formatted, again to simplify parsing the results in a programmatic way. For example, the JSON output can be piped to the `jq` command for parsing and manually extracting relevant fields.

***

# Client Daemon mode \& HTTP API

In addition to the CLI and JSON modes, the Walrus client offers a daemon mode. In this mode, it runs a simple web server offering HTTP interfaces to store and read blobs in an aggregator and publisher role respectively. We also offer public aggregator and publisher services to try the Walrus HTTP APIs without the need to run a local client. See how to operate an aggregator or publisher in the operator documentation.

## HTTP API Usage

For the following examples, we assume you set the `AGGREGATOR` and `PUBLISHER` environment variables to your desired aggregator and publisher, respectively. For example, the instances run by Mysten Labs on Walrus Testnet (see below for further public options):

```bash
AGGREGATOR=https://aggregator.walrus-testnet.walrus.space
PUBLISHER=https://publisher.walrus-testnet.walrus.space
```


### API specification

Walrus aggregators and publishers expose their API specifications at the path `/v1/api`. You can view this in the browser, for example, at https://aggregator.walrus-testnet.walrus.space/v1/api.

### Store

You can interact with the daemon through simple HTTP PUT requests. For example, with cURL, you can store blobs using a publisher or daemon as follows:

```bash
# store the string `some string` for 1 storage epoch
curl -X PUT "$PUBLISHER/v1/blobs" -d "some string"

# store file `some/file` for 5 storage epochs
curl -X PUT "$PUBLISHER/v1/blobs?epochs=5" --upload-file "some/file"

# store file `some/file` and send the blob object to $ADDRESS
curl -X PUT "$PUBLISHER/v1/blobs?send_object_to=$ADDRESS" --upload-file "some/file"

# store file `some/file` as a deletable blob, instead of a permanent one and send the blob object to $ADDRESS
curl -X PUT "$PUBLISHER/v1/blobs?deletable=true&send_object_to=$ADDRESS" --upload-file "some/file"
```

The store HTTP API end points return information about the blob stored in JSON format. When a blob is stored for the first time, a `newlyCreated` field contains information about the new blob:

```json
$ curl -X PUT "$PUBLISHER/v1/blobs" -d "some other string"
{
  "newlyCreated": {
    "blobObject": {
      "id": "0xe91eee8c5b6f35b9a250cfc29e30f0d9e5463a21fd8d1ddb0fc22d44db4eac50",
      "registeredEpoch": 34,
      "blobId": "M4hsZGQ1oCktdzegB6HnI6Mi28S2nqOPHxK-W7_4BUk",
      "size": 17,
      "encodingType": "RS2",
      "certifiedEpoch": 34,
      "storage": {
        "id": "0x4748cd83217b5ce7aa77e7f1ad6fc5f7f694e26a157381b9391ac65c47815faf",
        "startEpoch": 34,
        "endEpoch": 35,
        "storageSize": 66034000
      },
      "deletable": false
    },
    "resourceOperation": {
      "registerFromScratch": {
        "encodedLength": 66034000,
        "epochsAhead": 1
      }
    },
    "cost": 132300
  }
}
```

The information returned is the content of the Sui blob object.

When the publisher finds a certified blob with the same blob ID and a sufficient validity period, it returns a `alreadyCertified` JSON structure:

```json
$ curl -X PUT "$PUBLISHER/v1/blobs" -d "some other string"
{
  "alreadyCertified": {
    "blobId": "M4hsZGQ1oCktdzegB6HnI6Mi28S2nqOPHxK-W7_4BUk",
    "event": {
      "txDigest": "4XQHFa9S324wTzYHF3vsBSwpUZuLpmwTHYMFv9nsttSs",
      "eventSeq": "0"
    },
    "endEpoch": 35
  }
}
```

The field `event` returns the Sui event ID that can be used to find the transaction that created the Sui Blob object on the Sui explorer or using a Sui SDK.

### Read

Blobs may be read from an aggregator or daemon using HTTP GET using their blob ID. For example, the following cURL command reads a blob and writes it to an output file:

```bash
curl "$AGGREGATOR/v1/blobs/<some blob ID>" -o <some file name>
```

Alternatively you may print the contents of a blob in the terminal with the cURL command:

```bash
curl "$AGGREGATOR/v1/blobs/<some blob ID>"
```


#### Content sniffing

Modern browsers will attempt to sniff the content type for such resources, and will generally do a good job of inferring content types for media. However, the aggregator on purpose prevents such sniffing from inferring dangerous executable types such as JavaScript or style sheet types.

Blobs may also be read by using the object ID of a Sui blob object or a shared blob. For example the following cURL command downloads the blob corresponding to a Sui blob with a specific object ID:

```bash
curl "$AGGREGATOR/v1/blobs/by-object-id/<object-id>" -o <some file name>
```

Downloading blobs by object ID allows the use of attributes to set some HTTP headers. The aggregator recognizes the attribute keys `content-disposition`, `content-encoding`, `content-language`, `content-location`, `content-type`, and `link`, and when present returns the values in the corresponding HTTP headers.

## Quilt HTTP APIs

Walrus supports storing and retrieving multiple blobs as a single unit called a quilt. The publishers and aggregators support quilt related operations.

Note Quilt APIs are supported with Walrus 1.29 and higher.

### Storing quilts

All the query parameters available for storing regular blobs (see Store section above) can also be used when storing quilts.

Use the following publisher API to store multiple blobs as a quilt:

> **Tip**: All the query parameters available for storing regular blobs (see Store section above) can also be used when storing quilts.

```bash
# Store two files `document.pdf` and `image.png`, with custom identifiers `contract-v2` and
# `logo-2024, respectively.
curl -X PUT "$PUBLISHER/v1/quilts?epochs=5" \
  -F "contract-v2=@document.pdf" \
  -F "logo-2024=@image.png"

# Store two files with Walrus-native metadata. The metadata are assigned to the blob with
# the same identifier. Note: `_metadata` must be used as the field name for Walrus-native metadata.
curl -X PUT "$PUBLISHER/v1/quilts?epochs=5" \
  -F "quilt-manual=@document.pdf" \
  -F "logo-2025=@image.png" \
  -F '_metadata=[
    {"identifier": "quilt-manual", "tags": {"creator": "walrus", "version": "1.0"}},
    {"identifier": "logo-2025", "tags": {"type": "logo", "format": "png"}}
  ]'
```

> **Warning**: Identifiers must be unique within a quilt.

> **Info**: Since identifiers cannot start with `_`, the field name `_metadata` is reserved for Walrus native metadata and won't conflict with user-defined identifiers. See Quilt documentation for complete identifier restrictions.

The quilt store API returns a JSON response with information about the stored quilt, including the quilt ID (`blobId`) and individual blob patch IDs that can be used to retrieve specific blobs later. The following example shows the command and response (the actual JSON output is returned as a single line; it's formatted here for readability):

```bash
$ curl -X PUT "http://127.0.0.1:31415/v1/quilts?epochs=1" \
  -F "walrus.jpg=@./walrus-33.jpg" \
  -F "another_walrus.jpg=@./walrus-46.jpg"
```

```json
{
  "blobStoreResult": {
    "newlyCreated": {
      "blobObject": {
        "id": "0xe6ac1e1ac08a603aef73a34328b0b623ffba6be6586e159a1d79c5ef0357bc02",
        "registeredEpoch": 103,
        "blobId": "6XUOE-Q5-nAXHRifN6n9nomVDtHZQbGuAkW3PjlBuKo",
        "size": 1782224,
        "encodingType": "RS2",
        "certifiedEpoch": null,
        "storage": {
          "id": "0xbc8ff9b4071927689d59468f887f94a4a503d9c6c5ef4c4d97fcb475a257758f",
          "startEpoch": 103,
          "endEpoch": 104,
          "storageSize": 72040000
        },
        "deletable": false
      },
      "resourceOperation": {
        "registerFromScratch": {
          "encodedLength": 72040000,
          "epochsAhead": 1
        }
      },
      "cost": 12075000
    }
  },
  "storedQuiltBlobs": [
    {
      "identifier": "another_walrus.jpg",
      "quiltPatchId": "6XUOE-Q5-nAXHRifN6n9nomVDtHZQbGuAkW3PjlBuKoBA

<div style="text-align: center">⁂</div>

[^1]: Walrus.pdf```

