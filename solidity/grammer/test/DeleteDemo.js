const { expect } = require("chai");
 
 describe("DeleteDemo test",function (){
     it("deploy DeleteDemo and test function", async function() {

        //测试参数
        const param=3;
 
        //部署DeleteDemo.sol
         const DeleteDemo = await ethers.getContractFactory("DeleteDemo");
         const deleteDemo = await DeleteDemo.deploy(param);
         await deleteDemo.deployed();
 
        //打印合约地址
         console.log("deleteDemo address：",deleteDemo.address);
         
         //验证
         await deleteDemo.deleteAll(param);
         expect(0).to.equal(await deleteDemo.data());       
     });
 });