//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
contract EventTest{
    event changeValue(address sender,uint8 vlaue);
    
    uint value;
    
    function change(uint8 _value)public{
        value=_value;
        emit changeValue(msg.sender,_value);
    }
}