import { expect } from 'chai';
import { ethers } from 'hardhat';


describe("PresaleMarket test", function () {
    let deployedUSDT: any, deployedPresaleMarket: any, deployedPresaleToken: any;
    let deployer, developer, David, Alice, Bob;

    //params
    const presalePrice = 2500;//saleToken的价格，分母是10000,如：2500表示0.25, 250000表示25。
    const plannedSalesAmount = ethers.utils.parseUnits("10000", 18);//计划预售份额

    beforeEach(async function () {
        console.log('>>> deploy contract start');
        [deployer, developer, David, Alice, Bob] = await ethers.getSigners();
        //部署USDT.sol
        const ERC20USDT = await ethers.getContractFactory("ERC20USDT");
        deployedUSDT = await ERC20USDT.deploy();
        await deployedUSDT.deployed();
        console.log("deployedUSDT address：", deployedUSDT.address);

        //部署PresaleMarket.sol
        const PresaleMarket = await ethers.getContractFactory("PresaleMarket");
        deployedPresaleMarket = await PresaleMarket.deploy(developer.address);
        await deployedPresaleMarket.deployed();
        console.log("deployedPresaleMarket address：", deployedPresaleMarket.address);

        //部署PresaleToken.sol
        const PresaleToken = await ethers.getContractFactory("PresaleToken");
        deployedPresaleToken = await PresaleToken.deploy(deployedPresaleMarket.address);
        await deployedPresaleToken.deployed();
        console.log("deployedPresaleToken address：", deployedPresaleToken.address);

        console.log('>>> deploy contract finish');
    });

    it("addPresaleTerm test", async function () {
        console.log('>>> addPresaleTerm start');
        const startTime = (new Date()).getTime() + 5;
        const finishTime = startTime + 31104000000;//一天时间戳31104000000
        await deployedPresaleMarket.addPresaleTerm(deployedUSDT.address, deployedPresaleToken.address, presalePrice, plannedSalesAmount, startTime, finishTime);

        let id = await deployedPresaleMarket.getCurrentTermId();
        console.log("id:%s",id);
        await deployedPresaleMarket.getCurrentTermId().then(function (result: any) {
            console.log('CurrentTermId:', result);
            expect(result.eq(1));
        })
    });

});