import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("TheClicker", function () {
  let clicker: any;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let user3: SignerWithAddress;
  //   let user1: any;
  //   let user2: any;
  //   let user3: any;

  beforeEach(async function () {
    // Get signers
    [, user1, user2, user3] = await ethers.getSigners();

    // Deploy contract
    const TheClicker = await ethers.getContractFactory("TheClicker");
    clicker = await TheClicker.deploy();
    await clicker.deployed();
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(clicker.address).to.not.equal(ethers.ZeroAddress);
    });

    it("Should initialize with zero total clicks", async function () {
      expect(await clicker.totalClicks()).to.equal(0);
    });

    it("Should initialize with zero user clicks for any address", async function () {
      expect(await clicker.userClicks(user1.address)).to.equal(0);
      expect(await clicker.userClicks(user2.address)).to.equal(0);
    });
  });

  describe("click() function", function () {
    it("Should increment total clicks", async function () {
      await clicker.connect(user1).click();
      expect(await clicker.totalClicks()).to.equal(1);

      await clicker.connect(user2).click();
      expect(await clicker.totalClicks()).to.equal(2);
    });

    it("Should increment user clicks for the caller", async function () {
      await clicker.connect(user1).click();
      expect(await clicker.userClicks(user1.address)).to.equal(1);

      await clicker.connect(user1).click();
      expect(await clicker.userClicks(user1.address)).to.equal(2);
    });

    it("Should not affect other users' click counts", async function () {
      await clicker.connect(user1).click();
      await clicker.connect(user1).click();

      expect(await clicker.userClicks(user1.address)).to.equal(2);
      expect(await clicker.userClicks(user2.address)).to.equal(0);
    });

    it("Should work with multiple users", async function () {
      await clicker.connect(user1).click();
      await clicker.connect(user2).click();
      await clicker.connect(user3).click();

      expect(await clicker.totalClicks()).to.equal(3);
      expect(await clicker.userClicks(user1.address)).to.equal(1);
      expect(await clicker.userClicks(user2.address)).to.equal(1);
      expect(await clicker.userClicks(user3.address)).to.equal(1);
    });

    it("Should emit ClickEvent with correct parameters", async function () {
      await expect(clicker.connect(user1).click()).to.emit(clicker, "ClickEvent").withArgs(user1.address, 1, 1);

      await expect(clicker.connect(user1).click()).to.emit(clicker, "ClickEvent").withArgs(user1.address, 2, 2);

      await expect(clicker.connect(user2).click()).to.emit(clicker, "ClickEvent").withArgs(user2.address, 3, 1);
    });
  });

  describe("getUserClicks() function", function () {
    it("Should return correct user click count", async function () {
      await clicker.connect(user1).click();
      await clicker.connect(user1).click();
      await clicker.connect(user2).click();

      expect(await clicker.getUserClicks(user1.address)).to.equal(2);
      expect(await clicker.getUserClicks(user2.address)).to.equal(1);
    });

    it("Should return zero for users who haven't clicked", async function () {
      expect(await clicker.getUserClicks(user1.address)).to.equal(0);
      expect(await clicker.getUserClicks(user2.address)).to.equal(0);
    });

    it("Should work with any address", async function () {
      const randomAddress = ethers.Wallet.createRandom().address;
      expect(await clicker.getUserClicks(randomAddress)).to.equal(0);
    });
  });

  describe("Hybrid approach validation", function () {
    it("Should maintain on-chain state correctly", async function () {
      // User1 clicks multiple times
      await clicker.connect(user1).click();
      await clicker.connect(user1).click();
      await clicker.connect(user1).click();

      // User2 clicks once
      await clicker.connect(user2).click();

      // Verify on-chain state
      expect(await clicker.totalClicks()).to.equal(4);
      expect(await clicker.userClicks(user1.address)).to.equal(3);
      expect(await clicker.userClicks(user2.address)).to.equal(1);
    });

    it("Should emit events for off-chain indexing", async function () {
      const tx1 = await clicker.connect(user1).click();
      const tx2 = await clicker.connect(user1).click();
      const tx3 = await clicker.connect(user2).click();

      // Get transaction receipts to verify events
      const receipt1 = await tx1.wait();
      const receipt2 = await tx2.wait();
      const receipt3 = await tx3.wait();

      // Verify events were emitted
      expect(receipt1.events?.length).to.be.greaterThan(0);
      expect(receipt2.events?.length).to.be.greaterThan(0);
      expect(receipt3.events?.length).to.be.greaterThan(0);

      // Verify ClickEvent was emitted
      const event1 = receipt1.events?.find((e: any) => e.event === "ClickEvent");
      const event2 = receipt2.events?.find((e: any) => e.event === "ClickEvent");
      const event3 = receipt3.events?.find((e: any) => e.event === "ClickEvent");

      assert(event1 !== undefined, "ClickEvent should be emitted");
      assert(event2 !== undefined, "ClickEvent should be emitted");
      assert(event3 !== undefined, "ClickEvent should be emitted");
    });

    it("Should allow off-chain ranking reconstruction", async function () {
      // Simulate multiple users clicking
      await clicker.connect(user1).click();
      await clicker.connect(user1).click();
      await clicker.connect(user2).click();
      await clicker.connect(user3).click();
      await clicker.connect(user1).click();

      // Verify final state
      expect(await clicker.totalClicks()).to.equal(5);
      expect(await clicker.userClicks(user1.address)).to.equal(3);
      expect(await clicker.userClicks(user2.address)).to.equal(1);
      expect(await clicker.userClicks(user3.address)).to.equal(1);
    });
  });

  describe("Gas efficiency", function () {
    it("Should have reasonable gas costs for click operations", async function () {
      const tx = await clicker.connect(user1).click();
      const receipt = await tx.wait();

      // Gas should be reasonable (less than 100k for simple operation)
      expect(receipt.gasUsed.toNumber()).to.be.lessThan(100000);
    });
  });

  describe("Edge cases", function () {
    it("Should handle many clicks from same user", async function () {
      const manyClicks = 10;

      for (let i = 0; i < manyClicks; i++) {
        await clicker.connect(user1).click();
      }

      expect(await clicker.totalClicks()).to.equal(manyClicks);
      expect(await clicker.userClicks(user1.address)).to.equal(manyClicks);
    });

    it("Should handle many different users", async function () {
      const users = [user1, user2, user3];

      for (let i = 0; i < users.length; i++) {
        await clicker.connect(users[i]).click();
      }

      expect(await clicker.totalClicks()).to.equal(users.length);
      for (let i = 0; i < users.length; i++) {
        expect(await clicker.userClicks(users[i].address)).to.equal(1);
      }
    });
  });
});
