pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;
contract ABIEncoderTest{
    struct User{
        string name;
        uint8 age;
    }
    
    User user;
    
    constructor(string memory _name,uint8 _age)public{
        user = User({name:_name,age:_age});
    }
    
    function getUser()public view returns (User memory _u){
        User memory memoryUser = user;
        return memoryUser;
    }
}
