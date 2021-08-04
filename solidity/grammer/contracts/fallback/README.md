# `fallback`描述

## 概览
回退函数：调用该合约不存在的函数，会触发该合约的回退函数

## 使用

1. 定义：`fallback()external{}`



## 案例描述
本案例通过`FallbackDemo.sol`来调用`Storage.sol`的函数。证明调用不存在的函数时，目标合约的`fallback`函数会被触。

### 测试过程
* 部署`Storage.sol`
* 部署`FallbackDemo.sol`
* 分别调用`FallbackDemo.sol`合约的`requestExistFunc`和`requestNotExistFunc`函数，观察返回值是不是等于`100`


### 合约介绍

#### `Storage.sol`
* `fallback`
   - 描述：外部调用该合约不存在的函数时触发，可以有入参（本案例没有实现有入参的场景）
* `set`
   - 描述：设置`value`值
* `get`
   - 描述：获取`value`值

#### `FallbackTest.sol`
* `requestExistFunc`
   - 描述：调用`Storage.sol`存在的函数，不会触发`fallback`函数
   - 参数：`Storage.sol`的地址、目标函数（`set`）的入参

* `requestNotExistFunc`
   - 描述：调用`Storage.sol`不存在的函数，会触发`fallback`函数
   - 参数：`Storage.sol`的地址
  
