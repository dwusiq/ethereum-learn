import { ethers, upgrades } from 'hardhat';

//-----------------------------
//------初始化参数--------------
//-----------------------------
let UpgradeDemoV1Address = "0xc1f78b2f7ada19c3cf04d7625e0c800d094ee438";//上一个版本的合约地址
//TODO 待完善价格预估
async function main() {
    const [Owner] = await ethers.getSigners();
    console.log("UpgradeDemoV1Address is :", UpgradeDemoV1Address);
    console.log("UpgradeDemo owner is :", Owner.address);

    //升级合约，并调用新版本合约新增的函数
    const UpgradeDemoV2 = await ethers.getContractFactory("UpgradeDemoV2");//升级后的合约
    const upgraded = await upgrades.upgradeProxy(UpgradeDemoV1Address, UpgradeDemoV2);

    console.log("UpgradeDemoV2 address is :", upgraded.address);

    //验证上一个版本的数据是否保留
    const valueNew = await upgraded.value();
    console.log("value of V2", valueNew.toNumber());
    console.log("UpgradeDemoV2 deploy success");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });




