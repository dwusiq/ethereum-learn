# `ABI`相关函数描述

## 概览
* 交易的附加数据（input）由4个字节的函数选择器（selector）和参数编码(每个参数的编码32个字节)组成，即：bytes4+byte32*n
* 函数选择器值实际是对函数签名字符串进行sha3（keccak256）哈希运算之后，取前4个字节

## 使用

* `this.set.selector`:获取当前合约中`set`函数的`ABI`数据,如：`this.set.selector == 0x60fe47b1`
* `bytes4(keccak256("set(uint256)"))`:根据函数名称和参数类型计算函数的`ABI`数据,如：`bytes4(keccak256("set(uint256)")) == 0x60fe47b1`
* `abi.encode(...) returns (bytes)`: 计算参数的ABI编码，如：`abi.encode(...)==?`
* `abi.encodePacked(...) returns (bytes)`：支持对单个或多个参数进行编码，如：`abi.encodePacked("a", "bc") == abi.encodePacked("ab", "c")`、`abi.encodePacked(uint16(0x12))`
* `abi.encodeWithSignature(string signature, ...) returns (bytes)`:计算函数名称及入参的`ABI`编码
   - 等价于`abi.encodeWithSelector(bytes4(keccak256(signature), ...)`

## 参考
[如何理解以太坊ABI](https://www.cnblogs.com/tinyxiong/p/9453563.html)
[非标准打包模式](https://www.osgeo.cn/solidity/abi-spec.html)