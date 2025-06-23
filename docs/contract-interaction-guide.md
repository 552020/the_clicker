# Contract Interaction Guide

> How to interact with The Clicker contract on Sepolia testnet

## 📋 **Contract Information**

- **Contract Name**: TheClicker
- **Contract Address**: `0xc6e28A99A04407Ba45EdfA7E75dcE5E558eA845F`
- **Network**: Sepolia testnet
- **Etherscan**: https://sepolia.etherscan.io/address/0xc6e28A99A04407Ba45EdfA7E75dcE5E558eA845F

## 🎯 **Quick Start**

### **For Non-Developers (Easiest)**

1. **Get Sepolia ETH**: Visit https://sepoliafaucet.com/
2. **Go to Etherscan**: https://sepolia.etherscan.io/address/0xc6e28A99A04407Ba45EdfA7E75dcE5E558eA845F
3. **Click "Contract" → "Write Contract"**
4. **Connect MetaMask** (make sure it's on Sepolia)
5. **Click the `click()` function**
6. **Confirm transaction**

### **For Developers (Hardhat Console)**

```bash
npx hardhat console --network sepolia

# Interact with contract
const Clicker = await ethers.getContractFactory("TheClicker")
const clicker = await Clicker.attach("0xc6e28A99A04407Ba45EdfA7E75dcE5E558eA845F")

# Test functions
await clicker.click()
await clicker.totalClicks()
await clicker.getUserClicks("YOUR_ADDRESS")
```

## 🛠️ **Method 1: Etherscan (Recommended for Everyone)**

### **Prerequisites**

- **MetaMask wallet** with Sepolia network
- **Sepolia ETH** (get from faucet)
- **MetaMask connected** to Sepolia

### **Step-by-Step Instructions**

1. **Get Sepolia ETH**

   - Visit: https://sepoliafaucet.com/
   - Enter your wallet address
   - Wait for ETH to arrive

2. **Switch MetaMask to Sepolia**

   - Open MetaMask
   - Click network dropdown
   - Select "Sepolia test network"
   - If not listed, add it manually:
     - Network Name: `Sepolia`
     - RPC URL: `https://sepolia.infura.io/v3/your-project-id`
     - Chain ID: `11155111`
     - Currency Symbol: `ETH`

3. **Visit Contract on Etherscan**

   - Go to: https://sepolia.etherscan.io/address/0xc6e28A99A04407Ba45EdfA7E75dcE5E558eA845F
   - Click "Contract" tab
   - Click "Write Contract"

4. **Connect Wallet**

   - Click "Connect to Web3"
   - Select MetaMask
   - Approve connection

5. **Interact with Contract**

   - Find the `click()` function
   - Click "Write"
   - Confirm transaction in MetaMask
   - Wait for confirmation

6. **View Results**
   - Go to "Read Contract" tab
   - Check `totalClicks()` to see total clicks
   - Check `getUserClicks(address)` with your address

## 💻 **Method 2: Hardhat Console (For Developers)**

### **Prerequisites**

- **Node.js and Yarn** installed
- **Hardhat project** set up
- **Sepolia network** configured
- **Sepolia ETH** in your account

### **Setup Instructions**

1. **Create a new Hardhat project** (if you don't have one)

   ```bash
   mkdir clicker-test
   cd clicker-test
   yarn init -y
   yarn add hardhat @nomicfoundation/hardhat-ethers ethers
   npx hardhat init
   ```

2. **Configure Sepolia network**

   ```javascript
   // hardhat.config.js
   require("@nomicfoundation/hardhat-ethers");

   module.exports = {
     solidity: "0.8.20",
     networks: {
       sepolia: {
         url: `https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY`,
         accounts: ["YOUR_PRIVATE_KEY"],
       },
     },
   };
   ```

3. **Get contract ABI** (after verification)

   - Visit the contract on Etherscan
   - Go to "Contract" → "Code"
   - Copy the ABI from the verified contract

4. **Interact via console**

   ```bash
   npx hardhat console --network sepolia

   // Load contract
   const contractAddress = "0xc6e28A99A04407Ba45EdfA7E75dcE5E558eA845F"
   const contractABI = [...] // Paste ABI here
   const Clicker = new ethers.Contract(contractAddress, contractABI, signer)

   // Test functions
   await Clicker.click()
   await Clicker.totalClicks()
   await Clicker.getUserClicks(await signer.getAddress())
   ```

## 🌐 **Method 3: Frontend (When Available)**

Once the frontend is deployed:

1. **Visit the DApp URL** (will be shared when ready)
2. **Connect MetaMask** to Sepolia
3. **Click the "Click" button**
4. **Confirm transaction**
5. **See real-time updates**

## 📊 **Available Functions**

### **Write Functions (Cost Gas)**

- **`click()`**: Increment your click count and total clicks
  - **Cost**: ~15,000-20,000 gas
  - **Effect**: Increases your personal clicks and global total

### **Read Functions (Free)**

- **`totalClicks()`**: Get total clicks across all users
- \*\*`getUserClicks(address)`: Get clicks for specific user
- \*\*`userClicks(address)`: Same as above (mapping access)

## 🔍 **Monitoring Your Interactions**

### **On Etherscan**

- **Transactions**: See all your click transactions
- **Events**: View `ClickEvent` emissions
- **Internal transactions**: None (simple contract)

### **In MetaMask**

- **Activity tab**: See transaction history
- **Gas costs**: Monitor gas usage per click
- **Network**: Ensure you're on Sepolia

## 🚨 **Troubleshooting**

### **Common Issues**

#### **"Insufficient funds"**

- **Solution**: Get more Sepolia ETH from faucet
- **Faucets**: https://sepoliafaucet.com/, https://www.infura.io/faucet/sepolia

#### **"Network error"**

- **Solution**: Ensure MetaMask is on Sepolia network
- **Check**: Network dropdown shows "Sepolia test network"

#### **"Transaction failed"**

- **Solution**: Check gas limit and try again
- **Tip**: Use default gas settings

#### **"Contract not found"**

- **Solution**: Verify you're using the correct address
- **Check**: `0xc6e28A99A04407Ba45EdfA7E75dcE5E558eA845F`

### **Debug Commands**

```bash
# Check your balance
npx hardhat console --network sepolia
> await ethers.provider.getBalance("YOUR_ADDRESS")

# Check contract state
> const Clicker = await ethers.getContractAt("TheClicker", "0xc6e28A99A04407Ba45EdfA7E75dcE5E558eA845F")
> await Clicker.totalClicks()
```

## 📈 **Tracking Performance**

### **Personal Stats**

- **Your clicks**: Use `getUserClicks(YOUR_ADDRESS)`
- **Your ranking**: Compare with other users (manual for now)

### **Global Stats**

- **Total clicks**: Use `totalClicks()`
- **Network activity**: Check Etherscan for all transactions

## 🎯 **Next Steps**

### **For Users**

- **Test thoroughly** on Sepolia
- **Provide feedback** on user experience
- **Report any issues** you encounter

### **For Developers**

- **Build integrations** with the contract
- **Create analytics** tools
- **Contribute** to the project

## 🔗 **Useful Links**

- **Contract on Etherscan**: https://sepolia.etherscan.io/address/0xc6e28A99A04407Ba45EdfA7E75dcE5E558eA845F
- **Sepolia Faucet**: https://sepoliafaucet.com/
- **MetaMask**: https://metamask.io/
- **Project Repository**: [GitHub link]
- **Documentation**: [Project docs link]

---

**Need help?** Open an issue on GitHub or contact the development team.

**Happy clicking! 🖱️**
