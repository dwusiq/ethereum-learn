const { expect } = require("chai");
 
 describe("AbstractDemo test",function (){
     it("deploy AbstractDemo and test function", async function() {

        //测试参数
        const className="幼儿园大一班";
        const studentCount=10;
 
        //部署AbstractDemo.sol
         const AbstractDemo = await ethers.getContractFactory("AbstractDemo");
         const abstractDemo = await AbstractDemo.deploy(className);
         await abstractDemo.deployed();
 
        //打印合约地址
         console.log("abstractDemo address：",abstractDemo.address);
         
         //验证
         await abstractDemo.changeStudentCount(studentCount);
         expect(className).to.equal(await abstractDemo.className());
         expect(studentCount).to.equal(await abstractDemo.studentCount());

     });
 });