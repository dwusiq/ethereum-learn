//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
contract Storage{

 uint8 value;
  

  //如果调用这个合约时传入了不存在的函数名，则进入fallback
  fallback()external{
      value=100;
  }
  
  function set(uint8 _val)public returns(bool){
      value=_val;
      return true;
  }
  
  function get() view public returns(uint8){
      return value;
  }
}