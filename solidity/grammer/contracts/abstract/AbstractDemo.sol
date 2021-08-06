// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "./AbstractClass.sol";

contract AbstractDemo is AbstractClass{
    constructor(string memory _name){
        super.setClassName(_name);
    }

    function changeStudentCount(uint8 _count)public override{
        studentCount = _count;
    }
}