const { expect } = require("chai");
 
 describe("MappingDemo test",function (){
     it("deploy MappingDemo and test function", async function() {

        //测试参数
        const param=3;
 
        //部署MappingDemo.sol
         const MappingDemo = await ethers.getContractFactory("MappingDemo");
         const mappingDemo = await MappingDemo.deploy();
         await mappingDemo.deployed();
 
        //打印合约地址
         console.log("mappingDemo address：",mappingDemo.address);
         
         //打印
         await mappingDemo.change(param);

         const currentValueResult =await mappingDemo.value();
         console.log("currentValueResult:",currentValueResult);
         expect(param).to.equal(currentValueResult);
     });
 });