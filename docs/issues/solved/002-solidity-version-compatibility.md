# Issue #002: Solidity Version Compatibility — Contract vs Hardhat Config

**Status:** Solved  
**Priority:** Medium  
**Labels:** `solidity`, `hardhat`, `config`, `dev-experience`

---

## 🐞 Problem Statement

When running tests or compiling contracts, you may encounter an error like:

```
Error HH606: The project cannot be compiled, see reasons below.
The Solidity version pragma statement in these files doesn't match any of the configured compilers in your config.
  * contracts/TheClicker.sol (^0.8.24)
```

## 🔍 Why Does This Happen?

- Each contract file specifies a **Solidity version pragma** (e.g., `pragma solidity ^0.8.24;`)
- The Hardhat config (`hardhat.config.ts`) specifies which compiler versions are available (e.g., `0.8.20`)
- If the contract's pragma does **not match** any configured compiler, Hardhat cannot compile the contract

## ⚡ Example

- **Contract:**
  ```solidity
  pragma solidity ^0.8.24;
  ```
- **Hardhat config:**
  ```ts
  solidity: {
    compilers: [
      { version: "0.8.20", ... }
    ]
  }
  ```
- **Result:** Compilation fails with version mismatch

## 🛠️ How to Fix

**Option 1: Update the contract pragma to match the Hardhat config**

- Change `pragma solidity ^0.8.24;` to `pragma solidity ^0.8.20;`
- This is the simplest and safest fix if you don't need features from a newer version

**Option 2: Add the required compiler version to Hardhat config**

- In `hardhat.config.ts`, add:
  ```ts
  compilers: [
    { version: "0.8.20", ... },
    { version: "0.8.24", ... }
  ]
  ```
- This allows contracts with different pragmas to coexist

**Option 3: Use a compatible pragma range**

- If you want to support multiple versions, use a range like `pragma solidity >=0.8.0 <0.9.0;`
- Still, the configured compiler must be within this range

## 💡 Best Practices

- **Keep contract pragma and Hardhat config in sync**
- **Document required Solidity versions** in your repo
- **Update config when upgrading Solidity**
- **Test after changing versions** to catch incompatibilities

## 📚 References

- [Hardhat Compiler Configuration](https://hardhat.org/hardhat-runner/docs/config#solidity)
- [Solidity Version Pragma](https://docs.soliditylang.org/en/latest/layout-of-source-files.html#version-pragma)

---

## ✅ Solution & Best Practice

### Should You Always Use the Latest Solidity Version?

**Not necessarily.** Here's why:

#### 1. Stability and Compatibility

- Most projects (especially production or collaborative ones) use a **conservative, stable version** of Solidity.
- Hardhat and other tools often default to a version that is well-tested and compatible with their plugins and the broader ecosystem.
- Using the latest version can sometimes introduce breaking changes or incompatibilities with dependencies.

#### 2. Team and Ecosystem Consistency

- If you're working in a team or using open-source templates, it's best to **align with the version in the project's config**.
- This ensures everyone compiles and tests contracts the same way, avoiding "works on my machine" problems.

#### 3. Plugin and Tooling Support

- Some Hardhat plugins or TypeChain types may not immediately support the very latest Solidity version.
- Waiting for the ecosystem to catch up is often safer.

#### 4. Security

- Newer versions do fix bugs, but they can also introduce new, untested behaviors.
- Most security audits and best practices are based on stable, widely-used versions.

---

### When Should You Update the Version in `hardhat.config.ts`?

- **If you need a new language feature** (e.g., custom errors, new opcodes, etc.) that's only in a newer version.
- **If you're starting a new project** and want to future-proof it.
- **If all your dependencies and plugins support the new version** and you've tested thoroughly.

---

### Why Did We Update the Contract Instead of the Config?

- **Your Hardhat config was already set to 0.8.20**, which is a stable, widely-supported version.
- **Our contract didn't use any features specific to 0.8.24**—so there was no need to require a newer compiler.
- **Quickest fix for the error** was to align the contract pragma with the config, ensuring everything compiles and tests smoothly.

---

### Best Practice

- **Align your contract pragma with your Hardhat config** unless you have a strong reason to upgrade.
- **Upgrade Solidity version in the config** only when you need new features, after checking plugin and dependency compatibility.

---

#### TL;DR

> **It's not always best to use the latest Solidity version. Use the version that's stable, compatible with your tools, and meets your project's needs.**

If you want to upgrade to a newer version, do so intentionally and test thoroughly!
