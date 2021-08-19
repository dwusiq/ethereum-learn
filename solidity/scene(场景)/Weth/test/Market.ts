import { expect } from "./chai-setup";

import { ethers} from 'hardhat';

describe("Market test",function (){
    it("deploy Market and test function", async function() {

        //获取测试账号(第一个是管理员)
        const [Owner,Alice,Bob] = await ethers.getSigners();

        //param
        const wEthAddress="0xc778417e063141139fce010982780140aa0cd5ab";

        //部署Demo1.sol
        const Market = await ethers.getContractFactory("Market");
        const market = await Market.deploy(wEthAddress);
        await market.deployed();
        console.log('Market address:',market.address);
        //
        // //
        // await Market.mintTo(Alice.address);
        // await Market.mintTo(Bob.address);
        // const totalSupply = await Market.totalSupply();
        // console.log('totalSupply:',totalSupply);
        // console.log('tokenURI:',await Market.tokenURI(1));

        //
        // //部署TradeContract
        // const TradeContract = await ethers.getContractFactory("TradeContract");
        // const tradeContract = await TradeContract.deploy(demo1.address);
        // await tradeContract.deployed();
        // console.log('tradeContract address:',tradeContract.address);

      // await tradeContract.ownerByTokenId(1);
    });
});