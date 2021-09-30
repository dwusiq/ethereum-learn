// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AccessControlAble.sol";

//@brief 权限控制案例
contract AccessControlDemo is AccessControlAble {
    uint256 public storageValue;

    //@brief 构造函数
    constructor(address _managerAddress) AccessControlAble(_managerAddress) {}

    //@brief 只有管员才能修改值
    function changeStorageValue(uint256 _value) public onlyManager {
        storageValue = _value;
    }
}
