//

const { ethers } = require("hardhat");
import { expect } from "chai";
import { deployContract } from "../utils/deployUtils";



let usdtDecimal = 6;
const AddressZero = "0x0000000000000000000000000000000000000000";


describe(">>>> TokenCollectBatch test", function () {
  const provider = ethers.provider;
  let owner: any, alice: any, bob: any, receiver: any;
  let deployedUsdt: any, usdtAddress: string, collectContract: any, collectContractAddress: string;

  before(async function () {
    //user list
    [owner, alice, bob, receiver] = await ethers.getSigners();
    console.log(`owner:${owner.address}\r\nalice:${alice.address}\r\bob:${bob.address}\r\nreceiver${receiver.address}\r\n`);

    //deploy usdt
    deployedUsdt = await deployContract("UsdToken", [], owner);
    usdtAddress = deployedUsdt.target;

    //deploy TokenCollectBatch contract
    collectContract = await deployContract("TokenCollectBatch", [receiver.address], owner);
    collectContractAddress = collectContract.target;

    //mint token
    const mintAmt = ethers.parseUnits("10000", usdtDecimal);
    await deployedUsdt.mint(alice.address, mintAmt);
    await deployedUsdt.mint(bob.address, mintAmt);
    //approve
    await deployedUsdt.connect(alice).approve(collectContractAddress, ethers.MaxUint256);
    await deployedUsdt.connect(bob).approve(collectContractAddress, ethers.MaxUint256);
  });



  it("expect batchTransferFrom success", async function () {
    // param
    const fromList = [alice.address, bob.address];
    const amts = [ethers.parseUnits("10", usdtDecimal), ethers.parseUnits("20", usdtDecimal)];
    let total = ethers.parseUnits("0", usdtDecimal);
    amts.forEach((amt) => { total = total + amt });

    //tranferToken
    const beforeAmt = await deployedUsdt.balanceOf(receiver.address);
    await collectContract.batchTransferFrom(usdtAddress, fromList, amts);
    const afterAmt = await deployedUsdt.balanceOf(receiver.address);
    console.log(`beforeAmt:${beforeAmt.toString()} afterAmt:${afterAmt.toString()}`);
    expect(afterAmt.toString()).to.equal((beforeAmt + total).toString());
  });



  it("expect batchTransferEth success", async function () {
    // param
    const toList = [alice.address, bob.address];
    const amts = [ethers.parseEther("11"), ethers.parseEther("12")];
    let total = ethers.parseUnits("0", usdtDecimal);
    amts.forEach((amt) => { total = total + amt });

    //tranferToken
    const beforeAmtAlice = await provider.getBalance(alice);
    const beforeAmtBob = await provider.getBalance(bob);
    await collectContract.batchTransferEth(toList, amts, { value: total });
    const afterAmtAlice = await provider.getBalance(alice);
    const afterAmtBob = await provider.getBalance(bob);
    console.log(`beforeAmtAlice:${beforeAmtAlice.toString()} afterAmtAlice:${afterAmtAlice.toString()}`);
    console.log(`beforeAmtBob:${beforeAmtBob.toString()} afterAmtBob:${afterAmtBob.toString()}`);
    expect(afterAmtAlice.toString()).to.equal((beforeAmtAlice + amts[0]).toString());
    expect(afterAmtBob.toString()).to.equal((beforeAmtBob + amts[1]).toString());
  });




  it("expect batchTransferSameAmountEth success", async function () {
    // param
    const toList = [alice.address, bob.address];
    const amt = ethers.parseEther("2");
    let total = amt * BigInt(toList.length);

    //tranferToken
    const beforeAmtAlice = await provider.getBalance(alice);
    const beforeAmtBob = await provider.getBalance(bob);
    await collectContract.batchTransferSameAmountEth(amt, toList, { value: total });
    const afterAmtAlice = await provider.getBalance(alice);
    const afterAmtBob = await provider.getBalance(bob);
    console.log(`beforeAmtAlice:${beforeAmtAlice.toString()} afterAmtAlice:${afterAmtAlice.toString()}`);
    console.log(`beforeAmtBob:${beforeAmtBob.toString()} afterAmtBob:${afterAmtBob.toString()}`);
    expect(afterAmtAlice.toString()).to.equal((beforeAmtAlice + amt).toString());
    expect(afterAmtBob.toString()).to.equal((beforeAmtBob + amt).toString());
  });






  it("expect withdrawToken success", async function () {
    //init amount
    const mintAmt = ethers.parseUnits("10000", usdtDecimal);
    await deployedUsdt.mint(collectContractAddress, mintAmt);
    // await owner.sendTransaction({ to: collectContractAddress, value: ethers.parseEther("50") });

    //expect fail
    await expect(collectContract.connect(alice).withdrawToken(usdtAddress, ethers.parseUnits("100", usdtDecimal))).to.be.rejectedWith(`OwnableUnauthorizedAccount("${alice.address}")`);


    //withdrawToken
    const takeAmount = ethers.parseUnits("68", usdtDecimal);
    const beforeAmt = await deployedUsdt.balanceOf(receiver.address);
    await collectContract.withdrawToken(usdtAddress, takeAmount);
    const afterAmt = await deployedUsdt.balanceOf(receiver.address);
    console.log(`beforeAmt:${beforeAmt.toString()} afterAmt:${afterAmt.toString()}`);
    expect(afterAmt.toString()).to.equal((beforeAmt + takeAmount).toString());
  });

  it("expect setReceiver success", async function () {
    await expect(collectContract.connect(alice).setReceiver(bob.address)).to.be.rejectedWith(`OwnableUnauthorizedAccount("${alice.address}")`);

    const receiverBefore = await collectContract.receiver();
    await collectContract.setReceiver(bob.address);
    const receiverAfter = await collectContract.receiver();

    console.log(`receiverBefore:${receiverBefore.toString()} receiverAfter:${receiverAfter.toString()}`);
    expect(receiverAfter.toString()).to.equal(bob.address.toString());
  });


  it("expect getBalanceBatch success", async function () {
    // param
    const userList = [alice.address, bob.address];
   //query
    let amountList = await collectContract.getBalanceBatch(usdtAddress, userList);
    const amt = await deployedUsdt.balanceOf(userList[0]);
    console.log(`beforeAmt:${amountList.toString()}}`);
    expect(amountList[0].toString()).to.equal(amt.toString());
  });

});


