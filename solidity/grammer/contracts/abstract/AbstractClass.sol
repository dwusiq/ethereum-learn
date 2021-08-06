// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

//如果未实现合约中的至少一个函数，则需要将合约标记为 abstract。 即使实现了所有功能，合同也可能被标记为abstract。
abstract contract AbstractClass{
    uint8 public studentCount;
    string public className;

    //可以拥有未实现的函数
    function changeStudentCount(uint8 _count)public virtual;

    //可以拥有实现的函数
    function setClassName(string memory _name)internal{
        className=_name;
    }
}
