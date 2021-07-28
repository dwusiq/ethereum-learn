//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
contract StructTest{
  struct User{
      string name;
      uint age;
  }
  
  User user;
  
  constructor(string memory _name,uint _age){
      user=User({name:_name,age:_age});
  }
  
  function getUser()view public returns(string memory _name,uint _age){
      string memory memoryName=user.name;
      return (memoryName,user.age);
  }
}