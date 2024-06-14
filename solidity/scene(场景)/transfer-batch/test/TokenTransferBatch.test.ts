//

const { ethers } = require("hardhat");
import { expect } from "chai";
import { deployContract } from "../utils/deployUtils";



let usdtDecimal = 6;
const AddressZero = "0x0000000000000000000000000000000000000000";


describe(">>>> TokenTransferBatch test", function () {
  const provider = ethers.provider;
  let owner: any, alice: any, bob: any, receiver: any;
  let deployedUsdt: any, usdtAddress: string, batchContract: any, batchContractAddress: string;

  before(async function () {
    //user list
    [owner, alice, bob, receiver] = await ethers.getSigners();
    console.log(`owner:${owner.address}\r\nalice:${alice.address}\r\bob:${bob.address}\r\nreceiver${receiver.address}\r\n`);

    //deploy usdt
    deployedUsdt = await deployContract("UsdToken", [], owner);
    usdtAddress = deployedUsdt.target;

    //deploy TokenTransferBatch contract
    batchContract = await deployContract("TokenTransferBatch", [receiver.address], owner);
    batchContractAddress = batchContract.target;

    //mint token
    const mintAmt = ethers.parseUnits("10000", usdtDecimal);
    await deployedUsdt.mint(alice.address, mintAmt);
    await deployedUsdt.mint(bob.address, mintAmt);
    await deployedUsdt.mint(owner.address, mintAmt);

    //approve
    await deployedUsdt.connect(alice).approve(batchContractAddress, ethers.MaxUint256);
    await deployedUsdt.connect(bob).approve(batchContractAddress, ethers.MaxUint256);
  });


  it("expect batchTransferSameAmount success", async function () {
    // param
    const toList = [alice.address, bob.address];
    const amt = ethers.parseUnits("42", usdtDecimal);

    //approve
    await deployedUsdt.connect(owner).approve(batchContractAddress, ethers.MaxUint256);

    //tranferToken
    const beforeAmtAlice = await deployedUsdt.balanceOf(alice.address);
    const beforeAmtBob = await deployedUsdt.balanceOf(bob.address);
    await batchContract.batchTransferSameAmount(usdtAddress, amt, toList);
    const afterAmtAlice = await deployedUsdt.balanceOf(alice.address);
    const afterAmtBob = await deployedUsdt.balanceOf(bob.address);
    console.log(`beforeAmtAlice:${beforeAmtAlice.toString()} afterAmtAlice:${afterAmtAlice.toString()}`);
    console.log(`beforeAmtBob:${beforeAmtBob.toString()} afterAmtBob:${afterAmtBob.toString()}`);
    expect(afterAmtAlice.toString()).to.equal((beforeAmtAlice + amt).toString());
    expect(afterAmtBob.toString()).to.equal((beforeAmtBob + amt).toString());
  });





  it("expect batchTransfer success", async function () {
    // param
    const toList = [alice.address, bob.address];
    const amt = [ethers.parseUnits("16", usdtDecimal), ethers.parseUnits("17", usdtDecimal)];

    //approve
    await deployedUsdt.connect(owner).approve(batchContractAddress, ethers.MaxUint256);

    //tranferToken
    const beforeAmtAlice = await deployedUsdt.balanceOf(alice.address);
    const beforeAmtBob = await deployedUsdt.balanceOf(bob.address);
    await batchContract.batchTransfer(usdtAddress, toList, amt);
    const afterAmtAlice = await deployedUsdt.balanceOf(alice.address);
    const afterAmtBob = await deployedUsdt.balanceOf(bob.address);
    console.log(`beforeAmtAlice:${beforeAmtAlice.toString()} afterAmtAlice:${afterAmtAlice.toString()}`);
    console.log(`beforeAmtBob:${beforeAmtBob.toString()} afterAmtBob:${afterAmtBob.toString()}`);
    expect(afterAmtAlice.toString()).to.equal((beforeAmtAlice + amt[0]).toString());
    expect(afterAmtBob.toString()).to.equal((beforeAmtBob + amt[1]).toString());
  });



  it("expect batchTransferFrom success", async function () {
    // param
    const fromList = [alice.address, bob.address];
    const amts = [ethers.parseUnits("10", usdtDecimal), ethers.parseUnits("20", usdtDecimal)];
    let total = ethers.parseUnits("0", usdtDecimal);
    amts.forEach((amt) => { total = total + amt });

    //tranferToken
    const beforeAmt = await deployedUsdt.balanceOf(receiver.address);
    await batchContract.batchTransferFrom(usdtAddress, fromList, amts);
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
    await batchContract.batchTransferEth(toList, amts, { value: total });
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
    const amt = ethers.parseEther("11");
    let total = amt * BigInt(toList.length);

    //tranferToken
    const beforeAmtAlice = await provider.getBalance(alice);
    const beforeAmtBob = await provider.getBalance(bob);
    await batchContract.batchTransferSameAmountEth(amt, toList, { value: total });
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
    await deployedUsdt.mint(batchContractAddress, mintAmt);
    await owner.sendTransaction({ to: batchContractAddress, value: ethers.parseEther("50") });

    //expect fail
    await expect(batchContract.connect(alice).withdrawToken(usdtAddress, ethers.parseUnits("100", usdtDecimal))).to.be.rejectedWith(`OwnableUnauthorizedAccount("${alice.address}")`);

    //withdraw eth
    const takeEthAmount = ethers.parseEther("23");
    const beforeEthAmt = await provider.getBalance(receiver);
    await batchContract.withdrawToken(AddressZero, takeEthAmount);
    const afterEthAmt = await provider.getBalance(receiver);
    console.log(`beforeEthAmt:${beforeEthAmt.toString()} afterEthAmt:${afterEthAmt.toString()}`);
    expect(afterEthAmt.toString()).to.equal((beforeEthAmt + takeEthAmount).toString());


    //withdrawToken
    const takeAmount = ethers.parseUnits("68", usdtDecimal);
    const beforeAmt = await deployedUsdt.balanceOf(receiver.address);
    await batchContract.withdrawToken(usdtAddress, takeAmount);
    const afterAmt = await deployedUsdt.balanceOf(receiver.address);
    console.log(`beforeAmt:${beforeAmt.toString()} afterAmt:${afterAmt.toString()}`);
    expect(afterAmt.toString()).to.equal((beforeAmt + takeAmount).toString());
  });

  it("expect setReceiver success", async function () {
    await expect(batchContract.connect(alice).setReceiver(bob.address)).to.be.rejectedWith(`OwnableUnauthorizedAccount("${alice.address}")`);

    const receiverBefore = await batchContract.receiver();
    await batchContract.setReceiver(bob.address);
    const receiverAfter = await batchContract.receiver();

    console.log(`receiverBefore:${receiverBefore.toString()} receiverAfter:${receiverAfter.toString()}`);
    expect(receiverAfter.toString()).to.equal(bob.address.toString());
  });


  it("gas fee calculate", async function () {

    // param
    const toList = new Array();
    const amt = ethers.parseEther("0.001");
    let i = 2;
    while (i > 0) {
      const randomWallet = ethers.Wallet.createRandom();
      toList.push(randomWallet.address);

      // const gasAmt = await batchContract.estimateGas.batchTransferSameAmountEth(amt, toList, { value: amt* BigInt(randomWallet.length) }); ethers v5
      const gasAmt = await batchContract.batchTransferSameAmountEth.estimateGas(amt, toList, { value: amt * BigInt(toList.length) }); //ethers v6
      console.log(`length:${toList.length} gasAmt:${gasAmt}`);
      i--;
    }

  });

});


