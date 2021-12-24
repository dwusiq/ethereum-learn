import { ethers, upgrades } from 'hardhat';


//-----------------------------
//------初始化参数--------------
//-----------------------------
// let contractAddress = "0xc1f78b2f7ada19c3cf04d7625e0c800d094ee438";//这个地址为空则重新部署，不为空则使用该地址调函数
let contractAddress = "";//这个地址为空则重新部署，不为空则使用该地址调函数

//TODO 待完善价格预估
async function main() {
    const [Owner] = await  ethers.getSigners();
    console.log("UpgradeDemo owner is :", Owner.address);

    //初始化或部署合约
    const upgradeDemo = await ethers.getContractFactory("UpgradeDemo");
    let deployUpgradeDemo;
    if (!contractAddress || "" == contractAddress) {
        console.log('--------------deploy upgradeDemo---------------')
        //部署UpgradeDemo.sol
        let paramArr = [82]
        deployUpgradeDemo = await upgrades.deployProxy(upgradeDemo, paramArr, { initializer: 'initialize' });
        contractAddress = deployUpgradeDemo.address;
    } 
    else {
        console.log("--------------init contract from address:%s---------------", contractAddress);
        deployUpgradeDemo = upgradeDemo.attach(contractAddress);
    }
    console.log("UpgradeDemo address:", contractAddress);


    //合约部署后，可以继续调用函数做一些预设置
    //Type 'SignerWithAddress' is not assignable to type 'Signer'.
    const changeValueTrans = await deployUpgradeDemo.connect( new ethers.Signer(Owner)).changeValue(23);
    console.log("changeValueTrans", changeValueTrans);
    await changeValueTrans.wait();
    
    console.log("deploy success");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });




