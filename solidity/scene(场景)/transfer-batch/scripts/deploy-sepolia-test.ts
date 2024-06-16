//npx hardhat run scripts/deploy-sepolia-test.ts --network testnetSepolia
import { deployContract } from "../utils/deployUtils";
const { ethers } = require("hardhat");

//!!!!!!!!!!!!!! Careful  need: change
let receiverAddress = "";


let deployer: any, deployerAddress: string;
let deployedUsdt: any,
  usdtAddress: string = "0xd88a35c8642258eb702Ea26eE6b7CdE6cCA161c4",
  batchContract: any,
  batchContractAddress: string = "0xC25b5820ec7691E047253dCfe772671e32678351";


//deploy
async function deployContracts() {
  //deploy usdt
  deployedUsdt = await deployContract("UsdToken", [], deployer);
  usdtAddress = deployedUsdt.target;

  //deploy multiSignWallet
  batchContract = await deployContract("TokenCollectBatch", [receiverAddress], deployer);
  batchContractAddress = batchContract.target;
};








async function main() {
  [deployer] = await ethers.getSigners();
  deployerAddress = deployer.address;
  if (receiverAddress == "") receiverAddress = deployerAddress;
  console.log(`>>>>deployer:${deployer.address}, receiverAddress:${receiverAddress}`);

  //deploy
  await deployContracts();
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

export { };
