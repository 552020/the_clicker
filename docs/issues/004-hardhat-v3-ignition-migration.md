# Issue #004: Hardhat v3 + Ignition Migration for Hackathon

## Overview: Hardhat Deployment Approaches

Hardhat's **latest approach** to deployments hinges on its new **Ignition** system — a declarative, module‑based framework—and also supports traditional raw scripts alongside plugins. Here's a breakdown:

---

## 🔥 1. **Hardhat Ignition** (official declarative system)

- **Declarative modules**: You define deployments via `ignition/modules/*.js|ts`, using `buildModule` to specify contracts, constructor args, values, accounts, etc.
- **Running deployments**: Use `npx hardhat ignition deploy <module>` (defaults to in‑memory Hardhat Network, or specify `--network`).
- **Advanced features**:
  - Live **reconciliation** and **recovery** when deployments fail/restart
  - **Parallel module execution**, deployment parameterization, and hardware wallet support (e.g. Ledger)
  - Deployment artifacts in `./ignition/deployments/…`, designed to be version‑controlled
- **Migration path**: You can migrate from `hardhat-deploy` via the "migrating" guide—removes plugin, installs Ignition, rewrites scripts into modules.

---

## 2. **hardhat-deploy** (community plugin)

Still available with features like deterministic deployments, fixtures use with snapshots, proxy & diamond upgrade support, named‑accounts, and retrying pending TXs. But compared to Ignition:

- Some note friction with TypeScript support and dependency on Ethers v5.
- Many new projects prefer Ignition for official support and modern UX.

---

## 3. **Raw Hardhat Scripts** (using Ethers/v6)

- Classic approach: import `hre.ethers`, use `getContractFactory`, then `deploy()` → `deployed()`.
- Recent syntactic update with Ethers v6:

  ```js
  const hre = require("hardhat");
  const nft = await hre.ethers.deployContract("NFT", [], {});
  await nft.waitForDeployment();
  console.log("NFT deployed at", nft.target);
  ```

- Still popular for simple, ad‑hoc, or prototyping deployments.

---

## ⚖️ Comparison Table

| Method                   | Declarative?           | TypeScript friendly | Recovery & reconciliation | Fixture support | Hardware wallets |
| ------------------------ | ---------------------- | ------------------- | ------------------------- | --------------- | ---------------- |
| **Ignition**             | ✅ Yes                 | ✅ Good             | ✅ Yes                    | ✅ via helpers  | ✅ Yes           |
| **hardhat-deploy**       | ✅ Script-based plugin | ⚙️ Moderate         | ⚙️ Yes                    | ✅ snapshots    | ⚙️ Partial       |
| **Raw scripts + Ethers** | ❌ No                  | ✅ Yes              | ❌ No                     | ❌              | ⚠️ Manual only   |

---

### ✅ **Latest best practice**:

- Use **Hardhat Ignition** for structured, robust deployments, especially for complex contracts, upgradeables, or CI/CD flows.
- Use **raw Ethers v6 scripts** for quick prototypes or minimal deployments.
- `hardhat-deploy` remains viable, but Ignition is the officially recommended path forward.

---

### 🛠️ Should you migrate?

- If you're currently using `hardhat-deploy`, consider migrating: there's a **migration guide** to convert deploy scripts into Ignition modules.
- Ignition offers better recoverability, type support, and official backing.

---

**TL;DR:** Hardhat's latest version (v3+) centers around **Ignition**—a declarative, resilient, TS-friendly deployment system with advanced features. Old methods remain supported, but Ignition is the future.

---

## Problem Description

Our project currently uses **hardhat-deploy** (community plugin) for contract deployment, but we're considering participating in a hackathon that may require **Hardhat v3** with **Ignition** (the new official deployment system).

## Current State

- **Deployment System**: hardhat-deploy plugin
- **Hardhat Version**: Likely v2.x (needs verification)
- **Deployment Scripts**: `packages/hardhat/deploy/*.ts` files
- **Status**: Working well for our simple TheClicker contract

## Why Consider Migration

### Hackathon Requirements

- **Hardhat v3** may be required or recommended
- **Ignition** is the new official deployment system
- **Better tooling** and support for modern development

### Technical Benefits

- **Declarative modules** instead of imperative scripts
- **Better recovery** and reconciliation when deployments fail
- **Hardware wallet support** (Ledger, etc.)
- **Parallel module execution**
- **Official Hardhat support** (vs community plugin)

## Migration Requirements

### 1. **Hardhat Version Upgrade**

```bash
# Current: hardhat v2.x
# Target: hardhat v3.x
npm install hardhat@latest
```

### 2. **Remove hardhat-deploy Dependencies**

```bash
npm uninstall hardhat-deploy hardhat-deploy-ethers
```

### 3. **Install Ignition**

```bash
npm install @nomicfoundation/hardhat-ignition
```

### 4. **Update Hardhat Config**

```typescript
// Remove these imports
// import "hardhat-deploy";
// import "hardhat-deploy-ethers";

// Add Ignition
import "@nomicfoundation/hardhat-ignition";
```

### 5. **Convert Deployment Scripts**

#### Current (hardhat-deploy):

```typescript
// packages/hardhat/deploy/01_deploy_clicker.ts
const deployClickerContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("TheClicker", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
};
```

#### New (Ignition):

```typescript
// ignition/modules/TheClicker.ts
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TheClicker", (m) => {
  const clicker = m.contract("TheClicker", []);

  return { clicker };
});
```

### 6. **Update Deployment Commands**

```bash
# Old (hardhat-deploy)
yarn deploy
yarn deploy --network sepolia

# New (Ignition)
npx hardhat ignition deploy TheClicker
npx hardhat ignition deploy TheClicker --network sepolia
```

