# `weth`描述

## 概览
`WETH`:简单的说就是链上部署的`WETH`合约，这个合约支持`WETH`与`ETH`兑换比例为`1:1`,把`ETH`存到该合约，就能获得等额的代笔`WETH`,这样方便了`ETH`跟其他token交换

## 使用

1. 获得`WETH`地址
2. 定义接口合约`IWETH`，包括函数：`approve`、`transfer`、`withdraw`、`transfer`、`deposit`等
3. 在自己的业务合约初始化时，传入`WETH`地址，初始化`IWETH`
4. 在自己业务合约中涉及到`ETH`转账时，转调`IWETH`函数。

## 本工程调试步骤
* 初始化依赖库：`yarn`

## 参考链接

[rinkeby区块链浏览器](https://rinkeby.etherscan.io/tx/0x3284eadccbf13180b2756cd76d723f9e4755b4a1a0696107f5c146174fa63b87)
[什么是WETH](https://weth.io/cn/)