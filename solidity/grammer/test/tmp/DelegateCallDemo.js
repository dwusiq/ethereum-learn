const { expect } = require("chai");



describe(">>>>>>>>>> DelegateCallDemo test", function () {
    let deployedTargetContract;//被调用合约地址
    let deployedDelegateCallDemo;//代理合约地址（通过delegateCall函数调用其它合约）

    beforeEach(async function () {
        console.log('>>> deploy contract');
        //部署TargetContract.sol
        const TargetContract = await ethers.getContractFactory("TargetContract");
        deployedTargetContract = await TargetContract.deploy();
        await deployedTargetContract.deployed();
        console.log("deployedTargetContract address：", deployedTargetContract.address);

        //DelegateCallDemo.sol
        const DelegateCallDemo = await ethers.getContractFactory("DelegateCallDemo");
        deployedDelegateCallDemo = await DelegateCallDemo.deploy();
        await deployedDelegateCallDemo.deployed();
        console.log("deployedDelegateCallDemo address：", deployedDelegateCallDemo.address);
    });

    it(">>> delegateCall test", async function () {
        let newName = "alice";
        await deployedDelegateCallDemo.newName(deployedTargetContract.address, newName);
        //证明代理在代理合约的环境中执行合约，存储也在改合约
        await deployedDelegateCallDemo.userName().then(function (result) {
            console.log('deployedDelegateCallDemo userName:', result.toString());
            expect(result).to.equal(newName);
        });
        //证明被代理合约只提供了逻辑，而不提供存储环境
        await deployedTargetContract.userName().then(function (result) {
            console.log('deployedTargetContract userName:', result.toString());
            expect(result).to.equal("");
        });
    });
});

