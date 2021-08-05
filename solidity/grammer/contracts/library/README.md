# `library`描述

## 概览
库合约：每个库都是一段独立的代码，所以它仅能访问调用合约明确提供的状态变量（否则它就无法通过名字访问这些变量），只能是`view`或`pure`。

## 使用

1. 定义：`library {libraryName} {...}`
2. 使用方式一：`L.M()`模式，如`Digital.addition(a,b)`
3. 使用方式二：`using {libraryName} for {target}`模式，如：`using BigInt for uint256;`。在当前的合约上下里, 指令 using A for B; 可用于附加库函数（从库 A）到任何类型（B）。 这些函数将接收到调用它们的对象作为它们的第一个参数（像 Python 的 self 变量）
