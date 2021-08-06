// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

//接口的所有函数都不能由实现。
interface ClassInterface{
    function changeStudentCount(uint8 _count)external;
}
