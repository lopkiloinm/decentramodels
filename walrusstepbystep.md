<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# give me a full step by step so a cursor agent can do everything for me

Here’s a **comprehensive, step-by-step workflow** for deploying a Walrus storage contract on Sui testnet—designed so a cursor agent (automation bot or assistant) could execute each step for you in a hackathon setting.

***

## 1. Install Prerequisites

- **Install Sui CLI**

```bash
curl -fsSL https://install.sui.io | sh
# Follow instructions to add Sui CLI to your PATH
sui --version
```

- **Install Walrus CLI or SDK**

```bash
npm install -g @mysten/walrus
# Or per docs if CLI is not available, setup SDK TypeScript/JS project
```

- **(Optional) Install Node.js \& Docker (for running Walrus node locally, if needed)**

```bash
# On Ubuntu:
sudo apt update && sudo apt install nodejs npm docker.io
```


***

## 2. Set Up Sui Testnet Wallet

- **Create or Recover Wallet**

```bash
sui client new-address ed25519
# Save mnemonic and address!
```

- **Switch Sui Environment to Testnet**

```bash
sui client switch --env testnet
```

- **Request Testnet SUI from Faucet**

```bash
sui client faucet --address <YOUR_ADDRESS>
```


***

## 3. Prepare and Build Your Storage Contract

- **Clone Example Storage Contract**

```bash
git clone https://github.com/MystenLabs/walrus
cd walrus/contracts/storage
```

- **Build Move Contract**

```bash
sui move build
# Outputs compiled .mv and .json artifacts
```


***

## 4. Deploy Your Storage Contract to Sui Testnet

- **Publish Move Package**

```bash
sui client publish --gas-budget 50000000 --path <CONTRACT_PATH>
# Note output: package ID and object IDs
```


***

## 5. Reserve Storage with Walrus on Sui Testnet

- **Call Storage Reservation Function**

```bash
sui client call --function acquire_storage --package <PACKAGE_ID> --module <MODULE> --args <SIZE_MB> --args <DAYS> --gas-budget 50000000
# Save storage object ID from output
```


***

## 6. Upload Your Data/Blob

- **Use Walrus CLI/SDK to Encode and Upload**

```bash
walrus upload --file myfile.png --storage-id <STORAGE_OBJECT_ID>
# Alternatively, use JS SDK in a script to call walrusClient.upload()
# Output: blob object ID, proof data
```


***

## 7. Register \& Manage Your Blob Onchain

- **Associate Data with Storage Contract**

```bash
sui client call --function register_blob --package <PACKAGE_ID> --module <MODULE> --args <STORAGE_OBJECT_ID> --args <BLOB_HASH> --gas-budget 20000000
# Output: registered blob object ID
```

- **Automate Renewals/Deletes (Optional, via Move contract calls)**

```bash
sui client call --function renew --package <PACKAGE_ID> --module <MODULE> --args <BLOB_ID> --args <ADDITIONAL_DAYS> --gas-budget 20000000
```


***

## 8. Verify and Interact

- **Fetch Data from Walrus Gateway**
    - Use APIs or SDK from frontend/backend to query or download blob data from Walrus testnet nodes.
- **Check Storage Status**

```bash
sui client object <STORAGE_OBJECT_ID>
```


***

## 9. Clean Up/Test Automation Script

- **Remove/Update Blobs as Needed**

```bash
sui client call --function delete_blob --package <PACKAGE_ID> --module <MODULE> --args <BLOB_ID> --gas-budget 20000000
```


***

## 10. Submit for Hackathon

- **Document all steps, command outputs, addresses, and IDs**
- **Provide script or automation instructions (e.g., in Shell/TypeScript/JS) so judges/cursor agent can reproduce**

***

# Example Automation Script Snippet (Shell/CLI)

```bash
#!/bin/bash
# Assumes Sui CLI and Walrus CLI installed, env vars set

# Create wallet, request faucet
sui client new-address ed25519
sui client faucet --address $ADDRESS

# Publish & Reserve Storage
sui client publish --gas-budget 50000000 --path ./storage
STORAGE_ID=$(sui client call --function acquire_storage ... | grep objectId)

# Upload file
walrus upload --file hack.png --storage-id $STORAGE_ID

# Register blob
sui client call --function register_blob ... --args $STORAGE_ID --args $BLOB_HASH

# Done! Output logs and IDs for verification
```


***

**With these steps, a cursor agent or automation script can handle every phase of deploying, uploading, and managing Walrus storage contracts on Sui testnet for your hackathon, with no manual intervention required.**

