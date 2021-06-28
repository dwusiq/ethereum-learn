const {expect} = require("chai");


function getPayLoad(contractABI,functionName,param){
        //get sigHash of function
        const interface = new ethers.utils.Interface(contractABI);
        const functionSigHash = interface.getSighash(functionName);
        console.log("sign of method:%s is %s",functionName,functionSigHash);

        //encode param
        const abiCoder =new ethers.utils.AbiCoder()
        const codeOfParam =  abiCoder.encode(['uint256'],[param])
        console.log("codeOfParam:",codeOfParam);

        //payload
        const payload = functionSigHash + codeOfParam.substring(2,codeOfParam.length);
        console.log("payload:",functionName,payload);

        return payload;
}

describe("MultiSigWallet test",function(){
    it("test function of MultiSigWallet.sol",async function(){
        //测试账号数组
        const [Alice,Bob,David] = await ethers.getSigners();

        //部署工厂合约（用于创建多签合约）
        const MultiSigWalletFactory = await ethers.getContractFactory("MultiSigWalletFactory");
        const multiSigWalletFactory = await MultiSigWalletFactory.deploy();
        await multiSigWalletFactory.deployed();
        console.log("address of multiSigWalletFactory:",multiSigWalletFactory.address);


       //通过工厂合约创建多签合约
       const multiSigWallet = await multiSigWalletFactory.create([Alice.address,Bob.address,David.address],2);
       const createReceipt = await multiSigWallet.wait();
       console.log("createReceipt:",createReceipt.logs);


        // //部署多签合约`MultiSigWallet.sol`
        // const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
        // const multiSigWallet = await MultiSigWallet.deploy([Alice.address,Bob.address,David.address],2);
        // await multiSigWallet.deployed();
        // console.log("address of multiSigWallet:",multiSigWallet.address);

        //部署交易合约`Hello.sol`,该合约的交易只能由上面的那个合约触发
        // const Hello = await ethers.getContractFactory("Hello");
        // const hello = await Hello.deploy();
        // await hello.deployed();
        // console.log("address of hello:",hello.address);
       
    
        //在多签钱包添加一笔交易
        // const tokenArtifact = await hre.artifacts.readArtifact("Hello");
        // const payload = getPayLoad(tokenArtifact.abi,"set",233);
        // const submitTransaction = await multiSigWallet.submitTransaction(hello.address, 0, payload);
        // const transactionReceipt = await submitTransaction.wait();
        // console.log("transactionReceipt:",transactionReceipt);

        
        // await multiSigWallet.queryFilter("Submission" , transactionReceipt.blockNumber ,transactionReceipt.blockNumber)
        // .then(e => console.log(e)).catch(err =>console.log(err));
    

        //其他参与者同意
        // await multiSigWallet.connect(Bob).confirmTransaction(Bob.address, 50);




        // console.log("abi of hello:",tokenArtifact.abi);

        // const data = getPayLoad();

    });
});