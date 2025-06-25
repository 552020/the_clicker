"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();
  const account = useAccount();
  console.log(account);
  const connectedAddress = account.address;
  const status = account.status;
  console.log("Connected Address:", connectedAddress);
  const [queryAddress, setQueryAddress] = useState<string>("");

  // Read total clicks
  const { data: totalClicks } = useScaffoldReadContract({
    contractName: "TheClicker",
    functionName: "totalClicks",
  });

  // Read current user's clicks
  const { data: userClicks } = useScaffoldReadContract({
    contractName: "TheClicker",
    functionName: "getUserClicks",
    args: [connectedAddress],
  });

  // Read queried address clicks
  const { data: queriedClicks } = useScaffoldReadContract({
    contractName: "TheClicker",
    functionName: "getUserClicks",
    args: [queryAddress as `0x${string}`],
  });

  // Write contract for clicking
  const { writeContractAsync: clickAsync, isMining: isClicking } = useScaffoldWriteContract({
    contractName: "TheClicker",
  });

  const handleClick = async () => {
    if (!connectedAddress) return;

    try {
      await clickAsync({
        functionName: "click",
      });
    } catch (error) {
      console.error("Click failed:", error);
    }
  };

  return (
    <>
      <div className="flex items-center flex-col grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">The Clicker</span>
          </h1>

          <div className="flex justify-center items-center space-x-2 flex-col">
            <p className="my-2 font-medium">Connected Address:</p>
            {status === "connecting" || status === "reconnecting" ? (
              <Address />
            ) : status === "disconnected" ? (
              <span>No wallet connected</span>
            ) : (
              <Address address={connectedAddress} />
            )}

            {/* Click Button */}
            <Button onClick={handleClick} disabled={!connectedAddress || isClicking} className="mt-4">
              {isClicking ? "Clicking..." : "Click!"}
            </Button>

            {/* Total Clicks Display */}
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">Total Clicks: {totalClicks?.toString() || "0"}</p>
            </div>

            {/* User Clicks Display */}
            {connectedAddress && (
              <div className="mt-2 text-center">
                <p className="text-md">Your Clicks: {userClicks?.toString() || "0"}</p>
              </div>
            )}

            {/* Query Other User's Clicks */}
            <div className="mt-6 text-center">
              <p className="text-md mb-2">Query another user&apos;s clicks:</p>
              <input
                type="text"
                placeholder="Enter address (0x...)"
                value={queryAddress}
                onChange={e => setQueryAddress(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md w-80 text-center"
              />
              {queryAddress && queriedClicks !== undefined && (
                <p className="mt-2 text-sm">
                  Clicks for {queryAddress}: {queriedClicks.toString()}
                </p>
              )}
            </div>
          </div>

          <p className="text-center text-lg mt-8">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              TheClicker.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div>

        <div className="grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col md:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
