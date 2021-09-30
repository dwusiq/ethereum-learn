import { assert, expect } from 'chai';
import { ethers } from 'hardhat';

let Deployer: any, Alice: any, Bob: any, David: any;

describe("AccessControlDemo test", function () {

    it("deploy AccessControlDemo and test function", async function () {
        //测试参数
        const [_deployer, _Alice, _Bob, _David] = await ethers.getSigners();
        [Deployer, Alice, Bob, David] = [_deployer, _Alice, _Bob, _David];
        const newValue = 100;

        //部署合约
        const AccessControlDemo = await ethers.getContractFactory("AccessControlDemo");
        const accessControlDemo = await AccessControlDemo.deploy(Bob.address);
        await accessControlDemo.deployed();

        //打印合约地址
        console.log("AccessControlDemo address：", accessControlDemo.address);

        //权限测试
        await accessTest(accessControlDemo);

    });
});





//权限测试
let accessTest = async (accessControlDemo: any) => {
    let OWNER_ROLE_CODES = await accessControlDemo.OWNER_ROLE()
    let MANAGER_ROLE_CODES = await accessControlDemo.MANAGER_ROLE()

    console.log("OWNER_ROLE_CODES", OWNER_ROLE_CODES);
    console.log("MANAGER_ROLE_CODES", MANAGER_ROLE_CODES);

    // //测试变更合约拥有者
    console.log('owner-address-before:', (await accessControlDemo.getRoleMember(OWNER_ROLE_CODES, 0)).toString());
    await accessControlDemo.changeOwner(Alice.address);
    await accessControlDemo.getRoleMember(OWNER_ROLE_CODES, 0).then(function (result: any) {
        console.log('owner-address-after:', result.toString());
        assert.equal(result, Alice.address);
    });

    //切换回原来的合约拥有者
    await accessControlDemo.connect(Alice).changeOwner(Deployer.address);

    //manager更改值
    await accessControlDemo.connect(Bob).changeStorageValue(265);

    //普通用户更改值失败
    // await assert.throws(await accessControlDemo.connect(David).changeStorageValue(265), Error, "Caller is not the manager");
}