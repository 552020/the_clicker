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

3. **Deploy contracts locally**

   ```bash
   yarn deploy
   ```

4. **Start frontend**

   ```bash
   yarn start
   ```

5. **Test the contract**
   - Navigate to `http://localhost:3000/debug`
   - Connect your wallet
   - Try the `click()` function!

### Testnet Deployment

1. **Get testnet ETH**

   - Sepolia faucet: [Alchemy](https://sepoliafaucet.com/) or [Infura](https://www.infura.io/faucet/sepolia)

2. **Deploy to testnet**

   ```bash
   yarn deploy --network sepolia
   ```

3. **Verify contract** (optional)
   ```bash
   yarn verify --network sepolia
   ```

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

### Local Testing

```bash
# Run all tests
yarn test

# Run specific test file
yarn test YourContract.ts

# Test with coverage
yarn test:coverage
```

### CLI Interaction

```bash
# Start Hardhat console
npx hardhat console --network localhost

# Interact with contract
> const contract = await ethers.getContract("YourContract")
> await contract.click()
> await contract.totalCount()
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
