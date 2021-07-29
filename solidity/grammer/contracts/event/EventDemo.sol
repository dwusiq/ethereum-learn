//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
contract EventDemo{
    event changeCall(address sender,uint8 vlaue);
    
    uint public value;
    
    function change(uint8 _value)public{
        value=_value;
        emit changeCall(msg.sender,_value);
    }
}