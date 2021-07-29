const { expect } = require("chai");
 
 describe("EnumDemo test",function (){
     it("deploy EnumDemo and test function", async function() {

        //测试参数
        const value=111;

 
        //部署EnumDemo.sol
         const EnumDemo = await ethers.getContractFactory("EnumDemo");
         const enumDemo = await EnumDemo.deploy();
         await enumDemo.deployed();
 
        //打印合约地址
         console.log("enumDemo address：",enumDemo.address);
         
         //打印
         await enumDemo.change(value);
         const rsp_value=await enumDemo.value();
         const rsp_status=await enumDemo.status();
         console.log("query value result:",rsp_value);
         console.log("query status result:",rsp_status);

         //校验
         expect(value).to.equal(rsp_value);
         expect(1).to.equal(rsp_status);
     });
 });