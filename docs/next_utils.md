# Next.js App Utils Overview

This document provides an overview of the files in `packages/nextjs/utils/scaffold-eth`. For each file, you'll find:

- **File name and path**
- **Short description**
- **Usage**: Whether it is used in the app, and where (with file references)
- **Notes** (if relevant)

---

## getMetadata.ts

- **Description**:  
  Utility to generate page metadata for Next.js layouts and pages.
- **Used in**:
  - `app/layout.tsx`
  - `app/debug/page.tsx`
  - `app/blockexplorer/layout.tsx`

---

## getParsedError.ts

- **Description**:  
  Parses and formats errors from contract calls and transactions for user-friendly display.
- **Used in**:
  - `app/debug/_components/contract/ReadOnlyFunctionForm.tsx`
  - `app/debug/_components/contract/DisplayVariable.tsx`
  - `hooks/scaffold-eth/useTransactor.tsx`
  - `utils/scaffold-eth/contract.ts`

---

## networks.ts

- **Description**:  
  Defines network metadata, helpers for working with chain IDs, and functions for getting configured networks.
- **Used in**:
  - `services/store/store.ts`
  - `services/web3/wagmiConnectors.tsx`
  - `services/web3/wagmiConfig.tsx`
  - `hooks/scaffold-eth/useDeployedContractInfo.ts`
  - `hooks/scaffold-eth/useScaffoldReadContract.ts`
  - `hooks/scaffold-eth/useScaffoldContract.ts`
  - `hooks/scaffold-eth/useTargetNetwork.ts`
  - `hooks/scaffold-eth/useScaffoldWriteContract.ts`
  - `hooks/scaffold-eth/useSelectedNetwork.ts`
  - `components/scaffold-eth/RainbowKitCustomConnectButton/AddressInfoDropdown.tsx`
  - `components/scaffold-eth/RainbowKitCustomConnectButton/NetworkOptions.tsx`
  - `utils/scaffold-eth/fetchPriceFromUniswap.ts`

---

## notification.tsx

- **Description**:  
  Provides a notification system for displaying success, error, info, and loading messages in the UI.
- **Used in**:
  - `hooks/scaffold-eth/useScaffoldWriteContract.ts`
  - `hooks/scaffold-eth/useTransactor.tsx`
  - `utils/scaffold-eth/contract.ts`
  - `components/scaffold-eth/Faucet.tsx`
  - `app/blockexplorer/page.tsx`
  - `app/debug/_components/contract/ReadOnlyFunctionForm.tsx`
  - `app/debug/_components/contract/DisplayVariable.tsx`

---

## contractsData.ts

- **Description**:  
  Provides a hook and helpers for accessing all contract data for the current network.
- **Used in**:
  - `app/debug/_components/DebugContracts.tsx`
  - `utils/scaffold-eth/contract.ts`

---

## decodeTxData.ts

- **Description**:  
  Decodes transaction data for display and debugging.
- **Used in**:
  - (Re-exported in `utils/scaffold-eth/index.ts`)

---

## fetchPriceFromUniswap.ts

- **Description**:  
  Fetches the current price of the native currency (ETH) from Uniswap for use in the app.
- **Used in**:
  - `hooks/scaffold-eth/useInitializeNativeCurrencyPrice.ts`
  - (Re-exported in `utils/scaffold-eth/index.ts`)

---

## block.ts

- **Description**:  
  Utilities for working with block data and block numbers.
- **Used in**:
  - `hooks/scaffold-eth/useFetchBlocks.ts`

---

## common.ts

- **Description**:  
  Common utility functions (e.g., `replacer`, `isZeroAddress`) used throughout the app for data formatting and checks.
- **Used in**:
  - `hooks/scaffold-eth/useScaffoldEventHistory.ts`
  - `components/scaffold-eth/Input/utils.ts`
  - `components/scaffold-eth/Input/AddressInput.tsx`
  - `components/scaffold-eth/Input/EtherInput.tsx`
  - `components/scaffold-eth/Input/InputBase.tsx`
  - `components/scaffold-eth/Input/BytesInput.tsx`
  - `components/scaffold-eth/Input/IntegerInput.tsx`
  - `app/debug/_components/contract/TupleArray.tsx`
  - `app/debug/_components/contract/TxReceipt.tsx`
  - `app/debug/_components/contract/Tuple.tsx`
  - `app/debug/_components/contract/utilsDisplay.tsx`
  - `app/blockexplorer/_components/AddressLogsTab.tsx`
  - `app/blockexplorer/address/[address]/page.tsx`
  - `app/blockexplorer/transaction/_components/TransactionComp.tsx`
  - `app/blockexplorer/transaction/[txHash]/page.tsx`

---

## contract.ts

- **Description**:  
  Core contract utilities, types, and helpers for interacting with contracts, merging contract data, and type inference for contract ABIs.
- **Used in**:
  - `utils/scaffold-eth/contractsData.ts`
  - `utils/scaffold-eth/contract.ts` (self)
  - `utils/scaffold-eth/getParsedError.ts`
  - `hardhat/scripts/generateTsAbis.ts`
  - `contracts/deployedContracts.ts`

---

## index.ts

- **Description**:  
  Barrel file that re-exports utilities from this folder for easier imports.
- **Used in**:
  - Used throughout the app for simplified imports.

---

If you add or update utilities, consider updating this doc.
