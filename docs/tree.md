.
├── CONTRIBUTING.md
├── LICENCE
├── README.md
├── docs
│   ├── Scaffold-ETH_2_README.md
│   ├── contract-interaction-guide.md
│   ├── hardhat-manual-testing.md
│   ├── issues
│   │   ├── 001-ranking-design-onchain-vs-offchain.md
│   │   ├── 003-deployed-method-error.md
│   │   ├── 004-hardhat-v3-ignition-migration.md
│   │   ├── README.md
│   │   └── solved
│   │       └── 002-solidity-version-compatibility.md
│   ├── mainnet-deployment.md
│   ├── package.json.md
│   ├── sepolia-deployment.md
│   ├── source-code-verification.md
│   ├── storage-vs-logs.md
│   ├── the-clicker.md
│   ├── to-do.md
│   └── yarn-chain.md
├── package.json
├── packages
│   ├── hardhat
│   │   ├── artifacts
│   │   │   ├── build-info
│   │   │   │   ├── 03a3d151dcf5337c1dacb85ba57c5726.json
│   │   │   │   └── f12e0eeffd06134a56b7a3030ca74fef.json
│   │   │   ├── contracts
│   │   │   │   ├── TheClicker.sol
│   │   │   │   │   ├── TheClicker.dbg.json
│   │   │   │   │   └── TheClicker.json
│   │   │   │   └── YourContract.sol
│   │   │   │       ├── YourContract.dbg.json
│   │   │   │       └── YourContract.json
│   │   │   └── hardhat
│   │   │       └── console.sol
│   │   │           ├── console.dbg.json
│   │   │           └── console.json
│   │   ├── cache
│   │   │   ├── console-history.txt
│   │   │   └── solidity-files-cache.json
│   │   ├── contracts
│   │   │   ├── TheClicker.sol
│   │   │   └── YourContract.sol
│   │   ├── deploy
│   │   │   ├── 00_deploy_your_contract.ts
│   │   │   └── 01_deploy_clicker.ts
│   │   ├── deployments
│   │   │   ├── localhost
│   │   │   │   ├── TheClicker.json
│   │   │   │   ├── YourContract.json
│   │   │   │   └── solcInputs
│   │   │   │       ├── 27285d69d9d605f874def4137653de60.json
│   │   │   │       └── ea5e765f02e2d30057397938237468f8.json
│   │   │   └── sepolia
│   │   │       ├── TheClicker.json
│   │   │       ├── YourContract.json
│   │   │       └── solcInputs
│   │   │           ├── 27285d69d9d605f874def4137653de60.json
│   │   │           └── ea5e765f02e2d30057397938237468f8.json
│   │   ├── eslint.config.mjs
│   │   ├── hardhat.config.ts
│   │   ├── package.json
│   │   ├── scripts
│   │   │   ├── generateAccount.ts
│   │   │   ├── generateTsAbis.ts
│   │   │   ├── importAccount.ts
│   │   │   ├── listAccount.ts
│   │   │   ├── revealPK.ts
│   │   │   └── runHardhatDeployWithPK.ts
│   │   ├── test
│   │   │   ├── TheClicker.ts
│   │   │   ├── TheClicker.ts.md
│   │   │   └── YourContract.ts
│   │   ├── tsconfig.json
│   │   └── typechain-types
│   │       ├── TheClicker.ts
│   │       ├── YourContract.sol
│   │       │   ├── ClickerContract.ts
│   │       │   ├── YourContract.ts
│   │       │   └── index.ts
│   │       ├── YourContract.ts
│   │       ├── common.ts
│   │       ├── factories
│   │       │   ├── TheClicker__factory.ts
│   │       │   ├── YourContract.sol
│   │       │   │   ├── ClickerContract__factory.ts
│   │       │   │   ├── YourContract__factory.ts
│   │       │   │   └── index.ts
│   │       │   ├── YourContract__factory.ts
│   │       │   └── index.ts
│   │       ├── hardhat.d.ts
│   │       └── index.ts
│   └── nextjs
│       ├── app
│       │   ├── blockexplorer
│       │   │   ├── _components
│       │   │   │   ├── AddressCodeTab.tsx
│       │   │   │   ├── AddressComponent.tsx
│       │   │   │   ├── AddressLogsTab.tsx
│       │   │   │   ├── AddressStorageTab.tsx
│       │   │   │   ├── BackButton.tsx
│       │   │   │   ├── ContractTabs.tsx
│       │   │   │   ├── PaginationButton.tsx
│       │   │   │   ├── SearchBar.tsx
│       │   │   │   ├── TransactionHash.tsx
│       │   │   │   ├── TransactionsTable.tsx
│       │   │   │   └── index.tsx
│       │   │   ├── address
│       │   │   │   └── [address]
│       │   │   │       └── page.tsx
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx
│       │   │   └── transaction
│       │   │       ├── [txHash]
│       │   │       │   └── page.tsx
│       │   │       └── _components
│       │   │           └── TransactionComp.tsx
│       │   ├── debug
│       │   │   ├── _components
│       │   │   │   ├── DebugContracts.tsx
│       │   │   │   └── contract
│       │   │   │       ├── ContractInput.tsx
│       │   │   │       ├── ContractReadMethods.tsx
│       │   │   │       ├── ContractUI.tsx
│       │   │   │       ├── ContractVariables.tsx
│       │   │   │       ├── ContractWriteMethods.tsx
│       │   │   │       ├── DisplayVariable.tsx
│       │   │   │       ├── InheritanceTooltip.tsx
│       │   │   │       ├── ReadOnlyFunctionForm.tsx
│       │   │   │       ├── Tuple.tsx
│       │   │   │       ├── TupleArray.tsx
│       │   │   │       ├── TxReceipt.tsx
│       │   │   │       ├── WriteOnlyFunctionForm.tsx
│       │   │   │       ├── index.tsx
│       │   │   │       ├── utilsContract.tsx
│       │   │   │       └── utilsDisplay.tsx
│       │   │   └── page.tsx
│       │   ├── layout.tsx
│       │   └── page.tsx
│       ├── components
│       │   ├── Footer.tsx
│       │   ├── Header.tsx
│       │   ├── ScaffoldEthAppWithProviders.tsx
│       │   ├── SwitchTheme.tsx
│       │   ├── ThemeProvider.tsx
│       │   ├── assets
│       │   │   └── BuidlGuidlLogo.tsx
│       │   └── scaffold-eth
│       │       ├── Address
│       │       │   ├── Address.tsx
│       │       │   ├── AddressCopyIcon.tsx
│       │       │   └── AddressLinkWrapper.tsx
│       │       ├── Balance.tsx
│       │       ├── BlockieAvatar.tsx
│       │       ├── Faucet.tsx
│       │       ├── FaucetButton.tsx
│       │       ├── Input
│       │       │   ├── AddressInput.tsx
│       │       │   ├── Bytes32Input.tsx
│       │       │   ├── BytesInput.tsx
│       │       │   ├── EtherInput.tsx
│       │       │   ├── InputBase.tsx
│       │       │   ├── IntegerInput.tsx
│       │       │   ├── index.ts
│       │       │   └── utils.ts
│       │       ├── RainbowKitCustomConnectButton
│       │       │   ├── AddressInfoDropdown.tsx
│       │       │   ├── AddressQRCodeModal.tsx
│       │       │   ├── NetworkOptions.tsx
│       │       │   ├── WrongNetworkDropdown.tsx
│       │       │   └── index.tsx
│       │       └── index.tsx
│       ├── contracts
│       │   ├── deployedContracts.ts
│       │   └── externalContracts.ts
│       ├── eslint.config.mjs
│       ├── hooks
│       │   └── scaffold-eth
│       │       ├── index.ts
│       │       ├── useAnimationConfig.ts
│       │       ├── useContractLogs.ts
│       │       ├── useCopyToClipboard.ts
│       │       ├── useDeployedContractInfo.ts
│       │       ├── useDisplayUsdMode.ts
│       │       ├── useFetchBlocks.ts
│       │       ├── useInitializeNativeCurrencyPrice.ts
│       │       ├── useNetworkColor.ts
│       │       ├── useOutsideClick.ts
│       │       ├── useScaffoldContract.ts
│       │       ├── useScaffoldEventHistory.ts
│       │       ├── useScaffoldReadContract.ts
│       │       ├── useScaffoldWatchContractEvent.ts
│       │       ├── useScaffoldWriteContract.ts
│       │       ├── useSelectedNetwork.ts
│       │       ├── useTargetNetwork.ts
│       │       ├── useTransactor.tsx
│       │       └── useWatchBalance.ts
│       ├── next-env.d.ts
│       ├── next.config.ts
│       ├── package.json
│       ├── postcss.config.js
│       ├── public
│       │   ├── favicon.png
│       │   ├── logo.svg
│       │   ├── manifest.json
│       │   └── thumbnail.jpg
│       ├── scaffold.config.ts
│       ├── services
│       │   ├── store
│       │   │   └── store.ts
│       │   └── web3
│       │       ├── wagmiConfig.tsx
│       │       └── wagmiConnectors.tsx
│       ├── styles
│       │   └── globals.css
│       ├── tsconfig.json
│       ├── types
│       │   └── abitype
│       │       └── abi.d.ts
│       ├── utils
│       │   └── scaffold-eth
│       │       ├── block.ts
│       │       ├── common.ts
│       │       ├── contract.ts
│       │       ├── contractsData.ts
│       │       ├── decodeTxData.ts
│       │       ├── fetchPriceFromUniswap.ts
│       │       ├── getMetadata.ts
│       │       ├── getParsedError.ts
│       │       ├── index.ts
│       │       ├── networks.ts
│       │       └── notification.tsx
│       └── vercel.json
├── tree.md
└── yarn.lock

57 directories, 182 files
