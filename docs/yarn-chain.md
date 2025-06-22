# Yarn Chain Command Documentation

## Overview

The `yarn chain` command is a fundamental part of the Scaffold-ETH 2 development workflow. It starts a local Ethereum blockchain network for development and testing purposes.

## Command Chain

When you run `yarn chain`, the following command chain is executed:

1. **Root package.json** (line 22):

   ```json
   "hardhat:chain": "yarn workspace @se-2/hardhat chain"
   ```

2. **Hardhat package.json** (line 9):

   ```json
   "chain": "hardhat node --network hardhat --no-deploy"
   ```

3. **Final execution**:
   ```bash
   hardhat node --network hardhat --no-deploy
   ```

## What It Does

### Core Functionality

- **Starts a local Ethereum node** running on `http://127.0.0.1:8545`
- **Creates 20 pre-funded test accounts** with 10,000 ETH each
- **Provides JSON-RPC endpoints** for HTTP and WebSocket connections
- **Maintains blockchain state** in memory (resets when restarted)

### Network Configuration

The "hardhat" network is configured in `packages/hardhat/hardhat.config.ts`:

```typescript
hardhat: {
  forking: {
    url: `https://eth-mainnet.alchemyapi.io/v2/${providerApiKey}`,
    enabled: process.env.MAINNET_FORKING_ENABLED === "true",
  },
},
```

## Output Explanation

When you run `yarn chain`, you'll see output like this:

```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.

Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

... (18 more accounts)
```

### What Each Part Means

1. **Server Information**:

   - `Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/`
   - Your local blockchain is now accessible via HTTP and WebSocket protocols
   - This is the endpoint your dApp connects to

2. **Test Accounts**:

   - 20 accounts are created automatically
   - Each account has 10,000 test ETH (not real ETH)
   - Account #0 is typically used as the deployer account
   - Private keys are hardcoded and publicly known

3. **Important Warnings**:
   - These accounts are for development only
   - Never send real ETH to these addresses on mainnet
   - Funds sent to these addresses on real networks will be lost permanently

## Key Differences from Real Ethereum

| Aspect          | Real Ethereum Node          | Hardhat Node                         |
| --------------- | --------------------------- | ------------------------------------ |
| **Network**     | Connected to global network | Isolated local network               |
| **Consensus**   | Proof of Stake (PoS)        | Instant mining (no consensus needed) |
| **Block Time**  | ~12 seconds                 | Instant                              |
| **Persistence** | Permanent                   | Resets when restarted                |
| **Accounts**    | Real accounts with real ETH | Pre-funded test accounts             |
| **Gas Fees**    | Real ETH costs              | Free (test ETH)                      |

## Development Workflow

### Typical Usage

1. **Start the chain**: `yarn chain`
2. **Deploy contracts**: `yarn deploy` (in a separate terminal)
3. **Start frontend**: `yarn start` (in another terminal)
4. **Test your dApp**: Visit `http://localhost:3000/debug`

### Benefits

- ✅ **Same APIs**: Your dApp code works identically to production
- ✅ **Same Transactions**: Send transactions, deploy contracts, call functions
- ✅ **Same Events**: Contract events work the same way
- ✅ **Same Gas**: Gas calculations work (though you don't pay real fees)
- ✅ **Same Tooling**: All Ethereum tools (MetaMask, ethers.js, etc.) work
- ✅ **Fast Iteration**: No waiting for block confirmations
- ✅ **No Real Costs**: Test without spending real ETH

## Important Notes

### Security

- **Never use test accounts on mainnet**: These private keys are publicly known
- **Development only**: These accounts don't exist on real networks
- **Reset on restart**: All blockchain state is lost when you stop and restart

### Persistence

- The local blockchain runs in memory
- All transactions, contracts, and state are reset when you restart `yarn chain`
- This is perfect for testing but means you need to redeploy contracts after restarting

### Network Isolation

- Your local blockchain is completely isolated from real Ethereum networks
- No transactions or state changes affect real networks
- Perfect for safe development and testing

## Related Commands

- `yarn fork`: Starts a local blockchain that forks from Ethereum mainnet
- `yarn deploy`: Deploys contracts to the local blockchain
- `yarn start`: Starts the frontend application
- `yarn test`: Runs tests against the local blockchain

## Troubleshooting

### Common Issues

1. **Port 8545 already in use**: Another instance might be running
2. **Cannot connect**: Make sure the chain is running before starting the frontend
3. **Contracts not found**: Run `yarn deploy` after starting the chain

### Stopping the Chain

- Use `Ctrl+C` to stop the local blockchain
- All state will be reset when you restart
