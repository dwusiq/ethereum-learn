//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

//支持以：L.M() 方式调用库的函数
library Digital{
    function addition(uint256 a,uint256 b) internal pure returns(uint256){
        return a+b;
    }

    
    function subtraction(uint256 a,uint256 b) internal pure returns(uint256){
        require(a>b,"require the first number bigger then last one");
        return a-b;
    }
}

contract LibraryDemo1{
    uint256 public value;
    constructor(uint256 _init){
        value=_init;
    }

    function addition(uint256 _value)public{
        value=Digital.addition(value, _value);
    }

    function subtraction(uint256 _value)public{
        value=Digital.subtraction(value, _value);
    }
}