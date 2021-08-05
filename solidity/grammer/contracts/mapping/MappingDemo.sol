//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
contract MappingDemo{
    mapping(address=>bool) IsOwner;
    
    uint public value;
    
    constructor(){
        IsOwner[msg.sender]=true;
    }

    function change(uint8 _value)public{
        require(IsOwner[msg.sender],"require owner");
        value=_value;
    }
}