# Next.js App Components Overview

This document provides an overview of the React components in `packages/nextjs/components` and its subfolders. For each component, you'll find:

- **Component name and path**
- **Short description** (where possible)
- **Usage**: Whether it is used in the app, and where (with file references)

---

## Root Components (`packages/nextjs/components/`)

### ScaffoldEthAppWithProviders.tsx

- **Description**: Wraps the app with providers (QueryClient, Wagmi, etc.) and renders the `Header` and `Footer`.
- **Used in**: `app/layout.tsx`

### Header.tsx

- **Description**: Main site header, navigation, and wallet connect button.
- **Used in**: `ScaffoldEthAppWithProviders.tsx`

### Footer.tsx

- **Description**: Main site footer, includes theme switch and faucet.
- **Used in**: `ScaffoldEthAppWithProviders.tsx`

### ThemeProvider.tsx

- **Description**: Wraps the app with theme context (dark/light/system).
- **Used in**: `app/layout.tsx`

### SwitchTheme.tsx

- **Description**: Button to toggle between light/dark themes.
- **Used in**: `Footer.tsx`

---

## Asset Components (`packages/nextjs/components/assets/`)

### BuidlGuidlLogo.tsx

- **Description**: SVG logo for BuidlGuidl.
- **Used in**: `Footer.tsx`

---

## Scaffold-ETH Components (`packages/nextjs/components/scaffold-eth/`)

> **What is ENS?**
>
> **ENS (Ethereum Name Service)** is a decentralized naming system that allows users to register human-readable names (like `alice.eth`) for Ethereum addresses and other resources. ENS names can also store additional metadata, such as avatars, social profiles, and more, making blockchain addresses easier to use and remember.

### BlockieAvatar.tsx

- **Description**: Renders a visual avatar for an Ethereum address. This can be either:
  - a **blockie** (a unique, automatically generated geometric pattern based on the address, used as a default visual identifier), or
  - an **ENS avatar** (a custom image set in the ENS records for an address, if available).
    If an ENS avatar is set for the address, it is shown; otherwise, a blockie is displayed.
- **Used in**:
  - `ScaffoldEthAppWithProviders.tsx`
  - `Address/Address.tsx`
  - `RainbowKitCustomConnectButton/AddressInfoDropdown.tsx`

### Balance.tsx

- **Description**: Displays ETH & USD balance of an address.
- **Used in**:
  - `Faucet.tsx`
  - `RainbowKitCustomConnectButton/index.tsx`
  - `app/blockexplorer/_components/AddressComponent.tsx`
  - `app/debug/_components/contract/ContractUI.tsx`

### Faucet.tsx

> **What is a faucet?**
>
> A faucet is a tool that dispenses small amounts of test cryptocurrency (like ETH) to users, typically for development or testing purposes on test networks or local blockchains.

- **Description**: Modal to send ETH from the local faucet to any address.
- **Used in**: `Footer.tsx`

### FaucetButton.tsx

- **Description**: Button to grab ETH from the local faucet (quick action).
- **Used in**: `Header.tsx`

### RainbowKitCustomConnectButton/index.tsx

- **Description**: Custom wallet connect button with balance, ENS, QR code, and network status.
- **Used in**: `Header.tsx`

---

### Address Components (`scaffold-eth/Address/`)

#### Address.tsx

- **Description**: Displays an Ethereum address with ENS, blockie, and copy button.
- **Used in**:
  - `app/page.tsx`
  - `Faucet.tsx`
  - `RainbowKitCustomConnectButton/AddressQRCodeModal.tsx`
  - `app/blockexplorer/_components/AddressComponent.tsx`
  - `app/debug/_components/contract/ContractUI.tsx`

#### AddressCopyIcon.tsx

- **Description**: Copy-to-clipboard icon for addresses.
- **Used in**: `Address.tsx`

#### AddressLinkWrapper.tsx

- **Description**: Wraps an address in a block explorer link (if enabled).
- **Used in**: `Address.tsx`

---

### Input Components (`scaffold-eth/Input/`)

#### AddressInput.tsx

- **Description**: Input for Ethereum addresses with ENS support.
- **Used in**:
  - `Faucet.tsx`
  - `app/debug/_components/contract/ContractInput.tsx`

#### Bytes32Input.tsx

- **Description**: Input for bytes32 values.
- **Used in**: `app/debug/_components/contract/ContractInput.tsx`

#### BytesInput.tsx

- **Description**: Input for bytes values.
- **Used in**: `app/debug/_components/contract/ContractInput.tsx`

#### EtherInput.tsx

- **Description**: Input for ETH values with USD conversion.
- **Used in**: `Faucet.tsx`

#### InputBase.tsx

- **Description**: Base input component used by other input components.
- **Used in**:
  - `AddressInput.tsx`
  - `Bytes32Input.tsx`
  - `BytesInput.tsx`
  - `EtherInput.tsx`
  - `IntegerInput.tsx`
  - `app/debug/_components/contract/ContractInput.tsx`

#### IntegerInput.tsx

- **Description**: Input for integer values (various bit sizes).
- **Used in**:
  - `app/debug/_components/contract/ContractInput.tsx`
  - `app/debug/_components/contract/WriteOnlyFunctionForm.tsx`

#### utils.ts

- **Description**: Utility types and functions for input validation (not a component).
- **Used in**: Input components.

---

### RainbowKit Custom Connect Button Subcomponents

- **AddressInfoDropdown.tsx**: Dropdown with address info and blockie. Used in `RainbowKitCustomConnectButton/index.tsx`.
- **AddressQRCodeModal.tsx**: Modal to show QR code for address. Used in `RainbowKitCustomConnectButton/index.tsx`.
- **NetworkOptions.tsx**: Network selection UI. Used in wallet connect logic.
- **WrongNetworkDropdown.tsx**: Dropdown for wrong network warning. Used in `RainbowKitCustomConnectButton/index.tsx`.

---

## Notes

- All components in `scaffold-eth` are designed to be reusable across the app.
- Some components (like `InputBase`, `utils.ts`) are only used internally by other components.
- All components listed above are used somewhere in the app. If you add new components, consider updating this doc.
