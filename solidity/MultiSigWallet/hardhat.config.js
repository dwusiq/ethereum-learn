require("@nomiclabs/hardhat-waffle");

const INFURA_PROJECT_ID = "4b3c2c1c3be0462dbdc4afcfb20564a2";//在kovan中创建的项目的id
const ROPSTEN_PRIVATE_KEY = "eea15729e7f15994bb53be716b2f52ee1217225a5211549f22c2505c6fa1bc22"; //私钥

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.6.3",
  networks: {
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
