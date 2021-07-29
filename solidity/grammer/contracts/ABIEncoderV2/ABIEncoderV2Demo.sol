// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;
contract ABIEncoderV2Demo{
    struct User{
        string name;
        uint8 age;
    }
    
    User user;
    
    constructor(string memory _name,uint8 _age){
        user = User({name:_name,age:_age});
    }
    
    function getUser()public view returns (User memory _u){
        User memory memoryUser = user;
        return memoryUser;
    }
}
