"use client";

// import { useState } from "react";
import { useEffect, useState } from "react";
import { PlusButton } from "../components/PlusButton";
// import Link from "next/link";
// import { EthereumCssLogo } from "../components/EthereumCssLogo";
// import { EthereumCssLogoSmall } from "../components/EthereumCssLogoSmall";
// import { Button } from "../components/ui/button";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();
  const account = useAccount();
  console.log(account);
  const connectedAddress = account.address;
  // const status = account.status;
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

  // Query clicks for any address
  const validQueryAddress = queryAddress && queryAddress.length === 42 ? queryAddress : undefined;
  const { data: queriedClicks } = useScaffoldReadContract({
    contractName: "TheClicker",
    functionName: "getUserClicks",
    args: [validQueryAddress as `0x${string}` | undefined],
  });

  // Log the address used for reading (userClicks)
  useEffect(() => {
    if (connectedAddress) {
      console.log("[Frontend] Reading clicks for address:", connectedAddress);
    }
  }, [connectedAddress]);

  // Write contract for clicking
  const { writeContractAsync: clickAsync, isMining: isClicking } = useScaffoldWriteContract({
    contractName: "TheClicker",
  });

  // Log the address used for writing (click)
  const handleClick = async () => {
    if (!connectedAddress) return;
    console.log("[Frontend] Writing (click) from address:", connectedAddress);
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
      <div className="flex flex-col grow pt-10 w-full max-w-xl mx-auto">
        <div className="grid grid-cols-1 grid-rows-5 md:grid-cols-3 md:grid-rows-3 gap-4 w-full h-[60vh] min-h-[400px]">
          {/* Top row: Your Clicks (left), Ranking (right) in one div */}
          <div className="border-2 border-red-500 flex flex-row justify-between items-start md:col-span-3 md:row-start-1 row-start-1 col-start-1">
            <div className="flex flex-col items-center w-1/2">
              <div className="border border-pink-500 w-full text-center text-lg font-semibold">Your Clicks</div>
              <div className="border border-orange-500 w-full text-center text-2xl">
                {userClicks?.toString() || "0"}
              </div>
            </div>
            <div className="flex flex-col items-center w-1/2">
              <div className="border border-pink-500 w-full text-center text-lg font-semibold">Ranking</div>
              <div className="border border-orange-500 w-full text-center text-2xl text-gray-400">—</div>
            </div>
          </div>
          {/* Center: Plus Button */}
          <div className="border-2 border-green-500 flex flex-col justify-center items-center md:row-start-2 md:col-start-2 row-start-3 col-start-1">
            <PlusButton onClick={handleClick} disabled={!connectedAddress || isClicking} isLoading={isClicking} />
          </div>
          {/* Bottom row: Total Clicks (left), Clickcoins Owned (right) in one div */}
          <div className="border-2 border-purple-500 flex flex-row justify-between items-end md:col-span-3 md:row-start-3 row-start-5 col-start-1">
            <div className="flex flex-col items-center w-1/2">
              <div className="border border-pink-500 w-full text-center text-lg font-semibold">Total Clicks</div>
              <div className="border border-orange-500 w-full text-center text-2xl">
                {totalClicks?.toString() || "0"}
              </div>
            </div>
            <div className="flex flex-col items-center w-1/2">
              <div className="border border-pink-500 w-full text-center text-lg font-semibold">Clickcoins Owned</div>
              <div className="border border-orange-500 w-full text-center text-2xl text-gray-400">—</div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label>
            Query Clicks for Address:{" "}
            <input
              type="text"
              value={queryAddress}
              onChange={e => setQueryAddress(e.target.value)}
              placeholder="0x..."
              className="input input-bordered"
            />
          </label>
          {queryAddress && <div>Clicks: {queriedClicks?.toString() ?? "—"}</div>}
        </div>
      </div>
    </>
  );
};

export default Home;
