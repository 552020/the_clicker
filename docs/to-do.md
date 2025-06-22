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
- [ ] **Test contract locally**
  - [ ] Write unit tests in `packages/hardhat/test/`
  - [ ] Test `click()` function increments both counters
  - [ ] Test user-specific counting works correctly
  - [ ] Test event emission works properly
  - [ ] Run `yarn test` to verify all tests pass

### Hybrid Implementation Testing

- [ ] **Local testing with Hardhat**
  - [ ] Deploy contract to local network
  - [ ] Call `click()` from different addresses
  - [ ] Verify `userClicks` mapping updates correctly
  - [ ] Check emitted `ClickEvent` logs
  - [ ] Test `getUserClicks()` function with different addresses
- [ ] **Testnet deployment**
  - [ ] Deploy to Sepolia or Base Goerli testnet
  - [ ] Verify contract on Etherscan
  - [ ] Test `click()` function on live testnet
  - [ ] Verify events are emitted correctly
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
- [ ] **Configure testnet deployment**
  - [ ] Add Sepolia/Base Goerli network configuration
  - [ ] Set up environment variables for private keys

### Local Testing & Interaction

- [ ] **Start local blockchain**
  - [ ] Run `yarn chain` to start local network
  - [ ] Run `yarn deploy` to deploy contract locally
- [ ] **Test CLI interaction**
  - [ ] Use Hardhat console: `npx hardhat console --network localhost`
  - [ ] Test `click()` function calls
  - [ ] Verify state changes in contract
- [ ] **Test via debug UI**
  - [ ] Run `yarn start` to start frontend
  - [ ] Navigate to `http://localhost:3000/debug`
  - [ ] Test contract interactions through UI

### Testnet Deployment

- [ ] **Deploy to testnet**
  - [ ] Get testnet ETH (Sepolia faucet)
  - [ ] Deploy contract: `yarn deploy --network sepolia`
  - [ ] Verify contract on Etherscan
- [ ] **Test on testnet**
  - [ ] Use Hardhat console with testnet: `npx hardhat console --network sepolia`
  - [ ] Test `click()` function on live testnet
  - [ ] Verify state changes persist

### Documentation

- [ ] **Update README**
  - [ ] Add local development instructions
  - [ ] Add CLI interaction examples
  - [ ] Document contract functions and events
- [ ] **Create interaction scripts**
  - [ ] Write Hardhat script for automated clicking
  - [ ] Document Geth CLI commands

---

## Phase 2: Frontend MVP 🖥️

### Wallet Integration

- [ ] **Connect MetaMask**
  - [ ] Test wallet connection on debug page
  - [ ] Ensure proper network switching
- [ ] **Display user information**
  - [ ] Show connected address
  - [ ] Display user's click count

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

1. **Test the hybrid contract locally** - Write and run unit tests for events
2. **Deploy and test locally** - Use Hardhat local network to verify functionality
3. **Deploy to testnet** - Get contract live on Sepolia with events
4. **Create proof-of-concept ranking** - Build off-chain ranking from events
5. **Test CLI interaction** - Verify it works via command line
6. **Create basic frontend** - Build simple click interface

---

_Last updated: [Current Date]_
_Status: Phase 1 - Smart contract completed, testing in progress_
