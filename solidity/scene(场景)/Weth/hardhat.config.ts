import {HardhatUserConfig} from 'hardhat/types';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';

// const INFURA_PROJECT_ID = "4b3c2c1c3be0462dbdc4afcfb20564a2";//在infrua中创建的项目的id
// const PRIVATE_KEY = "5511a7aeb49a387168e4cc16a815f7b641d5fa4afe442a2dede56398df6fd84d"; //私钥

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.0', // 支持solidity版本
  }
  // ,
  // networks: {
  //   rinkeby: {
  //     url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
  //     accounts: [`0x${PRIVATE_KEY}`,`0x592459c70d9149468b8d582974d8c9a36e087c0c50ac3269df6e17403ee9f1bb`]
  //   }
  // }
  // namedAccounts: {
  //   deployer: 0,
  // },
};
export default config;