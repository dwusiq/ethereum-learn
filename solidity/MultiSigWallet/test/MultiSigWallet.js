const {expect} = require("chai");


function getPayLoad(contractABI,functionName,param){
    for(let i=0;i<contractABI.length;i++){
        const functionABI = contractABI[i];
        if(functionName!=functionABI.name){
            continue;
        }


        const iface = new ethers.utils.Interface(contractABI);

        // const iface = new ethers.Interface(contractABI);
        const abiInstance =iface.functions[functionName];
     
        // const abiInterface=new ethers.Interface(functionABI);

        console.log("sign of method:%s is %s",functionName,abiInstance.sighash );
        // console.log("method:%s, abi:%s",functionName,contractABI[i]);
    }
}

describe("MultiSigWallet test",function(){
    it("test function of MultiSigWallet.sol",async function(){
        //测试账号数组
        const [Alice,Bob,David] = await ethers.getSigners();

        //部署多签合约`MultiSigWallet.sol`
        const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
        const multiSigWallet = await MultiSigWallet.deploy([Alice.address,Bob.address,David.address],2);
        await multiSigWallet.deployed();
        console.log("address of multiSigWallet:",multiSigWallet.address);

        //部署交易合约`Hello.sol`,该合约的交易只能由上面的那个合约触发
        const Hello = await ethers.getContractFactory("Hello");
        const hello = await Hello.deploy();
        await hello.deployed();
        console.log("address of hello:",hello.address);


        //在多签钱包添加一笔交易
        const tokenArtifact = await hre.artifacts.readArtifact("Hello");
        getPayLoad(tokenArtifact.abi,"set",1);
        // console.log("abi of hello:",tokenArtifact.abi);

        // const data = getPayLoad();

    });
});


/**
 * const { expect } = require("chai");
 
 describe("MyToken test",function (){
     it("deploy MyToken and test function", async function() {
 
         //获取测试账号(第一个是管理员)
         const [Owner,Alice,Bob] = await ethers.getSigners();
 
        //部署MyToken.sol
         const MyToken = await ethers.getContractFactory("MyToken");
         const myToken = await MyToken.deploy(1000000);
         await myToken.deployed();
 
         //判断管理员的余额是否跟初始化的一样
         const OwnerInitBalance = await myToken.balance(Owner.address);
         console.log('Owner balance:',OwnerInitBalance.toString().replace("0x",""));
         expect(OwnerInitBalance).to.equal(1000000);
 
         //Owner给Alice转账
         await myToken.transfer(Alice.address,100);
         //Alice给Bob转账
         await myToken.connect(Alice).transfer(Bob.address, 50);
 
         //获取各个用户余额
         const  OwnerBalance = await myToken.balance(Owner.address);
         const  AliceBalance = await myToken.balance(Alice.address);
         const  BobBalance = await myToken.balance(Bob.address);
 
         //确认余额
         expect(OwnerBalance).to.equal(1000000-100);
         expect(AliceBalance).to.equal(100-50);
         expect(BobBalance).to.equal(50);
 
         //打印合约地址
         console.log("MyToken address：",myToken.address);
     });
 });
 */