// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract DeleteDemo{
    struct User{
        string name;
        uint256 age;
    }


    uint256[] public array1=new uint256[](10);
    uint256[] public array2=[1,2,3];
    uint256 public  data = 100;
    mapping(uint256=>bool) public IsContainValue;
    User public user;



    constructor(uint256 _value){
        IsContainValue[_value]=true;
        user = User({name:"Bob",age:12});
    }

    function deleteAll(uint256 _keyOfMap) public{
        delete array1;
        delete array2;
        delete IsContainValue[_keyOfMap];
        delete data;
        delete user;
        console.log("array1Length:%s",array1.length);
        console.log("array2Length:%s",array2.length);
        console.log("IsContain key:%s rsp:%s",_keyOfMap,IsContainValue[_keyOfMap]);
        console.log("dataValue:%s",data);
        console.log("user name:%s age:%s",user.name,user.age);
    }



}
