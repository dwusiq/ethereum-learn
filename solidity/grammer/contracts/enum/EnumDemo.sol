//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
contract EnumDemo{
  enum STATUS_ENUM{START,STOP}
  
  STATUS_ENUM public status;
  
  uint8 public value;

  constructor(){
      status=STATUS_ENUM.START;
  }
  
  function change(uint8 _value) requireStart public{
      value=_value;
      status=STATUS_ENUM.STOP;
  }
  
  modifier requireStart(){
      require(status==STATUS_ENUM.START,"require status is start");
      _;
  }
}