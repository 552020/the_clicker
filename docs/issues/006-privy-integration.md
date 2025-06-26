# Privy Integration Steps for Scaffold-ETH 2

## 1. Prerequisites

- Privy account and App ID ([Privy Dashboard](https://dashboard.privy.io/))
- Existing Next.js project (App Router or Pages Router)
- (Optional) Alchemy/Infura API key for mainnet/testnet RPC

## 2. Install Dependencies

```bash
yarn add @privy-io/react-auth @privy-io/wagmi @tanstack/react-query
# or
npm install @privy-io/react-auth @privy-io/wagmi @tanstack/react-query
```

## 3. Configure Environment Variables

Add your Privy App ID to your environment:

```
NEXT_PUBLIC_PRIVY_APP_ID=your-privy-app-id
```

## 4. Wrap App with PrivyProvider (and wagmi)

**If using the Next.js App Router, ensure this file is a client component:**

```tsx
"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const wagmiConfig = createConfig({
  // ...your wagmi config, using chains that match Privy config
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        embeddedWallets: {
          ethereum: { createOnLogin: "users-without-wallets" },
        },
        // Optionally: defaultChain, supportedChains, appearance, etc.
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
```

- **Provider order matters:** `PrivyProvider > QueryClientProvider > WagmiProvider`
- **Config prop:** Use for embedded wallets, network config, appearance, etc. See [PrivyProvider config docs](https://docs.privy.io/basics/react/setup).

## 4a. Configure wagmi for Privy

You must provide a complete wagmi configuration to `createConfig` from `@privy-io/wagmi`. This is required for wallet connections and contract interactions to work correctly with Privy. The configuration should specify:

- `chains`: An array of chain objects (e.g., mainnet, sepolia, polygon) that your dApp will support. Import these from `viem/chains`.
- `transports`: An object mapping each chain ID to a transport, typically using `http()` from `wagmi`. For production, use your own RPC URLs via environment variables.

**Example:**

```tsx
import { createConfig } from "@privy-io/wagmi";
import { mainnet, sepolia } from "viem/chains"; // Import your supported chains
import { http } from "wagmi"; // Import the http transport

const wagmiConfig = createConfig({
  chains: [mainnet, sepolia], // Add all chains your app supports
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET_RPC_URL || undefined),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || undefined),
    // Add more chains as needed
  },
});
```

**Key points:**

- The `chains` defined in `wagmiConfig` should match the `supportedChains` (and `defaultChain`) you might set in your `PrivyProvider` config for consistency.
- Use `createConfig` and `WagmiProvider` from `@privy-io/wagmi`, not from `wagmi` directly. This is crucial for Privy to correctly manage wallet states for wagmi.
- Use environment variables for your RPC URLs and prefix them with `NEXT_PUBLIC_` for client-side access in Next.js.
- Install `viem` if you haven't already: `yarn add viem` or `npm install viem`.

**References:**

- [Integrating with wagmi (Privy Docs)](https://docs.privy.io/wallets/connectors/ethereum/integrations/wagmi)

> If you are migrating from Scaffold-ETH 2, you can adapt your previous wagmi config logic to this format, ensuring you use the same chains and client logic for compatibility.

## 4b. Add RPC URLs for Supported Chains

With embedded wallets (such as those created via Privy, social logins, or email), your frontend is responsible for connecting directly to the blockchain via an RPC endpoint. This is different from using MetaMask or other browser wallets, where the extension manages the network connection for you.

**Does Privy provide a direct connection to an RPC?**

No, Privy itself does **not** act as an RPC provider like Infura, Alchemy, or public node providers.

- **Privy's Role:** Privy specializes in user authentication, creating and managing user wallets (especially embedded wallets), and providing the tools (like the PrivyProvider and hooks) to integrate these wallets into your application. It gives your app the ability to sign messages and transactions using the user's wallet.
- **Developer's Role (RPCs):** You, as the developer, are responsible for supplying the RPC endpoints that libraries like wagmi or ethers.js will use to broadcast those signed transactions or query blockchain data. Privy ensures the "who" (the user's wallet and identity) and the "what" (the signed transaction/message), while your configured RPC endpoint handles the "how" of communicating with the actual blockchain network.

You must provide RPC URLs for each supported chain in your wagmi config. Add these to your `packages/nextjs/.env.local` file:

```
NEXT_PUBLIC_MAINNET_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
```

- Replace `YOUR_INFURA_KEY` with your actual Infura (or Alchemy, or other provider) API key.
- You can use any public or private RPC provider, but for production, a reliable provider is recommended.

**Why?**

- With embedded wallets and Privy, your frontend is responsible for connecting to the blockchain, not just the user's wallet extension.
- These RPC URLs are used by wagmi to read blockchain data and send transactions when using embedded wallets or Privy-managed connections.
- Without valid RPC URLs configured in wagmi, your application wouldn't be able to perform on-chain actions or fetch blockchain data, even with Privy managing the wallets.

## 4b. Add Hardhat Chain to wagmiConfig

> **Notice for Local Development:**
>
> If you use Hardhat for local development, you **must** add the Hardhat chain to your `wagmiConfig` and set its transport to `http://localhost:8545`:
>
> ```tsx
> import { mainnet, sepolia, hardhat } from "viem/chains";
> import { http } from "wagmi";
>
> const wagmiConfig = createConfig({
>   chains: [mainnet, sepolia, hardhat],
>   transports: {
>     [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET_RPC_URL || undefined),
>     [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || undefined),
>     [hardhat.id]: http("http://localhost:8545"),
>   },
> });
> ```
>
> This is required to avoid `ChainNotConfiguredError` when running your app locally with Hardhat.

## 4c. Enable Social Logins (e.g., Google)

To offer Google (and other social logins) in the Privy modal, add a `loginMethods` array to your PrivyProvider config. For example:

```tsx
<PrivyProvider
  appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
  config={{
    loginMethods: [
      "email", // Email login
      "wallet", // Wallet login (MetaMask, WalletConnect, etc.)
      "google", // Google login
      // "discord", // Example: Discord login
      // "apple",   // Example: Apple login
      // Add more as needed: 'github', 'twitter', etc.
    ],
    embeddedWallets: {
      ethereum: { createOnLogin: "users-without-wallets" },
    },
    // Optionally: defaultChain, supportedChains, appearance, etc.
  }}
>
  {/* ... */}
</PrivyProvider>
```

> **Important:**
> Enabling a social login method (like Google) in your PrivyProvider config is **not enough**. You must also enable it in your [Privy Dashboard](https://dashboard.privy.io/) for your app. For some providers (such as Google in production, Apple, etc.), you may need to provide additional credentials (e.g., Google Client ID/Secret from the Google Cloud Console). If not enabled in the dashboard, you will see errors like `Login with Google not allowed` or HTTP 403 errors from Privy.

- You can add or remove login methods as needed. See the [Privy docs](https://docs.privy.io/basics/authentication/login-methods) for the full list and any provider-specific setup.
- For some providers (like Apple or custom Google Cloud credentials), you may need to configure them in the Privy Dashboard.

> **Important for Local Development:**
>
> When developing locally with Hardhat, you must set both `defaultChain` and `supportedChains` in your PrivyProvider config. If you do not, Privy will default to Ethereum mainnet, which can cause network mismatch errors and prompt users to switch networks. This is especially important for embedded wallets and seamless local testing.
>
> **Example:**
>
> ```tsx
> import { hardhat, mainnet, sepolia } from "viem/chains";
>
> <PrivyProvider
>   appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
>   config={{
>     // ...
>     defaultChain: hardhat, // Set Hardhat as default for local dev
>     supportedChains: [mainnet, sepolia, hardhat], // Explicitly list supported chains
>     // ...
>   }}
> >
>   {/* ... */}
> </PrivyProvider>;
> ```
>
> This ensures Privy and wagmi are always in sync and prevents "wrong network" errors when using embedded wallets or social logins during local development.

## 4c. Add Hardhat Chain to wagmiConfig

> **Notice for Local Development:**
>
> If you use Hardhat for local development, you **must** add the Hardhat chain to your `wagmiConfig` and set its transport to `http://localhost:8545`:
>
> ```tsx
> import { mainnet, sepolia, hardhat } from "viem/chains";
> import { http } from "wagmi";
>
> const wagmiConfig = createConfig({
>   chains: [mainnet, sepolia, hardhat],
>   transports: {
>     [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET_RPC_URL || undefined),
>     [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || undefined),
>     [hardhat.id]: http("http://localhost:8545"),
>   },
> });
> ```
>
> This is required to avoid `ChainNotConfiguredError` when running your app locally with Hardhat.

## 4c. Enable Social Logins (e.g., Google)

To offer Google (and other social logins) in the Privy modal, add a `loginMethods` array to your PrivyProvider config. For example:

```tsx
<PrivyProvider
  appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
  config={{
    loginMethods: [
      "email", // Email login
      "wallet", // Wallet login (MetaMask, WalletConnect, etc.)
      "google", // Google login
      // "discord", // Example: Discord login
      // "apple",   // Example: Apple login
      // Add more as needed: 'github', 'twitter', etc.
    ],
    embeddedWallets: {
      ethereum: { createOnLogin: "users-without-wallets" },
    },
    // Optionally: defaultChain, supportedChains, appearance, etc.
  }}
>
  {/* ... */}
</PrivyProvider>
```

> **Important:**
> Enabling a social login method (like Google) in your PrivyProvider config is **not enough**. You must also enable it in your [Privy Dashboard](https://dashboard.privy.io/) for your app. For some providers (such as Google in production, Apple, etc.), you may need to provide additional credentials (e.g., Google Client ID/Secret from the Google Cloud Console). If not enabled in the dashboard, you will see errors like `Login with Google not allowed` or HTTP 403 errors from Privy.

- You can add or remove login methods as needed. See the [Privy docs](https://docs.privy.io/basics/authentication/login-methods) for the full list and any provider-specific setup.
- For some providers (like Apple or custom Google Cloud credentials), you may need to configure them in the Privy Dashboard.

---

## TODO

- Consider extracting the PrivyProvider (and possibly the full provider tree) into its own component (e.g., `Providers.tsx`) for clarity and maintainability, especially as your config grows more complex.

---

## 5. Add Login Button

You can use the `usePrivy` hook to trigger login and manage authentication state. Below is a simple example, but you may want to use a more advanced Login component that handles additional states, user info, or custom UI.

**Simple Example:**

```tsx
import { usePrivy } from "@privy-io/react-auth";

const { login, ready, authenticated, user, logout } = usePrivy();

if (!ready) return <div>Loading...</div>;

return (
  <button onClick={login} disabled={!ready}>
    Log in with Privy
  </button>
);
```

**Advanced Example (as used in your app):**

```tsx
import { usePrivy } from "@privy-io/react-auth";

export const PrivyLoginButton = () => {
  const { login, ready, authenticated, user, logout } = usePrivy();

  if (!ready)
    return (
      <button className="btn btn-primary btn-sm" disabled>
        Loading...
      </button>
    );
  if (authenticated) {
    return (
      <div>
        <span>Welcome, {user?.email || user?.wallet?.address?.slice(0, 6) + "..."}</span>
        <button className="btn btn-secondary btn-sm" onClick={logout}>
          Logout (Privy)
        </button>
      </div>
    );
  }

  return (
    <button className="btn btn-primary btn-sm" onClick={login} disabled={!ready}>
      Log in with Privy
    </button>
  );
};
```

- This advanced version shows a loading state, a personalized welcome message when authenticated, and a logout button.
- You can further customize it to show user details, handle errors, or style it according to your app's design.

## 6. Access Wallets and User Info

- The `wallets` array from `useWallets` can contain multiple wallets (embedded, MetaMask, Coinbase, etc.).
- Use the `useSetActiveWallet` hook from `@privy-io/wagmi` to control which wallet is "active" for wagmi hooks and contract interactions.

```tsx
import { useWallets } from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";
const { wallets, ready: walletsReady } = useWallets();
const setActiveWallet = useSetActiveWallet();

// Example: setActiveWallet(wallets[0]?.id) to switch
```

- Always check `walletsReady` before accessing wallet data.

## 7. (Optional) Use with wagmi

- Use `WagmiProvider` and `createConfig` from `@privy-io/wagmi` (not from `wagmi` directly).
- `QueryClientProvider` comes from `@tanstack/react-query`.
- Provider wrapping order: **PrivyProvider > QueryClientProvider > WagmiProvider**
- Use `useSetActiveWallet` to manage which wallet is active for wagmi hooks.
- See [wagmi integration guide](https://docs.privy.io/wallets/connectors/ethereum/integrations/wagmi).

## 8. Readiness State

- Always check the `ready` state from `usePrivy` before showing login or wallet-dependent UI.
- If you use `useWallets`, also check its `ready` state before accessing wallet data.
- Show a loading indicator until ready.

## 9. Useful Links

- [Privy React Setup](https://docs.privy.io/basics/react/setup)
- [PrivyProvider config options](https://docs.privy.io/basics/react/setup#configuration)
- [wagmi integration guide](https://docs.privy.io/wallets/connectors/ethereum/integrations/wagmi)
- [Privy Next.js Starter](https://github.com/privy-io/create-next-app)
- [wagmi + Privy Example](https://github.com/privy-io/wagmi-demo)
- [@privy-io/wagmi package](https://www.npmjs.com/package/@privy-io/wagmi)

---

## RainbowKit vs Privy: Summary Table

| Feature            | RainbowKit (current)                    | Privy (alternative)                         |
| ------------------ | --------------------------------------- | ------------------------------------------- |
| Wallets supported  | MetaMask, WalletConnect, Coinbase, etc. | All above + embedded wallets, social logins |
| Social login       | ❌                                      | ✅                                          |
| Embedded wallet    | ❌                                      | ✅                                          |
| Custom onboarding  | Limited                                 | Highly customizable                         |
| wagmi integration  | Native                                  | Native (via @privy-io/wagmi)                |
| App Router support | ✅                                      | ✅                                          |

---

**Notes:**

- For advanced config (embedded wallets, social logins, etc.), see the [Privy docs](https://docs.privy.io/).
- Scaffold-ETH 2 uses RainbowKit and wagmi by default. Decide if you want to use Privy as a replacement or alongside RainbowKit.
- If using both, clearly define how they interact (e.g., Privy for auth, RainbowKit/wagmi for wallet interactions post-login). The `@privy-io/wagmi` connector helps bridge this.
- If users may have multiple wallets, use `useSetActiveWallet` to let them choose which wallet is active for transactions.
- Always check readiness state (`ready`) before accessing Privy or wallet data.
- If using the App Router, ensure your Providers file is a client component (`'use client';` at the top).

---

**This plan now reflects best practices and advanced configuration for a smooth Privy integration in Scaffold-ETH 2.**

---

## UX Considerations: Coexistence of Privy and RainbowKit

When offering both Privy and RainbowKit in your dApp, clarity and user choice are paramount. Here are best practices and pitfalls to consider:

### Best Practices

- **Clearly Define Each Option:**
  - **Privy:** Use as the main "Login / Sign Up" method, supporting email, social logins, and embedded wallets. Privy can also connect external wallets.
  - **RainbowKit:** If included, present as a specific option for users who want to connect an existing wallet using the familiar RainbowKit interface.
- **Distinct Calls to Action (CTAs):**
  - If using both, make the buttons visually and textually distinct (e.g., "Login / Sign Up" for Privy, "Connect External Wallet" for RainbowKit).
- **User Flow Guidance:**
  - For new or non-crypto users, guide them to Privy's email/social login for seamless onboarding.
  - For crypto-native users, ensure the external wallet connection (via Privy or RainbowKit) is easy to find.
- **Post-Connection Consistency:**
  - After login/connection, show the connected wallet address clearly.
  - If a user has multiple wallets (embedded + external), provide a way to view and select the active wallet (using Privy's `useWallets()` and `useSetActiveWallet`).
- **Single Source of Truth for wagmi:**
  - Decide which system (Privy or RainbowKit) is responsible for providing the wallet connection to wagmi. Avoid conflicting providers/configs.

### Pitfalls and Anti-Patterns

- **User Identity Fragmentation:**
  - If a user previously used RainbowKit and later signs up with Privy, prompt them to link their old wallet to their Privy account to unify their identity.
- **Confusing Wallet Options:**
  - Avoid offering both Privy's and RainbowKit's external wallet connection without clear distinction—this can confuse users.
- **Conflicting wagmi Configurations:**
  - Do not initialize wagmi from both @privy-io/wagmi and RainbowKit without a clear hierarchy.
- **Inconsistent Session Management:**
  - Privy manages user sessions (DID), RainbowKit manages wallet connection. Ensure these do not conflict.
- **Overwhelming New Users:**
  - Too many wallet options can intimidate new users. Use progressive disclosure if you support both user types.
- **Not Leveraging Privy's Full Capabilities:**
  - Evaluate if Privy's built-in external wallet connection is sufficient before adding RainbowKit.

### Key Recommendation

Strive for a unified user identity managed by Privy. If RainbowKit is used, link the connected wallet to the user's Privy account. This ensures a single, coherent account regardless of entry point (email, social, embedded, or external wallet).

**Simplicity and clarity should always be prioritized in the UX.**

---

an
