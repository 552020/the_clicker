# Next.js App Services Overview

This document provides an overview of the files in `packages/nextjs/services` and its subfolders. For each file, you'll find:

- **File name and path**
- **Short description**
- **Usage**: Whether it is used in the app, and where (with file references)
- **Notes** (if relevant)

---

## web3/wagmiConfig.tsx

- **Description**:  
  Exports the main `wagmiConfig` object, which configures supported chains, wallet connectors, and RPC endpoints for the app. Used to initialize the Wagmi provider and connect to Ethereum networks.
- **Used in**:
  - `components/ScaffoldEthAppWithProviders.tsx` (to provide Wagmi context)
  - `hooks/scaffold-eth/useTransactor.tsx`
  - `hooks/scaffold-eth/useScaffoldWriteContract.ts`
  - `utils/scaffold-eth/contract.ts`
  - `utils/scaffold-eth/fetchPriceFromUniswap.ts`
- **Notes**:
  - Automatically includes mainnet for ENS/price resolution if not already present in `targetNetworks`.
  - Uses connectors from `wagmiConnectors.tsx`.

---

## web3/wagmiConnectors.tsx

- **Description**:  
  Exports the `wagmiConnectors` array, which defines supported wallet connectors (MetaMask, WalletConnect, Coinbase, Rainbow, Safe, Ledger, and optionally a local burner wallet).
  Used by `wagmiConfig.tsx` to provide wallet connection options in the app.
- **Used in**:
  - `web3/wagmiConfig.tsx`
- **Notes**:
  - Reads configuration from `scaffold.config.ts` to determine which wallets to enable.

---

## store/store.ts

- **Description**:  
  Exports a Zustand-powered global state store (`useGlobalState`) for managing app-wide state such as the native currency price, fetching status, and the current target network.
  Provides setter functions for updating these values from anywhere in the app.
- **Used in**:
  - `hooks/scaffold-eth/useTargetNetwork.ts`
  - `hooks/scaffold-eth/useInitializeNativeCurrencyPrice.ts`
  - `hooks/scaffold-eth/useDisplayUsdMode.ts`
  - `hooks/scaffold-eth/useSelectedNetwork.ts`
  - `components/Footer.tsx`
  - `components/scaffold-eth/Balance.tsx`
  - `components/scaffold-eth/Input/EtherInput.tsx`
- **Notes**:
  - Designed for global state management, similar to a global `useState`.

---

## General Notes

- The `web3` folder centralizes all Ethereum network and wallet connection logic.
- The `store` folder provides a single source of truth for global app state.
- If you add or update services, consider updating this doc.
