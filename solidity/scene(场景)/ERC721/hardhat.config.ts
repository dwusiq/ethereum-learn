import {HardhatUserConfig} from 'hardhat/types';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';

const config: HardhatUserConfig = {
    solidity: {
        version: '0.8.0', // 支持solidity版本
    },
    // namedAccounts: {
    //   deployer: 0,
    // },
};
export default config;