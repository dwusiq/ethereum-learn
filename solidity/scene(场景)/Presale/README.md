# 预售合约合集

## 简介
目标是纯链上实现预售、预售线性释放等预售相关功能。

## 运行测试
```
$ sudo npm config set registry https://registry.npm.taobao.org
$ npm install
```

## 合约

#### `MainToken.sol`
> 平台主币(ERC20)，预售期结束后，将按计划释放平台主币

#### `PresaleToken.sol`
> 预售代币(ERC20)，预售期间用户支付费用，合约按价格给用户发放相应份额预售代币，预售期结束后，可用于`1:1`兑换平台主币

#### `PresaleMarket.sol`
> 预售市场合约，支持平台方配置多种预售策略，供客户参与预售

#### `Releaser.sol`
> 线性释放合约，预售期结束后，平台方可以配置多种释放策略，供客户用预售币兑换平台主币