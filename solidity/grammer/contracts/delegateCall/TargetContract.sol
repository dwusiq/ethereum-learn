// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract TargetContract {
    string public userName;

    function changeName(string memory _name) public {
        userName = _name;
    }
}
