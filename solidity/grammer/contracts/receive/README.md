# `receive`描述

## 概览
`receive`函数：往合约发送`eth`时，将触发那个合约的`receive`函数。一个合约需要接收`eth`就必须包含`fallback`或`receive`函数。


## 使用
1. 定义：`receive()external payable{}`