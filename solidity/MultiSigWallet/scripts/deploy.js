async function main(){
    const [Alice,Bob] = await ethers.getSigners();
    console.log("MultiSigWallet owner is :",Alice.address);

    //部署MyToken.sol
    const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
    const multiSigWalletReceipt = await MultiSigWallet.deploy([Alice.address,Bob.address],2);
    await multiSigWalletReceipt.deployed();

    console.log("MultiSigWallet address:", multiSigWalletReceipt.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });