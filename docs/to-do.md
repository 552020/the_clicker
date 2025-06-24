# The Clicker — To-Do List

## Phase 1: Minimal On-Chain Clicker 🎯

### Smart Contract Development

- [x] **Write basic Solidity contract** (`TheClicker.sol`)
  - [x] Add `uint256 public totalClicks` variable
  - [x] Add `mapping(address => uint256) public userClicks` mapping
  - [x] Implement `function click() external` function
  - [x] Add `function getUserClicks(address user)` view function
  - [x] Follow proper Solidity naming conventions (PascalCase contract, camelCase functions/variables)
  - [x] **Implement hybrid approach (Option C)** - Add events for off-chain indexing
  - [x] Add `ClickEvent` event with indexed clicker address
  - [x] Emit events in `click()` function for future analytics
- [x] **Test contract locally**
  - [x] Write comprehensive test suite covering deployment, click functionality, events, gas efficiency, and edge cases
  - [x] Run `yarn test` to verify all tests pass (now fully compatible with ethers.js v6)

### Hybrid Implementation Testing

- [x] **Local testing with Hardhat**
  - [x] Deploy contract to local network
  - [x] Call `click()` from different addresses
  - [x] Verify `userClicks` mapping updates correctly
  - [x] Check emitted `ClickEvent` logs
  - [x] Test `getUserClicks()` function with different addresses
- [x] **Testnet deployment**
  - [x] Deploy to Sepolia testnet
  - [x] Verify contract on Etherscan
  - [x] Test `click()` function on live testnet
  - [x] Verify events are emitted correctly
- [ ] **Proof-of-concept off-chain ranking**
  - [ ] Write small script to read events and build ranking
  - [ ] Or create basic The Graph subgraph
  - [ ] Demonstrate off-chain ranking from emitted logs
  - [ ] Compare with on-chain `userClicks` data for verification

### Local Development Setup

- [x] **Configure Hardhat project**
  - [x] Create deployment script `01_deploy_clicker.ts`
  - [x] Update deployment script for TheClicker contract
  - [x] Set up proper contract deployment logic
- [x] **Configure testnet deployment**
  - [x] Add Sepolia network configuration
  - [x] Set up environment variables for private keys

### Local Testing & Interaction

- [x] **Start local blockchain**
  - [x] Run `yarn chain` to start local network
  - [x] Run `yarn deploy` to deploy contract locally
- [x] **Test CLI interaction**
  - [x] Use Hardhat console: `npx hardhat console --network localhost`
  - [x] Test `click()` function calls
  - [x] Verify state changes in contract
  - [x] **Complete manual testing workflow** - All steps from [Hardhat Manual Testing Guide](docs/hardhat-manual-testing.md) verified and working
- [x] **Test via debug UI**
  - [x] Run `yarn start` to start frontend
  - [x] Navigate to `http://localhost:3000/debug`
  - [x] Test contract interactions through UI
- [x] **Create command-line testing script**
  - [x] Create `clicker.sh` bash script for contract interaction
  - [x] Document script usage and setup in `clicker.sh.md`
  - [x] Test script functionality on Sepolia testnet

### Testnet Deployment

- [x] **Environment Setup**

  - [x] Copy `.env.example` to `.env`: `cp .env.example .env`
  - [x] Get Alchemy API key from https://dashboard.alchemyapi.io
  - [x] Export MetaMask dev account private key
  - [x] (Optional) Get Etherscan API key from https://etherscan.io/apis
  - [x] Fill in environment variables in `.env` file

