# test-helpers 使用

## 描述
`test-helpers`能够很好的支持对合约的测试。比如：合约函数调用失败、时间、余额、处理大数据、时间转移等

## 安装和配置
* 安装依赖
```
npm install --save-dev @openzeppelin/test-helpers
npm install --save-dev @nomiclabs/hardhat-web3 web3
```
* 配置
```
# hardhat.config.ts
import "@nomiclabs/hardhat-web3";

# hardhat.config.js
require("@nomiclabs/hardhat-web3");
```


## 参考

* [test-helpers api](https://docs.openzeppelin.com/test-helpers/0.5/api)
* [openzeppelin test-helpers](https://docs.openzeppelin.com/test-helpers/0.5/)
* [web3配置](https://hardhat.org/plugins/nomiclabs-hardhat-web3.html#installation)