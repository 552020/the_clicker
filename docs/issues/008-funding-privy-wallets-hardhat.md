# Issue: Funding Privy Embedded Wallets on Hardhat Local Network

## Problem

When using Privy with embedded wallets (created via email/social login) on a local Hardhat network, the new wallet address will not have any ETH by default. Privy does not provide a faucet service, so you must fund the wallet address yourself to enable contract interactions and testing.

## Solutions

### 1. Get the Privy Wallet Address

You need to know the address of the Privy-managed wallet. You can get this from your frontend using Privy hooks:

**Using usePrivy:**

```tsx
import { usePrivy } from "@privy-io/react-auth";

const { user } = usePrivy();
const walletAddress = user?.wallet?.address;
```

**Using useWallets:**

```tsx
import { useWallets } from "@privy-io/react-auth";

const { wallets } = useWallets();
const walletAddress = wallets[0]?.address; // Or let user pick
```

Log or display this address in your UI so you can copy it.

---

### 2. Fund the Address Using Hardhat

#### **A. Using Hardhat Console/Script**

Open a Hardhat console:

```bash
npx hardhat console --network localhost
```

Then, in the console:

```js
const [signer] = await ethers.getSigners(); // Pre-funded Hardhat account
const privyWalletAddress = "YOUR_PRIVY_WALLET_ADDRESS"; // Paste the address
const amountToSend = ethers.utils.parseEther("10"); // 10 ETH

const tx = await signer.sendTransaction({
  to: privyWalletAddress,
  value: amountToSend,
});
await tx.wait();
console.log(`Sent ${ethers.utils.formatEther(amountToSend)} ETH to ${privyWalletAddress}`);

// Check balance
const balance = await ethers.provider.getBalance(privyWalletAddress);
console.log(`Balance: ${ethers.utils.formatEther(balance)} ETH`);
```

#### **B. Using Scaffold-ETH's Faucet (if available)**

- If your Scaffold-ETH UI has a faucet or "send ETH" feature, paste your Privy wallet address there.
- If there's a script, check if you can pass the recipient address as an argument:
  ```bash
  yarn hardhat send-eth --recipient YOUR_PRIVY_WALLET_ADDRESS --amount 10
  ```
  (Command may vary by Scaffold-ETH version.)

#### **C. Modifying or Creating a Hardhat Task/Script**

- If Scaffold-ETH has a Hardhat task for funding, you can modify it or create a new one to send ETH to your Privy wallet address.
- Example task:
  ```js
  task("fund-privy-wallet", "Send ETH to a Privy wallet")
    .addParam("to", "The recipient address")
    .addParam("amount", "Amount in ETH")
    .setAction(async ({ to, amount }, hre) => {
      const [signer] = await hre.ethers.getSigners();
      const tx = await signer.sendTransaction({
        to,
        value: hre.ethers.utils.parseEther(amount),
      });
      await tx.wait();
      console.log(`Sent ${amount} ETH to ${to}`);
    });
  ```

---

## Important Considerations

- **Correct Network:** Ensure your Hardhat node is running and any scripts/console commands are targeting localhost.
- **Embedded Wallets:** You cannot import Privy embedded wallet private keys into MetaMask or other wallets. You must send funds to their public address.
- **UI/UX:** Consider adding a "copy address" or "fund wallet" helper in your dApp for easier testing.

---

**This issue documents how to fund Privy embedded wallets for local development and testing on Hardhat.**
