const { expect } = require("chai");
 
 describe("ABIEncoderV2 test",function (){
     it("deploy ABIEncoderV2 and test function", async function() {

        //测试参数
        const userName="Bob";
        const userAge=9;

         //获取测试账号(第一个是管理员)
         const [Owner,Alice,Bob] = await ethers.getSigners();
 
        //部署ABIEncoderDemo.sol
         const ABIEncoderDemo = await ethers.getContractFactory("ABIEncoderDemo");
         const abiEncoderDemo = await ABIEncoderDemo.deploy(userName,userAge);
         await abiEncoderDemo.deployed();
 
        //打印合约地址
         console.log("ABIEncoderDemo address：",abiEncoderDemo.address);
         
         //打印
         const userInfo = await abiEncoderDemo.getUser();
         console.log("userInfo",userInfo);

         //校验
         expect(userName).to.equal(userInfo.name);
     });
 });