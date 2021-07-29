//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract FallbackDemo{

 
  //request exist func
  function requestExistFunc(address addr,uint8 _val)public returns(uint256 _rsp){
      console.log("requestExistFunc has bean request");
      bytes memory payload1 = abi.encodeWithSignature("set(uint8)", _val);
      (bool isSuccess1,) =  addr.call(payload1);
      require(isSuccess1,"set data not success");
      
      return _requestGet(addr);
  }
 
 
   //request not exist func，will trigger `fallback` of target contract 
   function requestNotExistFunc(address addr)public returns(uint256 data){
     console.log("requestNotExistFunc has bean request");
      bytes memory payload = abi.encodeWithSignature("register(string)", "MyName");
      (bool isSuccess,) =  addr.call(payload);
      require(isSuccess,"set data not success");
      
      return _requestGet(addr);
  }

  function _requestGet(address _addr)internal returns(uint256 data){
       bytes memory payload = abi.encodeWithSignature("get()");
      (bool isSuccess,bytes memory rspData) =  _addr.call(payload);
      require(isSuccess,"get data not success");
      uint256 rsp_data = abi.decode(rspData, (uint256));
      console.log("rsp_data:%d",rsp_data);
      return rsp_data;
  }

}