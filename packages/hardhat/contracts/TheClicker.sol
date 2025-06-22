// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title The Clicker
contract TheClicker {
    /// @notice Total number of clicks across all users
    uint256 public totalClicks;
    
    /// @notice Mapping of user addresses to their individual click counts
    mapping(address => uint256) public userClicks;

    /// @notice Emitted when a user clicks
    /// @param clicker The address of the user who clicked
    /// @param newTotalClicks The updated total count after the click
    /// @param userClickCount The user's personal click count after the click
    event ClickEvent(address indexed clicker, uint256 newTotalClicks, uint256 userClickCount);

    /// @notice Increment both the global counter and the caller's personal count
    /// @dev This is the main function for The Clicker DApp. Emits event for off-chain indexing.
    function click() external {
        totalClicks += 1;
        userClicks[msg.sender] += 1;
        
        // Emit event for off-chain analytics and indexing (Phase 5)
        emit ClickEvent(msg.sender, totalClicks, userClicks[msg.sender]);
    }

    /// @notice Retrieve the click count for a specific user
    /// @param user The address of the user
    /// @return Number of clicks registered by the user
    function getUserClicks(address user) external view returns (uint256) {
        return userClicks[user];
    }
}
