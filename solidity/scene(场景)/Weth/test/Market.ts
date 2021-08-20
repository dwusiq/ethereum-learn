import { expect } from "./chai-setup";

import * as etherJs from 'ethers';
import { ethers} from 'hardhat';


describe("Market test",function (){
    it("deploy Market and test function", async function() {

        //获取测试账号(第一个是管理员)
        const [Owner,Alice,Bob] = await ethers.getSigners();

        //param
        const wEthAddress="0xc778417e063141139fce010982780140aa0cd5ab";
        const tokenId=100;

        //部署Demo1.sol
        const Market = await ethers.getContractFactory("Market");
        const market = await Market.deploy(wEthAddress);
        await market.deployed();
        console.log('Market address:',market.address);

        await market.connect(Owner).addToken(tokenId);
        await market.connect(Alice).bid(tokenId, { value: etherJs.utils.parseEther("1") });
        await market.connect(Alice).cancelBid(tokenId);
        console.log('Owner Balances:',await market.Balances(Owner.address));
        console.log('Alice Balances:',await market.Balances(Alice.address));
        console.log('Tokens:',await market.Tokens(tokenId));
        // console.log('bids:',await market.bids(tokenId));

    });
});