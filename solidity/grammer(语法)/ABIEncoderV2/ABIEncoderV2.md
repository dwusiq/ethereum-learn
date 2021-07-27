# `ABIEncoderV2`描述

## 概览
简单的说`ABIEncoderV2`就是`solidity`的`0.6`版本之后，用来使合约函数支持结构体(struct)的出入参，如：`function getUser()public view returns (User memory _u){...}`

## 使用

在合约开头标注开启该功能（0.8之后已改为默认开启，不用这行也可以了）：`pragma experimental ABIEncoderV2;`
