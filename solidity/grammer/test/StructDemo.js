const { expect } = require("chai");
 
 describe("StructDemo test",function (){
     it("deploy StructDemo and test function", async function() {

        //测试参数
        const userName="Bob";
        const userAge=6;

 
        //部署StructDemo.sol
         const StructDemo = await ethers.getContractFactory("StructDemo");
         const structDemo = await StructDemo.deploy(userName,userAge);
         await structDemo.deployed();
 
        //打印合约地址
         console.log("structDemo address：",structDemo.address);
         
         //打印
         const userInfo=await structDemo.getUser();
         console.log("query userInfo result:",userInfo);
      
         //校验
         expect(userName).to.equal(userInfo._name);
         expect(userAge).to.equal(userInfo._age);
     });
 });