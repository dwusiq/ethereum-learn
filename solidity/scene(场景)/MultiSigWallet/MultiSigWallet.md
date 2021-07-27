# 多签钱包调研

## 业务介绍
多签钱包，所有参与者都可以添加一笔交易，其他的参与者可以对这笔交易投下赞成票，当赞成票达到设置值时，这笔交易会被触发。另外，参与者及最低票数都可以动态设置。

## `MultiSigWallet.sol`合约详情

### 函数描述
* 构造函数

  初始化签名者列表，及每次交易至少需要签名数。

* addOwner 
  
  追加签名者

* replaceOwner

  替换一个现有的签名者
  
* changeRequirement

  变更最低签名数
  
* submitTransaction

  提交一笔交易申请，参数为：合约地址、转账金额、交易data
  
* confirmTransaction

  传入之前提交的交易的id，确认这笔交易可执行，如果确认的人数已达到最低要求，则自动执行该交易
  
* revokeConfirmation

  取消确认一笔自己之前确认过的交易

* executeTransaction

  根据id执行对应的交易，前提是交易已得到足够的确认数
  
* isConfirmed

  判断一笔交易是否已得到足够的确认数
  
* getConfirmationCount

  获取一笔交易当前得到的确认数
  
* getTransactionCount

  查询交易数，两个入参分别是：是否包含处理中的交易、是否包含已处理的交易
  
* getOwners

  获取当前所有可确认交易者
  
* getConfirmations

  查看一笔交易已经得到哪些确认者的确认
  
* getTransactionIds
* 查询交易id列表，参数为：from、to、pending（是否包含处理中）、executed（是否包含已处理）


###  使用描述

 1. 参与者之一部署多签合约`MultiSigWallet.sol`
   * 参数一：包含自己在内的参与者数组
   * 参数二：至少要达到的签名数

 2. 其中一个参与者调用函数`submitTransaction`提交交易申请，得到一个交易id
   * 参数一：address--目标合约地址
   * 参数二：value--转让以太币数
   * 参数三：data--目标函数调用的签名值

 3. 相关参与者分别调用函数`confirmTransaction`确认这笔交易
     当交易确认者达到指定的数时，会调用`executeTransaction`触发目标交易

## `hardhat`中使用
1. 在`MultiSigWallet`目录执行安装本项目依赖的命令：`npm install`
2. 运行测试脚本：`npx hardhat test` --这里可能失败，如果失败，参考下文`FAQ`
3. 部署到其他链
   * 修改配置文件`hardhat.config.js`
      - `const INFURA_PROJECT_ID`: 在ropsten中创建的项目的id
      - `PRIVATE_KEY1`、`PRIVATE_KEY2`：私钥（可以在matemask中导出）
   * 运行部署脚本：`npx hardhat run scripts/deploy.js --network rospten`


 ## 参考链接

1. 合约地址：https://github.com/gnosis/MultiSigWallet/tree/master/contracts



## FAQ

**Q:** 执行命令`npx hardhat test`失败

```
PS E:\codes\github\ethereum-learn\solidity\MultiSigWallet> npx hardhat test
CreateFile() Error: 5
Error HH8: There's one or more errors in your config file:

  * Invalid value {"url":"https://ropsten.infura.io/v3/4b03c2c1c3be0462dbdc4afcfb20564a2","accounts":["0xee0a15729e7f15994bb53be716b2f52ee1217225a5211549f22c2505c6fa1bc22","0x0c0806458f61df679ea1d6e7209dc3cdc009f8d01333e1446b2ef46dd22fe6e33"]} for HardhatConfig.networks.ropsten - Expected a value of type HttpNetworkConfig.
  
To learn more about Hardhat's configuration, please go to https://hardhat.org/config/
```

**A:** 修改配置文件`hardhat.config.js`,把`networks`这块代码整个注释就可以了。（pass:在执行部署命令时，需要把这段注释打开）