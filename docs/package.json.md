# Package.json Documentation

## 📦 **Project Structure Overview**

This is a **Yarn Workspace Monorepo** with the following structure:

- **Root**: Orchestration and workspace management
- **`packages/hardhat/`**: Smart contract development (Solidity, Hardhat)
- **`packages/nextjs/`**: Frontend application (Next.js, React)

## 🏗️ **Why No Hardhat/Next.js in Root Dependencies?**

The root `package.json` doesn't include Hardhat or Next.js as dependencies because:

1. **Workspace Isolation**: Each package manages its own dependencies
2. **Version Flexibility**: Different packages can use different versions
3. **Clean Separation**: Frontend and backend dependencies are isolated
4. **Yarn Workspaces**: Commands are routed to the appropriate package

## 📋 **Scripts Reference Table**

### 🔧 **Account Management**

| Script                   | Target  | Description                  |
| ------------------------ | ------- | ---------------------------- |
| `yarn account`           | Hardhat | List existing accounts       |
| `yarn account:generate`  | Hardhat | Generate new account         |
| `yarn account:import`    | Hardhat | Import existing account      |
| `yarn account:reveal-pk` | Hardhat | Show private key             |
| `yarn generate`          | Hardhat | Alias for `account:generate` |

### ⛓️ **Blockchain Development**

| Script         | Target  | Description                   |
| -------------- | ------- | ----------------------------- |
| `yarn chain`   | Hardhat | Start local blockchain        |
| `yarn fork`    | Hardhat | Start forked mainnet          |
| `yarn compile` | Hardhat | Compile smart contracts       |
| `yarn deploy`  | Hardhat | Deploy contracts              |
| `yarn test`    | Hardhat | Run contract tests            |
| `yarn verify`  | Hardhat | Verify contracts on Etherscan |

### 🖥️ **Frontend Development**

| Script                  | Target  | Description              |
| ----------------------- | ------- | ------------------------ |
| `yarn start`            | Next.js | Start development server |
| `yarn next:build`       | Next.js | Build for production     |
| `yarn next:serve`       | Next.js | Serve production build   |
| `yarn next:lint`        | Next.js | Lint frontend code       |
| `yarn next:format`      | Next.js | Format frontend code     |
| `yarn next:check-types` | Next.js | TypeScript type checking |

### 🚀 **Deployment**

| Script              | Target  | Description                 |
| ------------------- | ------- | --------------------------- |
| `yarn vercel`       | Next.js | Deploy to Vercel            |
| `yarn vercel:login` | Next.js | Login to Vercel             |
| `yarn vercel:yolo`  | Next.js | Deploy without confirmation |
| `yarn ipfs`         | Next.js | Deploy to IPFS              |

### 🛠️ **Development Tools**

| Script                     | Target  | Description                         |
| -------------------------- | ------- | ----------------------------------- |
| `yarn format`              | Both    | Format all code (Next.js + Hardhat) |
| `yarn lint`                | Both    | Lint all code (Next.js + Hardhat)   |
| `yarn hardhat:clean`       | Hardhat | Clean build artifacts               |
| `yarn hardhat:flatten`     | Hardhat | Flatten contracts                   |
| `yarn hardhat:check-types` | Hardhat | TypeScript checking                 |
| `yarn hardhat:lint-staged` | Hardhat | Lint staged files                   |

## 🔍 **Detailed Script Analysis**

### **Account Management Scripts**

```json
"account": "yarn hardhat:account",
"account:generate": "yarn workspace @se-2/hardhat account:generate",
"account:import": "yarn workspace @se-2/hardhat account:import",
"account:reveal-pk": "yarn workspace @se-2/hardhat account:reveal-pk",
"generate": "yarn account:generate"
```

**Note**: Inconsistent pattern - `account` uses intermediate step, `account:*` use direct linking.

### **Hardhat Development Scripts**

```json
"chain": "yarn hardhat:chain",
"compile": "yarn hardhat:compile",
"deploy": "yarn hardhat:deploy",
"fork": "yarn hardhat:fork",
"test": "yarn hardhat:test",
"verify": "yarn hardhat:verify"
```

All follow the intermediate step pattern: `script` → `hardhat:script` → `workspace @se-2/hardhat script`

### **Next.js Frontend Scripts**

```json
"start": "yarn workspace @se-2/nextjs dev",
"next:build": "yarn workspace @se-2/nextjs build",
"next:serve": "yarn workspace @se-2/nextjs serve",
"next:lint": "yarn workspace @se-2/nextjs lint",
"next:format": "yarn workspace @se-2/nextjs format",
"next:check-types": "yarn workspace @se-2/nextjs check-types"
```

Mixed pattern: `start` is direct, `next:*` follow the `next:` prefix pattern.

## 🐕 **Husky & lint-staged**

### **What is Husky?**

Husky is a tool that enables **Git hooks** to run scripts automatically when certain Git events occur.

```json
"postinstall": "husky install"
```

This runs `husky install` after `yarn install`, setting up Git hooks.

### **What is lint-staged?**

lint-staged runs linters on files that are staged in Git (files you're about to commit).

```json
"precommit": "lint-staged"
```

This runs before each commit, ensuring code quality.

### **How They Work Together**

1. **Husky** sets up Git hooks
2. **lint-staged** runs linters on staged files
3. **precommit** hook triggers lint-staged
4. **postinstall** ensures Husky is set up after installation

## 📊 **Dependencies Analysis**

### **Root Dependencies**

```json
"devDependencies": {
  "husky": "~9.1.6",        // Git hooks
  "lint-staged": "~13.2.2"  // Lint staged files
}
```

**Only development tools** - no runtime dependencies in root.

### **Package Dependencies**

- **`packages/hardhat/`**: Solidity, Hardhat, Ethers, testing tools
- **`packages/nextjs/`**: Next.js, React, Web3 libraries, UI components

## 🔄 **Command Routing Flow**

### **Example: `yarn test`**

1. `yarn test` (root)
2. → `yarn hardhat:test` (root)
3. → `yarn workspace @se-2/hardhat test` (root)
4. → `REPORT_GAS=true hardhat test --network hardhat` (hardhat package)

### **Example: `yarn start`**

1. `yarn start` (root)
2. → `yarn workspace @se-2/nextjs dev` (root)
3. → `next dev` (nextjs package)

## 🎯 **Common Workflows**

### **Local Development**

```bash
yarn chain        # Start blockchain
yarn deploy       # Deploy contracts
yarn start        # Start frontend
```

### **Testing**

```bash
yarn test         # Run all tests
yarn compile      # Compile contracts
```

### **Code Quality**

```bash
yarn format       # Format all code
yarn lint         # Lint all code
```

### **Deployment**

```bash
yarn vercel       # Deploy frontend
yarn verify       # Verify contracts
```

## 🚨 **Pattern Inconsistencies**

1. **Account commands**: Mixed intermediate/direct patterns
2. **Next.js commands**: `start` is direct, others use `next:` prefix
3. **Hardhat commands**: Consistent intermediate pattern

## 💡 **Best Practices**

1. **Use workspace commands** from root for convenience
2. **Check package-specific scripts** for advanced options
3. **Run `yarn run`** to see all available commands
4. **Use `yarn workspace @se-2/hardhat <script>`** for direct access
5. **Use `yarn workspace @se-2/nextjs <script>`** for direct access

---

**Note**: This documentation reflects the current state of the project. Scripts and patterns may evolve over time.
