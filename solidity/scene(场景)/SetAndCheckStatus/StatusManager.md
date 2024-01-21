# 状态管理的代码案例(省 gas)

## 业务介绍

- 前提：solidity 中不管存储什么数字，分配的插槽都是 256 位
- 该合约设计的非常巧妙，利用了 solidity 的以上特性，将状态记录到从 0 开始的数字中，每个数字都有 256 位，因此可以记录 256 个状态，大量节省了状态存储空间
- 某个index的状态具体存储在哪个数字的哪个位置，由指定该【index/256】 和【index%256】决定的。更具体的描述在合约内

## `StatusManager.sol`合约详情

### 函数描述

- setClaimed
> 设置指定index的状态为claimed

- isClaimed
> 判断指定的index的状态是否为claimed
