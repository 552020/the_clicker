import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("TheClicker", function () {
  let deployedClickerContract: any;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let user3: SignerWithAddress;
  //   let user1: any;
  //   let user2: any;
  //   let user3: any;

  beforeEach(async function () {
    // Get signers (skip the first one which is typically the deployer)
    [, user1, user2, user3] = await ethers.getSigners();

    // Create a contract factory - this is like a "blueprint" for deploying contracts
    // It contains the compiled bytecode, ABI, and deployment logic
    const ClickerContractFactory = await ethers.getContractFactory("TheClicker");

    // Deploy a fresh contract instance from the factory
    // This creates a new contract on the blockchain that we can interact with
    deployedClickerContract = await ClickerContractFactory.deploy();
    // await deployedClickerContract.deployed();
    await deployedClickerContract.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(deployedClickerContract.address).to.not.equal(ethers.ZeroAddress);
    });

    it("Should initialize with zero total clicks", async function () {
      expect(await deployedClickerContract.totalClicks()).to.equal(0);
    });

    it("Should initialize with zero user clicks for any address", async function () {
      expect(await deployedClickerContract.userClicks(user1.address)).to.equal(0);
      expect(await deployedClickerContract.userClicks(user2.address)).to.equal(0);
    });
  });

  describe("click() function", function () {
    it("Should increment total clicks", async function () {
      await deployedClickerContract.connect(user1).click();
      expect(await deployedClickerContract.totalClicks()).to.equal(1);

      await deployedClickerContract.connect(user2).click();
      expect(await deployedClickerContract.totalClicks()).to.equal(2);
    });

    it("Should increment user clicks for the caller", async function () {
      await deployedClickerContract.connect(user1).click();
      expect(await deployedClickerContract.userClicks(user1.address)).to.equal(1);

      await deployedClickerContract.connect(user1).click();
      expect(await deployedClickerContract.userClicks(user1.address)).to.equal(2);
    });

    it("Should not affect other users' click counts", async function () {
      await deployedClickerContract.connect(user1).click();
      await deployedClickerContract.connect(user1).click();

      expect(await deployedClickerContract.userClicks(user1.address)).to.equal(2);
      expect(await deployedClickerContract.userClicks(user2.address)).to.equal(0);
    });

    it("Should work with multiple users", async function () {
      await deployedClickerContract.connect(user1).click();
      await deployedClickerContract.connect(user2).click();
      await deployedClickerContract.connect(user3).click();

      expect(await deployedClickerContract.totalClicks()).to.equal(3);
      expect(await deployedClickerContract.userClicks(user1.address)).to.equal(1);
      expect(await deployedClickerContract.userClicks(user2.address)).to.equal(1);
      expect(await deployedClickerContract.userClicks(user3.address)).to.equal(1);
    });

    it("Should emit ClickEvent with correct parameters", async function () {
      await expect(deployedClickerContract.connect(user1).click())
        .to.emit(deployedClickerContract, "ClickEvent")
        .withArgs(user1.address, 1, 1);

      await expect(deployedClickerContract.connect(user1).click())
        .to.emit(deployedClickerContract, "ClickEvent")
        .withArgs(user1.address, 2, 2);

      await expect(deployedClickerContract.connect(user2).click())
        .to.emit(deployedClickerContract, "ClickEvent")
        .withArgs(user2.address, 3, 1);
    });
  });

  describe("getUserClicks() function", function () {
    it("Should return correct user click count", async function () {
      await deployedClickerContract.connect(user1).click();
      await deployedClickerContract.connect(user1).click();
      await deployedClickerContract.connect(user2).click();

      expect(await deployedClickerContract.getUserClicks(user1.address)).to.equal(2);
      expect(await deployedClickerContract.getUserClicks(user2.address)).to.equal(1);
    });

    it("Should return zero for users who haven't clicked", async function () {
      expect(await deployedClickerContract.getUserClicks(user1.address)).to.equal(0);
      expect(await deployedClickerContract.getUserClicks(user2.address)).to.equal(0);
    });

    it("Should work with any address", async function () {
      const randomAddress = ethers.Wallet.createRandom().address;
      expect(await deployedClickerContract.getUserClicks(randomAddress)).to.equal(0);
    });
  });

  describe("Hybrid approach validation", function () {
    it("Should maintain on-chain state correctly", async function () {
      // User1 clicks multiple times
      await deployedClickerContract.connect(user1).click();
      await deployedClickerContract.connect(user1).click();
      await deployedClickerContract.connect(user1).click();

      // User2 clicks once
      await deployedClickerContract.connect(user2).click();

      // Verify on-chain state
      expect(await deployedClickerContract.totalClicks()).to.equal(4);
      expect(await deployedClickerContract.userClicks(user1.address)).to.equal(3);
      expect(await deployedClickerContract.userClicks(user2.address)).to.equal(1);
    });

    it("Should emit events for off-chain indexing", async function () {
      const tx1 = await deployedClickerContract.connect(user1).click();
      const tx2 = await deployedClickerContract.connect(user1).click();
      const tx3 = await deployedClickerContract.connect(user2).click();

      // Get transaction receipts to verify events
      const receipt1 = await tx1.wait();
      const receipt2 = await tx2.wait();
      const receipt3 = await tx3.wait();

      // Verify transactions were successful (events are emitted automatically)
      expect(receipt1.status).to.equal(1); // 1 = success
      expect(receipt2.status).to.equal(1);
      expect(receipt3.status).to.equal(1);

      // Verify logs were emitted (events create logs)
      expect(receipt1.logs.length).to.be.greaterThan(0);
      expect(receipt2.logs.length).to.be.greaterThan(0);
      expect(receipt3.logs.length).to.be.greaterThan(0);
    });

    it("Should allow off-chain ranking reconstruction", async function () {
      // Simulate multiple users clicking
      await deployedClickerContract.connect(user1).click();
      await deployedClickerContract.connect(user1).click();
      await deployedClickerContract.connect(user2).click();
      await deployedClickerContract.connect(user3).click();
      await deployedClickerContract.connect(user1).click();

      // Verify final state
      expect(await deployedClickerContract.totalClicks()).to.equal(5);
      expect(await deployedClickerContract.userClicks(user1.address)).to.equal(3);
      expect(await deployedClickerContract.userClicks(user2.address)).to.equal(1);
      expect(await deployedClickerContract.userClicks(user3.address)).to.equal(1);
    });
  });

  describe("Gas efficiency", function () {
    it("Should have reasonable gas costs for click operations", async function () {
      const tx = await deployedClickerContract.connect(user1).click();
      const receipt = await tx.wait();

      // Gas should be reasonable (less than 100k for simple operation)
      expect(receipt.gasUsed).to.be.lessThan(100000n);
    });
  });

  describe("Edge cases", function () {
    it("Should handle many clicks from same user", async function () {
      const manyClicks = 10;

      for (let i = 0; i < manyClicks; i++) {
        await deployedClickerContract.connect(user1).click();
      }

      expect(await deployedClickerContract.totalClicks()).to.equal(manyClicks);
      expect(await deployedClickerContract.userClicks(user1.address)).to.equal(manyClicks);
    });

    it("Should handle many different users", async function () {
      const users = [user1, user2, user3];

      for (let i = 0; i < users.length; i++) {
        await deployedClickerContract.connect(users[i]).click();
      }

      expect(await deployedClickerContract.totalClicks()).to.equal(users.length);
      for (let i = 0; i < users.length; i++) {
        expect(await deployedClickerContract.userClicks(users[i].address)).to.equal(1);
      }
    });
  });
});
