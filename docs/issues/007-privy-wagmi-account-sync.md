# Issue: Privy embedded wallet defaults to Ethereum mainnet instead of Hardhat in local development

## Problem

When integrating Privy (for embedded/social wallets) alongside RainbowKit/wagmi (for external wallets), there can be confusion or bugs around which wallet is considered "active" and which network is used in the dApp. Specifically:

- The `useAccount()` hook from wagmi may not always reflect the address or network of the wallet connected via Privy (e.g., Google/email login with embedded wallet).
- If the dApp relies on `useAccount().address` and `useAccount().chain` for contract interactions, users logging in with Privy may not be able to interact with contracts, or the UI may show as "not connected" or prompt to switch network.

## Specific Issue: Privy on Hardhat Local Network Prompts for Network Switch

When testing Privy on the Hardhat local network, you may encounter a request to switch network, even though your dApp is running locally and your wagmiConfig includes Hardhat. For example:

- You log in with Privy (e.g., Google or email), and log the output of `useAccount()`.
- The returned account shows a Privy wallet, but the `chain` object is set to Ethereum mainnet (chainId 1), not Hardhat (chainId 31337).
- The dApp or Privy modal prompts you to switch network to Ethereum, or shows a "wrong network" warning, even though you want to use Hardhat locally.

**Screenshot Example:**

- The `useAccount()` output shows:
  - `address`: (Privy wallet address)
  - `chain`: `{ id: 1, name: 'Ethereum', ... }`
  - `connector.name`: 'Privy Wallet', `connector.id`: 'io.privy.wallet'

## Why This Happens

- By default, Privy may connect embedded wallets to Ethereum mainnet unless you explicitly set the default chain and supported chains in the PrivyProvider config.
- If `defaultChain` and `supportedChains` are not set to include Hardhat, Privy will not default to your local network, even if wagmiConfig includes it.
- This causes a mismatch: wagmi expects Hardhat, but Privy is on mainnet.

## Symptoms

- `useAccount().chain.id` is 1 (Ethereum) instead of 31337 (Hardhat) when testing locally.
- The dApp or Privy modal prompts to switch network or shows a "wrong network" warning.
- Contract interactions may fail or be sent to the wrong network.

## Debugging Steps

1. Log the output of `useAccount()` after logging in with Privy. Check the `chain` property and `chainId`.
2. Confirm that your wagmiConfig includes Hardhat in both `chains` and `transports`.
3. Check your PrivyProvider config for `defaultChain` and `supportedChains`.

## How to Fix

- In your PrivyProvider config, explicitly set:
  ```tsx
  import { hardhat, mainnet, sepolia } from "viem/chains";
  // ...
  <PrivyProvider
    appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
    config={{
      // ...
      defaultChain: hardhat, // Set Hardhat as default for local dev
      supportedChains: [mainnet, sepolia, hardhat], // Include hardhat
      // ...
    }}
  >
    {/* ... */}
  </PrivyProvider>;
  ```
- Make sure your Hardhat node is running at `http://localhost:8545`.
- Restart your frontend after making config changes.

## Best Practices

- Always set `defaultChain` and `supportedChains` in PrivyProvider to match your wagmiConfig, especially for local development.
- Use `useWallets()` and `useSetActiveWallet()` to ensure the correct wallet and network are active.
- Log `useAccount()` and `chain` info after login to verify correct network.

## References

- [Privy + wagmi integration guide](https://docs.privy.io/wallets/connectors/ethereum/integrations/wagmi)
- [Privy useWallets docs](https://docs.privy.io/basics/react/hooks#usewallets)
- [wagmi useAccount docs](https://wagmi.sh/docs/hooks/useAccount)

---

**This issue documents a common pitfall and solution for dApps supporting both Privy and RainbowKit/wagmi wallet connections, especially when developing on local networks like Hardhat.**
