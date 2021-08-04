//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract ReceiveDemo{
    event ReceiveCall(address sender,uint256 amount);
    receive()external payable{
        console.log("sender:%s, amount:%s",msg.sender,msg.value);
        emit ReceiveCall(msg.sender, msg.value);
    }


    function getBalance()public view returns(uint256 balance){
        return address(this).balance;
    }
}