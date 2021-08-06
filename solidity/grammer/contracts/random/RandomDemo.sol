//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
contract RandomDemo{

   function rand(uint userSeed) public view returns(uint){
        return uint(keccak256(
        abi.encodePacked(block.timestamp, block.number, userSeed, 
        blockhash(block.number))));
    }
}