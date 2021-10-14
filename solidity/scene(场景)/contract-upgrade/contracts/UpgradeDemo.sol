// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//可升级合约案例
//注意点一：不能有构造函数，另外定义一个其它函数来初始化合约
contract UpgradeDemo {
     uint256 public value;
    address public owner;

    //该函数替代构造函数用于初始化合约
    function initFunction(uint256 _defaultValue) public {
        owner = msg.sender;
        value = _defaultValue;
    }

    function changeValue(uint256 _newValue) public {
        value = _newValue;
    }

}
