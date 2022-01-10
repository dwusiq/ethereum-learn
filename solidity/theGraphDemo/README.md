# theGraph

## 一、描述
the Graph可以作用于检索区块链的数据，如合约事件等

## 二、环境准备
* node
* 安装`the Graph CLI`
```
# NPM
npm install -g @graphprotocol/graph-cli

# Yarn
yarn global add @graphprotocol/graph-cli
```

## 实操步骤
* `github`新建一个项目，因为后面创建子图(`Subgraph`)需要用到,如我的仓库是：
```
https://github.com/dwusiq/ethereum-learn
```

* 部署一个智能合约(包含event）
```
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.11;

contract MyContract {
event ChangeData(address indexed sender,uint256 indexed newData);
uint256 public data;

constructor(){}

 function change(uint256 _value)public {
     data=_value;
     emit ChangeData(msg.sender,_value);
 }
}
```
**以上合约部署后，记住合约地址，如：`0x5431B1d186C38dc2074AeD0d1443CAbA6A1CEe69`**

* 初始化子图`Subgraph`
  
  > 后续看能不能添加多个子图
```
//实际场景，要替换以下合约地址
graph init --product hosted-service --from-contract 0x5431B1d186C38dc2074AeD0d1443CAbA6A1CEe69
```




## 测试