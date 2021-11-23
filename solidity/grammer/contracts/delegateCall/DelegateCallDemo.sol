// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract DelegateCallDemo {
    string public userName;

    //传入被调用合约地址和函数参数
    function newName(address targetContract, string memory _name) public {
        bytes memory payload = abi.encodeWithSignature(
            "changeName(string)",
            _name
        );
        (bool isSuccess, bytes memory data) = targetContract.delegatecall(
            payload
        );
    }
}
