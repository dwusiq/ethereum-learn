pragma solidity ^0.4.3;

contract Hello{
    uint256 public value;


    function set(uint256 _value)public{
        value = _value;
    }


    function get()public view returns(uint256){
        return value;
    }
}