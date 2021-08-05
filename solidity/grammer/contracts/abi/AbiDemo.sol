// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
contract AbiDemo{

    uint256 public data;
    
    function set(uint256 _value)public{
        data = _value;
    }
    
    //获取指定函数的ABI编码值
    function getSelector()public pure returns(bytes4){
        return this.set.selector;
    }

    //多种方式获取的ABI编码值
    function getSelectorMulti()public pure returns(bytes4,bytes4){
        bytes4 selector= this.set.selector;
        bytes4 selector1= bytes4(keccak256("set(uint256)"));
        return (selector,selector1);
    }

    function encodeValue(uint256 _value)public pure returns (bytes memory){
        return abi.encode(_value);
    }

    function encodeWithSignature(uint256 _value)public pure returns (bytes memory){
        return abi.encodeWithSignature("set(uint256)", _value);
    }

    function encodeWithSelector(uint256 _value)public pure returns (bytes memory){
        return abi.encodeWithSelector(this.set.selector, _value);
    }

    function encodePacked(uint256 _value)public pure returns (bytes memory){
         return abi.encodePacked(_value);
    }

    function encodePackedWithMultiValue(uint256 _value,uint256 _v)public pure returns (bytes memory){
         return abi.encodePacked(_value,_v);
    }
}
