async function main(){
    const [Alice,Bob,David] = await ethers.getSigners();
    console.log("MultiSigWallet owner is :",Alice.address);

    //部署MyToken.sol
    const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
    const multiSigWallet = await MultiSigWallet.deploy([Alice.address,Bob.address,David.address],2);
    await multiSigWallet.deployed();

    console.log("MultiSigWallet address:", multiSigWallet.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });