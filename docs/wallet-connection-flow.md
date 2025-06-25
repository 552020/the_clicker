# Wallet Connection Flow in The Clicker dApp

This document explains how wallet connection state is managed and reflected in the UI, using wagmi, RainbowKit, and React.

---

## 1. The Four Connection States

The wagmi `useAccount` hook exposes a `status` property with four possible values:

| status         | When does it happen?                                | What should UI show?  |
| -------------- | --------------------------------------------------- | --------------------- |
| 'disconnected' | Before user clicks connect, or after disconnect     | "No wallet connected" |
| 'connecting'   | While wallet popup is open and user is connecting   | Skeleton/loading      |
| 'connected'    | After user connects and approves in wallet          | Show address          |
| 'reconnecting' | App is trying to auto-reconnect (e.g., page reload) | Skeleton/loading      |

---

## 2. The Connect Button (Header)

The connect button is provided by RainbowKit and rendered in your Header component:

```tsx
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

export const Header = () => {
  // ...
  return (
    <div className="navbar-end grow mr-4">
      <RainbowKitCustomConnectButton />
      {/* ... */}
    </div>
  );
};
```

### How the Custom Connect Button Works

The `RainbowKitCustomConnectButton` uses RainbowKit's `<ConnectButton.Custom>` and provides a render prop with:

- `account`: Info about the connected account (if any)
- `chain`: Info about the connected chain (if any)
- `openConnectModal`: Function to open the wallet connection modal
- `mounted`: Boolean indicating if the component is mounted and ready

The button logic:

- `const connected = mounted && account && chain;`
- If not connected, shows a "Connect Wallet" button.
- If connected to the wrong network, shows a network warning.
- If connected and on the correct network, shows balance, network, and address info.

**No explicit loading spinner is shown**—the "Connect Wallet" button is the default state until the user is fully connected.

---

## 3. The Connection Process (Step by Step)

1. **Initial State:**

   - `mounted` is false → nothing shown yet.
   - `status` is `'disconnected'`, `address` is `undefined`.
   - UI shows "No wallet connected".

2. **User Clicks Connect Button:**

   - RainbowKit opens a popup for wallet selection.
   - As soon as the connection process starts, wagmi sets `status` to `'connecting'`.
   - UI shows a skeleton/loading state (if you use the status in your own components).
   - In the custom button, the "Connect Wallet" button remains until connection is established.

3. **Connection Established:**

   - If the user approves the connection, wagmi sets `status` to `'connected'` and populates `address`.
   - The custom button now shows the user's info (balance, address, etc.).
   - The Address component in your page will also update to show the address.

4. **If User Cancels:**
   - If the user closes the popup or rejects the connection, wagmi sets `status` back to `'disconnected'`.
   - UI returns to "No wallet connected".

---

## 4. Where is the State Stored? Why Does the UI Update?

- **wagmi and RainbowKit** use React context to store the connection state (account, chain, status, etc.).
- When a user connects or disconnects, the context value changes.
- **React's reactivity** ensures that any component using the `useAccount` hook (or RainbowKit's render props) will automatically re-render when the context changes.
- This is why, as soon as the user connects, the `<Address />` component in your page updates to show the address—**no manual refresh or state management is needed**.

---

## 5. Using the Status in Your Page

You can use the `status` property from `useAccount` to control what you render:

```tsx
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

function App() {
  const account = useAccount();
  const connectedAddress = account.address;
  const status = account.status;

  if (status === "connecting" || status === "reconnecting") {
    // Show skeleton loading state
    return <Address />;
  }

  if (status === "disconnected") {
    // Show nothing or a neutral message
    return <span>No wallet connected</span>;
  }

  // status === "connected"
  return <Address address={connectedAddress} />;
}
```

- This ensures the skeleton is only shown when actually connecting, not when simply disconnected.
- The component will automatically re-render as the status changes.

---

## 6. Summary Table: Custom Connect Button UI States

| State                      | UI Shown                       |
| -------------------------- | ------------------------------ |
| Not mounted                | Nothing                        |
| Not connected              | Connect Wallet button          |
| Connecting                 | Connect Wallet button          |
| Connected, wrong network   | WrongNetworkDropdown           |
| Connected, correct network | Balance, network, address info |

---

## 7. Who Manages the State?

- **wagmi**: Handles all connection state transitions and exposes them via the `useAccount` hook.
- **RainbowKit**: Provides the UI for connecting and triggers wagmi's state changes.
- **React**: Re-renders your UI whenever the state changes.

You do **not** need to manage these states manually—just use the values from `useAccount()` or the render props from RainbowKit.

---

## 8. Debugging

You can add a log to see the status in real time:

```tsx
const account = useAccount();
console.log(account.status);
```

Try interacting with the connect button and watch how the status changes in your console.

---

## Summary

- The wallet connection flow is managed by wagmi and RainbowKit.
- The UI responds to the `status` property from `useAccount` or the render props from RainbowKit.
- You only show the skeleton when actually connecting, not when simply disconnected.
- React reactivity ensures your UI always matches the current connection state.
- The Address component updates automatically when the user connects, thanks to React context and reactivity.
