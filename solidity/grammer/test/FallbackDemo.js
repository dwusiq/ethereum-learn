const { expect } = require("chai");
 
 describe("FallbackDemo test",function (){

     it("deploy FallbackDemo and test function", async function() {

        //测试参数
        const value=7;

        //部署FallbackDemo.sol
         const FallbackDemo = await ethers.getContractFactory("FallbackDemo");
         const fallbackDemo = await FallbackDemo.deploy();
         await fallbackDemo.deployed();

        //部署Storage.sol
        const Storage = await ethers.getContractFactory("Storage");
        const storage = await Storage.deploy();
        await storage.deployed();
 
        //打印合约地址
         console.log("Storage address：",storage.address);
         console.log("fallbackDemo address：",fallbackDemo.address);
         

        //正常调用，不触发fallback函数
        const fallbackTransaction1 = await fallbackDemo.requestExistFunc(storage.address,value);
        await fallbackTransaction1.wait();
        console.log("storage value:",await storage.get());
        expect(value).to.equal(await storage.get());

        //非正常调用，触发fallback函数
        const fallbackTransaction2 =await fallbackDemo.requestNotExistFunc(storage.address);
        await fallbackTransaction2.wait();
        console.log("storage value2:",await storage.get());
        expect(100).to.equal(await storage.get());

     });
 });