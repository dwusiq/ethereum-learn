// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//升级版合约案例
//关注点一：升级版合约可以新增函数
//关注点二：升级版合约不能变更存储的个数
contract UpgradeDemoV2 {
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

    function add(uint256 _value) public {
        value += _value;
    }
}
