# `library`描述

## 概览
库合约：每个库都是一段独立的代码，所以它仅能访问调用合约明确提供的状态变量（否则它就无法通过名字访问这些变量），只能是`view`或`pure`。

## 使用

1. 定义：`library {libraryName} {...}`
2. 使用方式一：`L.M()`模式，如`Digital.addition(a,b)`
3. 使用方式二：`using for`模式，如：`using BigInt for bigint;`
