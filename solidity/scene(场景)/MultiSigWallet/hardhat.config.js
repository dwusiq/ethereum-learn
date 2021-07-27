require("@nomiclabs/hardhat-waffle");

const INFURA_PROJECT_ID = "4b03c2c1c3be0462dbdc4afcfb20564a2";//在ropsten中创建的项目的id
const PRIVATE_KEY1 = "ee0a15729e7f15994bb53be716b2f52ee1217225a5211549f22c2505c6fa1bc22"; //私钥1
const PRIVATE_KEY2 = "0c0806458f61df679ea1d6e7209dc3cdc009f8d01333e1446b2ef46dd22fe6e33"; //私钥2


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.6.3",
  // networks: {
  //   ropsten: {
  //     url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
  //     accounts: [`0x${PRIVATE_KEY1}`,`0x${PRIVATE_KEY2}`]
  //   }
  // }
};
