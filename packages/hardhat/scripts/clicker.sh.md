# `clicker.sh` Usage Guide

Interact with your Clicker smart contract from the command line using this Bash script. This script uses [Foundry's `cast`](https://book.getfoundry.sh/reference/cast/cast) tool for Ethereum contract calls and transactions.

---

## 🚨 **Important Notice About Private Keys**

> **Never use your main Metamask account or any account holding significant funds for development or testing.**
>
> - **Create a separate Metamask account** specifically for development and testing.
> - **Do NOT use an account that holds real assets (ETH, BTC, etc.)**.
> - If this private key is leaked, your funds can be stolen instantly.

---

## 🚀 **Setup**

1. **Install Foundry (if not already):**

   ```bash
   curl -L https://foundry.paradigm.xyz | bash
   foundryup
   # Or see: https://book.getfoundry.sh/getting-started/installation
   ```

2. **Set Environment Variables:**
   - **Private Key:**
     ```bash
     export PRIVATE_KEY=0xYOUR_PRIVATE_KEY
     ```
     > **Use the private key from your extra Metamask account created for development. Never use your main account!**
   - **RPC Provider:** (choose one)
     - **Infura:**
       ```bash
       export INFURA_API_KEY=your_infura_project_id
       ```
     - **Alchemy:**
       ```bash
       export ALCHEMY_API_KEY=your_alchemy_api_key
       ```

---

## 📄 **Contract Information**

- **Contract Address:** `0xc6e28A99A04407BA45EdfA7E75dcE5E558eA845F`
- **Network:** Sepolia
- **Contract Creator:** `0x8CB80b37cc7193D0f055b1189F25eB903D888D3A`
- **Deployed:** ~10 hours ago

### **ABI Functions (as seen on Etherscan)**

- `getUserClicks(address)`
- `totalClicks()`
- `userClicks(address)`

You can view and interact with the contract directly on [Sepolia Etherscan](https://sepolia.etherscan.io/address/0xc6e28A99A04407BA45EdfA7E75dcE5E558eA845F).

---

## 🛠️ **Script Usage**

```bash
./clicker.sh [totalClicks|click|getUserClicks] [optional address]
```

### **Commands**

- `totalClicks` — Read the total number of clicks from the contract.
- `click` — Send a transaction to increment the click counter.
- `getUserClicks <address>` — Read the number of clicks for a specific user address.

### **Examples**

```bash
# Get total clicks
./clicker.sh totalClicks

# Send a click transaction
./clicker.sh click

# Get clicks for a specific user
./clicker.sh getUserClicks 0xYourAddress
```

---

## ⚙️ **How It Works**

- **RPC URL**: The script will use Infura if `INFURA_API_KEY` is set, otherwise Alchemy if `ALCHEMY_API_KEY` is set. If neither is set, it will exit with an error.
- **Private Key**: Required for sending transactions (the `click` command). Never share or commit your private key.
- **Dependencies**: Requires `cast` to be installed and available in your `$PATH`.

---

## 📝 **Troubleshooting**

- If you see `0x` as the result for `totalClicks`, it means the contract counter is zero or the call failed.
- Make sure your contract address is correct and deployed on the network you are querying.
- Ensure your API key and private key are set and valid.
- For errors about `cast` not found, install Foundry as shown above.

---

## 🔒 **Security Notes**

- **Never commit your private key or API keys to version control.**
- **Always use a separate Metamask account for development and testing. Never use your main account or any account holding significant funds.**
- Use environment variables or a `.env` file (with proper `.gitignore`) for secrets.

---

## 📂 **Location**

Place this script in `packages/hardhat/scripts/clicker.sh` for best organization.

---

## 📚 **References**

- [Foundry Book: cast](https://book.getfoundry.sh/reference/cast/cast)
- [Infura Docs](https://docs.infura.io/)
- [Alchemy Docs](https://docs.alchemy.com/)