- [x] **Get testnet ETH**

  - [x] Sepolia faucet: [Alchemy](https://sepoliafaucet.com/) or [Infura](https://www.infura.io/faucet/sepolia)
  - [x] Alternative faucets: [Chainlink](https://faucets.chain.link/sepolia) or [Paradigm](https://faucet.paradigm.xyz/)
  - [x] Verify balance: Check MetaMask or use `yarn account` to see account details

- [x] **Deploy to testnet**

  ```bash
  # Compile contracts first
  yarn compile

  # Deploy to Sepolia
  yarn deploy --network sepolia

  # Check deployment status
  yarn account
  ```

- [x] **Verify contract** (optional but recommended)

  ```bash
  # Verify on Etherscan (requires ETHERSCAN_MAINNET_API_KEY)
  yarn verify --network sepolia

  # Or verify manually on https://sepolia.etherscan.io/
  ```

- [x] **Test on testnet**

  - [x] Use Hardhat console: `npx hardhat console --network sepolia`
  - [x] Test `click()` function calls
  - [x] Verify state changes persist
  - [x] Check emitted events on Etherscan

## Phase 2: Frontend MVP 🖥️

### Basic Interface Implementation (Priority)

- [ ] **Create basic clicker interface in `page.tsx`**
  - [x] ~~Add wallet connection button using shadcn Button component~~ (Using Scaffold-ETH's pre-implemented `RainbowKitCustomConnectButton` in header)
  - [x] ~~Display connected address when wallet is connected~~ (Already implemented with `<Address address={connectedAddress} />`)
  - [ ] Add "Click" button that calls the smart contract's `click()` function
  - [ ] Add input field to enter an address and query their click count
  - [ ] Display total number of clicks from the contract
  - [ ] Display current user's click count
  - [ ] Use shadcn components (Button, Input, Card) for basic styling
  - [ ] Implement proper error handling for failed transactions
  - [ ] Add loading states during contract interactions

### Contract Integration

- [ ] **Use Scaffold-ETH hooks**
  - [ ] Implement `useScaffoldReadContract` for reading `totalClicks()`
  - [ ] Implement `useScaffoldReadContract` for reading `getUserClicks(address)`
  - [ ] Implement `useScaffoldWriteContract` for `click()` function
  - [ ] Add proper error handling and transaction status

### Wallet Integration

- [ ] **Connect MetaMask**
  - [ ] Test wallet connection on main page
  - [ ] Ensure proper network switching
  - [ ] Handle wallet disconnection gracefully

### UI Components

- [ ] **Create click interface**
  - [ ] Add "Click" button component
  - [ ] Display current `totalClicks`
  - [ ] Display user's `userClicks[address]`
- [ ] **Add transaction feedback**
  - [ ] Show transaction status (pending, success, error)
  - [ ] Add loading states during transactions

### Contract Integration

- [ ] **Use Scaffold-ETH hooks**
  - [ ] Implement `useScaffoldReadContract` for reading counts
  - [ ] Implement `useScaffoldWriteContract` for click function
  - [ ] Add proper error handling

---

## Phase 3: Token Incentives 🪙

### ERC-20 Token Contract

- [ ] **Create token contract**
  - [ ] Deploy ERC-20 token (or use existing SE-2 template)
  - [ ] Add minting logic to click function
  - [ ] Set up token distribution rules
- [ ] **Integrate with clicker**
  - [ ] Modify click function to mint tokens
  - [ ] Add token balance display
  - [ ] Test token distribution

### Frontend Updates

- [ ] **Display token information**
  - [ ] Show user's token balance
  - [ ] Display token distribution stats
  - [ ] Add token transfer functionality

---

## Phase 4: AI Agent Integration 🤖

### Off-Chain Infrastructure

- [ ] **Design agent architecture**
  - [ ] Plan agent interaction patterns
  - [ ] Design EIP-712 delegation system
- [ ] **Build agent system**
  - [ ] Create off-chain agent scripts
  - [ ] Implement signed delegation
  - [ ] Add agent metadata tracking

### Smart Contract Updates

- [ ] **Add delegation support**
  - [ ] Implement EIP-712 signature verification
  - [ ] Add delegated click function
  - [ ] Track agent interactions

---

## Phase 5: Leaderboard & Analytics 📊

### Data Indexing

- [ ] **Set up data indexing**
  - [ ] Choose between The Graph or custom solution
  - [ ] Create subgraph or indexing service
  - [ ] Index click events and user data

### Analytics Dashboard

- [ ] **Build leaderboard**
  - [ ] Display top clickers
  - [ ] Show daily/weekly stats
  - [ ] Add historical data visualization

---

## General Tasks 📋

### Code Quality

- [ ] **Add comprehensive tests**
  - [ ] Unit tests for all functions
  - [ ] Integration tests
  - [ ] Frontend component tests
- [ ] **Code review and optimization**
  - [ ] Gas optimization
  - [ ] Security audit
  - [ ] Code documentation

### Deployment & Infrastructure

- [ ] **Production deployment**
  - [ ] Deploy to mainnet
  - [ ] Set up monitoring
  - [ ] Configure CI/CD
- [ ] **Frontend deployment**
  - [ ] Deploy to Vercel/IPFS
  - [ ] Configure custom domain

---

## Immediate Next Steps (Priority Order) 🚀

1. **Create basic clicker interface in `page.tsx`** - Add wallet connection, click button, and display components
2. **Implement contract integration** - Use Scaffold-ETH hooks for reading and writing to the contract
3. **Add transaction feedback** - Show loading states and transaction status
4. **Test end-to-end user flow** - Complete user journey from wallet connection to clicking
5. **Create proof-of-concept off-chain ranking** - Build off-chain ranking from events (Phase 5)

---

_Last updated: [Current Date]_
_Status: Phase 1 - Smart contract completed and tested, ready for Phase 2 frontend development_
