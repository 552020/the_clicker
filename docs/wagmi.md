# wagmi `useAccount` Hook Documentation

## Reference

- Official docs: [wagmi useAccount](https://wagmi.sh/react/api/hooks/useAccount)

## What does `useAccount` return?

The `useAccount` hook returns an object with information about the current wallet connection, including:

- `address`: The connected wallet address (or `undefined` if not connected)
- `addresses`: Array of connected addresses
- `chain`: The connected chain object
- `chainId`: The connected chain ID
- `connector`: The wallet connector object
- `isConnected`, `isConnecting`, `isDisconnected`, `isReconnecting`: Connection status booleans
- `status`: One of `'connecting'`, `'reconnecting'`, `'connected'`, `'disconnected'`

## Usage Examples

### 1. Destructuring just the address

```tsx
import { useAccount } from "wagmi";

function App() {
  const { address: connectedAddress } = useAccount();
  return <div>{connectedAddress}</div>;
}
```

### 2. Using the full account object (recommended for debugging)

```tsx
import { useAccount } from "wagmi";

function App() {
  // Get the full account object
  const account = useAccount();

  // Log the full object to see all available properties
  console.log(account);

  // Extract just the address if you want
  const connectedAddress = account.address;

  console.log("Connected Address:", connectedAddress);

  return <div>{connectedAddress ? <p>Connected to: {connectedAddress}</p> : <p>No wallet connected</p>}</div>;
}
```

## Why log the full object?

- See all available properties for advanced use cases
- Debug connection status, chain info, and connector details
- Learn how wagmi manages wallet state under the hood

## Summary

- Use destructuring for simple cases
- Use the full object and log it for debugging and learning
- See the [official wagmi docs](https://wagmi.sh/react/api/hooks/useAccount) for more details
