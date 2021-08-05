//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

library DigitalAble{
    function addition(uint256 self,uint256 _value) pure public returns(uint256){
        self+=_value;
        return self;
    }

    
    function subtraction(uint256 self,uint256 _value) pure public returns(uint256){
        require(self>_value,"input value is too small");
        self-=_value;
        return self;

    }
}

//支持以：using for方式调用库的函
contract LibraryDemo2{
    using DigitalAble for uint256;//可以将库的函数赋予任何类型，之后该类型将拥有库的所有函数。
    uint256 public storageData;
    constructor(uint256 _init){
        storageData=_init;
    }

    function addition(uint256 _value) public{
      storageData = storageData.addition(_value);
    }

    function subtraction(uint256 _value) public{
        storageData =  storageData.subtraction(_value);
    }

    function additionBetweenTowValue(uint256 _value1,uint256 _value2)pure public returns(uint256){
     return _value1.addition(_value2);
    }
}