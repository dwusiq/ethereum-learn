// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract ArrayDemo{
    uint256[] dataArray;
    uint[] uintArray;
    
    constructor(uint _arrayLength){
        dataArray = new uint256[](_arrayLength);//初始化指定长度的数组
        uintArray=[1,3,4];//初始化数组
        console.log("finish constructor. uintArrayLength:%s   dataArrayLength:%s",uintArray.length,dataArray.length);
    }

    function push(uint256 _value)public{
        dataArray.push(_value);
        console.log("finish push.  dataArrayLength:%s",dataArray.length);
    }   

    function pop()public{
        dataArray.pop();
        console.log("finish pop.  dataArrayLength:%s",dataArray.length);
    }

    function deleteArray()public{
        delete dataArray;
        console.log("finish deleteArray.  dataArrayLength:%s",dataArray.length);
    }

    function getLength()view public returns(uint256 arrayLength){
        return dataArray.length;
    }

}
