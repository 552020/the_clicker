# Issues & Design Decisions

This folder contains important design decisions, architectural discussions, and open issues for The Clicker project.

---

## 📋 Current Issues

### [Issue #001: Ranking Design - On-Chain vs Off-Chain](./001-ranking-design-onchain-vs-offchain.md)

**Status**: Open | **Priority**: High | **Phase**: 5

**Summary**: Critical architectural decision about how to implement user rankings and leaderboards. Explores three approaches:

- On-chain storage with arrays
- Off-chain indexing via events
- Hybrid approach combining both

**Impact**: This decision will affect scalability, gas costs, and the overall architecture of Phase 5 (Leaderboard & Analytics).

---

## 🏷️ Issue Labels

- `design` - Design decisions and architectural choices
- `ranking` - Issues related to leaderboards and user rankings
- `architecture` - System architecture and technical decisions
- `phase-1` - Issues related to Phase 1 (Minimal On-Chain Clicker)
- `phase-2` - Issues related to Phase 2 (Frontend MVP)
- `phase-3` - Issues related to Phase 3 (Token Incentives)
- `phase-4` - Issues related to Phase 4 (AI Agent Integration)
- `phase-5` - Issues related to Phase 5 (Leaderboard & Analytics)

---

## 📝 Creating New Issues

When creating a new issue:

1. **Use descriptive filenames**: `XXX-descriptive-name.md`
2. **Include metadata**: Status, Priority, Phase, Labels
3. **Provide context**: Why this decision matters
4. **List options**: Different approaches to consider
5. **Include action items**: Specific tasks to resolve the issue

---

## 🔗 Related Documentation

- [Project Plan](../the-clicker.md) - Overall project phases and goals
- [To-Do List](../to-do.md) - Current tasks and progress
- [Storage vs Logs Guide](../storage-vs-logs.md) - Technical background on storage vs logs

---

_Issues are tracked here to ensure important design decisions are documented and discussed before implementation._
