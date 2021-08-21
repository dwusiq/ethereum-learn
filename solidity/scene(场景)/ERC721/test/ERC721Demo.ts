import {ethers} from 'hardhat';
import { expect } from "./chai-setup";


describe("ERC721Demo test", function () {
    it("deploy MyNftToken and test function", async function () {

        //获取测试账号(第一个是管理员)
        const [David, Alice, Bob] = await ethers.getSigners();

        //param

        //ERC20Demo.sol
        const ERC721Demo = await ethers.getContractFactory("ERC721Demo");
        const eRC721Demo = await ERC721Demo.deploy();
        await eRC721Demo.deployed();
        console.log('eRC721Demo address:', eRC721Demo.address);

        //mint and check balance
        await eRC721Demo.mint(David.address);
        await eRC721Demo.mint(David.address);
        const balance = await eRC721Demo.balanceOf(David.address);
        console.log('before transfer, balance of david:', balance);
        expect(balance).to.equal(2);


        await eRC721Demo.safeTransfer(Alice.address,1);
        const balanceDavid = await eRC721Demo.balanceOf(David.address);
        const balanceAlice = await eRC721Demo.balanceOf(Alice.address);
        console.log('after transfer, balance of Alice:', balanceDavid);
        console.log('after transfer, balance of David:', balanceAlice);
        expect(balanceAlice).to.equal(1);
        console.log('tokenURI:', await eRC721Demo.tokenURI(2));


    });
});