### 7. **Update Package.json Scripts**

```json
{
  "scripts": {
    "deploy": "hardhat ignition deploy TheClicker",
    "deploy:sepolia": "hardhat ignition deploy TheClicker --network sepolia"
  }
}
```

### 8. **Update Frontend Integration**

- **Current**: `deployedContracts.ts` generated by hardhat-deploy
- **New**: Ignition generates different artifacts
- **Action**: Update frontend to use new contract addresses

## Detailed Migration Guide

### 🔧 1. Install Hardhat Ignition

Remove `hardhat-deploy` and add the official Ignition plugin:

```bash
npm uninstall hardhat-deploy hardhat-deploy-ethers
npm install --save-dev \
  @nomicfoundation/hardhat-ignition-ethers \
  @nomicfoundation/hardhat-network-helpers
```

Or with Yarn/PNPM—make sure `ethers` is v6+ in your project.

Update your `hardhat.config.*` by replacing:

```diff
- import "hardhat-deploy";
- import "hardhat-deploy-ethers";
+ import "@nomicfoundation/hardhat-ignition-ethers";
```

### 📦 2. Convert your deploy scripts into Ignition modules

Scaffold‑ETH 2 places Hardhat deploy scripts in `packages/hardhat/deploy/`. Move these to:

```
packages/hardhat/ignition/modules/TheClicker.ts
```

Then rewrite:

#### Original (hardhat-deploy):

```ts
// packages/hardhat/deploy/01_deploy_clicker.ts
const { deployments, getNamedAccounts } = hre;
const { deploy } = deployments;
const { deployer } = await getNamedAccounts();
await deploy("TheClicker", {
  from: deployer,
  args: [],
  log: true,
  autoMine: true,
});
```

#### Converted to Ignition:

```ts
// packages/hardhat/ignition/modules/TheClicker.ts
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TheClickerModule", (m) => {
  const deployer = m.getAccount(0);

  const clicker = m.contract("TheClicker", [], {
    from: deployer,
  });

  return { clicker };
});
```

### 🧪 3. Update tests or scripts that deploy

If you're using fixtures via `hardhat-deploy`, switch to `loadFixture` with Ignition:

```ts
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import TheClickerModule from "../ignition/modules/TheClicker";

it("works", async () => {
  const { clicker } = await loadFixture(() => hre.ignition.deploy(TheClickerModule));
  // ...
});
```

### 🚀 4. Running the new deployment

To run the new modules:

```bash
cd packages/hardhat
npx hardhat ignition deploy ignition/modules/TheClicker.ts --network <NETWORK>
```

Or just:

```bash
yarn deploy
```

if you've updated your `deploy` script in `package.json`.

### ✅ Migration Checklist

| Step | Action                                                 |
| ---- | ------------------------------------------------------ |
| 1    | Remove `hardhat-deploy`, install Ignition & helpers    |
| 2    | Remove old imports in `hardhat.config.ts/js`           |
| 3    | Move and convert deploy scripts to `ignition/modules/` |
| 4    | Replace fixtures with `hre.ignition.deploy(...)`       |
| 5    | Run `npx hardhat ignition deploy ...`                  |

This migration reuses Scaffold‑ETH 2's existing contract scripts but adapts them to Ignition's modern, declarative workflow.

## Migration Steps

### Phase 1: Preparation

1. **Backup current deployment scripts**
2. **Document current working state**
3. **Create new branch for migration**
4. **Verify hackathon requirements**

### Phase 2: Core Migration

1. **Upgrade Hardhat to v3**
2. **Install Ignition**
3. **Remove hardhat-deploy**
4. **Convert deployment scripts**
5. **Update configuration**

### Phase 3: Testing

1. **Test local deployment**
2. **Test testnet deployment**
3. **Verify contract functionality**
4. **Update documentation**

### Phase 4: Cleanup

1. **Remove old deployment files**
2. **Update README and docs**
3. **Test full workflow**
4. **Update CI/CD if applicable**

## Potential Issues

### 1. **Breaking Changes**

- Different deployment artifacts format
- Changed command syntax
- Potential TypeScript compatibility issues

### 2. **Learning Curve**

- New declarative syntax
- Different debugging approach
- Updated documentation needed

### 3. **Scaffold-ETH 2 Compatibility**

- Framework may not be fully updated for Ignition
- Potential integration issues
- Community support may be limited

## Decision Criteria

### ✅ **Migrate if:**

- Hackathon explicitly requires Hardhat v3
- We need advanced deployment features
- We want to use latest best practices
- We have time for migration and testing

### ❌ **Stay with hardhat-deploy if:**

- Hackathon doesn't require specific version
- Current setup works well
- Limited time for migration
- Risk of breaking working functionality

## Resources

- [Hardhat Ignition Documentation](https://hardhat.org/ignition/docs)
- [Migration Guide from hardhat-deploy](https://hardhat.org/ignition/docs/advanced/migrating)
- [Hardhat v3 Release Notes](https://hardhat.org/reference/migrate-from-v2)

## Timeline

- **Decision**: [TBD - based on hackathon requirements]
- **Migration**: 1-2 days if needed
- **Testing**: 1 day
- **Documentation**: 0.5 day

## Status

- **Status**: 🔍 Under Investigation
- **Priority**: Medium (depends on hackathon requirements)
- **Category**: Infrastructure & Tooling
- **Assigned**: Development Team

## Notes

This migration would modernize our deployment system and align with Hardhat's latest best practices. However, it should only be pursued if explicitly required by the hackathon or if we need the advanced features Ignition provides.

The current hardhat-deploy setup is perfectly functional for our needs, so this is an optimization rather than a necessity.

---

**Created**: [Current Date]  
**Updated**: [Current Date]  
**Assigned**: Development Team
