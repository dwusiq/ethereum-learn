import { ethers } from "ethers";
import batchContractArtifact from "../artifacts/contracts/TokenCollectBatch.sol/TokenCollectBatch.json";
// import usdArtifact from "../artifacts/contracts/mock/ERC20USDT.sol/UsdToken.json";
const { TEST_EVM_OWNER_KEY } = require("../env.json");



//config
var provider = new ethers.JsonRpcProvider("https://sepolia.drpc.org");
// const usdtAddress = "";
const batchContractAddress = "0xC25b5820ec7691E047253dCfe772671e32678351";

let walletSender = new ethers.Wallet(TEST_EVM_OWNER_KEY, provider);
const batchContract = new ethers.Contract(batchContractAddress, batchContractArtifact.abi, provider);
// const deployedUsdt = new ethers.Contract(usdtAddress, usdArtifact.abi, provider);



async function batch_transfer_same_amount_eth() {
  const toList = ["0x90F79bf6EB2c4f870365E785982E1f101E93b906", "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"];
  const amt = ethers.parseEther("0.001");
  const total = BigInt(toList.length) * amt;

  //查询当前gas价格
  // var gasPrice = await provider.getGasPrice();
  const gasPrice = (await provider.getFeeData()).gasPrice;

  //预估当前gas消耗
  const estimateGas = await (batchContract as any).connect(walletSender).batchTransferSameAmountEth.estimateGas(amt, toList, { value: total });

  console.log(`[executeIncreasePositions]gasPrice:${gasPrice?.toString()} gasLimit:${estimateGas.toString()}`);
  //发送交易
  const tx = await (batchContract as any).connect(walletSender).batchTransferSameAmountEth(amt, toList, { value: total });
  console.log(`tx:${JSON.stringify(tx)}`);
}



async function main() {
  await batch_transfer_same_amount_eth();
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


