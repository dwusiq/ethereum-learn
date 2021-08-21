import {ethers} from 'hardhat';
import {expect} from "./chai-setup";


describe("ERC20Demo test", function () {
    it("deploy ERC20Demo and test function", async function () {

        //获取测试账号(第一个是管理员)
        const [David, Alice, Bob] = await ethers.getSigners();

        //param
        const initBalance = 1000;
        const transferBalance = 100;

        //ERC20Demo.sol
        const ERC20Demo = await ethers.getContractFactory("ERC20Demo");
        const eRC20Demo = await ERC20Demo.deploy(initBalance);
        await eRC20Demo.deployed();
        console.log('eRC20Demo address:', eRC20Demo.address);

        //check total balance
        const totalBalance = await eRC20Demo.totalSupply();
        expect(totalBalance).to.equal(initBalance);
        expect(initBalance).to.equal(await eRC20Demo.balanceOf(David.address));

        //transfer and check balance
        await eRC20Demo.transfer(Alice.address, transferBalance);
        expect(initBalance-transferBalance).to.equal(await eRC20Demo.balanceOf(David.address));
        expect(transferBalance).to.equal(await eRC20Demo.balanceOf(Alice.address));

        //print
        console.log('totalBalance:', totalBalance.toBigInt());
        await eRC20Demo.balanceOf(David.address).then((rsp: any) => console.log('balance of david:',rsp.toBigInt()));
        await eRC20Demo.balanceOf(Alice.address).then((rsp: any) => console.log('balance of alice:',rsp.toBigInt()));


    });
});