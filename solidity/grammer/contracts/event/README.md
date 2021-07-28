# `event`描述

## 概览
事件：`solidity`可以通过事件的方式打印日志，让外界可以监控该事件，从而获取相关信息

## 使用

1. 用类似`event eventName(address user,uint vlue);`的方式定义事件
2. 用`emit eventName(msg.sender,8);`的方式触发事件