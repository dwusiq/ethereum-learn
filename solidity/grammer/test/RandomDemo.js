const { expect } = require("chai");
 
 describe("RandomDemo test",function (){
     it("deploy RandomDemo and test function", async function() {

        //param
        const userSeed = 100;

        //部署RandomDemo.sol
         const RandomDemo = await ethers.getContractFactory("RandomDemo");
         const randomDemo = await RandomDemo.deploy();
         await randomDemo.deployed();
 
        //打印合约地址
         console.log("randomDemo address：",randomDemo.address);
         
         //打印
         const randomNumber=await randomDemo.rand(userSeed);
         console.log("randomNumber:",randomNumber.toString());
     });
 });