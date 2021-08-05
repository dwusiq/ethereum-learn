const { expect } = require("chai");
 
 describe("ArrayDemo test",function (){
     it("deploy ArrayDemo and test function", async function() {

        //测试参数
        const param=3;
        const initLength=10;
 
        //部署ArrayDemo.sol
         const ArrayDemo = await ethers.getContractFactory("ArrayDemo");
         const arrayDemo = await ArrayDemo.deploy(initLength);
         await arrayDemo.deployed();
 
        //打印合约地址
         console.log("arrayDemo address：",arrayDemo.address);
         
         //验证
         expect(initLength).to.equal(await arrayDemo.getLength());

         await arrayDemo.push(param);
         expect(initLength+1).to.equal(await arrayDemo.getLength());

         await arrayDemo.pop();
         expect(initLength).to.equal(await arrayDemo.getLength());

         await arrayDemo.deleteArray();
         expect(0).to.equal(await arrayDemo.getLength());         
     });
 });