// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "./ClassInterface.sol";

contract InterfaceDemo is ClassInterface{
    uint8 public studentCount;
    string public className;

    constructor(string memory _name){
        className=_name;
    }

    function changeStudentCount(uint8 _count)public override{
        studentCount = _count;
    }
}