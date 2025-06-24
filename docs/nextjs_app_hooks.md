# Next.js App Scaffold-ETH Hooks Overview

> 📚 For official documentation and detailed usage examples, see the [Scaffold-ETH 2 Hooks Documentation](https://docs.scaffoldeth.io/hooks/)

This document provides an overview of the custom hooks in `packages/nextjs/hooks/scaffold-eth`. For each hook, you'll find:

- **Hook name and path**
- **Short description**
- **Usage**: Whether it is used in the app, and where (with file references)
- **Notes** (if relevant)

---

## useScaffoldReadContract

- **Path**: `hooks/scaffold-eth/useScaffoldReadContract.ts`
- **Description**: Reads data from a deployed or external contract by name, automatically loading ABI/address from the contracts config. Wraps wagmi's `useReadContract`.
- **Used in**: Not directly found in app code, but re-exported in `hooks/scaffold-eth/index.ts` and intended for use in UI contract read operations.
- **Notes**: See Scaffold-ETH docs for usage patterns.

## useScaffoldWriteContract

- **Path**: `hooks/scaffold-eth/useScaffoldWriteContract.ts`
- **Description**: Sends write transactions to a deployed or external contract by name, automatically loading ABI/address from the contracts config. Wraps wagmi's `useWriteContract`.
- **Used in**: Not directly found in app code, but re-exported in `hooks/scaffold-eth/index.ts` and intended for use in UI contract write operations.
- **Notes**: See Scaffold-ETH docs for usage patterns.

## useScaffoldContract

- **Path**: `hooks/scaffold-eth/useScaffoldContract.ts`
- **Description**: Returns a viem contract instance for a deployed or external contract by name.
- **Used in**: Not directly found in app code, but re-exported in `hooks/scaffold-eth/index.ts`.

## useScaffoldEventHistory

- **Path**: `hooks/scaffold-eth/useScaffoldEventHistory.ts`
- **Description**: Fetches and paginates historical contract events for a given contract and event name.
- **Used in**: Not directly found in app code, but re-exported in `hooks/scaffold-eth/index.ts`.

## useScaffoldWatchContractEvent

- **Path**: `hooks/scaffold-eth/useScaffoldWatchContractEvent.ts`
- **Description**: Watches for new contract events in real time for a given contract and event name.
- **Used in**: Not directly found in app code, but re-exported in `hooks/scaffold-eth/index.ts`.

## useDeployedContractInfo

- **Path**: `hooks/scaffold-eth/useDeployedContractInfo.ts`
- **Description**: Returns ABI/address info for a deployed or external contract by name and chain.
- **Used in**: `app/debug/_components/contract/ContractUI.tsx`

## useWatchBalance

- **Path**: `hooks/scaffold-eth/useWatchBalance.ts`
- **Description**: Watches the ETH balance of an address and updates reactively.
- **Used in**: `components/scaffold-eth/FaucetButton.tsx`, `components/scaffold-eth/Balance.tsx`

## useTransactor

- **Path**: `hooks/scaffold-eth/useTransactor.tsx`
- **Description**: Handles sending transactions and managing notifications/state for contract writes.
- **Used in**: `components/scaffold-eth/Faucet.tsx`, `components/scaffold-eth/FaucetButton.tsx`, `app/debug/_components/contract/WriteOnlyFunctionForm.tsx`

## useTargetNetwork

- **Path**: `hooks/scaffold-eth/useTargetNetwork.ts`
- **Description**: Returns the current target network config (from scaffold.config.ts).
- **Used in**: Many files, including `Header.tsx`, `Footer.tsx`, `Balance.tsx`, `RainbowKitCustomConnectButton/index.tsx`, `Address/Address.tsx`, `app/debug/_components/contract/ContractUI.tsx`, `app/blockexplorer/page.tsx`, etc.

## useSelectedNetwork

- **Path**: `hooks/scaffold-eth/useSelectedNetwork.ts`
- **Description**: Returns the selected network (optionally for a given chainId).
- **Used in**: Not directly found in app code, but re-exported in `hooks/scaffold-eth/index.ts`.

## useOutsideClick

- **Path**: `hooks/scaffold-eth/useOutsideClick.ts`
- **Description**: Detects clicks outside a referenced element (for closing dropdowns, modals, etc).
- **Used in**: `Header.tsx`, `RainbowKitCustomConnectButton/AddressInfoDropdown.tsx`

## useAnimationConfig

- **Path**: `hooks/scaffold-eth/useAnimationConfig.ts`
- **Description**: Provides animation configuration for UI elements.
- **Used in**: `app/debug/_components/contract/DisplayVariable.tsx`

## useDisplayUsdMode

- **Path**: `hooks/scaffold-eth/useDisplayUsdMode.ts`
- **Description**: Manages display mode for ETH/USD values.
- **Used in**: `components/scaffold-eth/Balance.tsx`, `components/scaffold-eth/Input/EtherInput.tsx`

## useFetchBlocks

- **Path**: `hooks/scaffold-eth/useFetchBlocks.ts`
- **Description**: Fetches and paginates recent blocks and transaction receipts.
- **Used in**: `app/blockexplorer/page.tsx`, `app/blockexplorer/_components/ContractTabs.tsx`

## useInitializeNativeCurrencyPrice

- **Path**: `hooks/scaffold-eth/useInitializeNativeCurrencyPrice.ts`
- **Description**: Initializes and updates the native currency (ETH) price in USD.
- **Used in**: `components/ScaffoldEthAppWithProviders.tsx`

## useNetworkColor

- **Path**: `hooks/scaffold-eth/useNetworkColor.ts`
- **Description**: Returns a color string for the current network (for UI theming).
- **Used in**: `app/debug/_components/contract/ContractUI.tsx`, `RainbowKitCustomConnectButton/index.tsx`

## useContractLogs

- **Path**: `hooks/scaffold-eth/useContractLogs.ts`
- **Description**: Fetches logs for a given contract address.
- **Used in**: `app/blockexplorer/_components/AddressLogsTab.tsx`

## useCopyToClipboard

- **Path**: `hooks/scaffold-eth/useCopyToClipboard.ts`
- **Description**: Provides a function to copy text to the clipboard and manage copied state.
- **Used in**: `RainbowKitCustomConnectButton/AddressInfoDropdown.tsx`, `scaffold-eth/Address/AddressCopyIcon.tsx`, `app/debug/_components/contract/TxReceipt.tsx`, `app/blockexplorer/_components/TransactionHash.tsx`

---

## General Notes

- All hooks are re-exported from `hooks/scaffold-eth/index.ts` for easy import.
- Many hooks are designed to work together with Scaffold-ETH contract config and UI patterns.
- If you add new hooks, consider updating this doc.
