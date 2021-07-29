const { expect } = require("chai");
 
 describe("ABIEncoderV2 test",function (){
     it("deploy ABIEncoderV2 and test function", async function() {

        //测试参数
        const userName="Bob";
        const userAge=9;

         //获取测试账号(第一个是管理员)
         const [Owner,Alice,Bob] = await ethers.getSigners();
 
        //部署ABIEncoderDemo.sol
         const ABIEncoderV2Demo = await ethers.getContractFactory("ABIEncoderV2Demo");
         const abiEncoderV2Demo = await ABIEncoderV2Demo.deploy(userName,userAge);
         await abiEncoderV2Demo.deployed();
 
        //打印合约地址
         console.log("ABIEncoderV2Demo address：",abiEncoderV2Demo.address);
         
         //打印
         const userInfo = await abiEncoderV2Demo.getUser();
         console.log("userInfo",userInfo);

         //校验
         expect(userName).to.equal(userInfo.name);
     });
 });