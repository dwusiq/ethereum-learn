const { expect } = require("chai");
 
 describe("InterfaceDemo test",function (){
     it("deploy InterfaceDemo and test function", async function() {

        //测试参数
        const className="幼儿园大一班";
        const studentCount=10;
 
        //部署InterfaceDemo.sol
         const InterfaceDemo = await ethers.getContractFactory("InterfaceDemo");
         const interfaceDemo = await InterfaceDemo.deploy(className);
         await interfaceDemo.deployed();
 
        //打印合约地址
         console.log("interfaceDemo address：",interfaceDemo.address);
         
         //验证
         await interfaceDemo.changeStudentCount(studentCount);
         expect(className).to.equal(await interfaceDemo.className());
         expect(studentCount).to.equal(await interfaceDemo.studentCount());

     });
 });