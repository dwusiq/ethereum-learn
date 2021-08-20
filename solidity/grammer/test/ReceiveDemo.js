const { expect } = require("chai");
 
 describe("ReceiveDemo test",function (){

     it("deploy ReceiveDemo and test fus();\n" +
         "\n" +
         "\n" +
         "        //测试参数\n" +
         "        const value=\"10.0\";\n" +
         "      \n" +
         "        //部署ReceiveDemo.sol\n" +
         "         const ReceiveDemo = await ethers.getContractFactory(\"ReceiveDemo\");\n" +
         "         const receiveDemo = await ReceiveDemo.deploy();nction", async function() {

        const [Alice] = await ethers.getSigner
         await receiveDemo.deployed();

        //打印合约地址
         console.log("receiveDemo address：",receiveDemo.address);
        
         //给合约转`eth`,触发`receive`函数
         const tx = {to: receiveDemo.address,value: ethers.utils.parseEther(value)}
         const transactionReceipt = await Alice.sendTransaction(tx);

        receiveDemo.queryFilter(receiveDemo.filters.ReceiveCall(),transactionReceipt.blockNumber,transactionReceipt.blockNumer)
        .then(rsp => {
            console.log("ether sender:",rsp[0].args.sender);
            expect(Alice.address).to.equal(rsp[0].args.sender);
            console.log("ether amount:",rsp[0].args.amount)
            expect(ethers.utils.parseEther(value)).to.equal(rsp[0].args.amount);
        
        })
        .catch(err => console.error("error:",err)); 

        //查看余额
        console.log("receiveDemo value:",await receiveDemo.getBalance());
        // expect(value).to.equal(await storage.get());


     });
 });