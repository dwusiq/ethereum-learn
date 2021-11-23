const {expect} = require("chai");

describe("LibraryDemo1 test",function(){
    it("test function of LibraryDemo1.sol",async function(){
        
        //测试参数
        const initValue=100;
        const addValue=10;
        const subtraction=30;

        //部署交易合约`LibraryDemo1.sol`
        const LibraryDemo1 = await ethers.getContractFactory("LibraryDemo1");   
        const librarydemo1 = await LibraryDemo1.deploy(initValue);
        await librarydemo1.deployed();
        console.log("address of librarydemo1:",librarydemo1.address);
       
    
        //加
        await librarydemo1.addition(addValue);
        //减
        await librarydemo1.subtraction(subtraction);
        //判断最终值
        const finalValue = await librarydemo1.value();
        console.log("finalValue:",finalValue.toNumber());
        await expect(initValue+addValue-subtraction).to.equal(finalValue);;
    });
});