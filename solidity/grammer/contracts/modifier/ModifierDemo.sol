//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract ModifierDemo{
    address public owner;
    uint value;
    
    constructor(){
        owner=msg.sender;
    }
    
    function change(uint _value) public justOwnder(msg.sender){
        value=_value;
    }
    
    function get()public view returns(uint){
        return value;
    }
    
    
    modifier justOwnder(address sender){
        require(sender==owner,"just support owner request!");
        _;
    }
}