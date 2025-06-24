# Leaderboard for TheClicker: On-Chain vs Off-Chain Solutions

## Context

The `TheClicker` smart contract tracks clicks per user using a mapping:

```solidity
mapping(address => uint256) public userClicks;
```

However, mappings in Solidity are not iterable, so the contract cannot provide a list of all users or a leaderboard directly.

## Problem

**How can we build a leaderboard of top clickers?**

## Solution Approaches

### 1. On-Chain Leaderboard

#### Description

- Store an array of all user addresses or a sorted leaderboard directly in the contract.

#### Pros

- **Leaderboard is always available on-chain.**
- **Anyone can query** the top users directly from the contract.

#### Cons

- **High gas costs** for updating arrays or sorting on-chain.
- **More complex contract logic** (risk of bugs, higher deployment cost).
- **Not scalable** for large numbers of users.

#### Example

- Maintain an array of addresses and update it on every click.
- Solidity lacks native sorted data structures, so sorting must be implemented manually. Example data structures: insertion-sorted array, binary heap, or a sorted linked list (all hard and gas-heavy to maintain).
- Gas costs grow with each insertion or update, especially as the leaderboard grows.

### 2. Off-Chain Leaderboard via Events (Recommended)

#### Description

- Use the `ClickEvent` emitted on every click to reconstruct the leaderboard off-chain.
- Index all `ClickEvent` logs using a backend, The Graph, or similar service.

#### Pros

- **Efficient** and **scalable**.
- **No extra gas cost** beyond emitting the event.
- **Can reconstruct the full history** at any time (no need to listen in real-time).

#### Cons

- **Requires** off-chain infrastructure (backend, indexer, or The Graph).
- **Leaderboard is not available directly on-chain.**

#### Example

- Use ethers.js/web3.js to fetch all `ClickEvent` logs and aggregate click counts per address.
- Use The Graph to index and query the leaderboard efficiently.

### 3. Off-Chain Leaderboard via Transaction Analysis

#### Description

- Scan all transactions sent to the contract address.
- For each transaction, decode the input to check if it was a `click()` call, and track the sender.

#### Pros

- **Does not rely on events** (works even if events are missing or not emitted).

#### Cons

- **Much less efficient:** must process all transactions, not just relevant ones.
- **More complex to implement:** need to decode input data, handle failed transactions, etc.
- **May fail to distinguish** between failed and successful `click()` calls unless receipts are analyzed too.
- **Still requires** off-chain infrastructure.

#### Example

- Use a blockchain node or provider to fetch all transactions to the contract.
- Decode each transaction and aggregate click counts per address. Note: This approach can be error-prone if transactions revert, use fallback functions, or have invalid calldata.

### 4. On-Chain Leaderboard on Layer 2 (L2)

#### Description

- Deploy the contract to a Layer 2 (L2) network (e.g., Optimism, Arbitrum, Base, zkSync) and store the leaderboard directly on-chain (e.g., as an array or sorted data structure).
- Lower gas costs on L2s make it practical to update and maintain an on-chain leaderboard, even with frequent updates.

#### Pros

- **Leaderboard is always available and queryable on-chain,** just like in the mainnet on-chain approach.
- **Much lower transaction and storage costs** compared to mainnet.
- **Enables more complex on-chain logic** (e.g., sorting, pruning) that would be prohibitively expensive on mainnet.

#### Cons

- **Still requires careful contract design** to avoid excessive gas usage, especially as the number of users grows.
- **Leaderboard is only available on the chosen L2,** not on Ethereum mainnet.
- **Users may need to bridge assets** to the L2, adding some onboarding friction.

#### Example

- Store and update a leaderboard array or sorted structure in the contract on Optimism.
- Users interact with the contract on the L2, and anyone can query the leaderboard directly from the contract at low cost.

---

## Off-Chain Storage & Indexing Options for the Leaderboard

When using an off-chain leaderboard (Approach 2 or 3), you need a way to store and serve the leaderboard data. Here are the main options:

### 1. Custom Web2 Database (Backend + DB)

- **How:** Run a backend server (Node.js, Python, etc.) that listens for `ClickEvent` logs and stores/updates the leaderboard in a database (PostgreSQL, MongoDB, etc.).
- **Pros:** Full control, easy to customize, can add authentication, analytics, etc.
- **Cons:** You have to maintain the backend and database.

### 2. Decentralized Indexing Services (e.g., The Graph)

- **How:** Use The Graph to index your contract's events. You write a "subgraph" that processes `ClickEvent` logs and exposes a GraphQL API for your frontend to query the leaderboard.
- **Pros:** No backend to maintain, decentralized, widely used in the Ethereum ecosystem.
- **Cons:** Some learning curve, and you're limited to what The Graph supports.

### 3. Direct Event Querying (Frontend Only)

- **How:** Your frontend fetches all past `ClickEvent` logs directly from an Ethereum node (via ethers.js/web3.js) and builds the leaderboard in memory.
- **Pros:** No backend or database needed.
- **Cons:** Not scalable for large numbers of events/users, slow for users, and can't persist data between sessions.

#### Summary Table

| Approach               | Infra Needed | Scalable | Persistent | Customizable |
| ---------------------- | ------------ | -------- | ---------- | ------------ |
| Web2 DB (backend+DB)   | Yes          | Yes      | Yes        | Yes          |
| The Graph (subgraph)   | No\*         | Yes      | Yes        | Somewhat     |
| Frontend-only querying | No           | No       | No         | No           |

\* (You don't run your own infra, but you do deploy a subgraph.)

### Recommendation

- For production or anything with more than a handful of users: **Use The Graph or a simple backend+database.**
- For demos, hackathons, or very small projects: **Frontend-only querying can work, but is not recommended for scale.**

---

## Recommendation

- **Use off-chain event indexing (Approach 2) for most use cases.**
- Only consider on-chain solutions (Approach 1 or 4) if you need the leaderboard to be available directly from the contract (and can accept higher gas costs or are willing to use an L2).

---

_Related: See `TheClicker.sol` for contract details and event definitions._
