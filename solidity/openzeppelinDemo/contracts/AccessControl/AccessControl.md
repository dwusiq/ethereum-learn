# `AccessControl`描述

## 概览
`AccessControl`是`openzeppelin`提供的一个用于权限管理的合约。
`AccessControlEnumerable`在`AccessControl`的基础上提供接口查询当前角色及用户。
`AccessControlAble`是我自己在`AccessControlEnumerable`基础上封装的一个合约，按需实现了`AccessControlEnumerable`的`inernal`接口，并对外提供`public`接口来维护角色的用户集，和变更owner等。

## 使用说明
* 在自己的合约(如本案例的`AccessControlDemo`)继承`AccessControlAble`,即可拥有权限管理的功能。
* 在需要做权限限制的接口加上修饰器`modifier`,如：`onlyManager`等...
