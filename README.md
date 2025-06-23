# The Clicker 🖱️

> An Ethereum-based experimental DApp that combines a simple counter mechanic with token incentives and autonomous AI agent integration.

[![Solidity](https://img.shields.io/badge/Solidity-0.8.31-blue.svg)](https://docs.soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-2.19.0-orange.svg)](https://hardhat.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black.svg)](https://nextjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENCE)

## 🎯 Overview

**The Clicker** is a foundational project exploring Ethereum's smart contract capabilities, on-chain/off-chain hybrid design, tokenomics, and AI delegation strategies. It starts as a simple counter DApp and evolves into a complex system with token incentives and autonomous agents.

### 🚀 Current Status: Phase 1 - Minimal On-Chain Clicker

We're currently building the foundation - a basic smart contract that tracks global and user-specific click counts.

## 🛠️ Tech Stack

- **Smart Contracts**: Solidity 0.8.31
- **Development Framework**: [Scaffold-ETH 2](https://github.com/scaffold-eth/scaffold-eth-2)
- **Blockchain Development**: Hardhat
- **Frontend**: Next.js 14 with TypeScript
- **Wallet Integration**: RainbowKit + Wagmi
- **Testing**: Local Hardhat network + Sepolia testnet

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+
- Yarn package manager
- MetaMask wallet
- Some Sepolia testnet ETH (for deployment)

### Local Development

1. **Clone and install dependencies**

   ```bash
   git clone <your-repo-url>
   cd the_clicker
   yarn install
   ```

2. **Start local blockchain**

   ```bash
   yarn chain
   ```

   > **Note**: This resolves to `hardhat node --network hardhat --no-deploy`. If you're using Hardhat without Scaffold-ETH, the equivalent command would be `npx hardhat node`.

3. **Deploy contracts locally**

   ```bash
   yarn deploy
   ```

   > **Note**: This resolves to `ts-node scripts/runHardhatDeployWithPK.ts`. If you're using Hardhat without Scaffold-ETH, the equivalent command would be `npx hardhat run scripts/deploy.ts --network localhost`.

4. **Test contract manually** (Recommended first step)

   ```bash
   cd packages/hardhat
   npx hardhat console --network localhost
   ```

   Then test the contract:

   ```javascript
   > const contract = await ethers.getContractAt("TheClicker", "0x5FbDB2315678afecb367f032d93F642f64180aa3")
   > await contract.click()
   > await contract.totalClicks()
   ```

   > **See**: [Hardhat Manual Testing Guide](docs/hardhat-manual-testing.md) for complete testing workflow

5. **Start frontend** (Optional - for UI testing)

   ```bash
   yarn start
   ```

6. **Test via debug UI**
   - Navigate to `http://localhost:3000/debug`
   - Connect your wallet
   - Try the `click()` function!

### Testnet Deployment

1. **Set up environment**

   ```bash
   # Copy environment template
   cp .env.example .env

   # Edit .env with your API keys
   # - ALCHEMY_API_KEY: Get from https://dashboard.alchemyapi.io
   # - __RUNTIME_DEPLOYER_PRIVATE_KEY: Your MetaMask dev account private key
   # - ETHERSCAN_MAINNET_API_KEY: Get from https://etherscan.io/apis (optional)
   ```

2. **Get testnet ETH**

   - Sepolia faucet: [Alchemy](https://sepoliafaucet.com/) or [Infura](https://www.infura.io/faucet/sepolia)
   - Alternative faucets: [Chainlink](https://faucets.chain.link/sepolia) or [Paradigm](https://faucet.paradigm.xyz/)

3. **Deploy to testnet**

   ```bash
   yarn deploy --network sepolia
   ```

4. **Verify contract** (optional)
   ```bash
   yarn verify --network sepolia
   ```

> **📖 For detailed step-by-step instructions, see [Sepolia Deployment Guide](docs/sepolia-deployment.md)**

### Mainnet Deployment

> **🚧 Coming Soon - Not Yet Implemented**

Mainnet deployment will be available after thorough testing on Sepolia testnet and completion of security audits.

**Prerequisites for mainnet:**

- ✅ **Thorough testnet testing** completed
- ✅ **Security audit** performed
- ✅ **Gas optimization** completed
- ✅ **Real ETH** for deployment and gas fees
- ✅ **Production-ready** frontend and infrastructure

**Planned mainnet features:**

- **Token incentives** (Phase 3)
- **AI agent integration** (Phase 4)
- **Leaderboard analytics** (Phase 5)
- **Production monitoring** and alerting

> **📖 Mainnet deployment guide will be available in [docs/mainnet-deployment.md](docs/mainnet-deployment.md) when ready**

## 📋 Project Phases

| Phase       | Status         | Description                                   |
| ----------- | -------------- | --------------------------------------------- |
| **Phase 1** | 🚧 In Progress | Minimal on-chain clicker with CLI interaction |
| **Phase 2** | 📋 Planned     | Frontend MVP with wallet integration          |
| **Phase 3** | 📋 Planned     | Token incentives and ERC-20 integration       |
| **Phase 4** | 📋 Planned     | AI agent integration with delegation          |
| **Phase 5** | 📋 Planned     | Leaderboard and analytics dashboard           |

See [detailed project plan](docs/the-clicker.md) and [to-do list](docs/to-do.md) for more information.

## 🏗️ Architecture

### Smart Contract Features

- **Global Counter**: `totalCount` tracks all clicks across all users
- **User Tracking**: `userCounts` mapping tracks individual user clicks
- **Click Function**: `click()` increments both counters
- **Events**: Emits events for click tracking and analytics

### Frontend Features

- **Debug Interface**: Built-in contract interaction UI
- **Wallet Integration**: MetaMask connection via RainbowKit
- **Real-time Updates**: Live counter updates using Scaffold-ETH hooks
- **Transaction Feedback**: Loading states and error handling

## 🧪 Testing

### How Hardhat Tests Work

**No local node required!** Hardhat tests run on an **in-memory blockchain** that starts automatically:

- Tests run on a temporary, in-memory blockchain
- Each test gets a fresh blockchain state
- No manual node setup needed
- Perfect for fast, isolated testing

### Running Tests

```bash
# Run all tests
yarn test

# Run specific test file
yarn test TheClicker.ts

# Run tests with coverage
yarn test:coverage

# Run tests in watch mode (re-runs on file changes)
yarn test:watch
```

**Why `yarn test` works from root?**
This project uses **Yarn Workspaces** which automatically routes commands:

- Root `package.json` has: `"test": "yarn hardhat:test"`
- Which runs: `"hardhat:test": "yarn workspace @se-2/hardhat test"`
- This executes the test command in the hardhat package automatically

**Benefits of running from root:**

- ✅ **Simpler** - no need to navigate to subdirectories
- ✅ **Consistent** - same pattern for all commands (`yarn start`, `yarn deploy`, etc.)
- ✅ **Workspace-aware** - yarn handles the routing automatically

### Test Structure

Our test suite includes:

- **Contract deployment** validation
- **Core functionality** testing (`click()`, `getUserClicks()`)
- **Event emission** verification (for off-chain indexing)
- **Hybrid approach** validation (on-chain storage + events)
- **Gas efficiency** testing
- **Edge cases** and scalability testing

### Test Documentation

For detailed information about the testing stack and keywords used, see:

- [TheClicker Test Documentation](packages/hardhat/test/TheClicker.ts.md) - Complete guide to testing keywords, libraries, and concepts

### CLI Interaction

```bash
# Start Hardhat console
npx hardhat console --network localhost

# Interact with contract
> const contract = await ethers.getContract("TheClicker")
> await contract.click()
> await contract.totalClicks()
```

## 📚 Documentation

### Project Documentation

- [Project Plan](docs/the-clicker.md) - Detailed project overview and phases
- [To-Do List](docs/to-do.md) - Current tasks and progress tracking
- [Scaffold-ETH 2 Guide](docs/Scaffold-ETH_2_README.md) - Framework documentation

### Development Resources

- [Solidity Documentation](https://docs.soliditylang.org/) - Official Solidity language docs
- [NatSpec Format](https://docs.soliditylang.org/en/latest/natspec-format.html) - Smart contract documentation standard
- [Hardhat Documentation](https://hardhat.org/docs) - Development framework docs
- [Scaffold-ETH 2](https://github.com/scaffold-eth/scaffold-eth-2) - Framework repository
- [Storage vs Logs Guide](docs/storage-vs-logs.md) - On-chain storage vs emit logs for tracking and rankings

### Ethereum Resources

- [Ethereum.org](https://ethereum.org/developers/) - Official Ethereum developer docs
- [Sepolia Testnet](https://sepolia.dev/) - Testnet information
- [Etherscan](https://etherscan.io/) - Blockchain explorer

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENCE](LICENCE) file for details.

## 🙏 Acknowledgments

- [Scaffold-ETH 2](https://github.com/scaffold-eth/scaffold-eth-2) team for the amazing development framework
- Ethereum community for the innovative smart contract ecosystem
- All contributors and testers

---

**Built with ❤️ using Scaffold-ETH 2**

_For questions or support, please open an issue on GitHub._
