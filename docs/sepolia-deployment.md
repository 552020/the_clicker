# Sepolia Testnet Deployment Guide

## 🚀 **Quick Start**

```bash
# 1. Set up environment
cp .env.example .env
# Edit .env with your API keys

# 2. Get testnet ETH
# Visit: https://sepoliafaucet.com/

# 3. Deploy
yarn deploy --network sepolia

# 4. Verify (optional)
yarn verify --network sepolia
```

## 📋 **Prerequisites**

### **Required Accounts & API Keys**

- [ ] **Alchemy Account**: https://dashboard.alchemyapi.io
- [ ] **MetaMask Dev Account**: Dedicated testnet account
- [ ] **Etherscan Account**: https://etherscan.io/apis (optional)
- [ ] **Sepolia Testnet ETH**: From faucet

### **Development Environment**

- [ ] Node.js 20.18.3+
- [ ] Yarn package manager
- [ ] Git repository cloned

## 🔧 **Step 1: Environment Setup**

### **1.1 Create Environment File**

```bash
# Copy the example file
cp .env.example .env

# Edit with your values
nano .env  # or use your preferred editor
```

### **1.2 Get Alchemy API Key**

1. Go to https://dashboard.alchemyapi.io
2. **Sign up/Login** to your account
3. **Create new app**:
   - Name: `The Clicker - Sepolia`
   - Chain: `Ethereum`
   - Network: `Sepolia`
4. **Copy the API key** from the app dashboard

### **1.3 Get MetaMask Private Key**

1. **Open MetaMask** and select your dev account
2. **Click the three dots** (⋮) → **Account details**
3. **Click "Export private key"**
4. **Enter your password** and copy the private key
5. **Add `0x` prefix** if it's not already there

### **1.4 (Optional) Get Etherscan API Key**

1. Go to https://etherscan.io/apis
2. **Create account** or login
3. **Go to API Keys section**
4. **Create new API key**
5. Copy the API key

### **1.5 Fill in .env File**

```bash
# Required for deployment
ALCHEMY_API_KEY=your_alchemy_api_key_here
__RUNTIME_DEPLOYER_PRIVATE_KEY=your_metamask_private_key_here

# Optional for verification
ETHERSCAN_MAINNET_API_KEY=your_etherscan_api_key_here
```

## 💰 **Step 2: Get Testnet ETH**

### **Sepolia Faucets**

- **Alchemy**: https://sepoliafaucet.com/ (0.5 ETH)
- **Infura**: https://www.infura.io/faucet/sepolia (0.1 ETH)
- **Chainlink**: https://faucets.chain.link/sepolia (0.1 ETH)
- **Paradigm**: https://faucet.paradigm.xyz/ (0.1 ETH)

### **Verify Balance**

```bash
# Check your account balance
yarn account

# Or check in MetaMask
```

## 🚀 **Step 3: Deploy Contracts**

### **3.1 Compile Contracts**

```bash
# Ensure contracts are compiled
yarn compile
```

### **3.2 Deploy to Sepolia**

```bash
# Deploy The Clicker contract
yarn deploy --network sepolia
```

### **3.3 Verify Deployment**

```bash
# Check deployment status
yarn account

# Look for output like:
# Deploying "TheClicker" (tx: 0x...)
# "TheClicker" deployed at: 0x...
```

## ✅ **Step 4: Verify Contract (Optional)**

### **4.1 Automatic Verification**

```bash
# Verify on Etherscan (requires ETHERSCAN_MAINNET_API_KEY)
yarn verify --network sepolia
```

### **4.2 Manual Verification**

1. Go to https://sepolia.etherscan.io/
2. Search for your contract address
3. Click "Contract" tab
4. Click "Verify and Publish"
5. Fill in contract details and source code

## 🧪 **Step 5: Test on Testnet**

### **5.1 Using Hardhat Console**

```bash
# Connect to Sepolia
npx hardhat console --network sepolia

# Get contract instance
const Clicker = await ethers.getContractFactory("TheClicker")
const clicker = await Clicker.attach("YOUR_CONTRACT_ADDRESS")

# Test click function
await clicker.click()

# Check state
await clicker.totalClicks()
await clicker.userClicks("YOUR_ADDRESS")
```

### **5.2 Using Etherscan**

1. Go to your contract on https://sepolia.etherscan.io/
2. Click "Contract" → "Write Contract"
3. Connect wallet and test functions

### **5.3 Using Debug UI**

```bash
# Start frontend
yarn start

# Navigate to http://localhost:3000/debug
# Connect MetaMask to Sepolia
# Test contract interactions
```

## 🔍 **Step 6: Monitor & Debug**

### **6.1 Check Contract Events**

- Visit your contract on Etherscan
- Click "Events" tab to see `ClickEvent` emissions
- Verify off-chain indexing data

### **6.2 Monitor Gas Usage**

```bash
# Check gas costs
yarn test --network sepolia
```

### **6.3 Verify State Changes**

- Check `totalClicks` after each click
- Verify `userClicks` mapping updates
- Confirm events are emitted correctly

## 🚨 **Troubleshooting**

### **Common Issues**

#### **"Insufficient funds"**

```bash
# Get more Sepolia ETH
# Visit: https://sepoliafaucet.com/
```

#### **"Network error"**

```bash
# Check Alchemy API key
# Verify network configuration in hardhat.config.ts
# Test connection: yarn account --network sepolia
```

#### **"Verification failed"**

```bash
# Check Etherscan API key
# Ensure contract is deployed
# Try manual verification on Etherscan
```

#### **"Gas estimation failed"**

```bash
# Check contract compilation
# Verify network connectivity
# Try with explicit gas limit
```

#### **"Private key error"**

```bash
# Ensure private key has 0x prefix
# Check for extra spaces or characters
# Verify it's a valid Ethereum private key
```

### **Debug Commands**

```bash
# Check network status
yarn account --network sepolia

# Test connection
npx hardhat console --network sepolia

# Verify configuration
cat .env | grep -v "^#" | grep -v "^$"
```

## 📊 **Post-Deployment Checklist**

- [ ] **Contract deployed** to Sepolia
- [ ] **Contract verified** on Etherscan
- [ ] **Click function tested** and working
- [ ] **Events emitted** correctly
- [ ] **State changes** persist
- [ ] **Gas costs** are reasonable
- [ ] **Frontend connected** to testnet
- [ ] **Documentation updated** with contract address

## 🔗 **Useful Links**

- **Sepolia Etherscan**: https://sepolia.etherscan.io/
- **Alchemy Dashboard**: https://dashboard.alchemyapi.io/
- **MetaMask**: https://metamask.io/
- **Hardhat Docs**: https://hardhat.org/docs
- **Etherscan API**: https://etherscan.io/apis

## 📝 **Next Steps**

After successful Sepolia deployment:

1. **Test thoroughly** on testnet
2. **Optimize gas costs** if needed
3. **Prepare for mainnet** deployment
4. **Set up monitoring** and analytics
5. **Plan token incentives** (Phase 3)
6. **Design AI agent integration** (Phase 4)

---

**Need help?** Check the [troubleshooting section](#troubleshooting) or create an issue in the repository.
