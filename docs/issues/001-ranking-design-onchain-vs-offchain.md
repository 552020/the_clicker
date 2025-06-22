# The Clicker — Ranking Design: On-Chain vs Off-Chain

**Issue #001** | **Status: Open** | **Priority: High** | **Phase: 5**

In the context of **The Clicker**, we want to maintain a **user ranking** based on how many times each address has clicked. The core design choice is:

> Should this ranking be maintained **on-chain in contract storage**, or **off-chain using transaction logs (events)?**

---

## 1. Option A — On-Chain Ranking via Storage

This method saves per-user data inside the contract using a `mapping`. Rankings can be built by reading all `userClicks` from known addresses, which are stored in a separate array.

```solidity
mapping(address => uint256) public userClicks;
address[] public allUsers;

function click() external {
    if (userClicks[msg.sender] == 0) {
        allUsers.push(msg.sender);
    }
    userClicks[msg.sender] += 1;
}
```

### ✅ Pros

- Data lives entirely on-chain
- Any contract or frontend can query it
- Supports in-contract logic or verification
- Rankings can be built on-chain using the `allUsers` array

### ❌ Cons

- Maintaining `allUsers` adds gas cost
- Storage grows with number of users
- More expensive than logs, especially as usage scales

---

## 2. Option B — Off-Chain Ranking via On-Chain Logs

This method uses an event to record each click. The ranking is computed by parsing these logs off-chain.

```solidity
event Clicked(address indexed user);

function click() external {
    emit Clicked(msg.sender);
}
```

An off-chain service (e.g. The Graph) listens to these events and maintains a ranking database.

### ✅ Pros

- Cheap gas usage (no storage growth)
- Easy to scale
- Indexable by The Graph, Dune, bots
- Still verifiable — logs are part of on-chain transaction receipts

### ❌ Cons

- The smart contract holds **no state** about users or clicks
- Ranking is fully dependent on external infrastructure
- Cannot be accessed or verified from within the contract or other contracts

> In this model, the smart contract has no knowledge of who clicked or how often. It emits logs, and everything else must be reconstructed off-chain.

---

## 3. Option C — Hybrid (Storage + Logs)

This method combines an event with a mapping. It tracks per-user counts on-chain, and emits events for off-chain processing.

```solidity
mapping(address => uint256) public userClicks;
event Clicked(address indexed user, uint256 count);

function click() external {
    userClicks[msg.sender] += 1;
    emit Clicked(msg.sender, userClicks[msg.sender]);
}
```

### ✅ Pros

- Keeps minimal on-chain state (`userClicks`)
- Emits logs for history and off-chain indexing
- Can support smart contract logic based on user count

### ❌ Cons

- Still cannot iterate over mapping
- Ranking must still be constructed off-chain unless additional arrays are used

> Unlike Option A, this version does **not** store an `allUsers` array. So while `userClicks` contains per-user counts, the contract cannot enumerate users. Rankings are still **only inferable from off-chain** tools.

---

## 4. Comparison Table

| Feature                           | On-Chain Storage | Off-Chain Logs | Hybrid       |
| --------------------------------- | ---------------- | -------------- | ------------ |
| Gas cost per user                 | High             | Low            | Medium       |
| Fully on-chain verification       | ✅               | ❌ (partial)   | ✅ (partial) |
| Suitable for smart contract logic | ✅               | ❌             | ✅           |
| Leaderboard scalability           | ❌ (limited)     | ✅             | ✅           |
| Accessible by other contracts     | ✅               | ❌             | ✅           |
| Requires external infra           | ❌               | ✅             | ✅           |
| Stores user list                  | ✅ (`allUsers`)  | ❌             | ❌           |

---

## 5. Recommendation

If your primary goal is to:

- Show a **public leaderboard in the frontend**: use **logs**
- Enable **smart contract logic** based on ranks: use **storage**
- Maintain **off-chain analytics** while verifying user state on-chain: use **hybrid**

For large-scale or AI-driven scenarios, the **off-chain or hybrid approach is preferred**.

---

## 6. Current Implementation Status

### Phase 1 (Current) ✅ **IMPLEMENTED**

```solidity
// Current contract uses hybrid approach (Option C)
uint256 public totalClicks;
mapping(address => uint256) public userClicks;

event ClickEvent(address indexed clicker, uint256 newTotalClicks, uint256 userClickCount);

function click() external {
    totalClicks += 1;
    userClicks[msg.sender] += 1;
    emit ClickEvent(msg.sender, totalClicks, userClicks[msg.sender]);
}
```

- **Decision**: ✅ **Hybrid approach (Option C)** - On-chain storage + events
- **Rationale**: Best balance of functionality, cost, and future scalability
- **Benefits**: Supports all planned phases while enabling off-chain analytics

### Phase 5 (Future)

- **Decision**: ✅ **Off-chain indexing via events** (using The Graph)
- **Implementation**: Build leaderboards using indexed `ClickEvent` data
- **Decision**: Minimal storage for core functionality
- **Rationale**: Simple, efficient, supports basic UI needs

### Phase 5 (Future)

- **Decision**: TBD based on this analysis
- **Options**: Add events, implement ranking system, choose indexing strategy

---

## 7. Related Documentation

- [Storage vs Logs Guide](../storage-vs-logs.md) - Technical background on storage vs logs
- [Project Plan](../the-clicker.md) - Overall project phases and goals
- [To-Do List](../to-do.md) - Current tasks and progress

---

## 8. Action Items

- [ ] **Research The Graph integration** for off-chain indexing
- [ ] **Evaluate gas costs** for different user scales
- [ ] **Prototype ranking system** using each approach
- [ ] **Decide on final architecture** before Phase 5 implementation
- [ ] **Update contract design** based on decision

---

_This design choice affects scalability, cost, and composability. Decide early how trust and transparency will be handled in your ranking logic._

---

**Created**: [Current Date]  
**Assigned**: The Clicker Team  
**Labels**: `design`, `ranking`, `architecture`, `phase-5`
