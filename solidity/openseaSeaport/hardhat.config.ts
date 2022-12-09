import "@nomiclabs/hardhat-web3";
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import { HardhatUserConfig } from 'hardhat/types';

const KOVAN_OWNER_KEY = '5511a7aeb49a387168e4cc16a815f7b641d5fa4afe442a2dede56398df6fd84d';//Kovan网的OWNER私钥

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/0bf59832a3d74ade9625a218acdbecb3`,
      gasPrice: 20000000000,
      accounts: [`0x${KOVAN_OWNER_KEY}`],//owner
      timeout: 60000  //这里时间给长一点，不然容易超时
    }
  },

  solidity: {
    version: '0.4.26', // 支持solidity版本
  },
};
export default config;