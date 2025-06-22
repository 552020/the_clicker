# Hardhat Manual Testing Guide

## Overview

This guide explains how to manually test smart contracts using Hardhat console after deployment. This is useful for low-level testing before building UI components.

## Prerequisites

- Local blockchain running (`yarn chain`)
- Contract deployed (`yarn deploy`)
- Hardhat console access

## Starting Hardhat Console

```bash
# Navigate to hardhat package
cd packages/hardhat

# Start console connected to localhost network
npx hardhat console --network localhost
```

## Getting Contract Instance

### Method 1: Using Contract Address (Recommended)

```javascript
// Get contract at specific address
> const contract = await ethers.getContractAt("TheClicker", "0x5FbDB2315678afecb367f032d93F642f64180aa3")
```

### Method 2: Using Contract Factory

```javascript
// Create factory and attach to deployed address
> const factory = await ethers.getContractFactory("TheClicker")
> const contract = factory.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3")
```

### Method 3: Check All Deployed Contracts

```javascript
// List all deployed contracts
> await hre.deployments.all()
```

## Default Hardhat Accounts

Hardhat provides 20 pre-funded accounts for testing:

```javascript
// Get all signers
> const accounts = await ethers.getSigners()

// View account addresses
> accounts.map(acc => acc.address)

// Default accounts (first 5):
// 0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (deployer)
// 1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
// 2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
// 3: 0x90F79bf6EB2c4f870365E785982E1f101E93b906
// 4: 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
```

Each account is funded with 10,000 ETH for testing.

## Testing TheClicker Contract

### 1. Check Initial State

```javascript
// Check total clicks (should be 0)
> await contract.totalClicks()

// Check user clicks for default account
> await contract.getUserClicks("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
```

### 2. Test Click Function

```javascript
// Execute click function
> await contract.click()
```

**Expected Response:**

```javascript
ContractTransactionResponse {
  provider: HardhatEthersProvider { ... },
  blockNumber: 5,
  blockHash: '0x0cc5c5c8edbb8109998de1373df53cd88e72204b537c24c8c69fdd4f95eb4c4d',
  index: undefined,
  hash: '0x9bc0d422be77dc6042d0807e9805d7eabfcd43cd710b9d7b570c001f42c1cb83',
  type: 2,
  to: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  nonce: 2,
  gasLimit: 30000000n,
  gasPrice: 1516272185n,
  maxPriorityFeePerGas: 1000000000n,
  maxFeePerGas: 1653406984n,
  maxFeePerBlobGas: null,
  data: '0x7d55923d',
  value: 0n,
  chainId: 31337n,
  signature: Signature { ... },
  accessList: [],
  blobVersionedHashes: null
}
```

**Key Transaction Details:**

- `hash`: Transaction hash (unique identifier)
- `to`: Contract address being called
- `from`: Sender address (your account)
- `data`: Function call data (`0x7d55923d` = `click()` function selector)
- `blockNumber`: Block where transaction was included
- `gasLimit`: Maximum gas allowed (30M for Hardhat)
- `chainId`: Network ID (31337 = Hardhat localhost)

**Check updated state**

```javascript
> await contract.totalClicks()  // Should be 1n
> await contract.getUserClicks("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")  // Should be 1n
```

### 3. Test Multiple Clicks

```javascript
// Click again
> await contract.click()

// Verify increments
> await contract.totalClicks()  // Should be 2n
> await contract.getUserClicks("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")  // Should be 2n
```

### 4. Test with Different Users

```javascript
// Get different signers
> const [owner, user1, user2] = await ethers.getSigners()

// Click from different user
> await contract.connect(user1).click()

// Check state
> await contract.totalClicks()  // Should be 3n
> await contract.getUserClicks(user1.address)  // Should be 1n
> await contract.getUserClicks(owner.address)  // Should still be 2n
```

### 5. Test Event Emission

```javascript
// Click and capture transaction
> const tx = await contract.click()
> const receipt = await tx.wait()

// Check logs (events)
> receipt.logs.length  // Should be > 0
```

## Common Issues and Solutions

### Issue: `ethers.getContract()` returns undefined

**Solution**: Use `ethers.getContractAt()` with the contract address instead.

### Issue: Contract not found

**Solution**:

1. Verify contract is deployed: `await hre.deployments.all()`
2. Check contract name matches exactly: "TheClicker" not "Clicker"
3. Use correct address from deployment output

### Issue: Network not found

**Solution**:

1. Ensure local blockchain is running: `yarn chain`
2. Use correct network flag: `--network localhost`

### Issue: Permission denied

**Solution**:

1. Check if you're using the correct signer
2. Verify account has sufficient ETH for gas fees

## Best Practices

### 1. Always Check Initial State

```javascript
// Before testing, verify clean state
> await contract.totalClicks()
> await contract.getUserClicks(userAddress)
```

### 2. Use Descriptive Variable Names

```javascript
// Good
> const clickerContract = await ethers.getContractAt("TheClicker", address)
> const [deployer, alice, bob] = await ethers.getSigners()

// Avoid
> const c = await ethers.getContractAt("TheClicker", address)
```

### 3. Test Edge Cases

```javascript
// Test with zero address
> await contract.getUserClicks("0x0000000000000000000000000000000000000000")

// Test with random address
> const randomAddress = ethers.Wallet.createRandom().address
> await contract.getUserClicks(randomAddress)
```

### 4. Verify Transaction Success

```javascript
// Always check transaction status
> const tx = await contract.click()
> const receipt = await tx.wait()
> receipt.status  // Should be 1 (success)
```

## Example Complete Test Session

```javascript
// 1. Get contract
> const contract = await ethers.getContractAt("TheClicker", "0x5FbDB2315678afecb367f032d93F642f64180aa3")

// 2. Get accounts
> const [owner, user1, user2] = await ethers.getSigners()

// 3. Check initial state
> await contract.totalClicks()  // 0n
> await contract.getUserClicks(owner.address)  // 0n

// 4. Test clicking
> await contract.click()
> await contract.totalClicks()  // 1n
> await contract.getUserClicks(owner.address)  // 1n

// 5. Test different user
> await contract.connect(user1).click()
> await contract.totalClicks()  // 2n
> await contract.getUserClicks(user1.address)  // 1n
> await contract.getUserClicks(owner.address)  // 1n

// 6. Verify events
> const tx = await contract.click()
> const receipt = await tx.wait()
> receipt.logs.length  // > 0
```

## Next Steps

After manual testing is successful:

1. Build UI components using Scaffold-ETH hooks
2. Test through the debug interface (`yarn start` → `/debug`)
3. Deploy to testnet for public testing
4. Create automated test scripts for CI/CD

---

**Note**: This manual testing approach is perfect for initial contract validation and debugging before building user interfaces.
