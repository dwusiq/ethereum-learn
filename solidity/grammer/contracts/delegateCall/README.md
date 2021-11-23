# `delegateCall`描述

## 概览
可以在当前合约的运行环境中调用目标合约（数据记录在当前合约的存储中，而非被调用合约）

## 使用
1、部署被代理的合约A
2、部署代理合约B（合约B的存储需要跟A的一致）
3、调用B合约的函数时，传入合约A的地址，并通过delegateCall调用A合约的函数（需要使用函数签名）
4、另外可以通过这种方式实现合约升级功能

## 参考
[delegateCall案例](https://solidity-by-example.org/delegatecall/)
[solidity地址模块](https://docs.soliditylang.org/en/v0.8.9/types.html#address)