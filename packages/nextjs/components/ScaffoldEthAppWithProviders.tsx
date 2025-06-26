"use client";

import { useEffect, useState } from "react";
// <-- Use Privy's WagmiProvider
import { PrivyProvider } from "@privy-io/react-auth";
// import { WagmiProvider } from "wagmi";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
// import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
// <-- Import PrivyProvider
import { hardhat, mainnet, sepolia } from "viem/chains";
// <-- Import supported chains
import { http } from "wagmi";
// <-- Import http transport
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useInitializeNativeCurrencyPrice } from "~~/hooks/scaffold-eth";

// import { wagmiConfig } from "~~/services/web3/wagmiConfig";

// Complete wagmiConfig for Privy integration
const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, hardhat], // Add hardhat for local development
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET_RPC_URL || undefined),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || undefined),
    [hardhat.id]: http("http://localhost:8545"), // <-- Local Hardhat RPC
    // Add more chains as needed
  },
});

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  useInitializeNativeCurrencyPrice();

  return (
    <>
      <div className={`flex flex-col min-h-screen `}>
        <Header />
        <main className="relative flex flex-col flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
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
        // Ensure Privy defaults to Hardhat for local dev and matches wagmiConfig
        defaultChain: hardhat, // <-- Set Hardhat as default for local development
        supportedChains: [mainnet, sepolia, hardhat], // <-- Explicitly list supported chains
        // ...other config (appearance, etc.)
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <ProgressBar height="3px" color="#2299dd" />
          <RainbowKitProvider
            avatar={BlockieAvatar}
            theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
          >
            <ScaffoldEthApp>{children}</ScaffoldEthApp>
          </RainbowKitProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};

// Old provider tree (commented out for reference):
// import { wagmiConfig } from "~~/services/web3/wagmiConfig";
// return (
//   <WagmiProvider config={wagmiConfig}>
//     <QueryClientProvider client={queryClient}>
//       <ProgressBar height="3px" color="#2299dd" />
//       <RainbowKitProvider
//         avatar={BlockieAvatar}
//         theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
//       >
//         <ScaffoldEthApp>{children}</ScaffoldEthApp>
//       </RainbowKitProvider>
//     </QueryClientProvider>
//   </WagmiProvider>
// );
