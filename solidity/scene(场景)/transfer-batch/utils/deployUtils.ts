import { ethers } from "hardhat";


export async function deployContract(contractName: string, params: any, deployer = undefined) {
    const contract = await ethers.deployContract(contractName, params, deployer);
    await contract.waitForDeployment();
    console.log(`deployed ${contractName} ===> ${contract.target}`);
    return contract;
  }
  
  