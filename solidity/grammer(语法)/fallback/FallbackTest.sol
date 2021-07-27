//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
contract FallbackTest{

 
  //request exist func
  function requestExistFunc(address addr,uint8 _val)public returns(bytes memory _rsp){
      bytes memory payload1 = abi.encodeWithSignature("set(uint8)", _val);
      (bool isSuccess1,bytes memory rspData1) =  addr.call(payload1);
      require(isSuccess1,"set data not success");
      
      return _requestGet(addr);
  }
 
 
   //request not exist func，will trigger `fallback` of target contract 
   function requestNotExistFunc(address addr)public returns(bytes memory data){
      bytes memory payload = abi.encodeWithSignature("register(string)", "MyName");
      addr.call(payload);
      return _requestGet(addr);
  }

  function _requestGet(address _addr)internal returns(bytes memory data){
       bytes memory payload = abi.encodeWithSignature("get()");
      (bool isSuccess,bytes memory rspData) =  _addr.call(payload);
      require(isSuccess,"get data not success");
      return rspData;
  }

}