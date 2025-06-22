//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

/**
 * @title The Clicker Contract
 * @author The Clicker Team
 * @notice A simple clicker contract that tracks global and user-specific click counts
 * @dev This contract allows users to increment a global counter and their personal click count
 */
contract ClickerContract {
    // State Variables
    address public immutable owner;
    
    /// @notice Total number of clicks across all users
    uint256 public totalCount = 0;
    
    /// @notice Mapping of user addresses to their individual click counts
    mapping(address => uint256) public userCounts;
    
    /// @notice Optional greeting message (legacy from original contract)
    string public greeting = "Building Unstoppable Apps!!!";
    
    /// @notice Tracks if premium features are enabled
    bool public premium = false;

    // Events
    /// @notice Emitted when a user clicks
    /// @param clicker The address of the user who clicked
    /// @param newTotalCount The updated total count after the click
    /// @param userClickCount The user's personal click count after the click
    event ClickEvent(address indexed clicker, uint256 newTotalCount, uint256 userClickCount);
    
    /// @notice Emitted when greeting is changed (legacy event)
    event GreetingChange(address indexed greetingSetter, string newGreeting, bool premium, uint256 value);

    // Constructor
    /// @notice Constructor sets the contract owner
    /// @param _owner The address that will be the contract owner
    constructor(address _owner) {
        owner = _owner;
    }

    // Modifiers
    /// @notice Modifier to restrict function access to owner only
    modifier isOwner() {
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    // Functions
    /// @notice Allows anyone to increment the click counters
    /// @dev This is the main function for The Clicker DApp
    function click() external {
        // Print data to the hardhat chain console. Remove when deploying to a live network.
        console.log("Click from %s", msg.sender);

        // Increment counters
        totalCount += 1;
        userCounts[msg.sender] += 1;

        // Emit event
        emit ClickEvent(msg.sender, totalCount, userCounts[msg.sender]);
    }

    /// @notice Allows anyone to change the greeting and increment counters (legacy function)
    /// @param _newGreeting The new greeting message
    function setGreeting(string memory _newGreeting) public payable {
        // Print data to the hardhat chain console. Remove when deploying to a live network.
        console.log("Setting new greeting '%s' from %s", _newGreeting, msg.sender);

        // Change state variables
        greeting = _newGreeting;
        totalCount += 1;
        userCounts[msg.sender] += 1;

        // Check if premium (payment sent)
        if (msg.value > 0) {
            premium = true;
        } else {
            premium = false;
        }

        // Emit event
        emit GreetingChange(msg.sender, _newGreeting, msg.value > 0, msg.value);
    }

    /// @notice Allows the owner to withdraw all ETH from the contract
    /// @dev Only the contract owner can call this function
    function withdraw() public isOwner {
        (bool success, ) = owner.call{ value: address(this).balance }("");
        require(success, "Failed to send Ether");
    }

    /// @notice Allows the contract to receive ETH
    receive() external payable {}
}
