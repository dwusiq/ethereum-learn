import { ethers} from 'hardhat';
async function main(){
    const [Owner,Alice] = await ethers.getSigners();
    console.log("Creature owner is :",Owner.address);

    //部署MyToken.sol
    const Creature = await ethers.getContractFactory("Creature");
    const creature = await Creature.deploy(Owner.address);
    await creature.deployed();

    console.log("Creature address:", creature.address);

    await creature.mintTo(Alice.address);
    await creature.mintTo(Alice.address);
    const totalSupply = await creature.totalSupply();
    console.log('totalSupply:',totalSupply);
    console.log('tokenURI:',await creature.tokenURI(1));
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });