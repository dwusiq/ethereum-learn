# `mapping`描述

## 概览
映射：映射类型在声明时的形式为 `mapping(_KeyType => _ValueType)`。 其中 `_KeyType` 可以是任何基本类型,`_ValueType`可以是包括映射类型在内的任何类型

## 使用

1. 定义：例如`mapping(address=>bool)IsOwner`
2. 根据`key`获取`value`:例如`require(IsOwner[msg.sender],"require owner");`
3. 设置`key`对应的`value`:例如`IsOwner(msg.sender)=true;`,如果`key`重复，则覆盖前值。