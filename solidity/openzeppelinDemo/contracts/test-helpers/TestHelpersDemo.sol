// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestHelpersDemo {
    string public storageValue;
    event ChangeValue(address indexed sender, string indexed value);

    constructor(string memory _initValue) {
        storageValue = _initValue;
    }

    function changeValue(string memory _value) public {
        storageValue = _value;
        emit ChangeValue(msg.sender, _value);
    }

    function div(uint256 _a, uint256 _b) public pure returns (uint256) {
        require(_b > 0, "Division or modulo division by zero");
        return _a / _b;
    }
}
