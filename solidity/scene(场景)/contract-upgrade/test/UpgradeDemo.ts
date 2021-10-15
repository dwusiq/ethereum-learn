const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");


describe("UpgradeDemo", function () {
    it('works', async () => {
        const UpgradeDemo = await ethers.getContractFactory("UpgradeDemo");
        const UpgradeDemoV2 = await ethers.getContractFactory("UpgradeDemoV2");

        //部署原始合约，并调用该函数
        const instance = await upgrades.deployProxy(UpgradeDemo, [33], { initializer: 'initialize' });
        const value = await instance.value();
        expect(value.toString()).to.equal('33');

        //升级合约，并调用新版本合约新增的函数
        const upgraded = await upgrades.upgradeProxy(instance.address, UpgradeDemoV2);
        await upgraded.add(67);
        const valueNew = await upgraded.value();
        expect(valueNew.toString()).to.equal('100');
    });
});